import React from "react";
import styles from "../../src/styles/components/ProposalCard.module.css";

function ProposalCard({ proposal, daoName, onProposalClick }) {
  const {
    id,
    description,
    startDate,
    endDate,
    status,
    votesFor,
    votesAgainst,
    dao,
  } = proposal;

  return (
    <div
      className={styles.card}
      onClick={() => onProposalClick(daoName, id, proposal)}
    >
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
          <strong>Votes For:</strong> {votesFor}
        </div>
        <div>
          <strong>Votes Against:</strong> {votesAgainst}
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;
