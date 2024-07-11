import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { logout } from "../../state/authSlice";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div style={{ display: "flex" }}>
      <Drawer variant="permanent">
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
      <Container
        component="main"
        style={{ marginLeft: "240px", padding: "16px" }}
      >
        <Typography variant="h4">Welcome, {user?.email}</Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default Dashboard;
