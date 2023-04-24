// VotingHistory.js
import React from 'react';
import { isUrl } from "../../src/lib/utils";
import Table from './Table';

function VotingHistory({ votingHistory }) {
  const headers = [
    'Protocol',
    'How They Voted',
    'Number of Votes Cast',
    'Proposal Description',
    'Start Date',
    'End Date',
    'Status',
    'For Votes',
    'Against Votes',
    'Link',
  ];

  const rows = (votingHistory || []).map((vote, index) => {
    const isDescriptionUrl = isUrl(vote.proposalDescription);
    const description = isDescriptionUrl ? 'N/A' : vote.proposalDescription;
    const link = isDescriptionUrl ? vote.proposalDescription : vote.url;

    return (
      <tr key={index}>
        <td>{vote.protocol}</td>
        <td>{vote.howTheyVoted}</td>
        <td>{vote.numberOfVotesCast}</td>
        <td>{description}</td>
        <td>{vote.startDate.toLocaleString()}</td>
        <td>{vote.endDate.toLocaleString()}</td>
        <td>{vote.status}</td>
        <td>{vote.forVotes}</td>
        <td>{vote.againstVotes}</td>
        <td><a href={link} target="_blank" rel="noreferrer">{link}</a></td>
      </tr>
    );
  });

  return (
    <div className="container">
      <h4>Voting History:</h4>
      <Table headers={headers} rows={rows} />
    </div>
  );
}

export default VotingHistory;
