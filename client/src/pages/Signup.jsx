import React from "react";
import axios from "axios";
import { UserSignUp } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const Value = new FormData(event.currentTarget);
    axios
      .post(UserSignUp, {
        email: Value.get("email"),
        password: Value.get("password"),
        username: Value.get("name"),
        gender: Value.get("gender"),
      })
      .then((res) => {
         const notify = () => toast("Successfully created account");
         notify();
      })
      .catch((err) => {;
        const notify = () => toast("some thing went wrong try again");
        notify();
      });
  };
  return (
    <>
      <div className="DivCenter">
        <h4 style={{ color: "GrayText" }}>SIGNUP</h4>
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
              placeholder="User name"
              name="name"
            />
            <label for="floatingInput">USER NAME</label>
          </div>
          <label className="gap">GENDER</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="exampleRadios1"
              value="male"
              checked
            />
            <label className="form-check-label" for="exampleRadios1">
              MALE
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="exampleRadios2"
              value="female"
            />
            <label className="form-check-label" for="exampleRadios2">
              FEMALE
            </label>
          </div>
          <p></p>
          <div className="form-floating mb-3 flootingwidth ">
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

export default Signup;
