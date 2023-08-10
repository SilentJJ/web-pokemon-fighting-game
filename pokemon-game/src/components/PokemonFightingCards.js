import backgroundMaker from "./backgroundMaker";

function PokemonFightingCards({ pokemon, ourTurn, isItOurPokemon }) {
  return <div className={isItOurPokemon ? "pokemon" : "enemy"}>
    <img src={isItOurPokemon ? pokemon.imgBack : pokemon.imgFront} alt="There is nothing" className={`${!ourTurn ? "damageTaken" : ""}`} ></img>
    <div className='pokemon-stats' style={backgroundMaker(pokemon.type)}>
      <h2>{pokemon.name} stats</h2>
      <h3>HP: {pokemon.hp}</h3>
      <h3>Attack: {pokemon.attack}</h3>
      <h3>Defense: {pokemon.defense}</h3>
    </div>
  </div>
}

export default PokemonFightingCards;