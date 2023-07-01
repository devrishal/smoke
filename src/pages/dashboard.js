import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import loadDAOModules from "../lib/dao/daoLoader";
const Feed = React.lazy(() => import("../../components/DAOs/Feed"));

function Dashboard() {
  const [daos, setDaos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDAOModules = async () => {
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
    router.push(`/dao/${daoName}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Feed
          daos={daos}
          onProtocolCardClick={handleProtocolCardClick}
          onProposalClick={handleProposalClick}
        />
      </Suspense>
    </div>
  );
}

export default Dashboard;
