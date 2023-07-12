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
  const [contentPost, setContentPost] = useState(""); // State for post content
  const [currentUser, setCurrentUser] = useState({}); // State for current user
  const [postList, setPostList] = useState([]); // State for user's posts
  const [AllPost, setAllPost] = useState([]); // State for all posts
  const [updatenewPost, setnewUpdatePost] = useState(""); // State for updated post content
  const [comment, setComment] = useState(""); // State for comment content
  const [Allcomment, setAllComment] = useState([]); // State for all comments
  const [editingPostId, setEditingPostId] = useState(false); // State for the post being edited
  const [editing, setEditing] = useState(false); // State for tracking if editing is in progress

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

  const getAllPosts = async () => {
    try {
      // Fetch all posts from the server
      const response = await axios.get("http://localhost:9001/AllPost");
      setAllPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      // Fetch user data based on the user ID
      const response = await axios.get(`http://localhost:9001/Users/${userId}`);
      setCurrentUser(response.data);
      setPostList(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPost = async () => {
    try {
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
      await axios.put(`http://localhost:9001/Users/${userId}`, {
        ...currentUser,
        posts: updatedPosts,
      });

      // Add the new post to the server's all posts
      await axios.post("http://localhost:9001/AllPost", newPost);

      // Refresh all posts
      await getAllPosts();

      // Clear the post content
      setContentPost("");
    } catch (error) {
      console.log(error);
    }
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

  const Delete = async (id) => {
    try {
      // Remove the post from the server's all posts
      const updatedPosts = AllPost.filter((item) => item.id !== id);
      setAllPost(updatedPosts);

      await axios.delete(`http://localhost:9001/AllPost/${id}`);

      // Update the user's posts without the deleted post
      await axios.put(`http://localhost:9001/Users/${userId}`, {
        ...currentUser,
        posts: updatedPosts,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getValuePost = (event) => {
    // Update the new post content when editing
    const value = event.target.value;
    setnewUpdatePost(value);
  };

  const getVcomment = (event) => {
    // Update the comment content as the user types
    const value = event.target.value;
    setComment(value);
  };

  const AddComment = async (id) => {
    try {
      // Create a new comment object
      const newComment = {
        user: currentUser.username,
        content: comment,
        image: currentUser.image,
        date: currenttime,
      };

      // Fetch the post data to add the comment
      const response = await axios.get(`http://localhost:9001/AllPost/${id}`);

      // Update the post with the new comment
      const updatedPost = {
        ...response.data,
        comment: [...response.data.comment, newComment],
      };

      // Update the post on the server
      await axios.put(`http://localhost:9001/AllPost/${id}`, updatedPost);

      setComment("");

      // Refresh all posts
      await getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const Edit = async (id, newContent) => {
    try {
      // Update the post content when editing
      const updatedAllPost = AllPost.map((post) => {
        if (post.id === id) {
          return { ...post, content: newContent };
        }
        return post;
      });

      setAllPost(updatedAllPost);

      // Update the post on the server
      await axios.put(`http://localhost:9001/AllPost/${id}`, {
        ...AllPost.find((post) => post.id === id),
        content: newContent,
      });

      setEditingPostId(false);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setEditingPostId(false);
    setEditing(false);
    setnewUpdatePost(""); // Reset the updated post content
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
                        className="fa-solid fa-trash"
                        onClick={() => Delete(post.id)}
                      ></i>

                      <i
                        className="fas fa-edit"
                        onClick={() => {
                          setEditingPostId(post.id);
                          setnewUpdatePost(post.content);
                          setEditing(true);
                        }}
                      ></i>
                    </div>
                  </>
                )}
                {editingPostId === post.id ? (
                  <>
                    <div className="edit-post-mange">
                      <i className="fa-solid fa-message-plus"></i>
                    </div>
                  </>
                ) : (
                  <div>
                    <span>{post.date}</span>
                  </div>
                )}
              </div>
              {editingPostId === post.id ? (
                <div className="inputandiconedit">
                  <textarea
                    className="EditInput"
                    value={updatenewPost}
                    onChange={getValuePost}
                  ></textarea>
                  <button onClick={() => Edit(post.id, updatenewPost)}>
                    Add
                  </button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <p>{post.content}</p>
              )}

              {post.comment.map((comment) => {
                return (
                  <>
                    <Comment
                      content={comment.content}
                      name={comment.user}
                      image={comment.image}
                      date={comment.date}
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
