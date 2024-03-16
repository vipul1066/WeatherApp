import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css"
import { useState } from "react";

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "9cc7ec65a4c0c7e268f17b662a90ccd4";

    let getWheatherInfo = async() =>{
        try{
          let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        let result = {
            city: city,
          temp: jsonResponse.main.temp,
          tempMin: jsonResponse.main.temp_min,
          tempMax: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          feelsLike: jsonResponse.main.feels_like,
          weather: jsonResponse.weather[0].description,
        };

        console.log(result);
        return result;
        } catch(err){
          throw error;
        }
    };


    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
      try {
        evt.preventDefault();
        setError(false); 
        console.log(city);
        setCity("");
        let newInfo = await getWheatherInfo();
        updateInfo(newInfo);
      } catch (err) {
        setError(true);
      }
    };


  return (
    <div className="SearchBox">
      <h2>Search for Weather</h2>
      <form onSubmit={handleSubmit}>
        <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
        <Button variant="contained" type="submit" >
          Search
        </Button>
        {error && <p style={{color:"red"}}>No Such place in our API</p>}
      </form>
    </div>
  );
}
