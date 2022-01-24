import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDiets } from "../actions";
import { getRecipes } from "../actions";

import NavBar from "./NavBar";
import Recipe from "./Recipe";
import ErrorComponent from "./ErrorComponent";

export default function Home () {

    const dispatch = useDispatch();

    const allRecipes = useSelector( state => state.recipes )
    const recipesPerPage = useSelector( state => state.recipesPerPage );
    const actualPage = useSelector ( state => state.page );
    const error = useSelector( state => state.mensajeDeError )
    /* const diets = useSelector( state => state.dietsTypes ) */

    const last = actualPage * recipesPerPage;
    const first = last - recipesPerPage;
    const recipesToShow = allRecipes.slice( first, last )

    useEffect ( () => {
       dispatch( getRecipes() )
       dispatch( getDiets() )
    }, [dispatch])

    return (
        <>
         
            <div>
                <NavBar />
            </div>
        
            
            { error.length ?
                <div> <ErrorComponent /> </div> :
                <div className="recipes">
                    {recipesToShow.map((el) => {
                        return (
                            <div className="cards" key={el.id}>
                                <Recipe
                                    id={el.id}
                                    title={el.title}
                                    score={el.score}
                                    img={el.img}
                                    diets={el.diets}
                                    vegetarian={el.vegetarian}
                                    vegan={el.vegan}
                                    glutenFree={el.glutenFree} />
                            </div>
                        );
                    })}
            </div>
            }
            
        </>
    )
}