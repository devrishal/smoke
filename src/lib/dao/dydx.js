// dydx.js
import daoFactory from "./daoFactory";

const dydxGovernanceSubgraphUrl =
  "https://api.thegraph.com/subgraphs/name/messari/dydx-governance";

const dydxDAOInfo = {
  name: "DYDX",
  icon: "https://example.com/dydx-logo.png",
  url: "https://dydx.exchange/",
};

export default daoFactory(dydxDAOInfo, dydxGovernanceSubgraphUrl);
