import React from 'react';
import styles from '../../src/styles/components/ProtocolCard.module.css';

function ProtocolCard({ dao, onProtocolCardClick }) {
    const { name, proposals } = dao;
    const latestProposal = proposals.length > 0 ? proposals[0] : null;
  
    console.log("DAO object:", dao);
    
    return (
      <div className={styles.card} onClick={() => onProtocolCardClick(name)}>
        <h3>{name}</h3>
        {latestProposal && (
          <>
            <div>
              <strong>Latest Proposal ID:</strong> {latestProposal.id}
            </div>
            <div>
              <strong>Status:</strong> {latestProposal.status}
            </div>
          </>
        )}
      </div>
    );
  }
  

export default ProtocolCard;
  