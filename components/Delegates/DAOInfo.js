// DAOInfo.js
import React from 'react';

function DAOInfo({ dao }) {
  return (
    <div>
      <img src={dao.icon} alt={`${dao.name} logo`} />
      <a href={dao.url} target="_blank" rel="noreferrer">
        {dao.name}
      </a>
    </div>
  );
}

export default DAOInfo;
