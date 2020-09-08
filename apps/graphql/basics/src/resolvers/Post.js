const Post = {
  // new root property on resolvers
  // matches the type of "Post"
  author(parent, args, { db }, info) {
    // this is a resolver method, it is called when non-scalar type is encountered
    // return correct author for post
    // post information lives on parent object, eg parent.id, parent.author
    return db.users.find((user) => user.id === parent.author);
  },

  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => parent.id === comment.post);
  },
};

export default Post;
