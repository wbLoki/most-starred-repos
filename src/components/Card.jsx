import React from "react";
import "../styles/components/Card.css";

function Card({ repo }) {
  const {
    owner,
    name,
    description,
    stargazers_count,
    open_issues_count,
    created_at,
  } = repo;

  const days = ( // HOW MANY days AGO REPO WAS CREATED
    new Date(new Date() - new Date(created_at)) / 86400000
  ).toFixed();
  return (
    <div className="card">
      <div className="avatar">
        <img className="img" src={owner.avatar_url} alt="avatar_img" />
      </div>
      <div className="card-info">
        <div className="repo-name">{name}</div>
        <div className="description small-text">{description}</div>
        <div className="details">
          <p className="stars info">Stars: {stargazers_count} </p>
          <p className="issues info">Issues: {open_issues_count} </p>
          <p className="date-issue small-text">
            Submitted {days} days ago by {owner.login}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
