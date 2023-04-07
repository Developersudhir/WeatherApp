import React from 'react'
import setWheatherInfo from "../Components/Inputform";
import setWheatherlist from "../Components/Inputform";
import dispatch from "../Components/Inputform";
import { weatherDetailsList } from "../redux/WheatherSlice";

const Api = () => {


    const getWheatherInfo = async (Cname) => {
        let cityname = Cname.current.value;
        
        // let isFound = wheatherlist.findIndex((details) => {
        //   return details.name.toLowerCase() === cityname.toLowerCase();
        // });
        const Apikey = "69e73b17a32ff4c7e639008202862be5";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${Apikey}&units=metric`;
    
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
              // dispatch(weatherDetailsList(result));
            // }
            break;
    
          default:
            alert("something went wrong, try again");
            setWheatherInfo(null);
            break;
        }
      };
  return (
   <>
   </>
  )
}

export default Api;
export const {getWheatherInfo}=Api;

