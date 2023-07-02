// Dao.js
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import DAOContext from "../../contexts/DAOContext";
import Feed from "../../../components/DAOs/Feed";
import ProposalProfile from "../../../components/Proposals/ProposalProfile";

function Dao() {
  const daos = useContext(DAOContext);
  const router = useRouter();
  const { dao: daoName } = router.query;

  // Find the selected DAO directly in the render method
  const daoData = daos.find((d) => d.name === daoName);

  const [selectedProposal, setSelectedProposal] = useState(null);

  const handleProposalClick = async (daoName, id, proposal) => {
    setSelectedProposal(proposal);
  };

  const handleCloseProposal = () => {
    setSelectedProposal(null);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      {selectedProposal ? (
        <ProposalProfile
          proposal={selectedProposal}
          onClose={handleCloseProposal}
        />
      ) : (
        daoData && (
          <Feed
            dao={daoData}
            onProposalClick={handleProposalClick}
            onBackClick={handleBackClick}
          />
        )
      )}
    </div>
  );
}

export default Dao;
