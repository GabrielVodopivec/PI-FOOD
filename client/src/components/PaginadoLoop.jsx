import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../actions";

export default function PaginadoLoop () {

    const dispatch = useDispatch();
    const recipes = useSelector( ( state ) => state.recipes)
    const recipesPerPage = useSelector( ( state ) => state.recipesPerPage);
    
    const numberOfPages = Math.ceil(recipes.length/recipesPerPage)

    const paginado = ( numberOfPages ) => {
        let arrPages = []
        let page = 1
        while ( page <= numberOfPages ) {
            arrPages.push( page )
            page++
        }
        return arrPages
    } 

    const handleClick = ( event ) => {         
        event.preventDefault();
        dispatch( selectPage( event.target.value ) )
    } 
   
    return (
        <div className="paginadoLoop">
            { paginado( numberOfPages ).map( ( page ) => {
                return (
                    <button
                        key={page} 
                        value = {page}
                        name= {page}
                        className= { `btn-pages`}
                        onClick={ ( event ) => handleClick( event ) }                    
                    > 
                    {page} 
                    </button>
                )
            })}
        </div>
    )
}