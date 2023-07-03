import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Context = createContext();
function Provider({ children }) {
  // const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [allproducts, setAllProduct] = useState([]);

  // const [CurrntUser, setCurentUser] = useState();

  // const userId = location.pathname.split("/")[1];

  const GetAllProducts = () => {
    axios.get("http://localhost:9000/products").then((response) => {
      setAllProduct(response.data);
      // console.log(response.data);
    });
  };
  // const GetAllPost = () => {
  //   axios.get("http://localhost:9000/products").then((response) => {
  //     setAllProduct(response.data);
  //     // console.log(response.data);
  //   });
  // };

  const GetCurentId = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[1];
    return userId;
  };

  const Getusers = () => {
    axios.get("http://localhost:9000/users").then((respons) => {
      setUsers(respons.data);
    });
  };

  function SetRegister(newAccount) {
    axios.post("http://localhost:9000/users/", newAccount);
  }
  useEffect(() => {
    Getusers();
    GetAllProducts();
  }, []);

  // const handlePost = (newPost) => {
  //   setPost([...post, { content: newPost }]);
  //   console.log(post);
  // };

  const Data = {
    users,
    SetRegister,
    GetCurentId,
    // setPost,
    // handlePost,
    allproducts,
    users,
    // CurrntUser,
    // setCurentUser,
  };

  return <Context.Provider value={Data}>{children}</Context.Provider>;
}

export default Context;
export { Provider };
