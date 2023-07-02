// Dashboard.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import loadDAOModules from "../lib/dao/daoLoader";
import DAOContext from "../contexts/DAOContext";
import Feed from "../../components/DAOs/Feed";
import SearchBar from "../../components/Dashboard/SearchBar";
import Profile from "../../components/Dashboard/Profile"; // import the Profile component

function Dashboard() {
  const [tokenHolder, setTokenHolder] = useState(null);
  const [daos, setDaos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false); // Add this line
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
    setIsNavigating(true); // Set isNavigating to true when a protocol card is clicked
    router.push(`/dao/${daoName}`).then(() => setIsNavigating(false)); // Set isNavigating back to false when the navigation is complete
  };

  if (isLoading || isNavigating) {
    return <div>Loading...</div>; // Display a loading message while the data is loading or while navigating
  }

  const handleSearch = async (searchTerm) => {
    console.log("handleSearch start");
    const tokenHolder = await daos[5].getTokenHolderById(searchTerm); // replace 0 with the index of the DAO you want to query
    setTokenHolder(tokenHolder);
    console.log("tokenHolder", tokenHolder);
  };

  return (
    <DAOContext.Provider value={daos}>
      <div>
        <SearchBar onSearch={handleSearch} />
        {tokenHolder && <Profile tokenHolder={tokenHolder} />}
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
