import './App.css';
import React from 'react';

const axios = require('axios');


function App() {
  const [domains, setDomains] = React.useState([]);
  const [domainsLoaded, setDomainsLoaded] = React.useState(false);

  React.useEffect(() => {
    if(!domainsLoaded){
      axios.get('/domain').then((res) => {        
        setDomains(res.data)
        setDomainsLoaded(true);
      });
    }
  }, [domainsLoaded, setDomainsLoaded]);

  

  return (
    <div className="App">
      <header className="App-header">
        XEPELIN    
      </header>
      {domains.map((x, i) => {
        return (
          <h1 key={i}>{x}</h1>
        )
      })}
    </div>
  );
}

export default App;
