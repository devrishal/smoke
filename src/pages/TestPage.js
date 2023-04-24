// TestPage.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Feed from '../../components/DAOs/Feed';
import loadDAOModules from '../dao/loader';
import { getTopDelegates as getUniswapDelegates, getProposals as getUniswapProposals } from '../../src/dao/uniswap';
import { getTopDelegates as getCompoundDelegates, getProposals as getCompoundProposals } from '../../src/dao/compound';


function TestPage() {
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
        const latestProposals = await dao.getLatestProposals(); // Get the latest proposals
        const updatedDelegates = delegates.map(delegate => {
          const daos = delegate.daos || [];
          if (!daos.some(d => d.name === dao.name)) {
            daos.push(dao);
          }
          return { ...delegate, daos };
        }).filter(delegate => delegate.daos.some(dao => dao.name === dao.name));
        allMembers = allMembers.concat(updatedDelegates.filter(delegate => delegate.daos.some(dao => dao.name === dao.name)));
        allProposals = allProposals.concat(latestProposals); // Use the latest proposals here
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
      <Feed
        delegates={members}
        proposals={proposals}
        onDelegateCardClick={handleMemberClick}
        onProposalClick={handleProposalClick}
      />
    </div>
  );
}


export default TestPage;
