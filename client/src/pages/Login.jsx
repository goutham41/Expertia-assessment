import React, { useContext } from "react";
import axios from "axios";
import { UserLogin } from "../utils/APIRoutes";
import { AuthContext } from "../components/Auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
    let navigate = useNavigate();
   const { UserData, setUserData } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const Value = new FormData(event.currentTarget);
    axios
      .post(UserLogin, {
        email: Value.get("email"),
        password: Value.get("password"),
      })
      .then((res) => {
        console.log(res.data);
        setUserData({isLogin:true,...res.data})
       navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setUserData({ isLogin: false});
      });
  };
  return (
    <>
      <div className="DivCenter">
        <h4 style={{ color: "GrayText" }}>LOGIN</h4>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3 flootingwidth">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="email address"
              name="email"
            />
            <label for="floatingInput">EMAIL ADDRESS</label>
          </div>

          <div className="form-floating mb-3 flootingwidth">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
              name="password"
            />
            <label for="floatingInput">PASSWORD</label>
          </div>
          <button className="btn btn-primary me-md-2" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
