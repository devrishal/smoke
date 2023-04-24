//ProposalCard.js
import React from 'react';
import styles from '../../src/styles/components/ProposalCard.module.css';

function ProposalCard({ proposal, onProposalClick }) {
    const { id, description, startDate, endDate, status, forVotes, againstVotes, dao } = proposal;
  
    return (
    <div className={styles.card} onClick={() => onProposalClick(proposal)}>
      <div className={styles.cardSubtitle}>{`ID: ${id}`}</div>
      <div className={styles.cardDetails}>
        <div>
          <strong>DAO:</strong> {dao.name}
        </div>
        <div>
          <strong>Status:</strong> {status}
        </div>
        <div>
          <strong>Start Date:</strong> {startDate}
        </div>
        <div>
          <strong>End Date:</strong> {endDate}
        </div>
        <div>
          <strong>Votes For:</strong> {forVotes}
        </div>
        <div>
          <strong>Votes Against:</strong> {againstVotes}
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;
