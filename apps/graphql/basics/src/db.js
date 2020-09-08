// String, Boolean, Int, Float, ID - the 5 scalar types.
// scalar is a descrete value. non-scalar, eg objects and arrays.

// demo user data
const comments = [
  { id: "11", post: "1", author: "1", text: "first comment" },
  { id: "19", post: "1", author: "2", text: "second comment on first post" },
  { id: "12", post: "2", author: "3", text: "second comment" },
  { id: "13", post: "4", author: "1", text: "third comment" },
  { id: "14", post: "5", author: "2", text: "fourth comment" },
];

const users = [
  { id: "1", name: "justin", email: "blarg@blarg.com" },
  { id: "2", name: "bacon", age: 28, email: "kevin@gmail.com" },
  { id: "3", name: "gwen", age: 30, email: "stefani99@gmail.com" },
];

const posts = [
  {
    id: "1",
    title: "a post",
    body: "nothing too interesting",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "another post",
    body: "bit better",
    published: false,
    author: "2",
  },
  {
    id: "4",
    title: "yet another post",
    body: "ho hum",
    published: true,
    author: "3",
  },
  {
    id: "5",
    title: "last post",
    body: "old body",
    published: true,
    author: "2",
  },
];
const db = { comments, users, posts };
export default db;
