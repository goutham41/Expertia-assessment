import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { GetCompanies, host } from "../utils/APIRoutes";
import { AuthContext } from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
   let navigate = useNavigate();
  const { UserData, setUserData } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    axios
      .get(`${host}/companies?page=${page}&limit=3`)
      .then((res) => {
        setMaxPage(Math.ceil(res.data.count / 3));
        setCompanies(res.data.succ);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  return (
    <>
      <div
        style={{
          width: "75%",
          display: "flex",
          justifyContent: "start",
          padding: "20px",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <span style={{ marginRight: "20px", marginTop: "4px" }}>
          PAGE NO : {page + 1}
        </span>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            if (page >= 1) {
              setPage(page - 1);
            }
          }}
        >
          PREVIOUS
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ marginLeft: "+60px" }}
          onClick={() => {
            if (page < maxPage - 1) {
              setPage(page + 1);
            }
          }}
        >
          NEXT
        </button>
      </div>

      <div style={{ width: "72%", margin: "auto" }}>
        {companies.map((elem,i) => {
          return (
            <>
              <div
                className="card border-dark mb-3"
                style={{ Width: "19rem", height: "auto" }}
                key={elem._id}
              >
                <div className="card-header" key={i}>
                  COMPANY NAME : {elem.company_name.toUpperCase()}
                </div>
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "70%" }}>
                    {" "}
                    <div className="card-body">
                      <h6 className="card-title">
                        ROLE : {elem.role.toUpperCase()}
                      </h6>
                      <span className="card-text">
                        PACKAGE : {elem.ctc} LPA
                      </span>
                      <br />
                      <span> LOCATION :</span>
                      <br />
                      {elem.location.map((ele) => {
                        return (
                          <>
                            <span style={{ marginLeft: "70px" }}> {ele}</span>
                            <br />
                          </>
                        );
                      })}
                      <br />
                      <span className="card-text">INTERVIEW PROCESS :</span>
                      <br />
                      {elem.process.map((ele) => {
                        return (
                          <>
                            <span style={{ marginLeft: "70px" }}> {ele}</span>
                            <br />
                          </>
                        );
                      })}
                      <span className="card-text">EXPERIENCE :</span>
                      <br />
                      {elem.experience.map((ele) => {
                        return (
                          <>
                            <span style={{ marginLeft: "70px" }}> {ele}</span>
                            <br />
                          </>
                        );
                      })}
                      <span className="card-text">DESCRIPTION :</span>
                      <br />
                      <p style={{ marginLeft: "70px",textAlign:"justify" }}>{elem.description}</p>
                      <span className="card-text">
                        {elem.additional_information
                          ? "ADDITIONAL INFORMATION :"
                          : " "}
                      </span>
                      <br />
                      <p style={{ marginLeft: "70px" }}>
                        {elem.additional_information}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "30%",
                    }}
                  >
                    <img
                      src={elem.logo}
                      alt=""
                      style={{
                        width: "120px",
                        height: "45px",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    />
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (UserData.isLogin) {
                          axios
                            .post(`${host}/applied`, {
                              company: { ...elem },
                              user_id: UserData.succ._id,
                              status: true,
                              company_id: elem._id,
                            })
                            .then((res) => {
                               const notify = () => toast(res.data.message);
                               notify();
                            })
                            .catch((err) => {
                               const notify = () => toast("error try after some time");
                               notify();
                            });
                        } else {
                           const notify = () => toast("Login and apply");
                           notify();
                          navigate("/login")
                        }
                      }}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
