import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

import { getPlacesData, getWeatherData } from "./components/api/index"

import alanBtn from '@alan-ai/alan-sdk-web';

const App = () => {
    const [places, setPlaces] = useState([])
    const [childClicked, setChildClicked] = useState(null)
    const [weatherData, setWeatherData] = useState([])

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_AI_API_KEY,
            onCommand: ({ command }) => {
              if (command === 'go:back') {
                // Call the client code that will react to the received command
              }
            }
        });
      }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({
                lat: latitude,
                lng: longitude
            })
        })
    }, [])

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);

        setFilteredPlaces(filtered);
    }, [rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data))

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    console.log(data)
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
                    setFilteredPlaces([])
                    setIsLoading(false)
                })
        }
    }, [type, bounds])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        childClicked={childClicked}
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App