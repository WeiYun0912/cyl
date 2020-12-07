import {useEffect,useState} from "react";

export const useFetch = url => {
    const [pokemonData,setPokemonData] = useState({pokemonData : null , loading : false});
    useEffect(() => {
        setPokemonData({pokemonData : null , loading : true});
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPokemonData({pokemonData : data , loading : false})
        })
        .catch(err => console.error(err))
    },[url,setPokemonData])
    return pokemonData;
}