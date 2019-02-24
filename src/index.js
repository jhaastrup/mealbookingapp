/* eslint-disable import/prefer-default-export */
import express from 'express';
import bodyParser from 'body-parser';
import routers from './routes';

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', routers);

app.all('/', ((req, res) => {
  res.status(200).send({
    statusText: 'Ok',
    status: 200,
    message: 'Welcome to Book-A-Meal',
  });
}));

const port = process.env.PORT || 5160;

app.listen(port, () => {
  console.log(`Haastrup Joke is listening on port ${port}`);
});
