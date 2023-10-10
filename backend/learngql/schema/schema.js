/**
 * A schema file describes the graphql types and their relations
 */
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLObjectType
        },
        name: {
            type: GraphQLObjectType
        },
        genre: {
            type: GraphQLObjectType
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
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // this function is responsible for getting data from the database
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})