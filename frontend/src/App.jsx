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
import BlogEditor from "./pages/Blog/BlogEditor";
import BlogViewer from "./pages/Blog/BlogViewer";
import BlogListPage from "./pages/Blog/BlogListPage";
import PublicUserProfile from "./pages/PublicUserProfile/PublicUserProfile";
import PublicEventDetailView from "./pages/PublicEventDetails/PublicEventDetailView";
import OrganizationProfile from "./pages/OrganizationProfile/OrganizationProfile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:blogId" element={<BlogViewer />} />
          <Route path="/user/:username" element={<PublicUserProfile />} />
          <Route path="/user/:username/:eventId" element={<PublicEventDetailView />} />
          <Route path="/organization" element={<OrganizationProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:email/:entity" element={<OtpVerificationPage />} />
          <Route path="/login" element={<Login />} />
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
            path="/new-blog"
            element={
              <ProtectedRoute>
                <BlogEditor />
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
