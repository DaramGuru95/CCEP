import React from "react";
import {
  useLocation,
  useMatches,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { drawerObjects } from "../Layout/Components/drawerListItems";

type Props = {};

const Header: React.FC = (props: Props) => {
  const { pathname } = useLocation();
  const { ticketId, contact } = useParams();
  let [currentNav] = drawerObjects.filter(
    (item) =>
      item.absolutePath ===
      (matchTicketPath(pathname) ? "/tickets/:id" : pathname)
  );
  // console.log(pathname);
  // let [currentNav] = drawerObjects.filter((item) => {
  //   const isTicketPath = matchTicketPath(pathname);
  //   console.log("path", isTicketPath);

  //   return (item.absolutePath = isTicketPath ? "/tickets/:id" : pathname);
  // });

  function matchTicketPath(path: string) {
    const regex = /^\/tickets\/\d+$/; // Match "/tickets/" followed by one or more digits
    return regex.test(path);
  }
  console.log("mathc path", matchTicketPath(pathname));

  return (
    <Box display={"flex"} flexDirection={"column"} padding={1}>
      <Box
        display={"flex"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              key="1"
              color="black"
              href="/"
              sx={{ fontSize: 12, fontWeight: 400 }}
            >
              {!contact && "CONVERSATIONAL CUSTOMER ENGAGEMENT"}
              {contact && "Tickets"}
            </Link>
            {ticketId ? (
              <Typography key="3" color="text.primary">
                {currentNav?.text ||
                  (ticketId && `Tickets`) ||
                  (contact && `${contact}`)}
              </Typography>
            ) : null}
          </Breadcrumbs>
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          component={Typography}
          variant="h5"
          sx={{ lineHeight: 0.8, marginTop: " 2px" }}
          gutterBottom
        >
          {currentNav?.text ||
            (ticketId && `Ticket Id - ${ticketId}`) ||
            (contact && `${contact}`)}
        </Box>
        {currentNav?.headerActions}
      </Box>
    </Box>
  );
};

export default Header;
