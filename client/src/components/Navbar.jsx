import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { Link, Redirect } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import '../index.css'

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5"
    }
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
        }}
        transformOrigin={{
        vertical: "top",
        horizontal: "center"
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
            color: theme.palette.common.white
        }
        }
    }
}))(MenuItem);

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
        <Button className='NavButton'
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            // color="primary"
            onClick={handleClick}
        >
            <MenuIcon />
        </Button>
        <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <StyledMenuItem component='a' href="/#anchor-hero-image" onClick={handleClose}>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
            </StyledMenuItem>
            <StyledMenuItem component='a' href="/#anchor-golf-courses" onClick={handleClose}>
            <ListItemIcon>
                <GolfCourseIcon />
            </ListItemIcon>
            <ListItemText primary="Golf" />
            </StyledMenuItem>
            <StyledMenuItem component='a' href="/#anchor-tennis-complexes" onClick={handleClose}>
            <ListItemIcon>
                <img
                src="https://i.imgur.com/dMTwYfe.png"
                alt="tennis"
                style={{ width: "24px", opacity: ".54" }}
                />
            </ListItemIcon>
            <ListItemText primary="Tennis" />
            </StyledMenuItem>
            <StyledMenuItem>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
            </StyledMenuItem>
        </StyledMenu>
        </div>
    );
}
