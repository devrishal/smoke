import React, { useState, useEffect } from "react";
import Feed from "../../../components/DAOs/Feed";
import ProposalProfile from "../../../components/Proposals/ProposalProfile";
import loadDAOModules from "../../lib/dao/daoLoader";
import { useRouter } from "next/router";

function Dao() {
  const [daoData, setDaoData] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const router = useRouter();
  const { dao } = router.query;

  useEffect(() => {
    const fetchDAO = async () => {
      const daoList = await loadDAOModules();
      const selectedDAO = daoList.find((d) => d.name === dao);

      if (selectedDAO) {
        const proposals = await selectedDAO.getProposals();
        setDaoData({ ...selectedDAO, proposals });
      }
    };

    if (dao) {
      fetchDAO();
    }
  }, [dao]);

  const handleProposalClick = (daoName, id) => {
    console.log("handleProposalClick", daoName, id);
    const proposal = daoData.proposals.find((proposal) => proposal.id === id);
    console.log(proposal);
    setSelectedProposal(proposal);
  };

  const handleCloseProposal = () => {
    setSelectedProposal(null);
  };

  console.log(Feed);
  console.log(ProposalProfile);

  return (
    <div>
      {selectedProposal ? (
        <ProposalProfile
          proposal={selectedProposal}
          onClose={handleCloseProposal}
        />
      ) : (
        daoData && <Feed dao={daoData} onProposalClick={handleProposalClick} />
      )}
    </div>
  );
}

export default Dao;
