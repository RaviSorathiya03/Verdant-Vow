import { Navbar, Collapse, Typography, Menu, Button, IconButton, MenuHandler, MenuItem, MenuList, Badge } from "@material-tailwind/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

import NavList from "./NavList";
import { useAuth } from "../../hooks/UseAuth";
import ProfileMenu from "./ProfileMenu";

export default function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const handleLogin = () => navigate("/login");
  const handleGetStarted = () => navigate("/register");

  return (
    <>
      <Navbar className="mx-auto max-w-screen-2xl px-4 py-2 mt-2 mb-2" placeholder={undefined}>
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2" placeholder={undefined}>
              Verdant Vow
            </Typography>
          </Link>
          <div className="hidden lg:block">
            <NavList />
          </div>
          {auth?.user ? (
            <div className="flex justify-between gap-x-2">
              <div className="hidden gap-2 lg:flex">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <IconButton variant="text" className="text-gray-600">
                      <BellIcon className="h-6 w-6" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList className="p-2 bg-white shadow-lg rounded-lg">
                    <MenuItem className="flex items-center">
                      <Typography variant="small" className="text-gray-700">
                        New event near you: "Plant a Tree Day"
                      </Typography>
                    </MenuItem>
                    <MenuItem className="flex items-center">
                      <Typography variant="small" className="text-gray-700">
                        You’ve earned a new badge: "Eco Warrior"
                      </Typography>
                    </MenuItem>
                    <MenuItem className="flex items-center">
                      <Typography variant="small" className="text-gray-700">
                        Reminder: Water your trees!
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <ProfileMenu className="hidden gap-2 lg:flex" placement="bottom-end" />
            </div>
          ) : (
            <div className="hidden gap-2 lg:flex">
              <Button size="sm" className="bg-green-900" placeholder={undefined} onClick={handleGetStarted}>
                Get Started
              </Button>
              <Button variant="outlined" className="text-green-900 border-green-900" size="sm" placeholder={undefined} onClick={handleLogin}>
                Log In
              </Button>
            </div>
          )}
          <IconButton variant="text" className="lg:hidden" onClick={() => setOpenNav(!openNav)} placeholder={undefined}>
            {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          {auth?.user ? (
            <div className="flex w-full flex-nowrap items-center justify-center lg:hidden">
              <ProfileMenu className={""} placement={"bottom"} />
              <Menu placement="bottom">
                <MenuHandler>
                  <Badge>
                    <IconButton variant="text" className="text-gray-600">
                      <BellIcon className="h-6 w-6" />
                    </IconButton>
                  </Badge>
                </MenuHandler>
                <MenuList className="p-2 bg-white shadow-lg rounded-lg">
                  <MenuItem className="flex items-center">
                    <Typography variant="small" className="text-gray-700">
                      New event near you: "Plant a Tree Day"
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center">
                    <Typography variant="small" className="text-gray-700">
                      You’ve earned a new badge: "Eco Warrior"
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center">
                    <Typography variant="small" className="text-gray-700">
                      Reminder: Water your trees!
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Button size="sm" fullWidth onClick={handleGetStarted} placeholder={undefined}>
                Get Started
              </Button>
              <Button variant="outlined" size="sm" fullWidth onClick={handleLogin} placeholder={undefined}>
                Log In
              </Button>
            </div>
          )}
        </Collapse>
      </Navbar>
    </>
  );
}
