import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID - the 5 scalar types.
// scalar is a descrete value. non-scalar, eg objects and arrays.

// type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
        hello(name: String): String!
        location: String!
        bio: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }

    type User {
        name: String!
        id: ID!
        email: String!
        age: Int
    }
`;

// resolvers - functions that run when operations are performed
const resolvers = {
  Query: {
    hello(blargs, args) {
      if (args.name) {
        return `hello there ${args.name}!`;
      }
      return "hello";
    },
    location() {
      return "sydney";
    },
    bio() {
      return "carbon based, mostly up eh";
    },
    age() {
      return 23;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("server is running");
});
