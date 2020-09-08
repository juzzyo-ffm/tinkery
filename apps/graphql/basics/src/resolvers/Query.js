const Query = {
  comments(parent, { searchText }, { db }, info) {
    if (!searchText) return db.comments;

    //
    return db.comments;
  },

  posts(parent, { searchTitleAndBody }, { db }, info) {
    if (!searchTitleAndBody) return db.posts;

    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(searchTitleAndBody.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(searchTitleAndBody.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },

  users(parent, { searchName }, { db }, info) {
    if (!searchName) return db.users;

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
  },
};

export default Query;
