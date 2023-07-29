import Area from './Area'

function Location({ locationData, selectedLocation, setSelectedLocation, areaData, setSelectedArea, locationsURL }) {
  return (
    <div className='Location'>
      <h2 className='location-title'>Choose a location to fight!</h2>
      <select onChange={(e) => setSelectedLocation(locationsURL + (Number(e.target.value) + 1))}>
        {locationData.map((location, index) => 
          <option key={index} value={index}>
            {location.replace(/-/g, ' ')}
          </option>
        )}
      </select>
      <Area />
    </div>
  );
}

export default Location;