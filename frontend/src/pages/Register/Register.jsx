import { Card, Input, Button, Checkbox, Typography, Radio, Alert } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

import { useAuth } from "../../hooks/UseAuth";

const Register = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationType, setRegistrationType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      const data = decodeToken(auth?.user);
      if (data.userId) {
        navigate("/profile");
      } else if (data.organizationId) {
        navigate("/organization");
      }
    }
  }, [auth?.user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Capture form data based on registration type
    const data = new FormData();
    if (registrationType === "user") {
      data.append("username", formData.get("username"));
      data.append("firstname", formData.get("fname"));
      data.append("lastname", formData.get("lname"));
      data.append("email", formData.get("email"));
      data.append("bio", formData.get("bio"));
      data.append("image", formData.get("avatar"));
      data.append("password", formData.get("password"));
    } else {
      data.append("organization", formData.get("organization"));
      data.append("image", formData.get("avatar"));
      data.append("email", formData.get("email"));
      data.append("password", formData.get("password"));
    }

    const apiEndpoint = registrationType === "user" ? "/user/signup" : "/organization/signup";

    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + apiEndpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Make sure the content type is set for file uploads
        },
      })
      .then((res) => {
        setAlert({ vis: true, color: "blue", msg: res.data.message });
        registrationType === "user" ? navigate(`/verify/${formData.get("email")}/user`) : navigate(`/verify/${formData.get("email")}/organization`);
      })
      .catch((error) => {
        setAlert({ vis: true, color: "red", msg: error.response.data.message });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/nature-background.jpg')] bg-cover bg-center">
      <Card className="p-6 bg-white/80 shadow-lg max-w-lg w-full rounded-lg">
        <Alert color={alert.color} variant="outlined" open={alert.vis}>
          {alert.msg}
        </Alert>

        {/* Title */}
        <Typography variant="h4" className="text-center mb-6 text-green-900">
          Create a New Account
        </Typography>

        {/* Registration Type Selection */}
        <div className="flex justify-around mb-6">
          <Radio id="user" name="registrationType" label="User" value="user" checked={registrationType === "user"} onChange={() => setRegistrationType("user")} color="green" />
          <Radio id="organization" name="registrationType" label="Organization" value="organization" checked={registrationType === "organization"} onChange={() => setRegistrationType("organization")} color="green" />
        </div>

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Conditional Form for User */}
          {registrationType === "user" && (
            <>
              <Input type="text" size="lg" label="Username" id="username" name="username" className="rounded-lg" required />
              <Input type="email" size="lg" label="Email" id="email" name="email" className="rounded-lg" required />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" size="lg" label="First Name" id="fname" name="fname" className="rounded-lg" required />
                <Input type="text" size="lg" label="Last Name" id="lname" name="lname" className="rounded-lg" required />
              </div>
              <Input type="text" size="lg" label="Bio" id="bio" name="bio" className="rounded-lg" required />
              <Input type="file" size="lg" label="Avatar" id="avatar" name="avatar" className="rounded-lg" required />
            </>
          )}

          {/* Conditional Form for Organization */}
          {registrationType === "organization" && (
            <>
              <Input type="text" size="lg" label="Organization Name" id="organization" name="organization" className="rounded-lg" required />
              <Input type="email" size="lg" label="Email" id="email" name="email" className="rounded-lg" required />
              <Input type="file" size="lg" label="Avatar" id="avatar" name="avatar" className="rounded-lg" required />
            </>
          )}

          {/* Password and Confirm Password Fields */}
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} size="lg" label="Password" id="password" name="password" className="rounded-lg" required />
            <Button type="button" size="sm" color="green" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>

          <div className="relative">
            <Input type={showConfirmPassword ? "text" : "password"} size="lg" label="Confirm Password" id="confirm-password" name="confirm-password" className="rounded-lg" required />
            <Button type="button" size="sm" color="green" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </div>

          {/* Terms and Conditions Checkbox */}
          <Checkbox
            label={
              <Typography color="gray" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
                .
              </Typography>
            }
            required
            color="green"
          />

          {/* Sign-Up Button */}
          <Button type="submit" size="lg" className="w-full bg-green-800 hover:bg-green-900 text-white rounded-lg transition duration-200">
            Sign Up
          </Button>
        </form>
      </Card>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-center bg-white/80 rounded-lg p-2 text-gray-700">
        <Typography className="text-sm">Protecting the planet, one tree at a time.</Typography>
      </footer>
    </div>
  );
};

export default Register;
