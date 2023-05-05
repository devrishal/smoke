// ens.js
import {
    getProposals as sharedGetProposals,
    getDelegateById as sharedGetDelegateById,
    getLatestProposals as sharedGetLatestProposals,
    getTopDelegates as sharedGetTopDelegates,
  } from "./subgraphLoader";
  
  const ensGovernanceSubgraphUrl = "https://api.thegraph.com/subgraphs/name/messari/ens-governance";
  
  const ensDAOInfo = {
    name: "ENS",
    icon: "https://example.com/ens-logo.png",
    url: "https://ens.domains/",
  };
  
  export function getENSProposals() {
    return sharedGetProposals(ensGovernanceSubgraphUrl, ensDAOInfo, getENSLatestProposals);
  }
  
  export function getENSDelegateById(id) {
    return sharedGetDelegateById(ensGovernanceSubgraphUrl, id, ensDAOInfo);
  }
  
  export function getENSLatestProposals() {
    return sharedGetLatestProposals(ensGovernanceSubgraphUrl, ensDAOInfo);
  }
  
  export function getENSTopDelegates() {
    return sharedGetTopDelegates(ensGovernanceSubgraphUrl, ensDAOInfo);
  }
  
  const ensDAO = {
    name: ensDAOInfo.name,
    getProposals: getENSProposals,
    getDelegateById: getENSDelegateById,
    getLatestProposals: getENSLatestProposals,
    getTopDelegates: getENSTopDelegates,
  };
  
  export default ensDAO;
  