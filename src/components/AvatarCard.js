import React,{useState,useMemo,useContext} from 'react'
import { makeStyles , createMuiTheme , ThemeProvider  } from '@material-ui/core/styles';
//COMPONENTS
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { PokeContext } from "../components/PokeContext";
import { useSnackbar } from 'notistack';
//ICON
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//COLORS
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        "& $label": {
          padding : "0",
          fontSize : 10
        }
      }
    },
    MuiAvatar : {
      img : {
        marginBottom : 15,
        width : 150
      }
    },
    MuiSnackbarContent : {
      containerAnchorOriginBottomCenter : {
        backgroundColor : "white",
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin : "0 auto"
    },
    media: {
        height: 0,
        paddingTop: '87.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    small : {
      backgroundColor: red[500],
      width: theme.spacing(6),
      height: theme.spacing(6),
    }
}));

const firstWordUpper = (words) => {
  console.log("computing...");
  return words.split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
}

const typesComponent = (types) => {
  console.log("computing types...");
  return types.map(type => (
    <Chip key={type.type.name} className={type.type.name} label={type.type.name.toUpperCase()}  style={{color : red[50] , margin : "0 15px" , width : 70}}/>
  ))
}

export default function AvatarCard({pokemonData}) {
    const classes = useStyles();
    const [isFavorite,setIsFavorite] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { id , name , types , sprites : {other} , sprites : {versions}} = pokemonData;
    const pmName = useMemo(() => firstWordUpper(name),[name]);
    const PmTypes = useMemo(() => typesComponent(types),[types]);
    const {setFavoriteCount} = useContext(PokeContext);


    const addToFavorite = () => {
      setIsFavorite(!isFavorite);
      setFavoriteCount(c => c+1);
      enqueueSnackbar('Add To Favorite.',{ variant : "success" , autoHideDuration : 2000});
    }

    const removeFromFavorite = () => {
      setIsFavorite(!isFavorite);
      setFavoriteCount(c => c-1);
      enqueueSnackbar('Remove From Favorite.',{ variant : "warning" , autoHideDuration : 2000});
    }
    return(
        <ThemeProvider theme={theme}>
          <Card className={classes.root} key={id}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.small} src={versions["generation-viii"]["icons"]["front_default"]}/>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={pmName}
              titleTypographyProps={{variant:"h6"}}
              style={{textAlign:"center"}}
              subheader={PmTypes}
            />
            <CardMedia
              className={classes.media}
              image={other["official-artwork"]["front_default"]}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component={"div"}>
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {isFavorite ? 
              (<IconButton aria-label="remove from favorites" onClick={removeFromFavorite}>
                <FavoriteIcon color="secondary"/>
              </IconButton>) : 
              (<IconButton aria-label="add to favorites" onClick={addToFavorite}>
                <FavoriteBorderIcon color="secondary"/>
              </IconButton>)}
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </Card>     
        </ThemeProvider>
    )
}
