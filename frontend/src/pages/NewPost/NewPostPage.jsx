import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, Typography, Select, Option, Alert, Tooltip } from "@material-tailwind/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Substitute LeafIcon with a custom nature icon
import { FaLeaf } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../hooks/UseAuth";
import { useNavigate, useParams } from "react-router-dom";

const NewPostPage = () => {
  const [alert, setAlert] = useState({ vis: false, color: "", msg: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);
  const auth = useAuth();
  const { levelId } = useParams();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + `/event/allEvents`, {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSubmit() {
    console.log(event);
    axios
      .post(
        import.meta.env.VITE_REACT_BASE_URL + "/post/createPost",
        {
          eventId: event,
          levelId,
          content: postContent,
          imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          headers: {
            Authorization: auth.user,
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.message) {
          setAlert({ vis: true, color: "blue", msg: res.data.message });
          navigate(`/event/${event}`);
        } else {
          setAlert({ vis: true, color: "red", msg: res.data.message });
        }
      })
      .catch((error) => {
        console.error(error);
        setAlert({ vis: true, color: "red", msg: error.response.data.details[0].message });
      });
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <Alert color={alert.color} variant="outlined" open={alert.vis} className="max-w-md mb-6 w-full">
        {alert.msg}
      </Alert>
      <Typography variant="h3" className="mb-6 text-green-900">
        Create a New Post
      </Typography>

      <div className="w-full max-w-md mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-green-600 hover:border-green-700 transition-colors relative">
          <div className="flex flex-col items-center justify-center text-gray-600 cursor-pointer">
            <CameraIcon className="h-12 w-12" />
            <Typography variant="small" className="mt-2">
              Drag and drop or click to upload an image
            </Typography>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        {selectedImage && (
          <div className="mt-4 relative">
            <img src={selectedImage} alt="Uploaded" className="w-full h-48 object-cover rounded-lg shadow-md" />
            <Button className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full p-1" onClick={() => setSelectedImage(null)}>
              <XMarkIcon className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="w-full max-w-md mb-6">
        <Tooltip content="Enter Description About The Level & Post" placement="top">
          <Textarea placeholder="Write about your progress in caring for the tree..." className="rounded-lg border border-green-600" value={postContent} onChange={(e) => setPostContent(e.target.value)} />
        </Tooltip>
        <Typography variant="small" className="mt-2 text-gray-500 text-right">
          {postContent.length}/500 characters
        </Typography>
      </div>

      <div className="w-full max-w-md mb-6">
        <Select label="Select Event" className="rounded-lg border border-green-600" value={event} onChange={(value) => setEvent(value)}>
          {events
            .filter((e) => e.status === "PENDING")
            .map((e) => {
              return (
                <Option value={e.id} key={e.id}>
                  {e.eventName}
                </Option>
              );
            })}
        </Select>
      </div>

      <div className="w-full max-w-md">
        <Button className="bg-green-700 text-white w-full flex justify-center items-center space-x-2 hover:bg-green-800 transition-all" size="lg" onClick={handleSubmit}>
          <FaLeaf className="h-5 w-5" />
          <span>Post</span>
        </Button>
      </div>

      <footer className="mt-8">
        <Typography variant="small" color="gray" className="text-center">
          Thank you for contributing to a greener planet! 🌿
        </Typography>
      </footer>
    </div>
  );
};

export default NewPostPage;
