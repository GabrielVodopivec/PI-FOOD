import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../actions";

export default function Paginado () {

    const dispatch = useDispatch();

    const recipes = useSelector( ( state ) => state.recipes)
    const recipesPerPage = useSelector( ( state ) => state.recipesPerPage);
    const actualPage = useSelector( ( state ) => state.page)
    
    const numberOfPages = Math.ceil(recipes.length/recipesPerPage)

    const handlePrev = () => {
        let prev = parseInt( actualPage ) - 1
        dispatch( selectPage( prev ) )
    } 

    const handleNext = () => {
        let next = parseInt( actualPage ) + 1
        dispatch( selectPage( next ) )
    }
   
    return (
        <div className="paginado">
            <div className="contenedorBtnPaginado" >
                { (parseInt( actualPage ) !== 1) ? 
                <div>
                    <button onClick={ handlePrev } className= { `btn-pages` }>◀</button>
                </div> : null}
            </div>
            <div className="contenedorPagePaginado" >
                <div> {`${actualPage}/${numberOfPages}`} </div>
            </div>
            <div className="contenedorBtnPaginado" >
                { (parseInt( actualPage ) !== numberOfPages) ? 
                <div>
                    <button onClick={ handleNext } className= { `btn-pages` }>▶</button>
                </div> : null}
            </div>
        </div>
    )
}