import "./Profile.css";
import Context from "../Context/Context";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Profile() {
  const { GetCurentId } = useContext(Context);

  const userId = GetCurentId();
  const [currentUser, setCurentUser] = useState([]);
  useEffect(() => {
    GetCurrentUser();
  }, []);

  const GetCurrentUser = () => {
    axios.get(`http://localhost:9000/users/${userId}`).then((respons) => {
      console.log(respons.data);
      setCurentUser(respons.data);
    });
  };

  return (
    <section className="profile">
      <div className="title-profile">
        <h1>Edit Profile</h1>
      </div>
      <form className="Form-profile" action="">
        <div className="Field-profile">
          <label>First Name</label>
          <input type="text" value="Full Name" />
        </div>
        <div className="Field-profile">
          <label>Last Name</label>
          <input type="text" value="Full Name" />
        </div>
        <div className="Field-profile">
          <label>User Name</label>
          <input type="text" value={currentUser.username} />
        </div>
        <div className="Field-profile">
          <label>Password</label>
          <input type="text" value={currentUser.password} />
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
      <div className="data-feedback">
        <h1>Yor Feedback</h1>

        <div className="Post">
          <div className="Comment">
            <p>
              <span>
                <b>Post:</b>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            </p>
          </div>
          <div className="OperationProfileFedback">
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
        <div className="Post">
          <div className="Comment">
            <p>
              <span>
                <b>Post:</b>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            </p>
          </div>
          <div className="OperationProfileFedback">
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
        <div className="Post">
          <div className="Comment">
            <p>
              <span>
                <b>Post:</b>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            </p>
          </div>
          <div className="OperationProfileFedback">
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
        <div className="Post">
          <div className="Comment">
            <p>
              <span>
                <b>Post:</b>
              </span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            </p>
          </div>
          <div className="OperationProfileFedback">
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
