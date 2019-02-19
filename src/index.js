import express from 'express';

const app = express();

const port = process.env.PORT || 5160;

app.listen(port, () => {console.log(`Haastrup Joke is listening on port ${port}`)});
