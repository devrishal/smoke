// gitcoin.js
import {
    getProposals as sharedGetProposals,
    getDelegateById as sharedGetDelegateById,
    getLatestProposals as sharedGetLatestProposals,
    getTopDelegates as sharedGetTopDelegates,
  } from "./subgraphLoader";
  
  const gitcoinGovernanceSubgraphUrl = "https://api.thegraph.com/subgraphs/name/messari/gitcoin-governance";
  
  const gitcoinDAOInfo = {
    name: "Gitcoin",
    icon: "https://example.com/gitcoin-logo.png",
    url: "https://gitcoin.co/",
  };
  
  export function getGitcoinProposals() {
    return sharedGetProposals(gitcoinGovernanceSubgraphUrl, gitcoinDAOInfo, getGitcoinLatestProposals);
  }
  
  export function getGitcoinDelegateById(id) {
    return sharedGetDelegateById(gitcoinGovernanceSubgraphUrl, id, gitcoinDAOInfo);
  }
  
  export function getGitcoinLatestProposals() {
    return sharedGetLatestProposals(gitcoinGovernanceSubgraphUrl, gitcoinDAOInfo);
  }
  
  export function getGitcoinTopDelegates() {
    return sharedGetTopDelegates(gitcoinGovernanceSubgraphUrl, gitcoinDAOInfo);
  }
  
  const gitcoinDAO = {
    name: gitcoinDAOInfo.name,
    getProposals: getGitcoinProposals,
    getDelegateById: getGitcoinDelegateById,
    getLatestProposals: getGitcoinLatestProposals,
    getTopDelegates: getGitcoinTopDelegates,
  }
  
  export default gitcoinDAO;
  