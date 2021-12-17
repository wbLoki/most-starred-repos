import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import Card from "./Card/Card";
import CardList from "./CardList";
import loadingGif from "./loading.gif";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  function getDate() {
    // DATE TO GET REPOS
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    var creationDate = d.toISOString().split("T")[0];
    return creationDate;
  }
  const { repos, loading, hasMore } = CardList(pageNumber, getDate);
  const observer = useRef();

  const lastRepoRef = useCallback(
    // WHAT TO DO WHEN LAST ITEM IS VISIBLE
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(observer.current);
    },
    [loading, hasMore]
  );

  return (
    <div className="App App-header">
      {repos.map((repo, key, index) => {
        if (repos.length === key + 1) {
          return (
            <div key={key} ref={lastRepoRef}>
              <Card repo={repo} />
              {loading ? (
                <div>
                  <img src={loadingGif} alt="loading" />
                </div>
              ) : (
                <span></span>
              )}
            </div>
          );
        } else {
          return (
            <div key={key}>
              <Card repo={repo} />
            </div>
          );
        }
      })}
    </div>
  );
}

export default App;
