import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon sx={{ color: "#00897b" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <ShoppingCartIcon sx={{ color: "#00897b" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon sx={{ color: "#00897b" }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon sx={{ color: "#00897b" }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItemButton>
    </React.Fragment>
);
