import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import { makeStyles , withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { PokeContext } from "../components/PokeContext";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';
import PetsIcon from '@material-ui/icons/Pets';
import {red , grey} from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      verticalAlign: 'middle',
      display: 'inline-flex'
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -1,
      top: 20,
      border: `2px solid ${red[600]}`,
      backgroundColor : red[600],
      padding: '0 4px',
      color : grey[200]
    },
  }))(Badge);

const HeaderBar = () => {
    const classes = useStyles();
    const { favoriteCount } = useContext(PokeContext);
    return(
        <AppBar color="primary">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="subtitle1" className={classes.title}>
                    <PetsIcon /> Choose You Like 
                </Typography>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/myfavor">
                <IconButton color="secondary">
                        <StyledBadge
                        badgeContent={favoriteCount} 
                        color="primary"
                        showZero
                        >
                            <FavoriteIcon />
                        </StyledBadge>

                </IconButton>
                </NavLink>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar;