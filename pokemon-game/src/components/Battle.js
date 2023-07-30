import { useState, useEffect } from 'react';
import backgroundMaker from "./pokemon-colors";

function Battle({ selectedPokemon, setSelectedPokemon, enemyPokemonData, ourPokemons, setOurPokemons, setPageNum}) {

  const [ourTurn, setOurTurn] = useState(true)
  const [pokemon, setPokemon] = useState(Object.assign({}, selectedPokemon))
  const [enemy, setEnemy] = useState(Object.assign({}, enemyPokemonData))
  const [battlePhase, setBattlePhase] = useState(true)

  useEffect(() => {
    if (battlePhase) {
      setTimeout(() => {simulateBattle()}, 1000)
    }
  }, [ourTurn])

  const simulateBattle = () => {

    const randomNum = Math.random() * (255 - 217) + 217;

    const dmgCalculation = (defender, attacker) => {
      defender.hp = defender.hp - Math.round(((((2 / 5 + 2) * attacker.attack * 60) / defender.defense / 50) +2) * (randomNum / 255))
      return defender
    }

    if (ourTurn) {
      setEnemy(() => dmgCalculation(enemy, pokemon))
    } else {
      setPokemon(() => dmgCalculation(pokemon, enemy))
    }
    setOurTurn(!ourTurn)

    if (pokemon.hp > 1 && enemy.hp < 1) {
      setOurPokemons([...ourPokemons, {...enemyPokemonData}])
      setBattlePhase(false)
      setSelectedPokemon([])
    } else if (pokemon.hp < 1 && enemy.hp > 1) {
      setBattlePhase(false)
      setSelectedPokemon([])
    }
  }

  if (pokemon.hp > 1 && enemy.hp > 1) {
    return (
      <div className="battle-container">
        <div className="pokemon"  style={backgroundMaker(pokemon.type)}>
          <h2>{pokemon.name} stats</h2>
          <img src={pokemon.imgBack} alt="There is nothing" ></img>
          <h3>HP: {pokemon.hp}</h3>
          <h3>Attack: {pokemon.attack}</h3>
          <h3>Defense: {pokemon.defense}</h3>
        </div>
        <div className="enemy"  style={backgroundMaker(enemy.type)}>
          <h2> {enemy.name} stats</h2>
          <img src={enemy.imgFront} alt="There is nothing" ></img>
          <h3>HP: {enemy.hp}</h3>
          <h3>Attack: {enemy.attack}</h3>
          <h3>Defense: {enemy.defense}</h3>
        </div>
      </div>
    );
  } else if (pokemon.hp > 1 && !battlePhase) {
    return (
      <div className='win-container'>
        <h1 className='win'>You WON!</h1>
        <h2 className='text-after-battle'> The enemy pokemon has been added to your team!</h2>
        <button className='go-back-to-the-locations' onClick={() => {setPageNum(1); console.log(ourPokemons)}}>Go back to the locations</button>
      </div>
    )
  } else if (enemy.hp > 1 && !battlePhase) {
    return (
      <div className='win-container'>
        <h1 className='win'>You Lost!</h1>
        <h2 className='text-after-battle'>Better luck next time!</h2>
        <button className='go-back-to-the-locations' onClick={() => setPageNum(1)}>Go back to the locations</button>
      </div>
    )
  }
}

export default Battle;