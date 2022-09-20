import React, { useContext } from "react";
import { useState } from "react";
import logo from "./logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
const Header = () => {
  let navigate = useNavigate();

  const { UserData, setUserData } = useContext(AuthContext);

  return (
    <>
      <div id="container">
        <div className="mini_1">
          <img
            src={logo}
            alt="masaischool"
            className="Img"
            onClick={() => {
              navigate("/home");
            }}
            style={{
              height: "50px",
              width: "200px",
              marginTop: "-15px",
              cursor: "pointer",
            }}
          />
        </div>
        <div className="mini_2">
          <div className="courses1"> </div>
          <div className="courses1"> </div>
          <div
            className="courses1"
            onClick={() => {
              if (UserData.isLogin === false) {
                navigate("/signup");
              } else if (UserData.isLogin === true) {
                navigate("/applications");
              }
            }}
          >
            {UserData.isLogin ? "MY APPLICATIONS" : "SIGN UP"}
          </div>
          <div
            className="courses1"
            onClick={() => {
              if (UserData.isLogin === false) {
                navigate("/login");
              }
            }}
          >
            {UserData.isLogin
              ? `${UserData.succ.username.toUpperCase()}`
              : "LOGIN"}
          </div>
          {UserData.isLogin && (
            <div
              className="courses1"
              onClick={() => {
                setUserData({ isLogin: false });
                navigate("/login");
              }}
            >
              LOGOUT
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
