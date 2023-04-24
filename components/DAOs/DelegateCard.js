//DelegateCard.js
import React from 'react';
import styles from '../../src/styles/components/DelegateCard.module.css';

function DelegateCard({ delegate, onDelegateCardClick }) {
    const { ensName, id, delegatedVotes, daos } = delegate;
  
    return (
    <div className={styles.card} onClick={() => onDelegateCardClick(delegate)}>
      <div className={styles.cardTitle}>{ensName || id}</div>
      <div className={styles.cardSubtitle}>{`Votes: ${delegatedVotes}`}</div>
      <div className={styles.cardDetails}>
        {daos.filter(dao => dao && dao.name).map((dao, index) => (
          <div key={index}>
            <strong>DAO:</strong> {dao.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DelegateCard;

