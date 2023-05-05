// uniswap.js
import {
  getProposals as sharedGetProposals,
  getDelegateById as sharedGetDelegateById,
  getLatestProposals as sharedGetLatestProposals,
  getTopDelegates as sharedGetTopDelegates,
} from "./subgraphLoader";

const uniswapGovernanceSubgraphUrl = "https://api.thegraph.com/subgraphs/name/messari/uniswap-governance";

const uniswapDAOInfo = {
  name: "Uniswap",
  icon: "https://example.com/uniswap-logo.png",
  url: "https://uniswap.org/",
};

export function getUniswapProposals() {
  return sharedGetProposals(uniswapGovernanceSubgraphUrl, uniswapDAOInfo, getUniswapLatestProposals);
}

export function getUniswapDelegateById(id) {
  return sharedGetDelegateById(uniswapGovernanceSubgraphUrl, id, uniswapDAOInfo);
}

export function getUniswapLatestProposals() {
  return sharedGetLatestProposals(uniswapGovernanceSubgraphUrl, uniswapDAOInfo);
}

export function getUniswapTopDelegates() {
  return sharedGetTopDelegates(uniswapGovernanceSubgraphUrl, uniswapDAOInfo);
}

const uniswapDAO = {
  name: uniswapDAOInfo.name,
  getProposals: getUniswapProposals,
  getDelegateById: getUniswapDelegateById,
  getLatestProposals: getUniswapLatestProposals,
  getTopDelegates: getUniswapTopDelegates,
}

export default uniswapDAO;