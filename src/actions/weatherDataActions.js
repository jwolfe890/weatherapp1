import fetchJsonp from 'fetch-jsonp'
import { stopFetchingData } from './fetchingDataActions';

const APIURL = `https://api.darksky.net/forecast/e7f5012fb3b8e7d1ad843035fd4df7ad/`


export const fetchWeatherData = () => {
  return dispatch => { 
    return navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      
      fetchJsonp(`${APIURL}${latitude},${longitude}`)
        .then(response => response.json())
        .then(weatherData => {
          dispatch(receivedchangeWeatherData(weatherData))
          dispatch(stopFetchingData())
        })
      });
    }
  }

const receivedchangeWeatherData = weatherData => {
  return {
    type: "RECEIVED_WEATHER_DATA",
    weatherData
  }
}

