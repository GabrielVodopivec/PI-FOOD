import React from "react";

export default function RecipeDetail ( props ) {
    
    return (
        <>
        <div className="recipeDetail">
            <div className="description">
                <h1> {props.recipe.title} </h1>
                <h2> {`Score ${props.recipe.score}`}  </h2>
                <h2> {`Health Score ${props.recipe.healthScore}`}  </h2>
                <div>
                    <h2>Diets</h2>
                    {props.recipe.diets?.map( (diet, index) => {
                        return ( <div key={index} > {diet.name} </div> )
                    })}
                </div>
                <div>
                    <h2>Dish Types</h2>
                    {props.recipe.dishTypes?.map( (dish, index) => {
                        return ( <div key={index} > {dish} </div> )
                    })}
                </div>
            </div>
            <div className="imageDetail">
                <div className="contenedorImagen">
                <img src={props.recipe.img} alt="img not found" />
                </div>
            </div>    
            <div className="instructions">
                <h2>Instructions</h2>
                <div className="containerInstrucions">
                {props.recipe.instructions?.map( (instruction, index) => {
                    return (
                        <div key={index}>
                            <h3> {`Step number ${index+1}`} </h3>
                            <div> {instruction} </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
            <div className="contenedor">
               
                <div className="summary">
                    {`${props.recipe.summary}`}
                </div> 
                
   
            </div>
        </>
    )
}

