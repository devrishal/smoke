// Table.js
import React from 'react';

function Table({ headers, rows }) {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Table;
