import React from "react";
import { useDispatch } from "react-redux";

import { searchByDiet } from "../actions";

const SearchByDiet = () => {

    const dispatch = useDispatch();
    

    const handleChange = ( event ) => {
        event.preventDefault();
        dispatch( searchByDiet ( event.target.value ))
        console.log( event.target.value);
    }

    return (
        <div>
            <select defaultValue="AllDietsTypes" className="selectDiet" onChange={( event ) => handleChange( event ) }>
                <option value="AllDietsTypes">  All Diets types </option>
                <option value="Vegan"> Vegan </option>
                <option value="Dairy free"> Dairy free </option>
                <option value="Lacto ovo vegetarian"> Lacto ovo vegetarian </option>
                <option value="Lacto-Vegetarian"> Lacto-Vegetarian </option>
                <option value="pescatarian"> Pescatarian </option>
                <option value="primal"> Primal </option>
                <option value="paleolithic"> Paleolithic </option>
                <option value="fodmap friendly"> Fodmap friendly </option>
                <option value="Ketogenic"> Ketogenic </option>
                <option value="Whole30"> Whole30 </option>
            </select>
        </div>
    )
}    
export default SearchByDiet;