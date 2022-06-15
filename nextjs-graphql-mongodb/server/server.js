const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const mongoose = require("mongoose");

async function startServer(){
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app: app});

    app.use((req, res) => {
        res.send("Working");
    });

    await mongoose.connect("mongodb+srv://pleshkov2:asdqwe123@courseproject.w7sde.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");

    app.listen(9000, () => console.log("Server is up and running on port 9000"));
}

startServer();
