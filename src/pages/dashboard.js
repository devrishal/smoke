import React, { useState, useEffect } from 'react';
import Profile from '../../components/Dashboard/Profile';
import { useRouter } from 'next/router';
import Feed from '../../components/DAOs/Feed';
import loadDAOModules from '../dao/daoLoader';

function Dashboard() {
  const [daos, setDaos] = useState([]);
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
    };

    fetchDAOModules();
  }, []);

  const handleProposalClick = (proposal) => {
    router.push(`/proposal/${proposal.id}`);
  };

  const handleProtocolCardClick = (daoName) => {
    router.push(`/dao/${daoName}`);
  };

  return (
    <div>
      <div>
        <Profile />
      </div>
      <Feed daos={daos} onProtocolCardClick={handleProtocolCardClick} />
    </div>
  );
}

export default Dashboard;
