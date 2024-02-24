import fs from 'fs';
import {ApolloServer, BaseContext} from '@apollo/server';
import {startStandaloneServer} from "@apollo/server/standalone";
import {AppDataSource} from "./data-source";
import {resolvers} from "./resolver";

const typeDefs = fs.readFileSync('./schema.graphql', 'utf-8');

AppDataSource.initialize()
    .then(async () => {
        console.log("Db is Connected");
    })
    .catch(error => console.log(error));



const server: ApolloServer<BaseContext> = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer = async() :Promise<void> => { await startStandaloneServer(server,{
    listen:{port:4000}
})};

startServer();
