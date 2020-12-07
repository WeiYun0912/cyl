import React,{useState,useEffect,useMemo} from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import {blueGrey , red} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
//css
import "./App.css";
//compnents
import AvatarCard from "./components/AvatarCard";
import HeaderBar from "./components/HeaderBar";
import {useFetch} from './hook/useFetch';
import { PokeContext } from "./components/PokeContext";
import { SnackbarProvider } from 'notistack';
import { MyFavorite } from "./components/MyFavorite"
//icons
import Refresh from "@material-ui/icons/Refresh"
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// https://pokeapi.co/api/v2/pokemon/384
const useStyles = makeStyles((theme) => ({
  typographyContainer : {
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : blueGrey["A700"],
    height: '100vh'
  },
  root: {
    flexGrow: 1,
    backgroundColor : blueGrey[900]
  },
  success : {
    backgroundColor : red["A400"] + "!important"
  },
  warning : {
    backgroundColor : red["A400"] + "!important"
  }
}));



function App() {
  const classes = useStyles();
  const [pokemonId,setPokemonId] = useState(() => localStorage.getItem("pokemonId") ? localStorage.getItem("pokemonId") : 1);
  const {pokemonData} = useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const [favoriteCount,setFavoriteCount] = useState(() => +localStorage.getItem("favorite") ? +localStorage.getItem("favorite") : 0);

  const providerValue = useMemo(()=> ({favoriteCount , setFavoriteCount}),[favoriteCount,setFavoriteCount]);
  useEffect(()=>{
    localStorage.setItem("pokemonId",pokemonId)
  },[pokemonId]);

  useEffect(() => {
    localStorage.setItem("favorite",favoriteCount);
  },[favoriteCount])
  // https://pokeapi.co/api/v2/pokemon-species/41/
  return (
      <BrowserRouter>
        <div className={classes.root}>
          <SnackbarProvider 
            classes={{
              variantSuccess : classes.success,
              variantWarning : classes.warning
            }}
            maxSnack={3} 
            anchorOrigin={{vertical: 'bottom',horizontal: 'center'}} 
            iconVariant={{success : <FavoriteIcon /> , warning : <FavoriteBorderIcon />}} >
            <PokeContext.Provider value={providerValue}>
              <HeaderBar/>
              <Container maxWidth="sm">
                <Route 
                  path="/" 
                  exact
                  render={() => (
                    <Typography className={classes.typographyContainer} component={"div"}>
                    {!pokemonData ? "Loading..." : <AvatarCard  pokemonData={pokemonData}/>}
                    <Button onClick={() => setPokemonId(Math.floor(Math.random()* 898)+1)} startIcon={<Refresh />} size="large"  variant="contained" color="primary" style={{width : "60%" , margin : "15px 0"}}>RANDOM POKEMON</Button>
                    </Typography>
                  )}
                />
              </Container>
            </PokeContext.Provider>  
          </SnackbarProvider>
          <Route path="/myfavor" component={MyFavorite}/>
        </div>
      </BrowserRouter>
  );
}

export default App;
