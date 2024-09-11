import { List, Typography, ListItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1" placeholder={undefined}>
      <Link to="/">
        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
          <ListItem className="flex items-center gap-2 py-2 pr-4" placeholder={undefined}>
            Home
          </ListItem>
        </Typography>
      </Link>
      <Link to="/blog">
        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
          <ListItem className="flex items-center gap-2 py-2 pr-4" placeholder={undefined}>
            Blog
          </ListItem>
        </Typography>
      </Link>
      <Link to="/about-us">
        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
          <ListItem className="flex items-center gap-2 py-2 pr-4" placeholder={undefined}>
            About Us
          </ListItem>
        </Typography>
      </Link>
      <Link to="/contact-us">
        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
          <ListItem className="flex items-center gap-2 py-2 pr-4" placeholder={undefined}>
            Contact Us
          </ListItem>
        </Typography>
      </Link>
    </List>
  );
}
