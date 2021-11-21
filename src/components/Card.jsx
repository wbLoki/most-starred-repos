import React from 'react';
import './App.css';

function Card({repo}){
    const d = new Date(repo.created).toLocaleString();
    return(
        <div className="card">
            <div className="avatar">
                <img className="img" src={repo.owner.avatar_url} alt="avatar_img" />
                <p className="user">{repo.owner.login}</p>
            </div>
            <div className="card-info">
                <div className="top-card">
                    <h2 className="repo-name">{repo.name}</h2>
                </div>
                <div className="description">
                    <p className="description">{repo.description}</p>
                </div>
                <div className="details">
                    <p className="buttons"> {repo.stargazers_count} </p>
                    <p className="buttons"> {repo.open_issues_count} </p>
                    <p className="date-issue"> {d} </p>
                </div>
            </div>
        </div>
    );
}

export default Card;