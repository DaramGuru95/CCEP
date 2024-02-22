import React, { useEffect, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import trusttLogo from "../../assets/logo/trustt-logo-white.svg";
import accountsIcon from "../../assets/images/50.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Badge,
  Button,
  Link,
  ListSubheader,
  Menu,
  MenuItem,
} from "@mui/material";
import { drawerObjects } from "./Components/drawerListItems";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import RightDrawer from "./Components/RightDrawer";
import CloseIcon from "@mui/icons-material/Close";
import timeAgo from "../../Helpers/relativeTime";
import { notifications } from "./data";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Config/Store";
import userDetailsAction from "../../Config/Store/Slices/actions/setting_actions/profileDetails.actions";
import fetchUserImageAction from "../../Config/Store/Slices/actions/setting_actions/fetchImage";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutAction } from "../../Config/Store/Slices/actions/auth/logout.action";
import connectToSocket from "../../Config/Store/Slices/reducers/sockets_reducer/socket_actions";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: "#001e27",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#001e27",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 28,
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: 45,
  justifyContent: "center",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#001e27",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();
  const user_id = useSelector((state: RootState) => state.appState.user_id);
  const agent_id = useSelector((state: RootState) => state.appState.emp_id);
  const isAuthenticated = useSelector(
    (state: RootState) => state.appState.isAuthenticated
  );
  const { status: socketStatus, data: transferResponseAgent } = useSelector(
    (state: RootState) => state.socketReducer
  );

  const navigate = useNavigate();

  const {
    userDetails: { profile_details },
  } = useSelector((state: RootState) => state.userDetails);
  const user_image = useSelector(
    (state: RootState) => state.userImageReducer.userImage
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElLogout, setAnchorElLogout] =
    React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openLogout = Boolean(anchorElLogout);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickLogout = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLogout(event.currentTarget);
  };
  const handleLogout = () => {
    console.log("im tere in logout");
    dispatch(logoutAction(agent_id));
    console.log("im tere in logout after");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLogout = () => {
    setAnchorElLogout(null);
  };
  useEffect(() => {
    dispatch(userDetailsAction(`${user_id}`));
  }, [dispatch, user_id]);

  useEffect(() => {
    dispatch(fetchUserImageAction(`${user_id}`));
  }, [dispatch, user_id]);
  useEffect(() => {
    dispatch(connectToSocket(agent_id));
  }, [agent_id]);

  // useEffect(() => {
  //   if (socketStatus == "connected") {
  //     socket_agent.emit("join_chat_room", agent_id);
  //   }
  // }, [socketStatus]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box display={"flex"} gap={1} marginLeft={2}>
              <img
                src={trusttLogo}
                alt={"Trustt logo"}
                width={18}
                height={18}
              />
              <Typography variant="h6" sx={{ fontSize: 18 }}>
                {"Trustt GPT"}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={user_image}
                  alt="accounts"
                  style={{ width: "36px", height: "36px", borderRadius: "50%" }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                  {profile_details?.first_name} {profile_details?.last_name}
                  <br />
                  <span style={{ fontSize: 12 }}>
                    {profile_details?.job_title}
                  </span>
                </Typography>
              </Box>
              <IconButton
                id="demo-positioned-button"
                aria-controls={openLogout ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openLogout ? "true" : undefined}
                onClick={handleClickLogout}
              >
                <ArrowDropDownIcon sx={{ color: "#fff" }} />
              </IconButton>
              <Menu
                sx={{ height: "70vh", overflowY: "auto" }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorElLogout}
                open={openLogout}
                onClose={handleCloseLogout}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box width={250} margin={1} padding={1}>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box width={25} height={25} sx={{ borderRadius: 10 }}>
                      <img
                        src={user_image}
                        alt="accounts"
                        style={{ borderRadius: "50%" }}
                      />
                    </Box>
                    <p className="text-sm my-2 font-semibold text-color-heading">
                      {profile_details?.first_name} {profile_details?.last_name}
                    </p>
                    <p className="text-sm font-semibold text-color-heading">
                      {profile_details?.email}
                    </p>
                  </Box>
                  <Divider sx={{ marginY: 1 }} light />
                  <Box width={"100%"} display={"flex"}>
                    <Button
                      onClick={handleLogout}
                      startIcon={<LogoutIcon sx={{ color: "#000" }} />}
                      sx={{
                        background: "#fff",
                        color: "#000",
                        borderColor: "#001E2733",
                        textTransform: "capitalize",
                      }}
                      size="small"
                    >
                      {"Logout"}
                    </Button>
                  </Box>
                </Box>
              </Menu>

              <IconButton
                size="small"
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Box>
                  <Badge
                    badgeContent={notifications.length}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: 9,
                        height: 15,
                        minWidth: 15,
                      },
                    }}
                    color="warning"
                  >
                    <NotificationsNoneIcon sx={{ color: "#fff" }} />
                  </Badge>
                </Box>
              </IconButton>
              <Menu
                sx={{ height: "70vh", overflowY: "auto" }}
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box maxWidth={350} margin={1} padding={1}>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Notifications
                    </Typography>
                    <Box display={"flex"} gap={2}>
                      <Box
                        component={Link}
                        sx={{ cursor: "pointer", fontSize: 14 }}
                      >
                        Mark as Read
                      </Box>
                      <Box
                        component={Link}
                        sx={{ cursor: "pointer", fontSize: 14 }}
                      >
                        Settings
                      </Box>
                    </Box>
                  </Box>
                  <List>
                    {notifications?.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem disablePadding alignItems="flex-start">
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            width={"100%"}
                            gap={5}
                          >
                            <Box
                              display={"flex"}
                              flexDirection={"column"}
                              sx={{ cursor: "pointer" }}
                            >
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={1}
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: "color.primary" }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "color.secondary" }}
                                >
                                  {timeAgo(item.timeStamp)}
                                </Typography>
                              </Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  wordBreak: "break-word",
                                }}
                              >
                                {item.description}
                              </Typography>
                            </Box>
                            <Box>
                              <IconButton
                                size="small"
                                edge="end"
                                aria-label="close"
                              >
                                <CloseIcon sx={{ width: 16, height: 16 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={true}>
        <DrawerHeader sx={{ marginTop: 9 }}>
          <Typography
            variant="caption"
            sx={{ fontSize: 10, color: "rgba(255,255,255,.8)" }}
          >
            CONVERSATIONAL CUSTOMER <br /> ENGAGEMENT
          </Typography>
        </DrawerHeader>
        <Divider />
        <List dense={true}>
          {/* Menu Options */}
          {drawerObjects.map((item) => {
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  component={NavLink}
                  to={item.to}
                  sx={{
                    minHeight: 38,
                    justifyContent: "initial",
                    color: "rgba(255,255,255,.8)",
                    "&.active": {
                      color: "#FFD00D",
                      "& .MuiListItemIcon-root": {
                        color: "#FFD00D",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: "center",
                      color: "rgba(255,255,255,.8)",
                      fontSize: "small",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: 1 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 1,
          marginTop: 1,

          backgroundColor: "#f0f2f2",
          // height: "95vh",
        }}
      >
        <DrawerHeader />
        <Header />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
