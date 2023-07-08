import React from "react";
import styles from "../../src/styles/components/Profile.module.css";
import { useRouter } from "next/router";

const Profile = ({ tokenHolder, dao, onProtocolButtonClick }) => {
  const router = useRouter();

  const handleDAONavigate = (daoName) => {
    router.push(`/dao/${daoName}`);
  };

  console.log("tokenHolder", tokenHolder[0]);

  if (!tokenHolder || tokenHolder.length === 0) {
    return (
      <div className={styles.container}>
        <h3>You are not a token holder</h3>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Token Holder Information</h2>
        <p>
          <b>Address: {tokenHolder[0].id}</b>
        </p>
        <p>
          <b>Note:</b> User has tokens in the following DAOs. Click on 'Go to
          DAO' to view more details.
        </p>
        {tokenHolder.map((tokenHolderItem, index) => (
          <div key={index}>
            <h4>{dao[index].name}</h4>
            <button onClick={() => handleDAONavigate(dao[index].name)}>
              Go to DAO
            </button>
            {tokenHolderItem.delegate ? (
              <>
                <p>
                  <b>Delegate Address:</b> {tokenHolderItem.delegate.id}
                </p>
                <p>
                  <b>Delegated Votes:</b>{" "}
                  {tokenHolderItem.delegate.delegatedVotes}
                </p>
              </>
            ) : (
              <p>No delegates found for this token holder</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
