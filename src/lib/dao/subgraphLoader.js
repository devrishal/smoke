// subgraphLoader.js
import { fetchGraphQL } from "../utils";

export async function getProposals(subgraphUrl, daoInfo, latestProposalsFunc) {
  const latestProposals = await latestProposalsFunc();
  const proposals = await Promise.all(
    latestProposals.map(async (proposal) => {
      const delegate = await getDelegateById(
        subgraphUrl,
        proposal.proposer.id,
        daoInfo
      );
      const dao = delegate.daos[0];
      const decimals = 18;

      const votesFor =
        proposal.votes
          .filter((vote) => vote.choice === "FOR")
          .reduce((acc, vote) => acc + parseInt(vote.weight), 0) /
        10 ** decimals;
      const votesAgainst =
        proposal.votes
          .filter((vote) => vote.choice === "AGAINST")
          .reduce((acc, vote) => acc + parseInt(vote.weight), 0) /
        10 ** decimals;

      return {
        ...proposal,
        dao: dao,
        startDate: proposal.startDate,
        endDate: proposal.endBlock,
        id: proposal.id,
        votesFor: votesFor,
        votesAgainst: votesAgainst,
        status: proposal.state,
        votes: proposal.votes,
      };
    })
  );

  return proposals;
}

export async function getDelegateById(subgraphUrl, id, daoInfo) {
  const delegateQuery = `
    {
      delegate(id: "${id}") {
        id
        delegatedVotesRaw
        delegatedVotes
        tokenHoldersRepresentedAmount
      }
    }
    `;

  const delegateData = await fetchGraphQL(subgraphUrl, delegateQuery);

  if (delegateData && delegateData.errors) {
    console.error("GraphQL Errors:", delegateData.errors);
    return null;
  }

  const delegate = delegateData.data.delegate;

  return {
    id: delegate.id,
    delegatedVotes: delegate.delegatedVotes,
    daos: [daoInfo],
  };
}

export async function getLatestProposals(subgraphUrl, daoInfo, first = 10) {
  const latestProposalsQuery = `
    {
      proposals(first: ${first}, orderBy: startBlock, orderDirection: desc) {
        id
        description
        startBlock
        endBlock
        state
        proposer {
          id
        }
        votes {
          id
          choice
          weight
        }
      }
    }
  `;
  const latestProposalsData = await fetchGraphQL(
    subgraphUrl,
    latestProposalsQuery
  );
  if (latestProposalsData && latestProposalsData.errors) {
    console.error("GraphQL Errors:", latestProposalsData.errors);
    return [];
  }

  const proposals = latestProposalsData.data.proposals.map((proposal) => ({
    ...proposal,
    startDate: proposal.startBlock.toString(),
    dao: daoInfo,
  }));

  return proposals;
}

export async function getProposalByDaoAndId(subgraphUrl, daoName, proposalId) {
  console.log("Arguments:", subgraphUrl, daoName, proposalId);
  const proposalQuery = `
    {
      proposal(id: "${proposalId}") {
        id
        description
        startBlock
        endBlock
        state
        proposer {
          id
        }
        votes {
          id
          choice
          weight
        }
      }
    }
  `;
  const proposalData = await fetchGraphQL(subgraphUrl, proposalQuery);
  if (proposalData && proposalData.errors) {
    console.error("GraphQL Errors:", proposalData.errors);
    return null;
  }

  console.log("Proposal data:", proposalData);

  const proposal = proposalData.data.proposal;

  proposal.startDate = proposal.startBlock.toString();
  proposal.dao = { name: daoName };

  return proposal;
}
