import backgroundMaker from "./pokemon-colors";

function Choose({ ourPokemons, enemyPokemonData, setSelectedPokemon }) {
  return (<>
    <div className="Choose" key="choose">
      <h2 id="choose-headline" key="choose-headline">Choose a pokemon</h2>
    </div>
    <div className="ourPokemon-container" key="ourPokemon-container">
      {ourPokemons.map((pokemon, index) => {
        return <form onClick={() => setSelectedPokemon(pokemon)} key={`poke-form${index}`}>
          <div key={`poke-card${index}`} className="pokemon-card"
          style={backgroundMaker(pokemon.type)}>
            <img src={pokemon.imgFront} alt="There is nothing" key={`poke-img${index}`}></img>
            <h2 className="pokemon-name" key={`poke-name${index}`}>{pokemon.name}</h2>
          </div>
        </form>
        }
      )}
    </div>
    <div className="enemy-container" key="enemy">
      <div className="enemy-card" key="enemy-card" style={backgroundMaker(enemyPokemonData.type)}>
        <img src={enemyPokemonData.imgFront} alt="There is nothing" key="enemy-img"></img>
        <h2 className="pokemon-name" key="enemy-name">{enemyPokemonData.name}</h2>
      </div>
    </div>
  </>
  );
}

export default Choose;