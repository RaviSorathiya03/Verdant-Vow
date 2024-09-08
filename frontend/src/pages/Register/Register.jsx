import React, { useEffect, useState } from "react";
import { Card, Input, Button, Checkbox, Typography, Alert } from "@material-tailwind/react";
import { useAuth } from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/profile");
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + "/user/signup", data)
      .then((res) => {
        setAlert({ vis: true, color: "blue", msg: res.data.message });
        navigate(`/verify/${data.email}`);
      })
      .catch((error) => {
        console.log(error);
        setAlert({ vis: true, color: "red", msg: error.response.data.message });
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/Login.jpeg')] bg-cover bg-center">
      <Card className="p-6 bg-white/80 shadow-lg max-w-md w-full rounded-lg">
        <Alert color={alert.color} variant="outlined" open={alert.vis}>
          {alert.msg}
        </Alert>
        <Typography variant="h4" className="text-center mb-4 text-green-900">
          Create a New Account
        </Typography>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="text" size="lg" label="Username" id="username" name="username" className="rounded-lg" required />

          <Input type="email" size="lg" label="Email" id="email" name="email" className="rounded-lg" required />

          <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
            <Input type="text" size="lg" label="First Name" id="fname" name="fname" className="rounded-lg" required />
            <Input type="text" size="lg" label="Last Name" id="lname" name="lname" className="rounded-lg" required />
          </div>

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

          {/* Login Link */}
          <Typography className="text-center block text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </a>
          </Typography>
        </form>
      </Card>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-center bg-white/80 rounded-lg p-2 text-balance">
        <Typography color="gray" className="text-sm">
          Protecting the planet, one tree at a time.
        </Typography>
      </footer>
    </div>
  );
};

export default Register;
