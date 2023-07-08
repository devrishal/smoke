// pages/delegate/[id].js
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ProfilePage from "../../../components/Delegates/Profile";
import loadDAOModules from "../../dao/daoLoader";

function DelegateProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [delegate, setDelegate] = useState(null);

  useEffect(() => {
    const fetchDelegate = async () => {
      const daoList = await loadDAOModules();
      let foundDelegate = null;

      for (const dao of daoList) {
        const delegatesForDAO = await dao.getTopDelegates();

        foundDelegate = delegatesForDAO.find((delegate) => delegate.id === id);
        if (foundDelegate) break;
      }

      setDelegate(foundDelegate);
    };

    if (id) {
      fetchDelegate();
    } else {
      console.log("No ID found");
    }
  }, [id]);

  if (!id) {
    console.log("No ID found");
    return <p>No ID found</p>;
  }

  if (!delegate) {
    console.log("Delegate not found");
    return <p>Loading...</p>;
  }

  return <ProfilePage delegate={delegate} />;
}

export default DelegateProfile;
