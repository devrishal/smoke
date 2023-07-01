// uniswap.js
import daoFactory from "./daoFactory";

const uniswapGovernanceSubgraphUrl =
  "https://api.thegraph.com/subgraphs/name/messari/uniswap-governance";

const uniswapDAOInfo = {
  name: "Uniswap",
  icon: "https://example.com/uniswap-logo.png",
  url: "https://uniswap.org/",
};

export default daoFactory(uniswapDAOInfo, uniswapGovernanceSubgraphUrl);
