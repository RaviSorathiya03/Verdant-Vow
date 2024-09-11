import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography, Radio, Alert } from "@material-tailwind/react";
import { useAuth } from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

const Login = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("user"); // State to toggle between User and Organization login form

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      const data = decodeToken(auth.user);
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

    // Capture login data based on the login type
    const data =
      loginType === "user"
        ? {
            username: formData.get("username"),
            password: formData.get("password"),
          }
        : {
            organization: formData.get("organization"),
            password: formData.get("password"),
          };

    const apiEndpoint = loginType === "user" ? "/user/signin" : "/organization/signin";

    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + apiEndpoint, data)
      .then(async (res) => {
        await auth.login(res.data);
        loginType === "user" ? navigate("/profile") : navigate("/organization");
      })
      .catch((error) => {
        setAlert({ vis: true, color: "red", msg: error.response.data.message });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/nature-login-background.jpg')] bg-cover bg-center p-6 md:pt-0">
      <Card className="p-6 bg-white/80 shadow-lg max-w-lg w-full rounded-lg">
        <Alert color={alert.color} variant="outlined" open={alert.vis}>
          {alert.msg}
        </Alert>

        {/* Page Title */}
        <Typography variant="h4" className="text-center mb-6 text-green-900">
          Login to Your Account
        </Typography>

        {/* Login Type Selection */}
        <div className="flex justify-around mb-6">
          <Radio id="user" name="loginType" label="User" value="user" checked={loginType === "user"} onChange={() => setLoginType("user")} color="green" />
          <Radio id="organization" name="loginType" label="Organization" value="organization" checked={loginType === "organization"} onChange={() => setLoginType("organization")} color="green" />
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Conditional Form for User */}
          {loginType === "user" && (
            <>
              <Input type="text" color="green" size="lg" label="Username" name="username" className="rounded-lg" required />
            </>
          )}

          {/* Conditional Form for Organization */}
          {loginType === "organization" && (
            <>
              <Input type="text" color="green" size="lg" label="Organization Name" name="organization" className="rounded-lg" required />
            </>
          )}

          {/* Password Field with Show/Hide Toggle */}
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} size="lg" label="Password" name="password" className="rounded-lg" required />
            <Button type="button" size="sm" color="green" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>

          {/* Login Button */}
          <Button type="submit" size="lg" className="w-full bg-green-800 hover:bg-green-900 text-white rounded-lg transition duration-200">
            Login
          </Button>

          {/* Forgot Password Link */}
          <Typography as="a" href="#" className="text-center block text-green-600 hover:text-green-800 mt-4">
            Forgot Password?
          </Typography>
        </form>
      </Card>

      {/* Footer Section */}
      <footer className="absolute bottom-4 text-center bg-white/80 rounded-lg p-2">
        <Typography color="gray" className="text-sm">
          Protecting the planet, one login at a time. 🌿
        </Typography>
      </footer>
    </div>
  );
};

export default Login;
