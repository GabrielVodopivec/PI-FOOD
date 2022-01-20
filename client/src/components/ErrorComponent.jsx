import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../actions";

export default  function ErrorComponent () {

    const dispatch = useDispatch()

    const mensajeDeError = useSelector( state => state.mensajeDeError)

    const handleClick = () => {
        dispatch(getRecipes())
    }

    return (
        <div className="errorMessage">
            <div className="conteinerError">
                <h1 >{mensajeDeError}</h1>
                <Link to = '/home'>
                    <button className="btn-allRecipes-newRecipes" onClick={handleClick}> All Recipes </button>
                </Link> 
            </div>
            {/* <img className="errorImg" src="https://static.vecteezy.com/system/resources/previews/002/799/764/non_2x/empty-plate-or-dish-with-knife-fork-and-spoon-on-wood-tile-background-free-photo.jpg" alt="img not found" /> */}
        </div>
    )
}