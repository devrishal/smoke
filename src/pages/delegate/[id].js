// pages/delegate/[id].js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProfilePage from '../../../components/Delegates/Profile';
import loadDAOModules from '../../dao/loader';

function DelegateProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [delegate, setDelegate] = useState(null);

  useEffect(() => {
    const fetchDelegate = async () => {
      console.log("Fetching delegate with ID:", id);
      const daoList = await loadDAOModules();
      let foundDelegate = null;
  
      for (const dao of daoList) {
        const delegatesForDAO = await dao.getTopDelegates();
  
        foundDelegate = delegatesForDAO.find((delegate) => delegate.id === id);
        if (foundDelegate) break;
      }
  
      if (foundDelegate) {
        console.log("Found delegate:", foundDelegate);
      } else {
        console.log("Delegate not found");
      }
  
      setDelegate(foundDelegate);
    };
  
    if (id) {
      console.log("ID found, fetching delegate");
      fetchDelegate();
    } else {
      console.log("No ID found");
    }
  }, [id]);

  if (!id) {
    console.log('No ID found');
    return <p>No ID found</p>;
  }

  if (!delegate) {
    console.log('Delegate not found');
    return <p>Loading...</p>;
  }

  return <ProfilePage delegate={delegate} />;
}

export default DelegateProfile;
