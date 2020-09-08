const Subscription = {
  post: {
    subscribe(parent, args, { pubsub }, info) {
      // if post is published
      return pubsub.asyncIterator("new posts");
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      // does post exist and is published
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );
      console.log(post);
      if (!post) throw new Error(`Can't find post`);

      // return an iterator matching name
      return pubsub.asyncIterator(`comment ${postId}`); // comment 44
    },
  },

  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count,
        });
      }, 1000);

      return pubsub.asyncIterator("count");
    },
  },
};

export { Subscription as default };
