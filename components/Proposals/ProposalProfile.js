import React from 'react';

export function ProposalProfile({ proposal }) {
  console.log('ProposalProfile received proposal:', proposal);
  const { proposalId, description, startDate, endDate, status, forVotes, againstVotes, dao } = proposal;

  //TODO - Finish ProposalProfile component
  return (
    <div>
      <h1>{description}</h1>
    </div>
  );
}
