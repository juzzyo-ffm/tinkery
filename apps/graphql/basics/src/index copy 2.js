import { GraphQLServer } from "graphql-yoga";

// String, Boolean, Int, Float, ID - the 5 scalar types.
// scalar is a descrete value. non-scalar, eg objects and arrays.

// type definitions (schema)
const typeDefs = `
    type Query {
        add(numbers: [Float]!): Float!
        grades: [Int]!
        greeting(name: String): String!
        me: User!
        post: Post!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
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
    add(parent, { numbers }, ctx, info) {
      if (numbers.length === 0) return 0;

      // 1, 5, 10, 2
      return numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    grades(parent, args, ctx, info) {
      return [1, 2, 3];
    },
    greeting(parent, { name }, ctx, info) {
      if (name) return `Hello there ${name}`;

      return "Greetings and salutations";
    },
    me() {
      return {
        id: "123lkj",
        name: "mike",
        email: "lkj@ljk.com",
        age: 233,
      };
    },
    post() {
      return {
        id: "post1",
        title: "first post wooo",
        body: "head shoulders knees and toes",
        published: true,
      };
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
