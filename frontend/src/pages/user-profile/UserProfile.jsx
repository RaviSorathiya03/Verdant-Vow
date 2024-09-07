import { Card, Avatar, Progress, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Dialog } from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon, DocumentCheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const UserProfile = () => {
  const [isModal, setIsModal] = useState(false);

  const eventCards = [
    {
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "90-Day Tree Care Challenge",
      startDate: "May 1, 2023",
      progress: 65,
      status: "active", // possible values: current, completed, incomplete
    },
    {
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Save the Forest Campaign",
      startDate: "April 10, 2023",
      progress: 100,
      status: "pending",
    },
    {
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Beach Cleanup",
      startDate: "June 12, 2023",
      progress: 30,
      status: "incomplete",
    },
  ];

  const certificateCards = [
    {
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Tree Care Certificate",
      issuedBy: "Tree Lovers NGO",
      issuedDate: "July 15, 2023",
    },
    {
      image: "https://images.unsplash.com/photo-1476712395872-c2971d88beb7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Forest Conservationist",
      issuedBy: "Save Our Forests",
      issuedDate: "August 20, 2023",
    },
  ];

  const renderEventCards = (status) => {
    return eventCards
      .filter((event) => event.status === status)
      .map((event, index) => (
        <Card key={index} className="p-4 bg-white shadow-lg rounded-lg flex flex-col">
          <img src={event.image} alt={event.title} className="w-full h-60 rounded-md object-cover mb-4" />
          <Typography variant="h5" color="green">
            {event.title}
          </Typography>
          <Typography variant="small" color="gray">
            Start Date: {event.startDate}
          </Typography>
          <Progress value={event.progress} color="green" className="mt-4" />
        </Card>
      ));
  };

  const renderCertificateCards = () => {
    return certificateCards.map((certificate, index) => (
      <Card key={index} className="p-4 bg-white shadow-lg rounded-lg flex flex-col">
        <img src={certificate.image} alt={certificate.title} className="w-full h-60 rounded-md object-cover mb-4" />
        <Typography variant="h5" color="green">
          {certificate.title}
        </Typography>
        <Typography variant="small" color="gray">
          Issued by: {certificate.issuedBy}
        </Typography>
        <Typography variant="small" color="gray">
          Issued Date: {certificate.issuedDate}
        </Typography>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen bg-[#fbf5ef] p-6">
      {/* Profile Overview Section */}
      <Card className="p-6 mb-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar src="https://avatars.githubusercontent.com/u/126967976?v=4" className="cursor-pointer" alt="User Profile Picture" size="xxl" variant="circular" onClick={() => setIsModal(true)} />
            <div className="ml-6">
              <Typography variant="h4" color="blue-gray">
                John Doe
              </Typography>
              <Typography variant="small" color="gray">
                @john_doe | Eco-warrior, Tree care enthusiast 🌳
              </Typography>
              <Typography variant="paragraph" color="gray" className="mt-2">
                Committed to planting trees and saving the environment. Working towards sustainable solutions for our planet.
              </Typography>
            </div>
          </div>

          {/* Profile Settings Menu */}
          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text">
                <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem>Edit Profile</MenuItem>
              <MenuItem>Notification Preferences</MenuItem>
              <MenuItem>Privacy Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu> */}
        </div>

        {/* Progress Overview */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-4 bg-[#1b4332] shadow-sm">
            <Typography variant="h6" color="white">
              Ongoing Events
            </Typography>
            <Typography variant="h4" color="white">
              5
            </Typography>
          </Card>
          <Card className="p-4 bg-[#1b4332] shadow-sm">
            <Typography variant="h6" color="white">
              Completed Events
            </Typography>
            <Typography variant="h4" color="white">
              12
            </Typography>
          </Card>
          <Card className="p-4 bg-[#1b4332] shadow-sm">
            <Typography variant="h6" color="white">
              Certificates Earned
            </Typography>
            <Typography variant="h4" color="white">
              3
            </Typography>
          </Card>
        </div>
      </Card>

      {/* Tabs for Events and Certificates */}
      <Tabs value="current">
        <TabsHeader>
          <Tab value="current">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <Typography variant="small" className="hidden md:block">
                Current
              </Typography>
            </div>
          </Tab>
          <Tab value="completed">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5" />
              <Typography variant="small" className="hidden md:block">
                Compeleted
              </Typography>
            </div>
          </Tab>
          <Tab value="incomplete">
            <div className="flex items-center gap-2">
              <XCircleIcon className="h-5 w-5" />
              <Typography variant="small" className="hidden md:block">
                Incompelete
              </Typography>
            </div>
          </Tab>
          <Tab value="certificates">
            <div className="flex items-center gap-2">
              <DocumentCheckIcon className="h-5 w-5" />
              <Typography variant="small" className="hidden md:block">
                Certificates
              </Typography>
            </div>
          </Tab>
        </TabsHeader>

        <TabsBody>
          {/* Current Events */}
          <TabPanel value="current">
            <Card className="p-4 bg-white mb-4">
              <div className="flex justify-between">
                <Typography variant="h5" color="green">
                  Overall Progress
                </Typography>
                <Typography variant="h5" color="green">
                  70 / 100
                </Typography>
              </div>
              <Progress value={65} color="green" className="mt-4" />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderEventCards("active")}</div>
          </TabPanel>

          {/* Completed Events */}
          <TabPanel value="completed">
            <Card className="p-4 bg-white mb-4">
              <div className="flex justify-between">
                <Typography variant="h5" color="green">
                  Overall Progress
                </Typography>
                <Typography variant="h5" color="green">
                  100 / 100
                </Typography>
              </div>
              <Progress value={100} color="green" className="mt-4" />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderEventCards("pending")}</div>
          </TabPanel>

          {/* Incomplete Events */}
          <TabPanel value="incomplete">
            <Card className="p-4 bg-white mb-4">
              <div className="flex justify-between">
                <Typography variant="h5" color="green">
                  Overall Progress
                </Typography>
                <Typography variant="h5" color="green">
                  30 / 100
                </Typography>
              </div>
              <Progress value={30} color="green" className="mt-4" />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderEventCards("incomplete")}</div>
          </TabPanel>

          {/* Certificates */}
          <TabPanel value="certificates">
            <Card className="p-4 bg-white mb-4">
              <Typography variant="h5" color="green">
                Certificates Earned
              </Typography>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderCertificateCards()}</div>
          </TabPanel>
        </TabsBody>
      </Tabs>
      <Dialog size="xs" open={isModal} handler={() => setIsModal((cur) => !cur)} className="shadow-none flex justify-center bg-transparent">
        <Avatar src="https://avatars.githubusercontent.com/u/126967976?v=4" alt="User Profile Picture" size="xxl" variant="rounded" className="w-50 h-50" />
      </Dialog>
    </div>
  );
};

export default UserProfile;
