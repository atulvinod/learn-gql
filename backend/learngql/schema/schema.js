/**
 * A schema file describes the graphql types and their relations
 */
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLObjectType
        },
        genre: {
            type: GraphQLObjectType
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLObjectType
        },
        age: {
            type: GraphQLInt
        }
    })
});

// The entrypoint into our graph in order to perform query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // this field will be used to query from the frontend
        // hence this field name should be correct.
        // This particular query implies that we will query for the book type and will expect 'args' as well, 
        // in this case, args will be of 'id'
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // this function is responsible for getting data from the database
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})