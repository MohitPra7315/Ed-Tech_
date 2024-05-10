import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getLogin } from "../../../services/operations/authAPI";
import TextField from "@mui/material/TextField";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hidden, setHidden] = useState(false);

  function toggleVisibility() {
    setHidden((prev) => !prev);
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getLogin(formData.email, formData.password, navigate));
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 mt-6">
      <TextField
        label="Email Address *"
        variant="outlined"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        name="email"
        id="email"
        placeholder="Enter email address"
      />

      <TextField
        label="Password *"
        variant="outlined"
        fullWidth
        type={hidden ? "password" : "text"}
        value={formData.password}
        onChange={handleChange}
        name="password"
        id="password"
        placeholder="Password"
        InputProps={{
          endAdornment: (
            <span style={{ cursor: "pointer" }} onClick={toggleVisibility}>
              {hidden ? (
                <AiOutlineEyeInvisible fontSize={18} fill="#718096" />
              ) : (
                <AiOutlineEye fontSize={18} fill="#718096" />
              )}
            </span>
          ),
        }}
      />

      <Link to="/forgot-password">
        <p className="text-vistuatBlue-500 text-xs -mt-4 ml-auto">
          Forgot password?
        </p>
      </Link>

      <button className="w-full bg-yellow-400 text-white h-10 rounded-md font-semibold hover:bg-yellow-500 transition duration-300">
        Login
      </button>
    </form>
  );
}
