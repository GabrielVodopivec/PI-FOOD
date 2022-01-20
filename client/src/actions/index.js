import axios from 'axios';
import { 
    ALPHABETIC_ORDER, 
    CREATE_RECIPE, 
    ERROR, 
    GET_ALL_RECIPES, 
    GET_DIETS, 
    RECIPE_DETAIL, 
    SCORE_ORDER, 
    SEARCH_RECIPE_BY_DIET, 
    SEARCH_RECIPE_BY_NAME, 
    SELECT_PAGE} from '../actionTypes';

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
    return dispatch => {
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
        .then ( () => dispatch({
            type:CREATE_RECIPE,
        }))
        .catch ( err => {
            console.log(err)
        })
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