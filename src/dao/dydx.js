// dydx.js
import {
    getProposals as sharedGetProposals,
    getDelegateById as sharedGetDelegateById,
    getLatestProposals as sharedGetLatestProposals,
    getTopDelegates as sharedGetTopDelegates,
  } from "./subgraphLoader";
  
  const dydxGovernanceSubgraphUrl = "https://api.thegraph.com/subgraphs/name/messari/dydx-governance";
  
  const dydxDAOInfo = {
    name: "DYDX",
    icon: "https://example.com/dydx-logo.png",
    url: "https://dydx.exchange/",
  };
  
  export function getDYDXProposals() {
    return sharedGetProposals(dydxGovernanceSubgraphUrl, dydxDAOInfo, getDYDXLatestProposals);
  }
  
  export function getDYDXDelegateById(id) {
    return sharedGetDelegateById(dydxGovernanceSubgraphUrl, id, dydxDAOInfo);
  }
  
  export function getDYDXLatestProposals() {
    return sharedGetLatestProposals(dydxGovernanceSubgraphUrl, dydxDAOInfo);
  }
  
  export function getDYDXTopDelegates() {
    return sharedGetTopDelegates(dydxGovernanceSubgraphUrl, dydxDAOInfo);
  }
  
  const dydxDAO = {
    name: dydxDAOInfo.name,
    getProposals: getDYDXProposals,
    getDelegateById: getDYDXDelegateById,
    getLatestProposals: getDYDXLatestProposals,
    getTopDelegates: getDYDXTopDelegates,
  }
  
  export default dydxDAO;
