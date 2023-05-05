// aave.js
import {
    getProposals as sharedGetProposals,
    getDelegateById as sharedGetDelegateById,
    getLatestProposals as sharedGetLatestProposals,
    getTopDelegates as sharedGetTopDelegates,
  } from "./subgraphLoader";
  
  const aaveGovernanceSubgraphUrl = "https://api.thegraph.com/subgraphs/name/messari/aave-governance";
  
  const aaveDAOInfo = {
    name: "AAVE",
    icon: "https://example.com/aave-logo.png",
    url: "https://aave.com/",
  };
  
  export function getAAVEProposals() {
    return sharedGetProposals(aaveGovernanceSubgraphUrl, aaveDAOInfo, getAAVELatestProposals);
  }
  
  export function getAAVEDelegateById(id) {
    return sharedGetDelegateById(aaveGovernanceSubgraphUrl, id, aaveDAOInfo);
  }
  
  export function getAAVELatestProposals() {
    return sharedGetLatestProposals(aaveGovernanceSubgraphUrl, aaveDAOInfo);
  }
  
  export function getAAVETopDelegates() {
    return sharedGetTopDelegates(aaveGovernanceSubgraphUrl, aaveDAOInfo);
  }
  
  const aaveDAO = {
    name: aaveDAOInfo.name,
    getProposals: getAAVEProposals,
    getDelegateById: getAAVEDelegateById,
    getLatestProposals: getAAVELatestProposals,
    getTopDelegates: getAAVETopDelegates,
  };
  
  export default aaveDAO;
  