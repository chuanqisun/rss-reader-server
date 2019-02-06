const {isConnected} = require('./database/connection');
const {addSubscription, removeSubscription, getSubscriptions} = require('./database/model/subscription');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/subscription', async (req, res) => {
  const subs = await getSubscriptions();
  res.json(subs);
});

app.post('/api/subscription', jsonParser, async (req, res) => {
  const {title, url} = req.body;
  const result = await addSubscription({title, url});
  res.json(result);
});

app.delete('/api/subscription', jsonParser, async (req, res) => {
  const {id} = req.body;
  const result = await removeSubscription({id});
  res.json(result);
});

(async () => {
  await isConnected;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
})();
