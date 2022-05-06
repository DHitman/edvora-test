import React, { useState, useContext, useEffect } from 'react';

const StoreContext = React.createContext();

export const useStore = () => useContext(StoreContext);



function StoreProvider({ children }) {

    const [user, setUser] = useState({});
    const [ride, setRide] = useState([]);
    const [filters, setFilters] = useState({ state: "", city: "" });
    const [status, setStatus] = useState(""); // upcoming, past


    // Fetching Date
    useEffect(() => {
        (async function () {
            await fetch('https://assessment.api.vweb.app/user')
                .then(response => response.json())
                .then(res => {
                    setUser(res);
                });
            await fetch('https://assessment.api.vweb.app/rides')
                .then(response => response.json())
                .then(res => {
                    setRide(res);
                });
        })()


    }, [setUser, setRide]);

    // Hnadle Rides 
    // handle up coming rides
  

    function selectUpcomingRides() {
        const date = new Date().getTime();

        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;
            const objDate = new Date(obj.date).getTime()
            return (objDate > date) && filterState && filterCity
        });
    }


   
//   handle past rides

    function selectPastRides() {
        const date = new Date().getTime();

        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;
            const objDate = new Date(obj.date).getTime()

            return (objDate < date) && (filterState && filterCity)
        });
    }



    
    // handling ( All Rides )
   
    

    function selectAllRides() {
        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;

            return filterState && filterCity
        });
    }

    
    //  handling rides
    

    const getRides = () => {
        switch (status) {
            case "upcoming":
                return selectUpcomingRides();
            case "past":
                return selectPastRides();
            default:
                return selectAllRides();
        }
    }


    
        //   handling status State and Filter State 
      

    const handleStatus = (state) => {
        setStatus(state);
    }

    const handleFilters = (obj) => {
        setFilters(obj);
    }

    const value = {
        handleStatus,
        handleFilters,
        selectUpcomingRides,
        selectPastRides,
        getRides,
        filters,
        status,
        ride,
        user,
    };


    return (
        <StoreContext.Provider value={value} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;