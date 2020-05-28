const {ApolloServer, PubSub} = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const {MONGO_DB} = require('./config')

const pubSub = new PubSub()

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubSub})
})

mongoose.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DB connected')
    return server.listen({port: PORT})
}).then(res => {
    console.log(`Server running on PORT ${res.url}`)
}).catch(err => {
    console.log(err)
})
