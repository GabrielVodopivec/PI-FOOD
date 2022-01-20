import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { recipeDetail } from "../actions";
import RecipeDetail from "./RecipeDetail";

export default function Detail () {

    const { id } = useParams();
    const dispatch = useDispatch();

    const recipe = useSelector( state => state.detail);
    
    useEffect( () => {
        dispatch( recipeDetail( id ) );
    }, [dispatch, id])

    return (
        <>
              { recipe.length && <RecipeDetail recipe = {recipe[0]}  /> }
        </>
        
    )
}