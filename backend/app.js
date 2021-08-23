const express = require('express');
const bodyParser = require('body-parser');
const store = require('data-store')({ path: process.cwd() + '/shortener.json' });
const shortid = require('shortid');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/domain', function(req, res){
    const data = store.data;
    const values = Object.values(data);
    const domains = [];
    values.forEach(element => {
        domains.push(element.domain);
    });
    res.json(domains);    
});

app.get('/:id', function (req, res) {
    const id = req.params.id;
    const data = store.get(id);    
    const resData = data ? data : {response: 'no data'};
  res.json(resData);
});

app.post('/shorten', function (req, res) {
  const url = req.body && req.body.url ? req.body.url : '';
  const data = store.data;
  let exist = false;
  let existId = '';
  const entries = Object.entries(data);

  entries.forEach(element => {
      if(element[1].url === url){
          exist = true;
          existId = element[0];
        }      
    });

    if(exist){
        res.send(existId).status(208);          
    }else{
        if(url === ''){
            res.send('empty url')
        }else{    
            const id = shortid.generate();
            store.set(id, {domain: url, url: url});
            res.status(201).send(id);
        }
    }
});

app.listen(3003, function () {
  console.log('express shortener url listening to port 3003');
});
