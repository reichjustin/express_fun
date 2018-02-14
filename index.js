const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.get('/test', (req,res) => res.send('hello'));

app.listen(4000);
