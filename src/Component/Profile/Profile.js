import "./Profile.css";
import Context from "../Context/Context";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { GetCurentId } = useContext(Context);
  const userId = GetCurentId();
  const [currentUser, setCurrentUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    GetCurrentUser();
  }, []);

  const GetCurrentUser = () => {
    axios
      .get(`http://localhost:9001/users/${userId}`)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        sendImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImage = async (file) => {
    try {
      const base64Image = await convertFileToBase64(file);

      const response = await axios.put(
        `http://localhost:9001/users/${userId}`,
        {
          ...currentUser,
          image: base64Image,
        }
      );
      setCurrentUser({ ...currentUser, image: response.data.image });
    } catch (error) {
      console.error(error);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="profile">
      <div className="title-profile">
        <h1>Edit Profile</h1>
      </div>
      <div className="image-container">
        <img src={currentUser.image} alt="Profile" />

        <label htmlFor="file-input">
          <i className="fas fa-edit"></i>
        </label>
        <input onChange={handleFileInputChange} id="file-input" type="file" />
      </div>
      <form className="Form-profile" action="">
        <div className="Field-profile">
          <label>First Name</label>
          <input type="text" value={currentUser.firstname} />
        </div>
        <div className="Field-profile">
          <label>Last Name</label>
          <input type="text" value={currentUser.lastname} />
        </div>
        <div className="Field-profile">
          <label>User Name</label>
          <input type="text" value={currentUser.username} />
        </div>
        <div className="Field-profile">
          <label>Password</label>
          <div className="container-Password">
            <i
              id="eyes"
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={toggleShowPassword}
            ></i>
            <input
              type={showPassword ? "text" : "password"}
              value={currentUser.password}
            />
          </div>
        </div>
        <div className="Field-profile">
          <label>Email</label>
          <input type="text" value={currentUser.email} />
        </div>
        <div className="Field-profile">
          <label>Gender</label>
          <input type="text" value={currentUser.gender} />
        </div>
      </form>
    </section>
  );
}

export default Profile;
