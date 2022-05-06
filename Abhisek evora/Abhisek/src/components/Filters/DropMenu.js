import { useEffect, useState } from 'react';
import styles from './Filters.module.css';
import { useStore } from '../../Context/Store';

export const DropMenu = ({ setMenu }) => {

    const { drop_menu, control } = styles;
    const { filters, handleFilters } = useStore();
    const [ride, setRide] = useState([]);

    useEffect(() => {
        (async function () {
            await fetch('https://assessment.api.vweb.app/rides')
                .then(response => response.json())
                .then(res => {
                    setRide(res);
                });
        })()


    }, [setRide]);

    let stateList = ride.length > 0 && ride.map((item, i) => {
        return (
            <option key={i} value={item.state}>{item.state}</option>
        )
    }, this);

    let cityList = ride.length > 0 && ride.map((item, i) => {
        return (
            <option key={i} value={item.city}>{item.city}</option>
        )
    }, this);

    useEffect(() => {
        function handleCLick({ target }) {
            const menu = document.getElementsByClassName(drop_menu)[0];
            if (!menu.contains(target)) {
                setMenu(false);
            }
        }

        function handleKeyboard({ key }) {
            if (key === "Escape") {
                setMenu(false);
            }
        }

        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("click", handleCLick);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
            document.removeEventListener("click", handleCLick);
        }

    }, [drop_menu, setMenu]);

    return (

        <ul className={drop_menu} >
            <li>Filters</li>
            <li>
                <select
                    onChange={
                        ({ target }) => handleFilters({ ...filters, state: target.value })
                    }
                    value={filters.state}
                    className={control}>
                    <option value="">State</option>
                    {stateList}
                    {/* <option value="Washington">Washington</option>
                    <option value="California">California</option> */}
                </select>
            </li>
            <li>
                <select
                    onChange={
                        ({ target }) => handleFilters({ ...filters, city: target.value })
                    }
                    value={filters.city}
                    className={control}>
                    <option value="">City</option>
                    {cityList}
                    {/* <option value="Sheoganj">Sheoganj</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Los Angeles">Los Angeles</option> */}
                </select>
            </li>
        </ul>
    );
};