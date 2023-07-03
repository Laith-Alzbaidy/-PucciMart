// import "./Post.css";
// import React, { useContext, useEffect, useState } from "react";
// import Context from "../Context/Context";
// import axios from "axios";
// import Comment from "../Comment/Comment";

// function Post() {
//   const { GetCurentId } = useContext(Context);
//   const userId = GetCurentId();
//   const [showInputPost, setShowInputPost] = useState(false);
//   const [contentPost, setContentPost] = useState("");
//   const [currentUser, setCurrentUser] = useState({});
//   const [postList, setPostList] = useState([]);
//   const [AllPost, setAllPost] = useState([]);
//   const [updatenewPost, setnewUpdatePost] = useState([]);
//   const [comment, setComment] = useState("");

//   useEffect(() => {
//     if (userId >= 1) {
//       getUser();
//     }
//   }, [userId]); // Only trigger the effect when userId changes

//   const currenttime = new Date().toLocaleString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     month: "short",
//   });

//   const getAllPosts = () => {
//     axios.get("http://localhost:9000/AllPost").then((response) => {
//       // console.log(response.data);
//       setAllPost(response.data);
//     });
//   };

//   const getUser = () => {
//     axios.get(`http://localhost:9000/Users/${userId}`).then((response) => {
//       // console.log(response.data.posts);
//       setCurrentUser(response.data);
//       setPostList(response.data.posts);
//     });
//   };

//   const sendPost = () => {
//     const newPost = {
//       content: contentPost,
//       date: currenttime,
//       name: currentUser.username,
//     };

//     const updatedPosts = [...postList, newPost];
//     setPostList(updatedPosts);

//     axios
//       .put(`http://localhost:9000/Users/${userId}`, {
//         ...currentUser,
//         posts: updatedPosts,
//       })
//       .then((response) => {
//         console.log(response.data);
//         console.log("Post", response.data);
//       });

//     axios.post("http://localhost:9000/AllPost", newPost).then((response) => {
//       console.log(response.data);
//       getAllPosts();
//     });

//     setContentPost(""); // Clear the content after posting
//   };

//   const handleContentPostChange = (event) => {
//     setContentPost(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     sendPost();
//   };

//   useEffect(() => {
//     getAllPosts();
//   }, []);

//   const Delete = (id) => {
//     // console.log("", AllPost);
//     const updatedPosts = AllPost.filter((item) => item.id !== id);
//     // console.log("newArray", updatedPosts);

//     axios.delete(`http://localhost:9000/AllPost/${id}`).then((respons) => {
//       // console.log(respons.data);
//     });

//     axios.put(`http://localhost:9000/Users/${userId}`, {
//       ...currentUser,
//       posts: updatedPosts,
//     });
//     setAllPost(updatedPosts);
//   };

//   const getValuePost = (event) => {
//     const value = event.target.value;
//     setnewUpdatePost(value);
//   };

//   const show = () => {
//     setShowInputPost(!showInputPost);
//     console.log(showInputPost);
//   };
//   const Edit = (id, updatenewPost) => {
//     // const updatedPostList = AllPost.map((post) => {
//     //   if (post.id === id) {
//     //     return { ...post, updatenewPost }; // Modify the updatenewPost property
//     //   }
//     //   return post;
//     // });

//     setAllPost(updatedPostList);
//     axios.put(`http://localhost:9000/AllPost/${id}`, {
//       updatenewPost, // Update the request payload with updatenewPost
//     });
//   };
//   return (
//     <div className="container">
//       <div className="wrapper">
//         <section className="post">
//           <header className="TitlePostHeaader">Create Post</header>
//           <form onSubmit={handleSubmit}>
//             <div className="content">
//               <img
//                 src="https://img.freepik.com/free-icon/user_318-159711.jpg"
//                 alt="logo"
//               />
//               <h2>{currentUser.username}</h2> {/* Display user's name */}
//             </div>
//             <textarea
//               placeholder="What's on your mind, CodingNepal?"
//               spellCheck="false"
//               required
//               value={contentPost} // Bind the value of the textarea to the state
//               onChange={handleContentPostChange}
//             ></textarea>
//             <div className="options">
//               <p>Add to Your Post</p>
//               <ul className="list">
//                 <li>
//                   <i className="fas fa-image"></i>
//                 </li>
//                 <li>
//                   <i className="fas fa-video"></i>
//                 </li>
//               </ul>
//             </div>
//             <button type="submit">Post</button>
//           </form>
//         </section>

//         <div className="post-box">
//           {AllPost.map((post, index) => (
//             <div key={index} className="post-item">
//               <div className="post-content">
//                 <div className=".CommentValue">
//                   <img
//                     src="https://img.freepik.com/free-icon/user_318-159711.jpg"
//                     alt="logo"
//                   />
//                   <h2>{post.name}</h2>
//                 </div>
//                 {post.name === currentUser.username && (
//                   <>
//                     <button onClick={() => Delete(post.id)}>Delete</button>
//                     {/* <button onClick={() => Edit(post.id)}>edit</button> */}
//                     <button onClick={show}>edit</button>
//                     {showInputPost && (
//                       <>
//                         <input type="text" onChange={getValuePost} />
//                         <button onClick={() => Edit(post.id, updatenewPost)}>
//                           add
//                         </button>
//                       </>
//                     )}
//                     {/* <button onClick={Delete}>Delete</button> */}
//                   </>
//                 )}

//                 <div>
//                   <span>{post.date}</span>
//                 </div>
//               </div>
//               <p>{post.content}</p>

//               <div className="CommentValue">
//                 <input type="text" placeholder="Comment" />
//                 <button>Add </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;
import "./Post.css";
import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import Comment from "../Comment/Comment";

function Post() {
  const { GetCurentId } = useContext(Context);
  const userId = GetCurentId();
  const [showInputPost, setShowInputPost] = useState(false);
  const [contentPost, setContentPost] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [postList, setPostList] = useState([]);
  const [AllPost, setAllPost] = useState([]);
  const [updatenewPost, setnewUpdatePost] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (userId >= 1) {
      getUser();
    }
  }, [userId]); // Only trigger the effect when userId changes

  const currenttime = new Date().toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  });

  const getAllPosts = () => {
    axios.get("http://localhost:9000/AllPost").then((response) => {
      // console.log(response.data);
      setAllPost(response.data);
    });
  };

  const getUser = () => {
    axios.get(`http://localhost:9000/Users/${userId}`).then((response) => {
      // console.log(response.data.posts);
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
        console.log("Post", response.data);
      });

    axios.post("http://localhost:9000/AllPost", newPost).then((response) => {
      console.log(response.data);
      getAllPosts();
    });

    setContentPost(""); // Clear the content after posting
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
    // console.log("", AllPost);
    const updatedPosts = AllPost.filter((item) => item.id !== id);
    // console.log("newArray", updatedPosts);

    axios.delete(`http://localhost:9000/AllPost/${id}`).then((respons) => {
      // console.log(respons.data);
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

  const show = () => {
    setShowInputPost(!showInputPost);
    console.log(showInputPost);
  };
  // const Edit = (id, updatenewPost) => {
  //   // const updatedPostList = AllPost.map((post) => {
  //   //   if (post.id === id) {
  //   //     return { ...post, updatenewPost }; // Modify the updatenewPost property
  //   //   }
  //   //   return post;
  //   // });

  //   setAllPost(updatedPostList);
  //   axios.put(`http://localhost:9000/AllPost/${id}`, {
  //     updatenewPost, // Update the request payload with updatenewPost
  //   });
  // };
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
              <h2>{currentUser.username}</h2> {/* Display user's name */}
            </div>
            <textarea
              placeholder="What's on your mind, CodingNepal?"
              spellCheck="false"
              required
              value={contentPost} // Bind the value of the textarea to the state
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
                    {/* <button onClick={() => Edit(post.id)}>edit</button> */}
                    <button onClick={show}>edit</button>
                    {showInputPost && (
                      <>
                        <input type="text" onChange={getValuePost} />
                        <button onClick={() => Edit(post.id, updatenewPost)}>
                          add
                        </button>
                      </>
                    )}
                    {/* <button onClick={Delete}>Delete</button> */}
                  </>
                )}

                <div>
                  <span>{post.date}</span>
                </div>
              </div>
              <p>{post.content}</p>

              <div className="CommentValue">
                <input type="text" placeholder="Comment" />
                <button>Add </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
