//uniswap.js
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
  const uniswapGovernanceSubgraphUrl = 'https://api.thegraph.com/subgraphs/name/ianlapham/governance-tracking';
  const latestProposalsQuery = `
{
  proposals(first: ${limit}, orderBy: startBlock, orderDirection: desc) {
    id
    description
    forCount
    againstCount
    startBlock
    endBlock
    status
    startBlock
  }
}
`;

  const latestProposalsData = await fetchGraphQL(uniswapGovernanceSubgraphUrl, latestProposalsQuery);
  if (latestProposalsData && latestProposalsData.errors) {
      console.error('GraphQL Errors:', latestProposalsData.errors);
      return [];
  }

  const proposals = latestProposalsData.data.proposals.map(proposal => ({
      ...proposal,
      dao: {
          id: proposal.id,
          name: 'Uniswap',
          icon: 'https://example.com/uniswap-logo.png', // Replace with the actual logo URL
          url: 'https://uniswap.org/',
      },
      startDate: proposal.startBlock.toString(), // Add this line to create the startDate property
  }));

  return proposals;
}



export async function getTopDelegates() {
  const uniswapGovernanceSubgraphUrl = 'https://api.thegraph.com/subgraphs/name/ianlapham/governance-tracking';

  // Query for fetching top delegates
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

  // Fetch top delegates
  const delegatesData = await fetchGraphQL(uniswapGovernanceSubgraphUrl, delegatesQuery);

  if (delegatesData && delegatesData.errors) {
      console.error('GraphQL Errors:', delegatesData.errors);
      return [];
  }

  const delegates = delegatesData.data.delegates;

  // Fetch voting history and submitted proposals for each top delegate
  const delegatesWithProposals = await Promise.all(
      delegates.map(async delegate => {
          const delegateId = delegate.id;

          // Query for fetching submitted proposals by the delegate
          const submittedProposalsQuery = `
    {
      proposals(where: {proposer: "${delegateId}"}, first: 10) {
        againstCount
        description
        forCount
        endBlock
        startBlock
        status
        proposer {
          id
        }
      }
    }
    `;

          // Query for fetching other proposals that the delegate has voted on
          // Use the "voter" relationship and filter by delegate "id" inside it
          const votedProposalsQuery = `
    {
      votes(where: {voter_contains: "${delegateId}"}, first: 10) {
        id
        proposal {
          description
          forCount
          againstCount
          id
          startBlock
          endBlock
          status
        }
      }
    }
    `;

          // Fetch submitted proposals
          const submittedProposalsData = await fetchGraphQL(uniswapGovernanceSubgraphUrl, submittedProposalsQuery);

          const votedProposalsData = await fetchGraphQL(uniswapGovernanceSubgraphUrl, votedProposalsQuery);

          if (votedProposalsData && votedProposalsData.errors) {
              console.error('GraphQL Errors:', votedProposalsData.errors);
              return [];
          }

          // Extract and format voting history for each proposal
          const votingHistory = [];
          votedProposalsData.data.votes.forEach(vote => {
              const startBlock = vote.proposal.startBlock;
              const endDate = vote.proposal.endBlock;
              votingHistory.push({
                  proposalDescription: vote.proposal.description,
                  protocol: 'Uniswap',
                  howTheyVoted: vote.votes > 0 ? 'FOR' : 'AGAINST',
                  numberOfVotesCast: vote.votes,
                  proposalId: vote.proposal.id,
                  startDate: startBlock,
                  endDate: endDate,
                  status: vote.proposal.status,
                  forVotes: vote.proposal.forCount,
                  againstVotes: vote.proposal.againstCount,
                  url: `https://app.uniswap.org/#/vote/${vote.proposal.id}`,
              });
          });

          // Extract and format submitted proposals for each delegate
          const submittedProposals = submittedProposalsData.data.proposals.map(proposal => {
              const startBlock = proposal.startBlock;
              const endDate = proposal.endBlock;
              return {
                  proposalId: proposal.id,
                  description: proposal.description,
                  startDate: startBlock,
                  endDate: endDate,
                  status: proposal.status,
                  forVotes: proposal.forCount,
                  againstVotes: proposal.againstCount,
                  url: `https://app.uniswap.org/#/vote/${proposal.id}`,
              };
          });

          const ensName = await getENSName(delegate.id); // Pass the delegate's Ethereum address to the getENSName function

          // Add a sample DAO object to the delegate object
          const dao = {
              name: 'Uniswap',
              icon: 'https://example.com/uniswap-logo.png', // Replace this with the actual logo URL
              url: 'https://uniswap.org/',
          };

          return {
              id: delegate.id,
              ensName: ensName,
              delegatedVotes: delegate.delegatedVotes,
              votingHistory: votingHistory,
              proposals: submittedProposals,
              daos: [dao], // Add the daos field here
          };
      }),
  );

  return delegatesWithProposals;
}