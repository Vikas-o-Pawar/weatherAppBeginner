import { React, useState } from 'react'
import classes from './WeatherComp.module.css'

export default function WeatherComp() {
    const [cityName, setCityName] = useState("Mumbai");
    const [cityJson, setCityJson] = useState({});
    const [gotResponse, setGotResponse] = useState(false);
    // fa30c4ce491fcc761a7253b5f41cb7f0

    const searchCityHandler = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=fa30c4ce491fcc761a7253b5f41cb7f0`
            const response = await fetch(url);

            if (response.status === 200) {
                const resJson = await response.json();
                setGotResponse(true)
                setCityJson(resJson)
            } else {
                // setCityName("Not Found")
                throw new Error('City not found.')
            }
        } catch (error) {
            console.log('Error:', error);
            setGotResponse(false);
            setCityJson({});
        }

    }

    return (
        <section className={classes.mainWeatherSection}>
            <div className={classes.weatherCard}>
                <h2>Your Weather App</h2>
                <input type="search" placeholder="Enter the place's name here" onChange={
                    (event) => {
                        setCityName(event.target.value)
                    }
                } />
                <button onClick={searchCityHandler}>search</button>

                <div className="weatherOutputDiv">
                    {gotResponse &&
                        <div>
                            <p className={classes.cityName}>City: {cityName}</p>
                            <p className={classes.temperature}>Temp: {cityJson.main.temp} deg Cel</p>
                            <span>Main: {cityJson.main.temp_min}deg Cel | Max: {cityJson.main.temp_max}deg Cel</span>
                        </div>
                    }

                    {!gotResponse &&
                        <p>Nothing to show. Please input the city</p>
                    }
                </div>
            </div>
        </section>
    )
}
