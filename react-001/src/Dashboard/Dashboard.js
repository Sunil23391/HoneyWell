import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './Card/Card'
import './Dashboard.css'

export default function Dashboard() {
    let [loading,setLoading] = useState(true);
    let [species, setSpecies] = useState({});
    let [pokemonList, setPokemonList] = useState([]);
    useEffect(() => {
        Promise.all(
            [
                axios.get('https://pokeapi.co/api/v2/pokemon/1'),
                axios.get('https://pokeapi.co/api/v2/ability/4')
            ]
        ).then(([speciesResponse,pokemonResponse])=>{
            // console.log(speciesResponse, pokemonResponse);
            setLoading(false)
            setSpecies(speciesResponse.data.species)
            setPokemonList(pokemonResponse.data.pokemon);
        })
    }, []);

    const showAbilities = (item, index) => {
        pokemonList[index].loaded = false;
        setPokemonList([...pokemonList])
        if (pokemonList[index].abilities && pokemonList[index].abilities.length)
            return;

        axios.get(item.pokemon.url)
            .then((response) => {
                pokemonList[index].loaded = true;
                pokemonList[index].abilities = response.data.abilities;
                setPokemonList([...pokemonList])
            })
    }

    const changeNameToWord = useCallback((name)=>{
        let nameLetterArray = name.split('');
        nameLetterArray[0] = nameLetterArray[0].toUpperCase();
        let wordName = nameLetterArray.join('');
        return wordName;
    },[]);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && <div className="container">
                <Card {...species} />
                {pokemonList.map((item, index) => {
                    return <div key={index}>
                        <span className="pokemon-name">
                            {`${index + 1}. `}{changeNameToWord(item.pokemon.name)}
                        </span>

                        <div>
                            <button onClick={() => showAbilities(item, index)}>
                                Show Abilities
                            </button>
                        </div>

                        {item.loaded && item.abilities && item.abilities.length && <div>
                            <h4>
                                List Of Abilities
                            </h4>
                            <fieldset>
                                <div className="list-of-abiliites">

                                    {item.abilities.map((abilityItem, abilityIndex) => {
                                        return <div key={abilityIndex}>
                                            {changeNameToWord(abilityItem.ability.name)}
                                        </div>
                                    })}
                                </div>
                            </fieldset>
                            
                        </div>}
                        {
                            item.loaded == false && <div>Loading.... </div>
                        }

                    </div>
                })}
            </div>
        }
        </div>
    );
}