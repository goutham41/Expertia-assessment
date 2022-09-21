import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Auth";
import { host } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Applications = () => {
  const { UserData, setUserData } = useContext(AuthContext);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(0);
  const [applied, setApplied] = useState([]);
  const [count1, setCount1] = useState(0);
  useEffect(() => {
    if (UserData.isLogin) {
      axios
        .get(`${host}/applied/${UserData.succ._id}?page=${page}&limit=3`)
        .then((res) => {
          setMaxPage(Math.ceil(10 / 3))
          if (res.data.succ.length >= 1) {
            setApplied(res.data.succ);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [page, count1]);

  return (
    <div>
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
      <div>
        {applied.map((elem, index) => {
          return (
            <>
              <div
                class="card"
                style={{ width: "60%", margin: "auto", marginTop: "20px" }}
              >
                <h5 class="card-header">
                  {index + 1} company name : {elem.company.company_name}
                </h5>
                <div class="card-body">
                  <span class="card-title">ROLE: {elem.company.role}</span>
                  <br />
                  <span>Package : {elem.company.ctc} CTC</span>
                  <br />
                  <span>Interview process:</span>
                  {elem.company.process.map((ele) => {
                    return (
                      <>
                        <span style={{ marginLeft: "30px" }}> {ele}</span>
                      </>
                    );
                  })}
                  <p></p>
                  {elem.status && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (UserData.isLogin) {
                          setCount1(count1 + 1);
                          axios
                            .delete(`${host}/applied/cancel/${elem._id}`)
                            .then((res) => {
                              const notify = () =>
                                toast("successfully cancelled");
                              notify();
                            })
                            .catch((err) => {
                              console.log(err);
                              const notify = () =>
                                toast("some thing went wrong try again");
                              notify();
                            });
                        }
                      }}
                    >
                      CANCEL PROCESS
                    </button>
                  )}
                  {!elem.status && (
                    <button
                      type="button"
                      class="btn btn-danger"
                      disabled
                      data-bs-toggle="button"
                    >
                      CANCELLED
                    </button>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Applications;
