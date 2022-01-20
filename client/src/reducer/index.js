
import { 
    ALPHABETIC_ORDER, 
    ERROR, 
    GET_ALL_RECIPES, 
    GET_DIETS, RECIPE_DETAIL, 
    SCORE_ORDER, 
    SEARCH_RECIPE_BY_DIET, 
    SEARCH_RECIPE_BY_NAME, 
    SELECT_PAGE } from "../actionTypes";

    const objectStates = {
        recipes: [],
        detail: [],
        forFilter: [],
    dietsTypes: [],
    mensajeDeError:'', 
    recipesPerPage: 8,
    page: 1  
};

const rootReducer = ( state = objectStates, action) => {

    switch (action.type) {
        
        case GET_ALL_RECIPES: 
        return {
            ...state,
            mensajeDeError:'',
            recipes: action.payload,
            forFilter: action.payload
            }
        case GET_DIETS:
            return{
                ...state,
                dietsTypes : action.payload
            }
        case RECIPE_DETAIL: 
        return {
            ...state,
            detail: action.payload
            }
        case SEARCH_RECIPE_BY_NAME: 
        return {
            ...state,
            mensajeDeError:'',
            recipes: action.payload,
            forFilter: action.payload
            }
        case SEARCH_RECIPE_BY_DIET:
            const recipesToFilter = state.forFilter;
            const dietType = action.payload;
            if ( dietType === "AllDietsTypes") {
                return {
                    ...state,
                    page: 1,
                    recipes: recipesToFilter
                }
            } else {
                const filtered = recipesToFilter.filter( ( recipe ) => {
                    return recipe.diets.some( ( diet ) => {
                        return diet.name.toLowerCase() === dietType.toLowerCase()
                    })})
                    if (filtered.length) {
                return {
                    ...state,
                    page:1,
                    recipes: filtered
                }} else {
                    return {
                        ...state,
                        mensajeDeError:'Recipe not found'
                    }
                }    
            }
        case ALPHABETIC_ORDER:
            const recipesToOrderByName = state.recipes;
            const alphabeticSorter = array => {
            if (array.length <= 1) return array;

            let pivot = array[0];
            let izq = [];
            let der = [];
            
            for (var i = 1; i < array.length; i++) {
                if (array[i].title < pivot.title) {
                    izq.push(array[i]);
                } else {
                    der.push(array[i]);
                }
            }
            if (action.payload === 'asc') {
                return [...alphabeticSorter(izq), pivot, ...alphabeticSorter(der)]
                } else if (action.payload === 'dsc') {
                    return [...alphabeticSorter(der), pivot, ...alphabeticSorter(izq)]
                } else {
                    return array;
                } 
            }
            return {
                ...state,
                page:1,
                recipes: alphabeticSorter( recipesToOrderByName )
            }
        case SCORE_ORDER:
            const recipesToOrderByScore = state.recipes;
            const scoreSorter = array => {
            if (array.length <= 1) return array;

            let pivot = array[0];
            let izq = [];
            let der = [];
            
            for (var i = 1; i < array.length; i++) {
                if (array[i].score < pivot.score) {
                    izq.push(array[i]);
                } else {
                    der.push(array[i]);
                }
            }
            if (action.payload === 'asc') {
                return [...scoreSorter(izq), pivot, ...scoreSorter(der)]
                } else if (action.payload === 'dsc') {
                    return [...scoreSorter(der), pivot, ...scoreSorter(izq)]
                } else {
                    return array;
                } 
            }
            return {
                ...state,
                page:1,
                recipes: scoreSorter( recipesToOrderByScore )
            }
        case SELECT_PAGE:
            return {
                ...state,
                page: action.payload
            }
        case ERROR:
            return {
                ...state,
                mensajeDeError: action.payload,
                
            }
        default: return state;
    }
}

export default rootReducer;