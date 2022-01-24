
import { 
    ALPHABETIC_ORDER, 
    CLEAR_ERROR, 
    DELETE_RECIPE, 
    ERROR, 
    GET_ALL_RECIPES, 
    GET_DIETS, NEW_RECIPE, RECIPE_CREATED, RECIPE_DETAIL, 
    SCORE_ORDER, 
    SEARCH_RECIPE_BY_DIET, 
    SEARCH_RECIPE_BY_NAME, 
    SELECT_PAGE, 
    UPDATED_RECIPE} from "../actionTypes";

const objectStates = {
    recipes: [],
    detail: [],
    forFilter: [],
    dietsTypes: [],
    created: false,
    updated: false,
    deleted:false,
    mensajeDeError:'', 
    recipesPerPage: 36,
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

            let pivot = array[array.length-1]
            let izq = [];
            let der = [];
            
            for (var i = 0; i < array.length - 1; i++) {
                if (array[i].title.toLowerCase() < pivot.title.toLowerCase()) {
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
        case CLEAR_ERROR:
            return {
                ...state,
                mensajeDeError:''
            }
        case RECIPE_CREATED:
            return {
                ...state,
                created: true
            } 
        case NEW_RECIPE:
            return {
                ...state,
                created: false,
                updated: false
            }
        case UPDATED_RECIPE:{
            return {
                ...state,
                updated: true
            }
        }
        case DELETE_RECIPE: 
            return {
                ...state,
                deleted: true
            }
        default: return state;
    }
}

export default rootReducer;