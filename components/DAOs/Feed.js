import React from "react";
import ProtocolCard from "./ProtocolCard";
import ProposalCard from "./ProposalCard";

function Feed({ daos, dao, onProposalClick, onProtocolCardClick }) {
  if (dao && dao.proposals) {
    return (
      <div>
        {dao.proposals.map((proposal) => (
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            dao={dao}
            onProposalClick={() =>
              onProposalClick(dao.name, proposal.id, proposal)
            }
          />
        ))}
      </div>
    );
  }

  if (daos) {
    return (
      <div>
        {daos.map((d) => (
          <ProtocolCard
            key={d.name}
            dao={d}
            onProtocolCardClick={onProtocolCardClick}
          />
        ))}
      </div>
    );
  }

  return null;
}

export default Feed;
