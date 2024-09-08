import React, { useEffect, useState } from "react";
import { Card, Input, Button, Checkbox, Typography, Alert } from "@material-tailwind/react";
import { useAuth } from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [showPassword, setShowPassword] = useState(false);

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
      password: formData.get("password"),
    };
    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + "/user/signin", data)
      .then(async (res) => {
        await auth.login(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        setAlert({ vis: true, color: "red", msg: error.response.data.message });
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/Login.jpeg')] bg-cover bg-center p-5 md:pt-0">
      <Card className="p-6 bg-white/80 shadow-lg max-w-md w-full rounded-lg">
        <Alert color={alert.color} variant="outlined" open={alert.vis}>
          {alert.msg}
        </Alert>
        <Typography variant="h4" className="text-center mb-4 text-green-900">
          Login to Your Account
        </Typography>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="text" color="green" size="lg" label="Username" name="username" className="rounded-lg" required />
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} size="lg" label="Password" name="password" className="rounded-lg" required />
            <Button type="button" size="sm" color="green" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>
          <Button type="submit" size="lg" className="w-full bg-green-800 hover:bg-green-900 text-white rounded-lg transition duration-200">
            Login
          </Button>
          <Typography as="a" href="#" className="text-center block text-green-600 hover:text-green-800 mt-4">
            Forgot Password?
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
