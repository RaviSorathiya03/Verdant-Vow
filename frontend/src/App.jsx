import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavigationBar/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home/home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import NotFound from "./pages/NotFound";
import EventDetailView from "./pages/EventDetails/EventDetailView";
import AboutUs from "./pages/AboutUs/AboutUs";
import { AuthProvider } from "./hooks/UseAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NewPostPage from "./pages/NewPost/NewPostPage";
import NewEventPage from "./pages/NewEvent/NewEventPage";
import OtpVerificationPage from "./pages/VerifyUser/OtpVerificationPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:email" element={<OtpVerificationPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-event"
            element={
              <ProtectedRoute>
                <NewEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post/:levelId"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route
            path="/event/:eventId"
            element={
              <ProtectedRoute>
                <EventDetailView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
