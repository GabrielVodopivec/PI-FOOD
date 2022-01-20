import React from "react";
import { Link } from "react-router-dom";

export default function Recipe ( { id, title, img, diets, vegetarian, vegan, glutenFree, score } ) {
    return (
        <div className="recipe">
            <h2 className="titles" > {title} </h2>
            <div className="score" > {`Score ${score} `} </div>
            <h2>Diets</h2>
            <div  className="diets">
            { diets.map( (el, index) => {
                    return ( <div key={index} > {el.name} </div> )
                    })
            }
            { vegetarian && <div> Vegetarian </div> }
            { vegan && <div> Vegan </div> }
            { glutenFree && <div> Gluten Free </div>}
            </div>
            <Link className="imagens" to = {`/detail/${id}`}>
            <img className="images" src={img} alt="img not found" />
            </Link>
        </div>
    )
}