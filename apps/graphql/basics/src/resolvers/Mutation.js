import { v4 } from "uuid";

const Mutation = {
  createComment(parent, { data }, { db, pubsub }, info) {
    const { text, post, author } = data;
    if (!text || text.length < 1) throw new Error("Comment must contain text");

    const hasPost = db.posts.some(
      (postt) => postt.id === post && postt.published
    );
    const hasAuthor = db.users.some((user) => user.id === author);

    if (!hasAuthor) throw new Error("Unable to find user.");
    if (!hasPost) throw new Error("Unable to find post.");

    const id = v4();
    const comment = {
      ...data,
      id,
    };

    db.comments.push(comment);
    console.log(`comment ${post} ------------------`);
    pubsub.publish(`comment ${post}`, { comment });

    console.log("Comment created with id: ", id);

    return comment;
  },

  deleteComment(parent, { id }, { db }, info) {
    console.log(`Deleting comment with id ${id}`);
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1)
      throw new Error(`Could not find comment with id ${id}`);

    const deletedComment = db.comments.splice(commentIndex, 1);
    // pubsub.publish("comment", deletedComment);
    return deletedComment[0];
  },

  updateComment(parent, { id, data }, { db }, info) {
    console.log("Updating comment");
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) throw new Error("Comment not found");

    if (data.text) {
      comment.text = data.text;
    }

    // pubsub.publish("comment", comment);

    return comment;
  },

  createPost(parent, { data }, { db, pubsub }, info) {
    const { title, body, published, author } = data;
    const userExists = db.users.some((user) => user.id === author);
    if (!userExists) {
      throw new Error("User does not exist");
    }

    const id = v4();
    const post = {
      ...data,
      id,
    };

    db.posts.push(post);
    console.log("post created: ", id);

    if (post.published) {
      pubsub.publish(`new posts`, { post });
    }
    return post;
  },

  deletePost(parent, { id }, { db }, info) {
    console.log(`Deleting post with id ${id}`);

    const postIndex = db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1)
      throw new Error(`Could not find post with id of ${id}`);
    const deletedPost = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => {
      return comment.post !== id;
    });

    return deletedPost[0];
  },

  updatePost(parent, { id, data }, { db }, info) {
    console.log("Updating Post", info);
    const post = db.posts.find((post) => post.id === id);

    if (!post) throw new Error("Post not found");

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }

    if (typeof data.published === "boolean") {
      post.published = data.published;
    }

    if (typeof data.author !== "undefined") {
      post.author = data.author;
    }

    return post;
  },

  createUser(parent, { data }, { db }, info) {
    const { name, email, age } = data;

    // see if email is unique
    const emailTaken = db.users.some((user) => user.email === email);
    if (emailTaken) throw new Error("email is already taken");

    const user = {
      ...data,
      id: v4(),
    };

    db.users.push(user);
    return user;
  },

  deleteUser(parent, { id }, { db }, info) {
    console.log("Deleting user", id);

    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error(`User with id ${id} does not exist`);

    const deletedUser = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      // also delete comments related to posts
      const match = post.author === id;

      if (match) {
        // if this is a match, then delete it's comments
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== id);

    return deletedUser[0];
  },

  updateUser(parent, { id, data }, { db }, info) {
    console.log("Updaing user");
    const user = db.users.find((user) => user.id === id);

    if (!user) throw new Error("User not found");

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);
      // if the users email === the new value, then don't throw
      const thisIsMyEmail = user.email === data.email;
      if (emailTaken && !thisIsMyEmail) {
        throw new Error("This email is taken");
      }
      user.email = data.email;
    }

    if (typeof data.name === "string" && data.name.length > 0) {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
};

export default Mutation;
