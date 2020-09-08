const User = {
  posts(parent, args, { db }, info) {
    // get posts when user info is requested
    return db.posts.filter((post) => post.author === parent.id);
  },

  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => comment.author === parent.id);
  },
};

export default User;
