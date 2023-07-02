import React from "react";
import ProtocolCard from "./ProtocolCard";
import ProposalCard from "./ProposalCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

function Feed({ daos, dao, onProposalClick, onProtocolCardClick }) {
  const router = useRouter();
  if (dao && dao.proposals) {
    return (
      <div>
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
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
