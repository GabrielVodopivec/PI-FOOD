import React from "react";
/* import { useState } from "react"; */
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { deleteRecipe } from "../actions";

export default function RecipeDetail ( props ) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const deleted = useSelector( state => state.deleted )

    const handleDelete = ( event ) => {
        event.preventDefault();
        /* setDeleteRecipe(true) */
        dispatch( deleteRecipe( id ) )
    }
    
    return (
        <>
        {
            !deleted ?
        <>
        <div className="recipeDetail">
            <div className="description">
                <h1> {props.recipe.title} </h1>
                <h2> {`Score ${props.recipe.score}`}  </h2>
                <h2> {`Health Score ${props.recipe.healthScore}`}  </h2>
                <div className="conteinerDiets-DishTypesDetail">
                    <div className="conteinerDietsDetail" >
                        <h2>Diets</h2>
                        {props.recipe.diets?.map( (diet, index) => {
                            return ( <div key={index} > {diet.name} </div> )
                        })}
                    </div>
                    <div className="conteinerDishtypesDetail" >
                        <h2>Dish Types</h2>
                        {props.recipe.dishTypes?.map( (dish, index) => {
                            return ( <div key={index} > {dish} </div> )
                        })}
                    </div>
                </div>
            </div>
            <div className="imageDetail">
                <div className="contenedorImagen">
                    <img src={props.recipe.img} alt="img not found" />
                </div>
                <div className="contenedorEditDeleteRcipeDetail">
                        {
                            props.recipe.dbRecipe ?
                            <div className="EditDeleteRcipeDetail" >
                                <div>
                                    <Link to = {`/recipeEditor/${props.recipe.id}`}>
                                        <button 
                                        className="finalButton"
                                        
                                        >Edit Recipe</button>
                                    </Link> 
                                </div>
                                <div>
                                    <button 
                                    className="finalButton" 
                                    onClick={ handleDelete }
                                    >Delete Recipe</button>
                                </div>
                            </div> 
                            : null                
                        }
                </div>
                <div className="conteiner-submitBtn" >
                    <Link to='/home'>
                        <button className="finalButton" >Go Home</button>
                    </Link>
                </div>
            </div>    
            <div className="instructions">
                <h2>Instructions</h2>
                <div className="containerInstrucions">
                {props.recipe.instructions?.map( (instruction, index) => {
                    return (
                        <div key={index}>
                            {
                                instruction.length ?
                                <>
                                <h3> {`Step number ${index+1}`} </h3>
                                <div> {instruction} </div>
                                </>
                                : null
                            }
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
            <div className="contenedor">
                <div className="summary">
                    <h3>Summary</h3>
                    {
                        props.recipe.summary
                        .replaceAll('<b>', '')
                        .replaceAll('</b>', '')
                        .replaceAll('<a href=', '')
                        .replaceAll('">', '". ')
                        .replaceAll('</a>', '')
                    }
                </div> 
            </div>
            </> : 
            <div>
                <h1>RECIPE DELETED</h1>
                <Link to= '/home'>
                    <button
                    className="finalButton"
                    >Go Home!</button>
                </Link>
            </div>
        }
        </>
    )
}

