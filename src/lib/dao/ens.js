// ens.js
import daoFactory from "./daoFactory";

const ensGovernanceSubgraphUrl =
  "https://api.thegraph.com/subgraphs/name/messari/ens-governance";

const ensDAOInfo = {
  name: "ENS",
  icon: "https://example.com/ens-logo.png",
  url: "https://ens.domains/",
};

export default daoFactory(ensDAOInfo, ensGovernanceSubgraphUrl);
