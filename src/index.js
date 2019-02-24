import express from 'express';
import bodyParser from 'body-parser';
import routers from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', routers);

const port = process.env.PORT || 5160;

app.listen(port, () => {
  console.log(`Haastrup Joke is listening on port ${port}`);
});
