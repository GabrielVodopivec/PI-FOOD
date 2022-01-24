import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getRecipes, newRecipe } from "../actions";
import { createRecipe } from "../actions";
import { getDiets } from "../actions";

const RecipeCreator = () => {

    const dispatch = useDispatch()

    const dietsTypes = useSelector( state => state.dietsTypes)
    const recipeCreated = useSelector( state => state.created )

    useEffect( () => {   
        !dietsTypes.length && dispatch( getDiets() )
    }, [dispatch, dietsTypes])
    
    const instruction = '';
    const dish = '';

    const [ recipe, setRecipe ] = useState({
        title:'',
        healthScore:'',
        summary:'',
        img:'',
        diets: [],
        score: '',
        dishTypes: [],
        instructions: []
    });

    const [ errorType, setErrorType ] = useState({
        score: '',
        healthScore:'',
        title:''
    })   
    
    const validator = ( event ) => {
        
        event.preventDefault()
        const data = event.target.value
        
        switch ( event.target.name ) {
            
            case 'SCORE':
                ( data > 100 ) ?
                setErrorType({ ...errorType, score : 'Max Score: 100'}) :
                setErrorType({ ...errorType, score : ''})
                setRecipe( { 
                    ...recipe,
                    score: data 
                } )
                break;
            case 'HEALTHSCORE':
                ( data > 100 ) ?
                setErrorType({ ...errorType, healthScore : 'Max Health Score: 100'}) :
                setErrorType({ ...errorType, healthScore : ''})
                setRecipe( { 
                    ...recipe,
                    healthScore: data 
                } )
                break;
            case 'TITLE':
                const reg = /[^\w\s\d!.,]/;
                /* [...  ]   CONJUNTO */
                /* [^ ...]   COMPLEMENTO */
                /* RECONOCE CUALQUIER COSA QUE NO SEA LETRAS(\w), ESAPCIOS(\s), NUMEROS(\d) Y ALGUNOS SIGNOS DE PUNTUACION */
                console.log( reg.test( data ) )
                reg.test( data ) ? 
                setErrorType({ ...errorType, title: 'Do not use special caracters. Only "!" allowed' }) :
                setErrorType({ ...errorType, title: '' })
                break;

            default: break;
                
        }
        
    }

    const handleChange  = ( event ) => {
        const data = event.target.value;
        switch ( event.target.name ) {
            case 'TITLE':
                event.preventDefault()
                return setRecipe( { 
                    ...recipe,
                    title: data 
                })
            case 'DISH':
                event.preventDefault()
                const newDishType = [...recipe.dishTypes]
                newDishType[event.target.id] = data
                return setRecipe( { 
                    ...recipe,
                    dishTypes: newDishType 
                } )           
            case 'INSTRUCTION':
                event.preventDefault()
                const newInstructions = [...recipe.instructions]
                newInstructions[event.target.id] = data
                return setRecipe( { 
                    ...recipe,
                    instructions: newInstructions
                } )
            case 'DIETS':
                return setRecipe( () => {
                    if(event.target.checked) {
                        return { 
                            ...recipe,
                            diets: [ ...recipe.diets, data ] 
                        } 
                    } else { 
                        let filteredRecipes = []
                        let i = 0
                        while( i < recipe.diets.length) {
                            if(recipe.diets[i] !== data) {
                                filteredRecipes = [
                                    ...filteredRecipes, 
                                    recipe.diets[i]
                                ]
                            }
                            i++
                        }
                        return {
                            ...recipe,
                            diets: filteredRecipes
                        }
                    } 
                })
                
            default: break;
        }
    } 
/*     const handleTitle = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            title: event.target.value 
        })
    } */
/*     const handleHealthscore = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            healthScore: event.target.value 
        } )
    } */
    const handleSummary = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            summary: event.target.value 
        } )
    }
    const handleImg = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            img: event.target.value 
        } )
    }
/*     const handleDiets = ( event ) => {
        
        setRecipe( () => {

            const newDiet = event.target.value;

            if(event.target.checked) {
                return { 
                    ...recipe,
                    diets: [ ...recipe.diets, newDiet ] 
                } 
            } else {
                
                let filteredRecipes = []
                let i = 0
                
                while( i < recipe.diets.length) {
                    if(recipe.diets[i] !== newDiet) {
                        filteredRecipes = [
                            ...filteredRecipes, 
                            recipe.diets[i]
                        ]
                    }
                    i++
                }
                
                return {
                    ...recipe,
                    diets: filteredRecipes
                }
            } 
        })
    }    */
    /* const handleScore = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            score: event.target.value 
        } )
    } */
/*     const handleDishTypes = ( event ) => {
        event.preventDefault();
        
        const newDishType = [...recipe.dishTypes]
        newDishType[event.target.id] = event.target.value
        setRecipe( { 
            ...recipe,
            dishTypes: newDishType 
        } )
    } */
/*     const handleInstructions = ( event ) => {
        event.preventDefault()
        
        const newInstructions = [...recipe.instructions]
        newInstructions[event.target.id] = event.target.value
        setRecipe( { 
            ...recipe,
            instructions: newInstructions
        } )
    } */
/*     const handleClickAddInstruction = ( event ) =>{
        event.preventDefault();
        setRecipe({
            ...recipe,
            instructions: [...recipe.instructions, instruction ]
        })
    }
 */
    const handleAdd = ( event ) => {
        console.log(event.target.name)
        switch( event.target.name ) {
            case 'DISH':
                event.preventDefault();
                return setRecipe({
                    ...recipe,
                    dishTypes: [...recipe.dishTypes, dish ]
                })
            case 'INSTRUCTION':
                event.preventDefault();
                return setRecipe({
                    ...recipe,
                    instructions: [...recipe.instructions, instruction ]
                })
            default: return
        }
    }
    const handleClickRemoveInstruction = ( event ) => {
        event.preventDefault();
        recipe.instructions.pop()
        setRecipe({
            ...recipe,
            instructions: [...recipe.instructions]
        })
    }
/*  const handleClickAddDish = ( event ) => {
        event.preventDefault();
        setRecipe({
            ...recipe,
            dishTypes: [...recipe.instructions, dish ]
        })
    } */
    const handleClickRemoveDish = ( event ) => {
        event.preventDefault();
        recipe.dishTypes.pop()
        setRecipe({
            ...recipe,
            dishTypes: [...recipe.dishTypes]
        })
    }
    const handleSubmit = () => {
        
        console.log( recipe )
        dispatch( createRecipe( recipe ) )
        setRecipe({
            title:'',
            healthScore:0,
            summary:'',
            img:'',
            diets: [],
            score: 0,
            dishTypes: [],
            instructions: []
        })
    }
    const handleNewRecipe = () => {
        dispatch(newRecipe())
        dispatch(getRecipes())
    } 

    return (
        <>
        {
        !recipeCreated ?
        <div className="FormCreator-GoHome" >
        <form 
        className="fullCreator"
        onChange={ handleChange } 
        onSubmit={ handleSubmit }
        
        >
           
                <div className="recipeCreator" >

                    <div className="firstCol">
                        <div className="titleFirstCol" >
                        <h2>Main information</h2>
                        </div>
                        <div className="box" /* TITULO */ >
                            
                            <h3 className={ errorType.title && "titleMainError"} >Recipe title</h3>
                            
                            <input
                            className="mainInputs" 
                            type="text" 
                            name="TITLE" 
                            placeholder="Recipe title"
                            defaultValue={''} 
                            onChange={ validator }
                            />
                        
                        </div>
                        <div className="box" /* SUMMARY */ >

                            <h3>Summary</h3>

                            <textarea
                            type="text" 
                            className="summaryCreatorTextArea"
                            value={ recipe.summary } 
                            onChange={ handleSummary }
                            name="Summary" 
                            placeholder="Recipe's Summary"
                            cols="30" 
                            rows="10"
                            />
                            
                        </div>
                        <div className="box" /* SCORE */ >

                            <h3 className={ errorType.score && "titleMainError" } >Score</h3>
                                
                            <input
                            className="mainInputs"
                            type="number"
                            name="SCORE"
                            id="score" 
                            min='0'
                            
                            value={ recipe.score } 
                            onChange={ validator }
                            
                            />
                            
                            
                        </div>
                        <div className="box" /* HEALTH SCORE */ >

                            <h3 className={ errorType.healthScore && "titleMainError"} >Health Score</h3>

                            <input 
                            className="mainInputs"
                            type="number"
                            name="HEALTHSCORE" 
                            min='0'
                           
                            value={ recipe.healthScore }
                            onChange={ validator}
                            />
                            
                        </div>
                        <div className="box" /* URL DE LA IMAGEN */ >

                            <h3>Url de la imagen</h3>
                            
                            <input 
                            className="mainInputs"
                            type="url" 
                            name="url"
                            id="url"
                            placeholder="https://example.com"
                            value={ recipe.img }
                            pattern="https://.*" size="30"
                            required
                            onChange={ handleImg }
                            />
                            <span className="validity"></span>
                            
                        </div>
                    </div>
                        
                    <div className="contendorCreatorDiets">
                        <div className="internoCreatorDiets">
                            <h2>Diet types</h2>
                            {
                                dietsTypes.map( ( el, index ) => {
                                    return (
                                        
                                        <div key={index} className="divCheckbox">
                                           
                                            <input 
                                            className="selectDiet-creator"
                                            key={el.id}
                                            type="checkbox"
                                            id={el.name} 
                                            name='DIETS'
                                            value={el.name}
                                            onChange={ handleChange } 
                                            />
                                            
                                            <label className="labelito" htmlFor={el.name}  > 
                                                {el.name} 
                                            </label>
                                            </div>
                                            
                                            )
                                        })
                                    }  
                        </div>
                    </div>
                    
                    <div className="conteinerCreatorInstructions">
                        <h2>Instructions</h2>
                            <div className="conteinerBtnsInstructions">
                                <div className="creatorInstructionbtn">

                                    { 
                                        (recipe.instructions.length < 6) ?
                                        <button 
                                        className="addRemoveBtn-Creator"
                                        name="INSTRUCTION"
                                        onClick={ handleAdd }
                                        > ADD </button> : null
                                    }

                                </div>
                                <div className="creatorInstructionbtn" >

                                    {
                                        recipe.instructions.length ?
                                        <button 
                                        className="addRemoveBtn-Creator"
                                        onClick={ handleClickRemoveInstruction }
                                        > REMOVE </button> :
                                        null
                                    }
                                    
                                </div>
                            </div> 
                        {
                            recipe.instructions.length ? 
                            recipe.instructions.map( ( element, index ) => (
                                <div key={ index  }  className="creatorStepsInstructions" >
                                    
                                    {/* <h3 key={ index  } >{ `Step ${ index + 1 }` }</h3> */}
                                    
                                    <textarea
                                    className="instructionsCreatorTextArea"
                                    
                                    id={index}
                                    name="INSTRUCTION"
                                    type="text" 
                                    placeholder={ `Step ${ index + 1 }` }
                                    cols="45" 
                                    rows="20"
                                    value={ recipe.instructions[index] } 
                                    onChange={ handleChange }
                                    />
                                    
                                    
                                </div>
                            )) : null       
                        }   
                                        
                    </div>

                    <div className="conteinerCreatorInstructions">
                        <h2>Dish Types</h2>
                            <div className="conteinerBtnsInstructions">
                                <div className="creatorInstructionbtn">

                                    { 
                                        (recipe.dishTypes.length < 6) ?
                                        <button 
                                        className="addRemoveBtn-Creator"
                                        name="DISH"
                                        onClick={ handleAdd }
                                        > ADD </button> : null
                                    }

                                </div>
                                <div className="creatorInstructionbtn" >

                                    {
                                        recipe.dishTypes.length ?
                                        <button 
                                        className="addRemoveBtn-Creator"
                                        onClick={ handleClickRemoveDish }
                                        > REMOVE </button> :
                                        null
                                    }
                                    
                                </div>
                            </div> 
                        {
                            recipe.dishTypes.length ? recipe.dishTypes.map( ( element, index ) => (
                                <div key={ index  } className="creatorStepsInstructions" >
                                    
                                    {/* <h3 key={ index  } >{ `Dish Tpye # ${ index + 1 }` }</h3> */}
                                    
                                    {/* <textarea
                                    className="instructionsCreatorTextArea"
                                    
                                    id={ index }
                                    type="text" 
                                    placeholder={ `Add Dish Tpye ${ index + 1 }` }
                                    cols="45" 
                                    rows="2"
                                    value={ recipe.dishTypes[index] } 
                                    onChange={ handleChange }
                                    /> */}
                                    <input
                                    className="dishTypesCreatorinputs"
                                    name='DISH'
                                    
                                    id={ index }
                                    type="text" 
                                    placeholder={ `Add Dish Tpye ` }
                                    value={ recipe.dishTypes[index] } 
                                    onChange={ handleChange }
                                    />
                                    
                                    
                                </div>
                            )) : null       
                        }   
                                        
                    </div>

                </div>
                <div className="conteinerProblemas-Submit-Creator">
                <div className="problemasCreator" >
                    <h3>Problems</h3>
                    {
                        
                        Object.entries( errorType ).map( ( err, i ) => {
                            return (
                                <div key={ i } >
                            { 
                                err[1].length ? 
                                <div className="errorCreator">
                                {` ${ err[1] }`}
                                </div> :
                                null
                            }
                                </div>
                        )
                    })
                    
                }

                </div>
                    <div className="prevetDisapear">
                    
                    {
                        recipe.title && 
                        !errorType.title &&
                        recipe.summary && 
                        recipe.img && 
                        !( parseInt( recipe.score  ) > 100 ) &&
                        !( parseInt( recipe.healthScore ) > 100 ) &&
                        recipe.instructions.length &&
                        recipe.dishTypes.length ?  
                        <div className="conteiner-submitBtnCreator">
                            
                                <input 
                                className="finalButton"
                                type="submit" 
                                value="Create!" 
                                />
                            
                        </div> : <div className="falseFinalButton"> Create! </div>
                    }
                    </div>
                    <div className="conteiner-GoHomeBtnCreator" >
                        <Link to='/home'>
                        <button className="finalButton" >Go Back!</button>
                        </Link>
                    </div>
                </div>
                    
            
        </form> 
        
    </div>:
    <div className="conteinerBtnsRecipeCreated-Creator" >
        <div>
        <h1>Your Recipe was created!</h1>
        </div>
        <div className="centrador" >
            <div className="btnsRecipeCreated-Creator" >
                <button
                className="finalButton"
                onClick={ handleNewRecipe }
                >Create a new Recipe</button>
                <Link to='/home'>
                    <button 
                    className="finalButton"
                    onClick={ handleNewRecipe }
                    >Go Home!</button>
                </Link>
            </div>
        </div>
    </div>
    }
    </>
    )
}

export default RecipeCreator;