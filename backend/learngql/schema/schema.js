/**
 * A schema file describes the graphql types and their relations
 */

/**
 * Mutations in graphql is the way to add, delete edit data 
 */


const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const Book = require('../models/book')
const Author = require('../models/author')

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
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // here we can handle the nested request
                // the parent object will have the book object which is associated with the author
            }
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
        },
        books: {
            // to create one to many relation between author and book
            type: new GraphQLList(BookType),
            resolve(parent, args) {

            }
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
                // parent object is populated when a nested query is used and this object
                // can be used to construct the other parts of the request
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

            }
        },
        // to get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {

            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {

            }
        }
    }
})

// We create an object type to handle the mutations,
/**
 * To execute this mutation, we have to call
 * mutation {
 *  addAuthor(name:"Shwan",age:23) {
 *      name
 *      age
 *  }
 * }
 */
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            // args imply the data we expect to create the author
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            // args imply the data we expect to create the author
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})