import React from 'react';
import ProtocolCard from './ProtocolCard';
import ProposalCard from './ProposalCard';

function Feed({ daos, dao, onProposalClick, onProtocolCardClick }) {
  return (
    <div>
      {dao
        ? dao.proposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} onProposalClick={onProposalClick} />
          ))
        : daos.map(d => (
            <ProtocolCard key={d.name} dao={d} onProtocolCardClick={onProtocolCardClick} /> // Add onProposalClick prop here
          ))}
    </div>
  );
}

export default Feed;
