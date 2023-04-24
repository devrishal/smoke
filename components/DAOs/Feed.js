// Feed.js
import React from 'react';
import DelegateCard from './DelegateCard';
import ProposalCard from './ProposalCard';

function Feed({ delegates, proposals, onDelegateCardClick, onProposalClick }) {
    console.log('delegates:', delegates);
    console.log('proposals:', proposals);
    return (
        <div>
            <h2>Delegates</h2>
            <div>
                {delegates.map((delegate, index) => (
                    <DelegateCard key={index} delegate={delegate} onDelegateCardClick={onDelegateCardClick} />
                ))}
            </div>
            <h2>Proposals</h2>
            <div>
                {proposals.map((proposal, index) => (
                    <ProposalCard key={index} proposal={proposal} onProposalClick={onProposalClick} />
                ))}
            </div>
        </div>
    );
}
  
export default Feed;


