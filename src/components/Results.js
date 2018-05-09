import React from 'react';

const Results = props => (
  <div className="results">
    <h3>SEARCH results:</h3>
    {props.children}
  </div>
);

export default Results;
