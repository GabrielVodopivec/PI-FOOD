import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getRecipes } from "../actions";

import SearchBar from "./SearchBar";
import AlphabeticOrder from "./AlphabeticOrder";
import ScoreOrder from "./ScoreOrder";
import Paginado from "./Paginado";
import SearchByDiet from "./SearchDiet";
import ErrorComponent from "./ErrorComponent";
import PaginadoLoop from "./PaginadoLoop";

export default function NavBar () {

    const dispatch = useDispatch();

    const quantity = useSelector( state => state.recipes);
    const error = useSelector( state => state.mensajeDeError )

    const handleClick = () => {
        dispatch( getRecipes() )
    }
    return (
        <>
        { ( error.length ) ? <ErrorComponent /> : <div className="navbar">
            <div className="conteinerNavBar">
                <div className="title-allRecipes" >
                    <h1 className="pageTitle" >R C TAS PARA TO2</h1>
                    <div className="quantity-button">
                    <button className="btn-allRecipes-newRecipes" onClick={handleClick}> All Recipes </button>
                    { ( quantity.length ) ? <div className="quantity"> {`We found ${quantity.length} recipes`} </div> : null }
                    </div>
                </div>
                <div className="inputs" >
                    <SearchBar/>
                    <div className="orderInputs">
                        <AlphabeticOrder />
                        <ScoreOrder />
                        <SearchByDiet />
                    </div>
                    <PaginadoLoop />
                    <Paginado />
                </div>
                <div className="create-recipe">
                    <h2 className="createRecipeTitle">Create your own recipe</h2>
                    <Link to ='/form'>
                        <button className="btn-allRecipes-newRecipes">New Recipe</button>
                    </Link>
                </div>
                </div>
        </div>}
        </>
    )
}