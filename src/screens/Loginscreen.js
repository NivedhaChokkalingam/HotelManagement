import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);

      const { data } = await axios.post(`/api/users/login`, user);
      console.log("result", data);

      setloading(false);

      window.localStorage.setItem("currentUser", JSON.stringify(data));
      const niv = window.localStorage.getItem("currentUser");
      console.log(niv);

      window.location.href = `/home`;
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(true);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      <div className="row-justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid Credentials" />}

          <div className="bs">
            <b>
              <h2> Login</h2>
            </b>

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
