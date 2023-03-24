import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';

function App() {

  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  console.log(data?.weather)
  // date and time 
  const locale = 'en';
  const today = new Date();

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = ` ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="row">
            <div className="col-12 left">
              {/* input button and date  */}
              <div className="row top">
                <div className="d-grid gap-3 col-4 mt-4">
                  <input type="text" className="form-control"
                    value={inputCity}
                    onChange={handleChangeInput} />
                  <button className="btn btn-primary" type="button"
                    onClick={handleSearch}
                  >Search</button>
                </div>
                <div className="col"><h5>{date}</h5></div>
                <div className="col">{data?.weather?.description}</div>
              </div>
              {/* tem  */}
              <div className="row m-0">
                <div className="col-7 float-left  m-0">
                  {Object.keys(data).length > 0 &&
                    <div className=" wetherResultBox">
                      <h5 className="weathorCity">
                        {data?.name}
                      </h5>
                      <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
                    </div>
                  }
                </div>
                <div className="col-5 float-left p-5"><p>{time}</p><h2><b>{day}</b></h2><p>{data?.weather?.description}</p></div>
              </div>
              {/* wind speed sunrise sunset  */}
              <div className="row bottom">
                <div className="col-12"><hr /></div>
                <div className="col-2 border">
                  <div className="text-center" style={{'fontWeight':'bold'}}>wind Speed</div>
                  <div className="text-center"><b>{data?.wind?.speed}</b></div>
                </div>
                <div className="col-2 border">
                  <div className="text-center"style={{'fontWeight':'bold'}}>wind deg</div>
                  <div className="text-center"><b>{data?.wind?.deg}</b></div>
                </div>
                <div className="col-2 border">
                  <div className="text-center"style={{'fontWeight':'bold'}}>Sunrise</div>
                  <div className="text-center"><b>{data?.sys?.sunrise}</b></div>
                </div>
                <div className="col-2 border">
                  <div className="text-center"style={{'fontWeight':'bold'}}>Sunset</div>
                  <div className="text-center"><b>{data?.sys?.sunset}</b></div>
                </div>
                <div className="col-2 border">
                  <div className="text-center"style={{'fontWeight':'bold'}}>Humidity</div>
                  <div className="text-center"><b>{data?.main?.humidity}</b></div>
                </div>
                <div className="col-2 border">
                  <div className="text-center"style={{'fontWeight':'bold'}}>Pressure</div>
                  <div className="text-center"><b>{data?.main?.pressure}</b></div>
                </div>
                <div className="col-2 border"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
