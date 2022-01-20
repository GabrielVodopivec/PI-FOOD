import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alphabeticOrder } from "../actions";
;

export default function AlphabeticOrder () {

    const recipes = useSelector( state => state.recipes)
    const dispatch = useDispatch();

    const handleAlphabeticOrder = ( event ) => {
        event.preventDefault();
        recipes.length && dispatch( alphabeticOrder( event.target.value ) )        
    }

    return (
        <div>
            <select className="selectAlphabetic" defaultValue={"Alphabetic Order"} onChange={ ( event ) => handleAlphabeticOrder( event ) }>
                <option value="Alphabetic Order">Alphabetic order</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
            </select>
        </div>
    )
}