import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { FaLeaf, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(30);
  const [isOtpValid, setIsOtpValid] = useState(null);
  const { email } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    axios
      .post(import.meta.env.VITE_REACT_BASE_URL + "/user/verify-otp", { otp: otpValue, email })
      .then(async (res) => {
        setIsOtpValid(true);
        await auth?.login(res.data.token);
      })
      .catch(() => {
        setIsOtpValid(false);
      });
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/profile");
    }
    if (resendTimer > 0) {
      const intervalId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [resendTimer]);

  const handleResendOtp = () => {
    setResendTimer(30);
    alert("New OTP sent!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Typography variant="h3" className="mb-6 text-green-900">
        OTP Verification
      </Typography>

      <div className="flex space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input key={index} id={`otp-${index}`} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e, index)} className="w-10 h-10 text-center border border-green-600 rounded-lg text-xl font-semibold text-gray-700 focus:outline-none focus:border-green-700 transition-colors duration-200" style={{ width: "40px", height: "40px" }} />
        ))}
      </div>

      <div className="mb-6">
        {resendTimer > 0 ? (
          <Typography variant="small" color="gray">
            Resend OTP in {resendTimer} seconds
          </Typography>
        ) : (
          <Button variant="text" className="text-green-600 hover:text-green-800 flex items-center" onClick={handleResendOtp}>
            <FaLeaf className="mr-2" /> Resend OTP
          </Button>
        )}
      </div>

      <div className="w-full max-w-md mb-6">
        <Button className="bg-green-700 text-white w-full flex justify-center items-center space-x-2 hover:bg-green-800 transition-all" size="lg" onClick={handleVerifyOtp}>
          <FaLeaf className="h-5 w-5" />
          <span>Verify</span>
        </Button>
      </div>

      {isOtpValid === true && (
        <div className="flex items-center space-x-2 text-green-700 mt-4">
          <FaCheckCircle className="h-5 w-5" />
          <Typography variant="small">OTP Verified, Welcome!</Typography>
        </div>
      )}
      {isOtpValid === false && (
        <div className="flex items-center space-x-2 text-red-600 mt-4">
          <FaExclamationCircle className="h-5 w-5" />
          <Typography variant="small">Invalid OTP, please try again.</Typography>
        </div>
      )}

      <footer className="mt-8">
        <Typography variant="small" color="gray" className="text-center">
          Thank you for helping us save the planet, one step at a time! 🌿
        </Typography>
      </footer>
    </div>
  );
};

export default OtpVerificationPage;
