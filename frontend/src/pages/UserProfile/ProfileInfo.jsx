import { Avatar, Button, Typography } from "@material-tailwind/react";

export default function ProfileInfo({ user, openModal, setJoinModal }) {
  return (
    <div className="flex justify-between items-center">
      <div className="grid grid-cols-1 place-items-center md:flex md:items-center">
        <Avatar src={user.image} className="cursor-pointer" alt="User Profile Picture" size="xxl" variant="circular" onClick={() => setIsModal(true)} />
        <div className="md:ml-6 mt-2">
          <Typography variant="h4" color="blue-gray" className="text-center md:text-left">
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="small" color="gray" className="md:text-left text-center md:flex md:items-center grid grid-cols-1">
            <span>@{user.username}</span>
            <div className="md:flex mr-2">
              <Button variant="text" color="green" className="md:ml-2" onClick={() => openModal("followers")}>
                {user.followCount} Followers
              </Button>
              <Button variant="text" color="green" className="md:ml-2" onClick={() => openModal("following")}>
                {user.followingCount} Following
              </Button>
            </div>
            {user.organizationId ? (
              user.organization.name
            ) : (
              <Button variant="text" color="blue" className="md:ml-2" onClick={() => setJoinModal(true)}>
                Join Organization
              </Button>
            )}
          </Typography>
          <Typography variant="paragraph" color="gray" className="mt-2 md:text-left text-center">
            {user.bio}
          </Typography>
        </div>
      </div>
    </div>
  );
}
