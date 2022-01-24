import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { alphabeticOrder } from "../actions";



export default function AlphabeticOrder () {

    const dispatch = useDispatch();
    const recipes = useSelector( state => state.recipes)
    
    const handleAlphabeticOrder = ( event ) => {
        console.log(event)
        event.preventDefault();
        recipes.length && dispatch( alphabeticOrder( event.target.value ) ) 
        window.document.getElementsByClassName("selectAlphabetic")[0].value = "Alphabetic Order";    
    }

    return (
        <div>
            <select className="selectAlphabetic" defaultValue={"Alphabetic Order"} onChange={ handleAlphabeticOrder }>
                <option value="Alphabetic Order">Alphabetic order</option>
                <option value="asc">A-Z</option>
                <option value="dsc">Z-A</option>
            </select>
        </div>
    )
}