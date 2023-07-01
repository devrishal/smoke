// gitcoin.js
import daoFactory from "./daoFactory";

const gitcoinGovernanceSubgraphUrl =
  "https://api.thegraph.com/subgraphs/name/messari/gitcoin-governance";

const gitcoinDAOInfo = {
  name: "Gitcoin",
  icon: "https://example.com/gitcoin-logo.png",
  url: "https://gitcoin.co/",
};

export default daoFactory(gitcoinDAOInfo, gitcoinGovernanceSubgraphUrl);
