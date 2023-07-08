import {
  getProposals as sharedGetProposals,
  getLatestProposals as sharedGetLatestProposals,
  getTokenHolderById as sharedGetTokenHolderById,
} from "./subgraphLoader";

export default function daoFactory(daoInfo, governanceSubgraphUrl) {
  function getProposals() {
    return sharedGetProposals(governanceSubgraphUrl, daoInfo);
  }

  function getLatestProposals() {
    return sharedGetLatestProposals(governanceSubgraphUrl, daoInfo);
  }

  function getTokenHolderById(id) {
    return sharedGetTokenHolderById(governanceSubgraphUrl, id);
  }

  return {
    name: daoInfo.name,
    getProposals,
    getLatestProposals,
    getTokenHolderById,
  };
}
