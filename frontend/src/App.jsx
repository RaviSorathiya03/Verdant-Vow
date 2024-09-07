import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavigationBar/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/home/home";
import UserProfile from "./pages/user-profile/UserProfile";
import NotFound from "./pages/NotFound";
import EventDetailView from "./pages/event-details/EventDetailView";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/event" element={<EventDetailView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
