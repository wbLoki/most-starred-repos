import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';




function App() {
  const [repos,setrepos] = useState([]);
  const get_data = async ()=> {
    const d = new Date();
    d.setMonth(d.getMonth()-1);
    var creationDate = d.toISOString().split('T')[0];
    var url = `https://api.github.com/search/repositories?q=created:>${creationDate}&sort=stars&order=desc`;
    const response = await fetch(url);  // Call API; Get data
    const data = await response.json();
    return setrepos(data.items);
    }
    useEffect( ()=>{
      get_data();
     },[])
  return (
    <div className="App App-header">

    {repos.map((repo, key) => <Card key={key} repo={repo}/>)}
    </div>
  );
}

export default App;