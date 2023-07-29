import './App.css';
import { useState, useEffect } from 'react'
import Location from './components/Location'
import RandomEnemy from './components/RandomEnemy'
import Choose from './components/Choose'
import Battle from './components/Battle';

const locationsURL = 'https://pokeapi.co/api/v2/location/'

const fetchURL = (url) => {
  const data = fetch(url).then(data => data.json())
  return data
}

const getPokemonDatas = (pokemonURL) => {
  const pokeData = fetchURL(pokemonURL)
    .then(data => {
      const pokemonData = {
        name: data.name,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        imgFront: data.sprites.front_default,
        imgBack: data.sprites.back_default,
        type: data.types.length === 1 ? [data.types[0].type.name] : data.types.map(type => type.type.name)
      }
      return pokemonData
    })
  return pokeData
}

function App() {

  const [pageNum, setPageNum] = useState(1)
  const [locationData, setLocationData] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [areaData, setAreaData] = useState([])
  const [selectedArea, setSelectedArea] = useState('')
  const [ourPokemons, setOurPokemons] = useState([
    'https://pokeapi.co/api/v2/pokemon/magikarp',
    'https://pokeapi.co/api/v2/pokemon/snorlax',
    'https://pokeapi.co/api/v2/pokemon/eternatus'])
  const [selectedPokemon, setSelectedPokemon] = useState([])
  const [enemyPokemonData, setEnemyPokemonData] = useState([])

  useEffect(() => {
    fetchURL(locationsURL)
      .then(data => {
        const locations = data.results.map(location => location.name.toUpperCase())
        setLocationData(locations)
      })
    Promise.all([getPokemonDatas(ourPokemons[0]), getPokemonDatas(ourPokemons[1]), getPokemonDatas(ourPokemons[2])])
    .then(data => setOurPokemons(data))
  }, [])

  useEffect(() => {
    if (selectedLocation.length > 0) {
      fetchURL(selectedLocation)
        .then(data => setAreaData([data]))
    }
  }, [selectedLocation])

  useEffect(() => {
    if (selectedArea.length > 0) {
      RandomEnemy(fetchURL, setEnemyPokemonData, selectedArea, getPokemonDatas)
      setPageNum(2)
      setSelectedArea('')
    }
  }, [selectedArea])

  if (pageNum === 1) {
    return (
      <div className='location-page'>
        <Location
          locationData={locationData}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          areaData={areaData}
          setSelectedArea={setSelectedArea}
          locationsURL={locationsURL}
        />
      </div>
    )
  } else if (pageNum === 2) {
    return (
      <div className='choose-page'>
        <Choose
          ourPokemons={ourPokemons}
          enemyPokemonData={enemyPokemonData}
          setSelectedPokemon={setSelectedPokemon}
        />
      </div>
    )
  } else {
    return (
      <div className='battle-page'>
        <Battle
          setOurPokemons={setOurPokemons}
        />
      </div>
    )
  }
}

export default App;
