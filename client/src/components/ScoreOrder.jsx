import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { scoreOrder } from "../actions";


export default function ScoreOrder () {

    const recipes = useSelector( ( state ) => state.recipes)
    const dispatch = useDispatch()

    const handleScoreOrder = ( event ) => {
        event.preventDefault();
        recipes.length && dispatch( scoreOrder( event.target.value ) )
    }

    return (
        <div>
            <select className="selectScore" defaultValue={"Score Order"} onChange={ ( event ) => handleScoreOrder( event ) } >      
                <option value="Score Order"> Score Order </option>
                <option value="dsc">Highest first</option>
                <option value="asc">Lowest first</option>
            </select>
        </div>
    )
}