import { Card, Avatar, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Dialog } from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon, DocumentCheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";

import LoadingScreen from "../../components/LoadingScreen";
import CertificatesCard from "./CertificatesCard";
import ProgressOverview from "./ProgressOverview";
import TabsBodyHeader from "./TabsBodyHeader";
import { useAuth } from "../../hooks/UseAuth";
import { isLoding } from "../../store/atoms";
import ProfileInfo from "./ProfileInfo";
import EventsCard from "./EventsCard";
import TabButton from "./TabButton";

const PublicUserProfile = () => {
  const [certificateCards, setCertificateCards] = useState([]);
  const [completedEvent, setCompletedEvent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ongoingEvent, setOngoingEvent] = useState(0);
  const [loading, setIsLoading] = useRecoilState(isLoding);
  const [modalType, setModalType] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [event, setEvent] = useState([]);
  const [user, setUser] = useState({});
  const { username } = useParams();
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_REACT_BASE_URL + `/user/${username}`, {
        headers: {
          Authorization: auth.user,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setEvent(res.data.events);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(import.meta.env.VITE_REACT_BASE_URL + `/event/getEvent/${user.id}`, {
  //       headers: {
  //         Authorization: auth.user,
  //       },
  //     })
  //     .then(async (res) => {
  //       console.log(res.data);
  //       setEvent(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, [user]);

  useEffect(() => {
    const countEvents = () => {
      let completed = 0;
      let ongoing = 0;
      event.forEach((event) => {
        if (event.status === "COMPLETED") {
          completed++;
        } else if (event.status === "PENDING") {
          ongoing++;
        }
      });
      setCompletedEvent(completed);
      setOngoingEvent(ongoing);
    };
    countEvents();
  }, [event]);

  const eventProgress = event.map((event) => {
    const totalLevels = event.levels.length;
    const completedLevels = event.levels.filter((level) => level.isCompleted).length;
    const progress = (completedLevels / totalLevels) * 100;
    return { eventId: event.id, progress };
  });

  const eventsByStatus = event.reduce((acc, event) => {
    const status = event.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(event);
    return acc;
  }, {});

  const statusProgress = Object.keys(eventsByStatus).reduce((acc, status) => {
    const events = eventsByStatus[status];
    const totalLevels = event.reduce((acc, event) => acc + event.levels.length, 0);
    const completedLevels = event.reduce((acc, event) => acc + event.levels.filter((level) => level.isCompleted).length, 0);
    const progress = ((completedLevels / totalLevels) * 100).toFixed(2);
    acc[status] = parseFloat(progress);
    return acc;
  }, {});

  const renderEventCards = (status) => {
    if (!eventsByStatus[status]) {
      return (
        <div className="flex justify-center items-center w-full h-full col-span-3">
          <Typography variant="paragraph">No Events</Typography>
        </div>
      );
    }
    return event.filter((event) => event.status === status).map((event, index) => <EventsCard key={index} username={user.username} event={event} progress={eventProgress.find((ep) => ep.eventId === event.id).progress} />);
  };

  const renderCertificateCards = () => {
    return certificateCards.map((certificate, index) => <CertificatesCard key={index} certificate={certificate} />);
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const renderUserList = (list) => {
    return list.map((user, index) => (
      <Card key={index} className="flex items-center gap-4 p-4 mb-2">
        <Avatar src={user.image} alt={user.name} size="md" variant="circular" />
        <div>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="small" color="gray">
            @{user.username}
          </Typography>
        </div>
      </Card>
    ));
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen bg-[#fbf5ef] p-6">
      <Card className="p-6 mb-6 bg-white shadow-lg rounded-lg">
        <ProfileInfo user={user} openModal={openModal} />
        <ProgressOverview completedEvent={completedEvent} ongoingEvent={ongoingEvent} />
      </Card>

      <Tabs value="current">
        <TabsHeader>
          <Tab value="current">
            <TabButton TabIcon={ClockIcon} TabName={"Current"} />
          </Tab>
          <Tab value="completed">
            <TabButton TabIcon={CheckCircleIcon} TabName={"Compeletd"} />
          </Tab>
          <Tab value="incomplete">
            <TabButton TabIcon={XCircleIcon} TabName={"Incompelete"} />
          </Tab>
          <Tab value="certificates">
            <TabButton TabIcon={DocumentCheckIcon} TabName={"Certificates"} />
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="current">
            <TabsBodyHeader progress={statusProgress.PENDING || 0} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderEventCards("PENDING")}</div>
          </TabPanel>

          <TabPanel value="completed">
            <TabsBodyHeader progress={statusProgress.COMPLETED || 0} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderEventCards("COMPLETED")}</div>
          </TabPanel>

          <TabPanel value="incomplete">
            <TabsBodyHeader progress={statusProgress.INCOMPLETE || 0} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{renderEventCards("INCOMPLETE")}</div>
          </TabPanel>

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

      <Dialog size="lg" open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <div className="p-6">
          <Typography variant="h4" className="mb-4">
            {modalType === "followers" ? "Followers" : "Following"}
          </Typography>
          <div className="overflow-y-auto h-80">{modalType === "followers" ? renderUserList(followers) : renderUserList(following)}</div>
        </div>
      </Dialog>

      <Dialog size="xs" open={isModal} handler={() => setIsModal((cur) => !cur)} className="shadow-none flex justify-center bg-transparent">
        <Avatar src="https://avatars.githubusercontent.com/u/126967976?v=4" alt="User Profile Picture" size="xxl" variant="rounded" className="w-50 h-50" />
      </Dialog>
    </div>
  );
};

export default PublicUserProfile;
