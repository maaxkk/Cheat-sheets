import {useState, useEffect} from 'react';
import {fetchData} from '../utils/api.js';

export default function Page() {
    const [planetList, setPlanetList] = useState([])
    const [planetId, setPlanetId] = useState('');

    const [placeList, setPlaceList] = useState([]);
    const [placeId, setPlaceId] = useState('');

    useEffect(() => {
        let incl = false
        for (let key in planetList){
            if (planetList[key].id === planetId) incl = true;
        }
        if (incl) {
            fetchData(`/planets/${planetId}/places`).then(result => {
                setPlaceList(result)
                setPlaceId(result[0].id)
            })
        } else {
            fetchData(`/planets/earth/places`).then(result => {
                setPlaceList(result)
                setPlaceId(result[0].id)
            })
        }

    }, [planetId]);


    // why do we need ignore here? For example user runs external process(useEffect) that will take 10 minutes
    // after 2 minutes user decided to left page and not to wait, and our component was unmount, because user left
    // website, now when component was unmount useEffect returns its value, and it returns 'ignore = true' now when
    // fetch process(10 min process) will end it will check value of 'ignore' variable(it will be true) and
    // after fetching data it won't update our data of component
    useEffect(() => {
        let ignore = false;
        fetchData('/planets').then(result => {
            if (!ignore) {
                console.log('Fetched a list of planets.');
                setPlanetList(result);
                setPlanetId(result[0].id); // Select the first planet
            }
        });
        return () => {
            ignore = true;
        }
    }, []);
    return (
        <>
            <label>
                Pick a planet:{' '}
                <select value={planetId} onChange={e => {
                    setPlanetId(e.target.value);
                }}>
                    {planetList.map(planet =>
                        <option key={planet.id} value={planet.id}>{planet.name}</option>
                    )}
                </select>
            </label>
            <label>
                Pick a place:{' '}
                <select value={placeId} onChange={e => {
                    setPlaceId(e.target.value);
                }}>
                    {placeList.map(place =>
                        <option key={place.id} value={place.id}>{place.name}</option>
                    )}
                </select>
            </label>
            <hr/>
            <p>You are going to: {placeId || '???'} on {planetId || '???'} </p>
        </>
    );
}
