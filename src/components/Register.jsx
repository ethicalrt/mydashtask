import "../css/Register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  validateEmail,
  validateNumber,
  validatePassword,
} from "../utils/utils";
function Register() {
  let navigator = useNavigate();

  const [validatedEmail, setValidatedEmail] = useState();
  const [validatedNumber, setValidatedNumber] = useState();
  const [validatedPass, setValidatedPass] = useState();

  const handleSubmit = (e) => {
    e?.preventDefault();

    setValidatedEmail(validateEmail(userData?.email));
    setValidatedNumber(validateNumber(userData?.phone));
    setValidatedPass(validatePassword(userData?.password, userData?.cpassword));

    if (
      validateEmail(userData?.email) === true &&
      validateNumber(userData?.phone) === true &&
      validatePassword(userData?.password, userData?.cpassword) === true
    ) {
      navigator("dashboard");
    }
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    cpassword: "",
    fname: "",
    phone: "",
    tc: "",
  });
  return (
    <div className="container">
      <div className="container_image">
        <img src="/dashbgr.png" alt="Register Image" />
        <div className="content">
          <p className="content_heading">Choose A Date Range</p>
          <p className="content_context">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            provident cumque, fugit qui sunt aperiam
          </p>
        </div>
      </div>
      <div className="container_form">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          method="post"
        >
          <p className="form_heading">Create an account</p>

          <div className="form_email">
            <label className="">Your email address</label>
            <input
              type="email"
              className=""
              name="email"
              value={userData?.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="">
              {validatedEmail === true ? "" : validatedEmail}
            </span>
          </div>
          <div className="form_pass">
            <label className="">Your password</label>
            <input
              type="password"
              className=""
              name="password"
              value={userData?.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="">
              {validatedPass === true ? "" : validatedPass}
            </span>
          </div>
          <div className="form_cpass">
            <label className="">Confirm your password</label>
            <input
              type="password"
              className=""
              name="cpassword"
              value={userData?.cpassword}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="">
              {validatedPass === true ? "" : validatedPass}
            </span>
          </div>
          <div className="form_fname">
            <label className="">Your full name</label>
            <input
              type="text"
              className=""
              name="fname"
              value={userData?.fname}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form_phn">
            <label className="">Your phone number</label>
            <input
              type="tel"
              className=""
              name="phone"
              value={userData?.phone}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="">
              {validatedNumber === true ? "" : validatedNumber}
            </span>
          </div>
          <div className="form_tc">
            <input
              type="checkbox"
              className="tc_checkbox"
              name="tc"
              value={userData?.tc}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label className="">I read and agree Terms and Conditions</label>
          </div>
          <button type="submit" className="">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
