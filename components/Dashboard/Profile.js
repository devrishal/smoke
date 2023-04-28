import React from 'react';
import styles from '../../src/styles/components/Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src="/profile-pic.jpg" alt="Profile Picture" className={styles.picture} />
      </div>
      <div>
        <h3>List of Protocols</h3>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>Protocol 1</button>
        <button className={styles.button}>Protocol 2</button>
      </div>
    </div>
  );
};

export default Profile;
