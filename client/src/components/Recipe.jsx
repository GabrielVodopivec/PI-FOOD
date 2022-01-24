import React from "react";
import { Link } from "react-router-dom";

export default function Recipe ( { id, title, img, diets, vegetarian, vegan, glutenFree, score } ) {
    return (
        <div className="recipe">
            <h2 className="titlesRecipesCards" > {title} </h2>
            <div className="lineDeSparacion"></div>
            <div className="score" > {`Score ${score} `} </div>
            <h2 className="titleDietsRecipeCard" >Diets</h2>
            <div  className="diets">
            { diets.map( (el, index) => {
                    return ( <div key={index} > {el.name} </div> )
                    })
            }
            { vegetarian && <div> vegetarian </div> }
            {/* { vegan && <div> vegan </div> }
            { glutenFree && <div> gluten Free </div>} */}
            </div>
            <Link className="imagens" to = {`/detail/${id}`}>
            <img className="images" src={img} alt="img not found" />
            </Link>
        </div>
    )
}