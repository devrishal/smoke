// subgraphLoader.js
import { fetchGraphQL } from "../utils";

export async function getProposals(subgraphUrl, daoInfo) {
  const latestProposals = await getLatestProposals(subgraphUrl, daoInfo);
  return latestProposals.map((proposal) => {
    const delegate = proposal.proposer;
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
      dao: daoInfo,
      startDate: proposal.startDate,
      endDate: proposal.endBlock,
      id: proposal.id,
      votesFor: votesFor,
      votesAgainst: votesAgainst,
      status: proposal.state,
      votes: proposal.votes,
      delegate: delegate,
    };
  });
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
          delegatedVotesRaw
          delegatedVotes
          tokenHoldersRepresentedAmount
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
    delegate: proposal.proposer,
  }));

  return proposals;
}

export async function getTokenHolderById(subgraphUrl, id) {
  const tokenHolderQuery = `
    {
      tokenHolder(id: "${id}") {
        id
        delegate {
          id
          delegatedVotes
        }
      }
    }
  `;

  const tokenHolderData = await fetchGraphQL(subgraphUrl, tokenHolderQuery);

  if (tokenHolderData && tokenHolderData.errors) {
    console.error("GraphQL Errors:", tokenHolderData.errors);
    return null;
  }

  return tokenHolderData.data.tokenHolder;
}
