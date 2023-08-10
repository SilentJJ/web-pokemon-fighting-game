import Area from './Area'

function Location({ locationData, onLocationSelected, areaData, onAreaSelected }) {

  return (
    <div className='Location'>
      <select onChange={onLocationSelected}>
        {locationData.map((location, index) => 
          <option key={index} value={index}>
            {location.replace(/-/g, ' ')}
          </option>
        )}
      </select>
      <Area 
      areaData={areaData}
      onAreaSelected={onAreaSelected}
      />
    </div>
  );
}

export default Location;