import React, { useState, useEffect } from 'react';
import Feed from '../../../components/DAOs/Feed';
import loadDAOModules from '../../dao/daoLoader';
import { useRouter } from 'next/router';

function Dao() {
  const [dao, setDao] = useState(null);
  const router = useRouter();
  const { daoName } = router.query;

  useEffect(() => {
    const fetchDAO = async () => {
      const daoList = await loadDAOModules();
      const selectedDAO = daoList.find((d) => d.name === daoName);

      if (selectedDAO) {
        const proposals = await selectedDAO.getProposals();
        setDao({ ...selectedDAO, proposals });
      }
    };

    if (daoName) {
      fetchDAO();
    }
  }, [daoName]);

  const handleProposalClick = (proposal) => {
    router.push(`/proposal/${proposal.id}`);
  };

  return (
    <div>
      {dao && <Feed dao={dao} onProposalClick={handleProposalClick} />}
    </div>
  );
}

export default Dao;
