// require('@babel/register');
// require('@babel/polyfill');
// require('./server');
// import express from 'express'
// import { graphql, buildSchema } from 'graphql'
// import graphqlHTTP from 'express-graphql'
// import cors from 'cors'

const express = require('express')
const { graphql, buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const _ = require('lodash')
const Eos = require('eosjs');
const RecentBlock = require('./recentBlock')

const eos = Eos.Localnet();

const schema = buildSchema(`
  type Query {
    getRecentBlock: RecentBlock
  }

  type RecentBlock {
    id: String
    action_cnt: Int!
    timestamp: String
    block_num: Int
  }
`)

const rootValue = {
  getRecentBlock: async () => {
    const blockNum = (await eos.getInfo({})).head_block_num;
    const { id, transactions, timestamp, block_num } = await eos.getBlock(blockNum);
    return new RecentBlock(id, _.size(transactions), timestamp, block_num)
  },
}

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))
app.listen(4000, () => console.log('Listening on 4000'))
