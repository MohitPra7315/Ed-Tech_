import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../../data/countrycode.json";
import CTButton from "../HomePageCom/Buttons";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";

export const ContactUsForm = ({ heading, subheading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const ContactData = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = { sucess: "OK" };
      console.log("response", response);
    } catch (error) {
      console.error("error", error);
    }
    toast.dismiss(toastId);
    setLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className="w-full max-w-maxContent pt-10 mx-auto flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-600">Get in Touch</h1>
      <p className="text-blue-400">
        We’d love to hear from you. Please fill out this form.
      </p>

      <form
        onSubmit={handleSubmit(ContactData)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-7">
          {/* First Name field */}
          <div className="flex flex-col">
            <TextField
              label="First Name"
              type="text"
              id="fName"
              placeholder="First Name"
              name="fName"
              variant="outlined"
              fullWidth
              {...register("fName", { required: true })}
            />
            {errors.fName && <span>Please Enter First Name</span>}
          </div>
          {/* Last Name */}
          <div className="flex flex-col">
            <TextField
              label="Last Name"
              type="text"
              id="lName"
              placeholder="Last Name"
              name="lName"
              variant="outlined"
              fullWidth
              {...register("lName", { required: true })}
            />
            {errors.lName && <span>Please Enter Last Name</span>}
          </div>
        </div>
        {/* email section */}
        <div className="w-full flex flex-col">
          <TextField
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            variant="outlined"
            fullWidth
            {...register("email", { required: true })}
          />
          {errors.email && <span>Please fill the Email</span>}
        </div>
        {/* phone Number section */}
        <div className="flex flex-col">
          <label htmlFor="PhoneNumber">Phone Number</label>
          <div className="flex gap-5">
            {/* Dropdown */}
            <select
              className="text-blue-200 w-[90px] border border-blue-200  rounded-lg"
              name="PhoneNumber"
              id="PhoneNumber"
              {...register("countryCode", { required: true })}
            >
              {CountryCode.map((element, index) => (
                <option key={index}>
                  {element.code}-{element.country}
                </option>
              ))}
            </select>
            {/* Number section */}
            <TextField
              label="Number"
              type="number"
              name="Number"
              id="Number"
              placeholder="12345 67890"
              variant="outlined"
              fullWidth
              {...register("ContactNumber", { required: true })}
            />
            {errors.PhoneNumber && <span>Please fill the Number</span>}
          </div>
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="message">Message</label>
          <TextField
            label="Message"
            type="text"
            name="message"
            id="message"
            placeholder="Message"
            multiline
            rows={7}
            variant="outlined"
            fullWidth
            {...register("message", { required: true })}
          />
          {errors.message && <span>Please fill the message</span>}
        </div>
        <button
          type="submit"
          className="bg-yellow-100 p-2 text-black rounded-lg font-bold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
