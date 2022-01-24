import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDiets, recipeDetail } from "../actions";

import RecipeEditor from "./RecipeEditor";

export default function Editor () {

    const { id } = useParams()
    const dispatch = useDispatch();
    const detail = useSelector( state => state.detail)
    
    useEffect(()=> {
        console.log('Editor Montado')
        dispatch( getDiets() )
        dispatch( recipeDetail( id ) )
    },[ dispatch, id ])

    return (
      <>
      {
          detail.length && <RecipeEditor prevInfo = {detail[0]} /> 
          
      }
      </>  
    )
}