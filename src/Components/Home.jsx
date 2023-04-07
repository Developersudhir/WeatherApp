import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherDetailsList } from "../redux/WheatherSlice";
import './index.css';

const Home = () => {
  const Cname = useRef();

  const [wheatherInfo, setWheatherInfo] = useState(null); // Save Only one city wheather Info
  const [wheatherlist, setWheatherlist] = useState([]); // Save All city Details List
  let dispatch = useDispatch();
  const storedData = useSelector((state) => {
    return state.wheather;
  });
  // console.log(storedData[0].name);

  const getWheatherInfo = async (Cname) => {
    let cityname = Cname.current.value;

    const Apikey = "69e73b17a32ff4c7e639008202862be5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${Apikey}&units=metric`;

    if (cityname !== "") {

      const response = await fetch(url);
      const result = await response.json();
      switch (Number(result.cod)) {
        case 404:
          alert("City Not Found");
          setWheatherlist(null);
          break;

        case 200:
          setWheatherInfo(result);
          dispatch(weatherDetailsList(result));
          break;

        default:
          alert("something went wrong, try again");
          setWheatherInfo(null);
          break;
      }

    }
    else {
      alert("Please Enter Valid City Name");
    }
    // console.log(wheatherlist);
  };

  const getWheatherdetails = () => {
    getWheatherInfo(Cname);
    Cname.current.value = "";
  };

  return (
    <>
      <div className="main d-flex vh-100 bg-dark">
        <div className="side1 vh-100 bg-dark bg-opacity-10 w-25 border border-3 border-danger rounded">
          <h1 className="text-light my-4 ms-4">Wheather App</h1>
          <div className="inputbox bg-light bg-opacity-25 w-75 border border-1 border-info rounded-2 mx-auto mt-5">
            <div className="mb-3 p-2">
              <label htmlFor="Cityname" className="form-label mb-2 fw-medium">
                City Name
              </label>
              <input
                type="text"
                className="form-control bg-secondary bg-opacity-10 text-light fw-bold text-uppercase"
                id="Cityname"
                placeholder="Enter City Name"
                name="Cname"
                ref={Cname}
                required

              // onKeyUp={getCityname}
              />
            </div>
            <div className="mb-3 text-center p-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  getWheatherdetails();
                }}
              >
                Submit
              </button>
            </div>
          </div>
          {wheatherInfo ? (
            <div className="card bg-light bg-opacity-50">
              <div className="card-body">
                <span className="fw-medium mx-auto w-25">Temperature</span>
                <h4 className="card-title text-center mb-3">{wheatherInfo.main.temp_max} deg/cel</h4>
                <h6 className="card-text text-center fw-medium mb-3">
                  wheather: {wheatherInfo.weather[0].main}
                </h6>
                <h5 className="card-text text-center fw-sm mt-3">City : {wheatherInfo.name} ({wheatherInfo.sys.country})</h5>
              </div>
            </div>
          ) : null}

        </div>
        <div className="side2 w-75 bg-secondary vh-100">

          <div className="topside bg-dark w-100">
            <h2 className="mx-auto w-50 text-light">Recently Serach Places</h2>
            <div className="d-flex">

              {storedData ? (
                storedData.slice(0, 3).map((item) => (
                  <>
                    <div className="card-box bg-light w-25 h-50 m-5 rounded-2 border border-2  p-4 text-center border-primary bg-opacity-25" key={item.id}>
                      <h3 className="m-2">City {item.name}</h3>
                      <h5 className="m-2">Wheather {item.weather[0].main}</h5>
                      <h5 className="m-2">Temperature {item.main.temp_max}</h5>
                      <h6 className="m-2">Min.Temp {item.main.temp_min}</h6>
                    </div>
                  </>
                ))
              ) : null}
            </div>

          </div>
          <div className="down bg-success w-100" id="down">

            <>
              <div className="ms-5 d-flex text-light">
                <div className="card-box bg-light w-25 h-50 m-5 rounded-2 border border-2  p-4 text-center border-danger bg-opacity-25">
                  <h4 className="m-2">Wind Status</h4>
                  {wheatherInfo ? (
                    <h5 className="m-2"><span className="badge bg-dark">{wheatherInfo.wind.speed} mph</span></h5>
                  ) : null}
                </div>
                <div className="card-box bg-light w-25 h-50 m-5 rounded-2 border border-2  p-4 text-center border-danger bg-opacity-25">
                  <h4 className="m-2">Humidity</h4>
                  {wheatherInfo ? (
                    <h5 className="m-2"><span className="badge bg-dark">{wheatherInfo.main.humidity} %</span></h5>
                  ) : null}
                </div>
              </div>
              <div className=" ms-5 d-flex text-light">
                <div className="card-box bg-light w-25 h-50 m-5 rounded-2 border border-2  p-4 text-center border-danger bg-opacity-25">
                  <h4 className="m-2">Air Pressure</h4>
                  {wheatherInfo ? (
                    <h5 className="m-2"><span className="badge bg-dark">{wheatherInfo.main.pressure}</span></h5>
                  ) : null}
                </div>

                <div className="card-box bg-light w-25 h-50 m-5 rounded-2 border border-2  p-4 text-center border-danger bg-opacity-25">
                  <h4 className="m-2">Visibility</h4>
                  {wheatherInfo ? (
                    <h5 className="m-2"><span className="badge bg-dark">{wheatherInfo.visibility}</span></h5>
                  ) : null}
                </div>
              </div>
            </>

          </div>
        </div>

      </div>
    </>
  );
};

export default Home;