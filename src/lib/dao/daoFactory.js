// daoFactory.js
import {
  getProposals as sharedGetProposals,
  getDelegateById as sharedGetDelegateById,
  getLatestProposals as sharedGetLatestProposals,
  getTopDelegates as sharedGetTopDelegates,
  getProposalByDaoAndId as sharedGetProposalByDaoAndId, // Import the function
  getTokenHolderById as sharedGetTokenHolderById,
} from "./subgraphLoader";

export default function daoFactory(daoInfo, governanceSubgraphUrl) {
  function getProposals() {
    return sharedGetProposals(
      governanceSubgraphUrl,
      daoInfo,
      getLatestProposals
    );
  }

  function getDelegateById(id) {
    return sharedGetDelegateById(governanceSubgraphUrl, id, daoInfo);
  }

  function getLatestProposals() {
    return sharedGetLatestProposals(governanceSubgraphUrl, daoInfo);
  }

  function getTopDelegates() {
    return sharedGetTopDelegates(governanceSubgraphUrl, daoInfo);
  }

  // Add a new function here
  function getProposalByDaoAndId(daoName, proposalId) {
    return sharedGetProposalByDaoAndId(
      governanceSubgraphUrl,
      daoName,
      proposalId
    );
  }

  function getTokenHolderById(id) {
    return sharedGetTokenHolderById(governanceSubgraphUrl, id);
  }

  return {
    name: daoInfo.name,
    getProposals,
    getDelegateById,
    getLatestProposals,
    getTopDelegates,
    getProposalByDaoAndId, // Add the function to the returned object
    getTokenHolderById,
  };
}
