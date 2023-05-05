// compound.js
import {
  getProposals as sharedGetProposals,
  getDelegateById as sharedGetDelegateById,
  getLatestProposals as sharedGetLatestProposals,
  getTopDelegates as sharedGetTopDelegates,
} from "./subgraphLoader";

const compoundGovernanceSubgraphUrl = "https://api.thegraph.com/subgraphs/name/messari/compound-governance";

const compoundDAOInfo = {
  name: "Compound",
  icon: "https://example.com/compound-logo.png",
  url: "https://compound.finance/",
};

export function getCompoundProposals() {
  return sharedGetProposals(compoundGovernanceSubgraphUrl, compoundDAOInfo, getCompoundLatestProposals);
}

export function getCompoundDelegateById(id) {
  return sharedGetDelegateById(compoundGovernanceSubgraphUrl, id, compoundDAOInfo);
}

export function getCompoundLatestProposals() {
  return sharedGetLatestProposals(compoundGovernanceSubgraphUrl, compoundDAOInfo);
}

export function getCompoundTopDelegates() {
  return sharedGetTopDelegates(compoundGovernanceSubgraphUrl, compoundDAOInfo);
}

const compoundDAO = {
  name: compoundDAOInfo.name, // Add the name property here!
  getProposals: getCompoundProposals,
  getDelegateById: getCompoundDelegateById,
  getLatestProposals: getCompoundLatestProposals,
  getTopDelegates: getCompoundTopDelegates,
};

export default compoundDAO;