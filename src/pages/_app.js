//app.js
import "@/styles/globals.css";
import DAOContext from "../contexts/DAOContext";
import { useState, useEffect } from "react";
import loadDAOModules from "../lib/dao/daoLoader";

export default function App({ Component, pageProps }) {
  const [daos, setDaos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDAOModules = async () => {
      setIsLoading(true);
      const daoList = await loadDAOModules();
      const daoListWithProposals = [];

      for (const dao of daoList) {
        const proposals = await dao.getProposals();
        daoListWithProposals.push({ ...dao, proposals });
      }

      setDaos(daoListWithProposals);
      setIsLoading(false);
    };

    fetchDAOModules();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DAOContext.Provider value={daos}>
      <Component {...pageProps} />
    </DAOContext.Provider>
  );
}
