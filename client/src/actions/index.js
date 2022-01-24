import axios from 'axios';

import { 
    ALPHABETIC_ORDER, 
    CLEAR_ERROR,  
    DELETE_RECIPE,  
    ERROR, 
    GET_ALL_RECIPES, 
    GET_DIETS, 
    NEW_RECIPE, 
    RECIPE_CREATED, 
    RECIPE_DETAIL, 
    SCORE_ORDER, 
    SEARCH_RECIPE_BY_DIET, 
    SEARCH_RECIPE_BY_NAME, 
    SELECT_PAGE,
    UPDATED_RECIPE,
    } from '../actionTypes';

export const getRecipes = () => {
    return dispatch => {
        axios(`http://localhost:3001/recipes`)
        .then( recipes => dispatch({
            type: GET_ALL_RECIPES,
            payload: recipes.data
        }))
        .catch( err => {
            console.log(err)
        })
    }
}
export const getDiets = () => {
    return dispatch => {
        axios(`http://localhost:3001/diets`)
        .then( diets => dispatch({
            type: GET_DIETS,
            payload: diets.data
        }))
    }
}
export const searchRecipe = (name) => {
    return dispatch => {
        axios(`http://localhost:3001/recipes?name=${name}`)
        .then( response => dispatch({
            type: SEARCH_RECIPE_BY_NAME,
            payload: response.data
        }))
        .catch ( err => dispatch({
            type: ERROR,
            payload: err.response.data
        }))
    }
}
export const searchByDiet = ( diet ) => {
    return {
        type: SEARCH_RECIPE_BY_DIET,
        payload: diet
    }
}
export const recipeDetail = (id) => {
    return dispatch => {
        axios(`http://localhost:3001/recipes/${id}`)
        .then( response => dispatch({
            type: RECIPE_DETAIL,
            payload: response.data
        }))
        .catch ( err => {
            console.log( err )
        })
    }
}
export const createRecipe = ( {
    title,
    img,
    diets,
    score,
    healthScore,
    summary,
    dishTypes,
    instructions
} ) => {
    return (dispatch) => {
        axios.post(`http://localhost:3001/recipes`, {
            title,
            img,
            diets,
            score,
            healthScore,
            summary,
            dishTypes,
            instructions
        })
        .then ( dispatch({
            type:RECIPE_CREATED,
            })
        )
        .catch ( err => {
            console.log(err)
        })
    }

}
export const newRecipe = () => {
    return {
        type: NEW_RECIPE
    }
}
export const alphabeticOrder = ( orderType ) => {
    return {
        type: ALPHABETIC_ORDER,
        payload: orderType
    }
}
export const scoreOrder = ( orderType ) => {
    return {
        type: SCORE_ORDER,
        payload: orderType
    }
}
export const selectPage = (number) => {
    return {
        type: SELECT_PAGE,
        payload: number
    }
}
export const clearError = () => {
    return  {
        type:CLEAR_ERROR
    }
}
export const updateRecipe = ({
    id,
    title,
    img,
    diets,
    score,
    healthScore,
    summary,
    dishTypes,
    instructions
}) => {
    return dispatch => {
        axios.put(`http://localhost:3001/recipes/${id}`, {
            title,
            img,
            diets,
            score,
            healthScore,
            summary,
            dishTypes,
            instructions
        })
        .then( dispatch({
            type:UPDATED_RECIPE
        }))
        .catch(err=>{
            console.log(err)
        })
    }
}

export const deleteRecipe = ( id ) => {
    return dispatch => {
        axios.delete(`http://localhost:3001/recipes/${id}`)
        .then( dispatch({
            type:DELETE_RECIPE
        }))
    }
} 