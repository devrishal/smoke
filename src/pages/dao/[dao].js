// Dao.js
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import DAOContext from "../../contexts/DAOContext";
import Feed from "../../../components/DAOs/Feed";
import ProposalProfile from "../../../components/Proposals/ProposalProfile";

function Dao() {
  const daos = useContext(DAOContext);

  const [daoData, setDaoData] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null); // Add this line
  const router = useRouter();
  const { dao } = router.query;

  useEffect(() => {
    console.log("Dao useEffect [dao, daos] start");
    const start = Date.now();
    if (dao) {
      const selectedDAO = daos.find((d) => d.name === dao);
      if (selectedDAO) {
        setDaoData(selectedDAO);
      }
    }
    console.log("Dao useEffect [dao, daos] end", Date.now() - start);
  }, [dao, daos]);

  useEffect(() => {
    console.log("Dao useEffect [router] start");
    const start = Date.now();
    if (
      router.asPath.includes("proposal") &&
      router.state &&
      router.state.proposal
    ) {
      setSelectedProposal(router.state.proposal);
    }
    console.log("Dao useEffect [router] end", Date.now() - start);
  }, [router]);

  const handleProposalClick = async (daoName, id, proposal) => {
    console.log("handleProposalClick start");
    const start = Date.now();
    console.log(proposal);
    setSelectedProposal(proposal);
    console.log("handleProposalClick end", Date.now() - start);
  };

  const handleCloseProposal = () => {
    setSelectedProposal(null);
  };

  const handleBackClick = () => {
    setDaoData(null); // Set daoData to null to go back to the list of DAOs
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
            onBackClick={handleBackClick} // Pass handleBackClick as a prop
          />
        )
      )}
    </div>
  );
}

export default Dao;
