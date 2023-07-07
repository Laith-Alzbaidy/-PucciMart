import "./Post.css";
import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import Comment from "../Comment/Comment";
import { BiSolidCommentAdd } from "react-icons/bi";
function Post() {
  // Accessing the GetCurentId function from the Context
  const { GetCurentId } = useContext(Context);
  // Getting the current user ID
  const userId = GetCurentId();
  // State variables
  const [showInputPost, setShowInputPost] = useState(""); // State for showing input post
  const [contentPost, setContentPost] = useState(""); // State for post content
  const [currentUser, setCurrentUser] = useState({}); // State for current user
  const [postList, setPostList] = useState([]); // State for user's posts
  const [AllPost, setAllPost] = useState([]); // State for all posts
  const [updatenewPost, setnewUpdatePost] = useState(""); // State for updated post content
  const [comment, setComment] = useState(""); // State for comment content
  const [Allcomment, setAllComment] = useState([]); // State for all comments

  useEffect(() => {
    // Fetch user data if the user ID is valid
    if (userId >= 1) {
      getUser();
    }
  }, []);

  const currenttime = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  });

  const getAllPosts = () => {
    // Fetch all posts from the server
    axios.get("http://localhost:9000/AllPost").then((response) => {
      setAllPost(response.data);
    });
  };

  const getUser = () => {
    // Fetch user data based on the user ID
    axios.get(`http://localhost:9000/Users/${userId}`).then((response) => {
      setCurrentUser(response.data);
      setPostList(response.data.posts);
    });
  };

  const sendPost = () => {
    // Create a new post object
    const newPost = {
      image: currentUser.image,
      content: contentPost,
      date: currenttime,
      name: currentUser.username,
      comment: [],
    };

    // Update the user's posts with the new post
    const updatedPosts = [...postList, newPost];
    setPostList(updatedPosts);

    // Update the user's posts on the server
    axios
      .put(`http://localhost:9000/Users/${userId}`, {
        ...currentUser,
        posts: updatedPosts,
      })
      .then((response) => {
        console.log(response.data);
      });

    // Add the new post to the server's all posts
    axios.post("http://localhost:9000/AllPost", newPost).then((response) => {
      console.log(response.data);
      getAllPosts();
    });

    // Clear the post content
    setContentPost("");
  };

  const handleContentPostChange = (event) => {
    // Update the post content as the user types
    setContentPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPost();
  };

  useEffect(() => {
    // Fetch all posts when the component mounts
    getAllPosts();
  }, []);

  const Delete = (id) => {
    // Remove the post from the server's all posts
    const updatedPosts = AllPost.filter((item) => item.id !== id);

    axios.delete(`http://localhost:9000/AllPost/${id}`).then((response) => {
      console.log(response.data);
    });

    // Update the user's posts without the deleted post
    axios.put(`http://localhost:9000/Users/${userId}`, {
      ...currentUser,
      posts: updatedPosts,
    });
    setAllPost(updatedPosts);
  };

  const getValuePost = (event) => {
    // Update the new post content when editing
    const value = event.target.value;
    setnewUpdatePost(value);
  };

  const show = (id) => {
    // Show the input field for editing a post
    setShowInputPost(id);
  };

  const getVcomment = (event) => {
    // Update the comment content as the user types
    const value = event.target.value;
    setComment(value);
  };

  const AddComment = (id) => {
    // Create a new comment object
    const newComment = {
      user: currentUser.username,
      content: comment,
      image: currentUser.image,
    };

    // Fetch the post data to add the comment
    axios.get(`http://localhost:9000/AllPost/${id}`).then((response) => {
      // Update the post with the new comment
      const updatedPost = {
        ...response.data,
        comment: [...response.data.comment, newComment],
      };

      // Update the post on the server
      axios
        .put(`http://localhost:9000/AllPost/${id}`, updatedPost)
        .then((response) => {
          console.log("dataComment", response.data.comment);
          setAllComment(response.data.comment);
          getAllPosts();
        });
    });
    setComment("");
  };

  const Edit = (id, newContent) => {
    // Update the post content when editing
    const updatedAllPost = AllPost.map((post) => {
      if (post.id === id) {
        return { ...post, content: newContent };
      }
      return post;
    });

    setAllPost(updatedAllPost);

    // Update the post on the serverNAMEF
    axios
      .put(`http://localhost:9000/AllPost/${id}`, {
        ...AllPost.find((post) => post.id === id),
        content: newContent,
      })
      .then((response) => {
        console.log(response.data);
      });

    setShowInputPost("");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <section className="post">
          <header className="TitlePostHeaader">Create Post</header>
          <form onSubmit={handleSubmit}>
            <dsiv className="content">
              <img src={currentUser.image} alt="logo" />
              <h2>{currentUser.username}</h2>
              {console.log(currentUser.image)}
            </dsiv>
            <textarea
              placeholder="What's on your mind, CodingNepal?"
              spellCheck="false"
              required
              value={contentPost}
              onChange={handleContentPostChange}
            ></textarea>
            <div className="options">
              <p>Add to Your Post</p>
              <ul className="list">
                <li>
                  <i className="fas fa-image"></i>
                </li>
                <li>
                  <i className="fas fa-video"></i>
                </li>
              </ul>
            </div>
            <button type="submit">Post</button>
          </form>
        </section>

        <div className="post-box">
          {AllPost.map((post, index) => (
            <div key={index} className="post-item">
              <div className="post-content">
                <div className=".CommentValue">
                  <img src={post.image} alt="logo" />
                  <h2>{post.name}</h2>
                </div>
                {post.name === currentUser.username && (
                  <>
                    <div className="Icon-mange">
                      <i
                        class="fa-solid fa-trash"
                        onClick={() => Delete(post.id)}
                      ></i>

                      <i class="fas fa-edit" onClick={() => show(post.id)}></i>
                    </div>
                  </>
                )}
                {showInputPost === post.id && (
                  <>
                    <div className="edit-post-mange">
                      <input type="text" onChange={getValuePost} />
                      <button onClick={() => Edit(post.id, updatenewPost)}>
                        Add
                      </button>
                      <i class="fa-solid fa-message-plus"></i>
                    </div>
                  </>
                )}
                <div>
                  <span>{post.date}</span>
                </div>
              </div>
              <p>{post.content}</p>

              {post.comment.map((comment) => {
                return (
                  <>
                    <Comment
                      content={comment.content}
                      name={comment.user}
                      image={comment.image}
                    />
                  </>
                );
              })}
              <div className="CommentValue">
                <input
                  type="text"
                  placeholder="Comment"
                  onChange={getVcomment}
                />

                <BiSolidCommentAdd onClick={() => AddComment(post.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
