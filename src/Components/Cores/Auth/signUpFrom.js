import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constant";
import { TabButton } from "../../Common/TabButton";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../../Slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import TextField from "@mui/material/TextField";
export function SignupForm() {
  const { signupData, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hidden, setHidden] = useState(true);
  const [Conhidden, setConhidden] = useState(true);
  const [accounttype, setAccounttype] = useState(ACCOUNT_TYPE.STUDENT);

  console.log("accountype", accounttype);
  function ConHiddenHandler() {
    setConhidden((prev) => !prev);
  }
  function hiddenHandler() {
    setHidden((prevd) => !prevd);
  }

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirm: "",
  });

  function changeHandler(event) {
    setFormData((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (formData.password != formData.confirm) {
      toast.error("Password dosn't Match");
      return;
    }

    const signUpData = {
      ...formData,
      accounttype,
    };
    // store data in Slices of SignUpdata
    dispatch(setSignupData(signUpData));
    // send otp for verifying the email
    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirm: "",
    });
    setAccounttype(ACCOUNT_TYPE.STUDENT);
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];
  return (
    <div>
      <div>
        <TabButton
          tabData={tabData}
          currenttab={accounttype}
          setCurrenttab={setAccounttype}
        ></TabButton>

        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <TextField
                label="First Name"
                variant="outlined"
                value={formData.fName}
                onChange={changeHandler}
                name="fName"
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={formData.lName}
                onChange={changeHandler}
                name="lName"
                required
              />
            </div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={changeHandler}
              name="email"
              type="email"
              required
            />
            <div className="flex gap-4">
              <div className="relative">
                <TextField
                  label="Create Password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={changeHandler}
                  name="password"
                  type={hidden ? "password" : "text"}
                  required
                />
                <span
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                  onClick={hiddenHandler}
                >
                  {hidden ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
              <div className="relative">
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  value={formData.confirm}
                  onChange={changeHandler}
                  name="confirm"
                  type={Conhidden ? "password" : "text"}
                  required
                />
                <span
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                  onClick={ConHiddenHandler}
                >
                  {Conhidden ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/forgot-password" className="text-blue-500 text-xs">
              Forgot password?
            </Link>
          </div>
          <button className="w-full bg-yellow-400 text-white h-10 rounded-md font-semibold hover:bg-yellow-500 transition duration-300 mt-4">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
