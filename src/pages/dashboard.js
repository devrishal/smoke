import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import loadDAOModules from "../lib/dao/daoLoader";
import DAOContext from "../contexts/DAOContext";
import Feed from "../../components/DAOs/Feed";
import SearchBar from "../../components/Dashboard/SearchBar";
import Profile from "../../components/Dashboard/Profile";

function Dashboard() {
  const [tokenHolder, setTokenHolder] = useState(null);
  const [tokenHolderDAOs, setTokenHolderDAOs] = useState([]);
  const [tokenHolderDAO, setTokenHolderDAO] = useState(null);
  const [daos, setDaos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Add this line
  const router = useRouter();

  useEffect(() => {
    const fetchDAOModules = async () => {
      setIsLoading(true);
      const daoList = await loadDAOModules();
      const daoListWithProposals = [];

      for (const dao of daoList) {
        const proposals = await dao.getProposals();
        daoListWithProposals.push({ ...dao, proposals });
      }

      setDaos(daoListWithProposals);
      setIsLoading(false);
    };

    fetchDAOModules();
  }, []);

  const handleProposalClick = (daoName, proposalId) => {
    router.push(`/dao/${daoName}/proposal/${proposalId}`);
  };

  const handleProtocolCardClick = (daoName) => {
    setIsNavigating(true);
    router.push(`/dao/${daoName}`).then(() => setIsNavigating(false));
  };

  const handleProtocolButtonClick = (protocolName) => {
    router.push(`/protocol/${protocolName}`);
  };

  if (isLoading || isNavigating) {
    return <div>Loading...</div>;
  }

  const handleSearch = async (searchTerm) => {
    setIsSearching(true);
    let tokenHolders = []; // Use an array to store all the token holders
    let tokenHolderDAOs = []; // Use an array to store all the DAOs that the token holder belongs to
    for (const dao of daos) {
      const tokenHolderInDAO = await dao.getTokenHolderById(searchTerm);
      if (tokenHolderInDAO) {
        tokenHolders.push(tokenHolderInDAO);
        tokenHolderDAOs.push(dao);
      }
    }
    setTokenHolder(tokenHolders); // Set the token holders
    setTokenHolderDAOs(tokenHolderDAOs); // Set the DAOs that the token holder belongs to
    setIsSearching(false);
  };

  return (
    <DAOContext.Provider value={daos}>
      <div>
        <SearchBar onSearch={handleSearch} />
        {isSearching ? (
          <div>Loading...</div>
        ) : (
          tokenHolder && (
            <Profile
              tokenHolder={tokenHolder}
              dao={tokenHolderDAOs} // Pass dao instead of daos
              onProtocolButtonClick={handleProtocolButtonClick}
            />
          )
        )}
        <Feed
          daos={daos}
          onProtocolCardClick={handleProtocolCardClick}
          onProposalClick={handleProposalClick}
        />
      </div>
    </DAOContext.Provider>
  );
}

export default Dashboard;
