import './App.css';
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const axios = require('axios');


function App() {
  const [domains, setDomains] = React.useState([]);
  const [domainsLoaded, setDomainsLoaded] = React.useState(false);
  const [url, setUrl] = React.useState('');


  React.useEffect(() => {
    if(!domainsLoaded){
      axios.get('/domain').then((res) => {        
        console.log(res);
        setDomains(res.data)
        setDomainsLoaded(true);
      });
    }
  }, [domainsLoaded, setDomainsLoaded]);

  const onClickDomain = (ev, domain) => {    
    alert('Dominio: ' + domain)
  }
  
  const shortUrlEv = (url) => {
    axios.post('/shortend', {url:url}).then(() => {
      alert('url guardada');
    })
  }

  return (
    <div className="App">   
      <List>
        {domains.map((x, i) => {
          return (
            <ListItem>
              <Button variant="contained" color="primary"  onClick={ev => onClickDomain(ev, x)} key={i}>{x}</Button>
            </ListItem>
          )
        })}
      </List>
      <Button onClick={shortUrlEv(url)}>Short Url</Button>
      <TextField onChange={setUrl}>Url</TextField>
    </div>
  );
}

export default App;
