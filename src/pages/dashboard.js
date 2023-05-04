import React, { useState, useEffect } from 'react';
import Profile from '../../components/Dashboard/Profile';
import { useRouter } from 'next/router';
import Feed from '../../components/DAOs/Feed';
import loadDAOModules from '../dao/loader';

function Dashboard() {
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDelegatesAndProposals = async () => {
      let allMembers = [];
      let allProposals = [];
      const daoList = await loadDAOModules();
    
      for (const dao of daoList) {
        const delegates = await dao.getTopDelegates();
        const detailedProposals = await dao.getProposals(); // Use the getProposals function instead of getLatestProposals
        const updatedDelegates = delegates.map(delegate => {
          const daos = delegate.daos || [];
          if (!daos.some(d => d.name === dao.name)) {
            daos.push(dao);
          }
          return { ...delegate, daos };
        }).filter(delegate => delegate.daos.some(dao => dao.name === dao.name));
        allMembers = allMembers.concat(updatedDelegates.filter(delegate => delegate.daos.some(dao => dao.name === dao.name)));
        allProposals = allProposals.concat(detailedProposals); // Use the detailed proposals fetched using getProposals
      }
    
      setMembers(allMembers);
      setProposals(allProposals);
    };    

    fetchDelegatesAndProposals();
  }, []);

  const handleMemberClick = (member) => {
    router.push(`/delegate/${member.id}`);
  };

  const handleProposalClick = (proposal) => {
    router.push(`/proposal/${proposal.id}`);
  };

  return (
    <div>
      <div>
        <Profile />
      </div>
      <Feed
        delegates={members}
        proposals={proposals}
        onDelegateCardClick={handleMemberClick}
        onProposalClick={handleProposalClick}
      />
    </div>
  );
}


export default Dashboard;