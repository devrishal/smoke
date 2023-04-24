//compound.js
import {
  fetchGraphQL
} from "../lib/utils";
import {
  getENSName
} from "../lib/ens";

export async function getProposals() {
  const latestProposals = await getLatestProposals();
  const topDelegates = await getTopDelegates();
  const proposals = latestProposals.map(proposal => { // Change flatMap to map
      const delegate = topDelegates.find(d => d.id === proposal.proposer.id);
      const dao = delegate.daos[0];
      return {
          ...proposal,
          dao: dao,
          startDate: proposal.startDate,
          endDate: proposal.endBlock,
          id: proposal.id,
      };
  });
  return proposals;
}


export async function getLatestProposals(limit = 10) {
  const compoundGovernanceSubgraphUrl = 'https://api.thegraph.com/subgraphs/name/protofire/compound-governance';
  const latestProposalsQuery = `
{
proposals(first: ${limit}, orderBy: startBlock, orderDirection: desc) {
id
description
startBlock
endBlock
status
proposer {
  id
}
votes {
  id
  support
  votes
}
}
}
`;
  const latestProposalsData = await fetchGraphQL(compoundGovernanceSubgraphUrl, latestProposalsQuery);
  if (latestProposalsData && latestProposalsData.errors) {
      console.error('GraphQL Errors:', latestProposalsData.errors);
      return [];
  }

  const proposals = latestProposalsData.data.proposals.map(proposal => ({
      ...proposal,
      dao: {
          id: proposal.id,
          name: 'Compound',
          icon: 'https://example.com/compound-logo.png', // Replace this with the actual logo URL
          url: 'https://compound.finance/',
      },
      startDate: proposal.startBlock.toString(), // Add this line to create the startDate property
  }));

  return proposals;
}


export async function getTopDelegates() {
  const compoundGovernanceSubgraphUrl = 'https://api.thegraph.com/subgraphs/name/protofire/compound-governance';
  const delegatesQuery = `
{
delegates(first: 10, orderDirection: desc, orderBy: delegatedVotes) {
id
delegatedVotesRaw
delegatedVotes
tokenHoldersRepresentedAmount
}
}
`;

  const delegatesData = await fetchGraphQL(compoundGovernanceSubgraphUrl, delegatesQuery);

  if (delegatesData && delegatesData.errors) {
      console.error('GraphQL Errors:', delegatesData.errors);
      return [];
  }

  const delegates = delegatesData.data.delegates;

  const delegatesWithProposals = await Promise.all(
      delegates.map(async delegate => {
          const delegateId = delegate.id;

          const submittedProposalsQuery = `
{
  proposals(where: {proposer: "${delegateId}"}, first: 10) {
    id
    description
    startBlock
    endBlock
    status
    proposer {
      id
    }
    votes {
      id
      support
      votes
    }
  }
}
`;

          const votedProposalsQuery = `
{
  votes(first: 10, where: {voter: "${delegateId}"}) {
    id
    support
    votes
    proposal {
      id
      startBlock
      endBlock
      status
      description
    }
  }
}
`;

          const submittedProposalsData = await fetchGraphQL(compoundGovernanceSubgraphUrl, submittedProposalsQuery);
          const votedProposalsData = await fetchGraphQL(compoundGovernanceSubgraphUrl, votedProposalsQuery);

          if (votedProposalsData && votedProposalsData.errors) {
              console.error('GraphQL Errors:', votedProposalsData.errors);
              return [];
          }

          // Extract and format voting history for each proposal
          const votingHistory = [];
          votedProposalsData.data.votes.forEach(vote => {
              const startDateTimestamp = vote.proposal.startBlock;
              const endDateTimestamp = vote.proposal.endBlock;
              const startDate = new Date(startDateTimestamp);
              const endDate = new Date(endDateTimestamp);
              votingHistory.push({
                  proposalDescription: vote.proposal.description,
                  protocol: 'Compound',
                  howTheyVoted: vote.support ? 'FOR' : 'AGAINST',
                  numberOfVotesCast: vote.votes,
                  proposalId: vote.proposal.id,
                  startDate: startDate,
                  endDate: endDate,
                  status: vote.proposal.status,
                  url: `https://app.compound.finance/governance/${vote.proposal.id}`,
              });
          });

          // Extract and format submitted proposals for each delegate
          const submittedProposals = [];
          submittedProposalsData.data.proposals.forEach(proposal => {
              const startDateTimestamp = proposal.startBlock;
              const endDateTimestamp = proposal.endBlock;
              const startDate = new Date(startDateTimestamp);
              const endDate = new Date(endDateTimestamp);
              const votesFor = proposal.votes.filter(vote => vote.support).reduce((acc, vote) => acc + vote.votes, 0);
              const votesAgainst = proposal.votes.filter(vote => !vote.support).reduce((acc, vote) => acc + vote.votes, 0);
              const approved = votesFor > votesAgainst;
              submittedProposals.push({
                  proposalId: proposal.id,
                  description: proposal.description,
                  startDate: startDate,
                  endDate: endDate,
                  status: proposal.status,
                  url: `https://app.compound.finance/governance/${proposal.id}`,
                  votesFor: votesFor,
                  votesAgainst: votesAgainst,
                  approved: approved,
              });
          });

          const ensName = await getENSName(delegate.id); // Pass the delegate's Ethereum address to the getENSName function

          // Add a sample DAO object to the delegate object
          const dao = {
              name: 'Compound',
              icon: 'https://example.com/compound-logo.png', // Replace this with the actual logo URL
              url: 'https://compound.finance/',
          };

          return {
              id: delegate.id,
              ensName: ensName,
              delegatedVotes: delegate.delegatedVotes,
              votingHistory: votingHistory,
              proposals: submittedProposals,
              daos: [dao], // Add the daos field here
          };
      })
  );

  return delegatesWithProposals;
}