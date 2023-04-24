// Profile.js
import React, { useState } from 'react';
import DelegateInfo from './DelegateInfo';
import VotingHistoryTable from './VotingHistory';
import SubmittedProposalsTable from './SubmittedProposals';

function ProfilePage({ delegate }) {
  const [delegateInfo, setDelegateInfo] = useState(delegate);

  const handleENSNameChange = (newENSName) => {
    setDelegateInfo({ ...delegateInfo, ensName: newENSName });
  };

  const handleBioChange = (newBio) => {
    setDelegateInfo({ ...delegateInfo, bio: newBio });
  };

  return (
    <div>
      <DelegateInfo
        delegate={delegateInfo}
        onENSNameChange={handleENSNameChange}
        onBioChange={handleBioChange}
      />
      <VotingHistoryTable votingHistory={delegateInfo.votingHistory} />
      <SubmittedProposalsTable submittedProposals={delegateInfo.proposals} />
    </div>
  );
}

export default ProfilePage;
