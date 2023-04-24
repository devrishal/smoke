// DelegateInfo.js
import React from 'react';
import styles from '../../src/styles/components/DelegateInfo.module.css';
import EditableField from './EditableField';
import DAOInfo from './DAOInfo';

function DelegateInfo({ delegate, onENSNameChange, onBioChange }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Delegate Information</h3>
      <div className={styles.infoItem}>ID: {delegate.id}</div>
      <div className={styles.infoItem}>
        ENS Name: {delegate.ensName} 
      </div>
      <div className={styles.infoItem}>Delegated Votes: {delegate.delegatedVotes}</div>
      <div className={styles.infoItem}>
        Bio: <EditableField defaultValue={delegate.bio} onSave={onBioChange} />
      </div>
      <h4>Protocols with delegation rights:</h4>
      <div className={styles.daoList}>
        {delegate.daos.map((dao, index) => (
          <DAOInfo key={index} dao={dao} />
        ))}
      </div>
    </div>
  );
}

export default DelegateInfo;
