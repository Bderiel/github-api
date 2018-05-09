import React from 'react';

const ResultItem = (props) => {
  const { name, owner, description, stargazers_count, license, fork, html_url } = props.repo;
  return (
    <div className="flex result-item">
      <div className="title">
        <p>
          <a href={owner.html_url}>{owner.login} /</a>
          <a href={html_url}> {name}</a>
        </p>
        <p>{description}</p>
      </div>
      <hr className="style-one hide" />
      <div className="stars">
        <p>STARS</p>
        <p>{stargazers_count}</p>
      </div>
      <div className="license">
        <p>LICENSE</p>
        <p>{license ? license.name : 'N/A'}</p>
      </div>
      <div className="fork">
        <p>FORK</p>
        <p>{fork.toString()}</p>
      </div>
    </div>
  );
};

export default ResultItem;
