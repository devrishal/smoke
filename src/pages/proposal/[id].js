// pages/proposal/[proposalId].js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { ProposalProfile } from '../../../components/Proposals/ProposalProfile';
import loadDAOModules from '../../dao/daoLoader';

function ProposalProfilePage() {
  const router = useRouter();
  const { proposalId } = router.query;
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    const fetchProposal = async () => {
      console.log("Fetching proposal with ID:", proposalId);
      const daoList = await loadDAOModules();
      let foundProposal = null;
      const parsedProposalId = parseInt(proposalId, 10); // Parse proposalId to a number
    
      for (const dao of daoList) {
        const proposalsForDAO = await dao.getProposals();
    
        foundProposal = proposalsForDAO.find((proposal) => proposal.id === parsedProposalId); // Compare proposal.id to parsedProposalId
        if (foundProposal) break;
      }
    
      if (foundProposal) {
        console.log("Found proposal:", foundProposal);
      } else {
        console.log("Proposal not found");
      }
    
      setProposal(foundProposal);
    };    
  
    if (proposalId) {
      console.log("Proposal ID found, fetching proposal");
      fetchProposal();
    } else {
      console.log("No proposal ID found");
    }
  }, [proposalId]);
  

  if (!proposalId) {
    console.log('No proposal ID found');
    return <p>No proposal ID found</p>;
  }

  if (!proposal) {
    console.log('Proposal not found');
    return <p>Loading...</p>;
  }
  
  console.log('ProposalProfilePage passing proposal:', proposal);
  return <ProposalProfile proposal={proposal} />;
}

export default ProposalProfilePage;
