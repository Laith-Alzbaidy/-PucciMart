import "./Post.css";
import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import Comment from "../Comment/Comment";

function Post() {
  const { GetCurentId } = useContext(Context);
  const userId = GetCurentId();
  const [showInputPost, setShowInputPost] = useState(""); // Updated to store post ID
  const [contentPost, setContentPost] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [postList, setPostList] = useState([]);
  const [AllPost, setAllPost] = useState([]);
  const [updatenewPost, setnewUpdatePost] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (userId >= 1) {
      getUser();
    }
  }, [userId]);

  const currenttime = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  });

  const getAllPosts = () => {
    axios.get("http://localhost:9000/AllPost").then((response) => {
      setAllPost(response.data);
    });
  };

  const getUser = () => {
    axios.get(`http://localhost:9000/Users/${userId}`).then((response) => {
      setCurrentUser(response.data);
      setPostList(response.data.posts);
    });
  };

  const sendPost = () => {
    const newPost = {
      content: contentPost,
      date: currenttime,
      name: currentUser.username,
      comment: [],
    };

    const updatedPosts = [...postList, newPost];
    setPostList(updatedPosts);

    axios
      .put(`http://localhost:9000/Users/${userId}`, {
        ...currentUser,
        posts: updatedPosts,
      })
      .then((response) => {
        console.log(response.data);
      });

    axios.post("http://localhost:9000/AllPost", newPost).then((response) => {
      console.log(response.data);
      getAllPosts();
    });

    setContentPost("");
  };

  const handleContentPostChange = (event) => {
    setContentPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPost();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const Delete = (id) => {
    const updatedPosts = AllPost.filter((item) => item.id !== id);

    axios.delete(`http://localhost:9000/AllPost/${id}`).then((respons) => {
      console.log(respons.data);
    });

    axios.put(`http://localhost:9000/Users/${userId}`, {
      ...currentUser,
      posts: updatedPosts,
    });
    setAllPost(updatedPosts);
  };

  const getValuePost = (event) => {
    const value = event.target.value;
    setnewUpdatePost(value);
  };

  const show = (id) => {
    setShowInputPost(id); // Set the ID of the post being edited
  };

  const getVcomment = (event) => {
    const value = event.target.value;
    setComment(value);
  };

  const AddComment = (id) => {
    const newComment = { user: currentUser.username, content: comment };

    axios.get(`http://localhost:9000/AllPost/${id}`).then((response) => {
      axios
        .put(`http://localhost:9000/AllPost/${id}`, {
          ...response.data,
          comment: [...response.data.comment, newComment],
        })
        .then((response) => {
          console.log("dataComment", response.data);
          getAllPosts();
        });
    });

    setComment("");
  };

  const Edit = (id, newContent) => {
    const updatedAllPost = AllPost.map((post) => {
      if (post.id === id) {
        return { ...post, content: newContent };
      }
      return post;
    });

    setAllPost(updatedAllPost);

    axios
      .put(`http://localhost:9000/AllPost/${id}`, {
        ...AllPost.find((post) => post.id === id),
        content: newContent,
      })
      .then((response) => {
        console.log(response.data);
      });

    setShowInputPost(""); // Reset the edited post ID to hide the input field
  };

  return (
    <div className="container">
      <div className="wrapper">
        <section className="post">
          <header className="TitlePostHeaader">Create Post</header>
          <form onSubmit={handleSubmit}>
            <div className="content">
              <img
                src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                alt="logo"
              />
              <h2>{currentUser.username}</h2>
            </div>
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
                  <img
                    src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                    alt="logo"
                  />
                  <h2>{post.name}</h2>
                </div>
                {post.name === currentUser.username && (
                  <>
                    <button onClick={() => Delete(post.id)}>Delete</button>
                    <button onClick={() => show(post.id)}>Edit</button>
                    {showInputPost === post.id && ( // Display the input field only for the post being edited
                      <>
                        <input type="text" onChange={getValuePost} />
                        <button onClick={() => Edit(post.id, updatenewPost)}>
                          Add
                        </button>
                      </>
                    )}
                  </>
                )}

                <div>
                  <span>{post.date}</span>
                </div>
              </div>
              <p>{post.content}</p>
              <div>
                <Comment />
              </div>
              <div className="CommentValue">
                <input
                  type="text"
                  placeholder="Comment"
                  onChange={getVcomment}
                />
                <button onClick={() => AddComment(post.id)}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
