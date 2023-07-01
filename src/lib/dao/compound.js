// compound.js
import daoFactory from "./daoFactory";

const compoundGovernanceSubgraphUrl =
  "https://api.thegraph.com/subgraphs/name/messari/compound-governance";

const compoundDAOInfo = {
  name: "Compound",
  icon: "https://example.com/compound-logo.png",
  url: "https://compound.finance/",
};

export default daoFactory(compoundDAOInfo, compoundGovernanceSubgraphUrl);
