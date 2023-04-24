// SubmittedProposals.js
import React from 'react';
import Table from './Table';

function SubmittedProposals({ submittedProposals }) {
  const headers = [
    'Proposal ID',
    'Description',
    'Start Date',
    'End Date',
    'Status',
    'For Votes',
    'Against Votes',
    'Link',
  ];

  const rows = (submittedProposals || []).map((proposal, index) => {
    const startDate = new Date(proposal.startBlock * 1000);
    const endDate = new Date(proposal.endBlock * 1000);

    return (
      <tr key={index}>
        <td>{proposal.id}</td>
        <td>{proposal.description}</td>
        <td>{startDate.toLocaleString()}</td>
        <td>{endDate.toLocaleString()}</td>
        <td>{proposal.status}</td>
        <td>{proposal.forCount}</td>
        <td>{proposal.againstCount}</td>
        <td><a href={proposal.url} target="_blank" rel="noreferrer">{proposal.url}</a></td>
      </tr>
    );
  });

  return (
    <div className="container">
      <h4>Submitted Proposals:</h4>
      <Table headers={headers} rows={rows} />
    </div>
  );
}

export default SubmittedProposals;