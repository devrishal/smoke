// Dashboard.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import loadDAOModules from "../lib/dao/daoLoader";
import DAOContext from "../contexts/DAOContext";
import Feed from "../../components/DAOs/Feed";

function Dashboard() {
  const [daos, setDaos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const router = useRouter();

  useEffect(() => {
    const fetchDAOModules = async () => {
      setIsLoading(true); // Add this line
      const daoList = await loadDAOModules();
      const daoListWithProposals = [];

      for (const dao of daoList) {
        const proposals = await dao.getProposals();
        daoListWithProposals.push({ ...dao, proposals });
      }

      setDaos(daoListWithProposals);
      setIsLoading(false); // Add this line
    };

    fetchDAOModules();
  }, []);

  const handleProposalClick = (daoName, proposalId) => {
    router.push(`/dao/${daoName}/proposal/${proposalId}`);
  };

  const handleProtocolCardClick = (daoName) => {
    router.push(`/dao/${daoName}`);
  };

  if (isLoading) {
    // Add this block
    return <div>Loading...</div>;
  }

  return (
    <DAOContext.Provider value={daos}>
      <div>
        <Feed
          daos={daos} // Pass daos as a prop to Feed
          onProtocolCardClick={handleProtocolCardClick}
          onProposalClick={handleProposalClick}
        />
      </div>
    </DAOContext.Provider>
  );
}

export default Dashboard;
