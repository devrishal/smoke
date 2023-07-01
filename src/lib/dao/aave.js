// aave.js
import daoFactory from "./daoFactory";

const aaveGovernanceSubgraphUrl =
  "https://api.thegraph.com/subgraphs/name/messari/aave-governance";

const aaveDAOInfo = {
  name: "AAVE",
  icon: "https://example.com/aave-logo.png",
  url: "https://aave.com/",
};

export default daoFactory(aaveDAOInfo, aaveGovernanceSubgraphUrl);
