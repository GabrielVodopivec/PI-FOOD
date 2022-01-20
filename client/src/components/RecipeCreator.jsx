import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../actions";

const RecipeCreator = () => {

    const dispatch = useDispatch()

    const dietsTypes = useSelector( state => state.dietsTypes)
    const diets = useSelector( state => state.dietsTypes )

    useEffect( () => {
        !diets.length && dispatch( getDiets() )
    }, [dispatch, diets])
    
    const instruction = '';
    const dish = '';

    const [ recipe, setRecipe ] = useState({
        title:'',
        healthScore:0,
        summary:'',
        img:'',
        diets: [],
        score: 0,
        dishTypes: [],
        instructions: []
    });


    const handleChange  = ( event ) => {
        switch ( event.target.name ) {
            case 'TITLE':
                
                event.preventDefault()
                return setRecipe( { 
                    ...recipe,
                    title: event.target.value 
                })
            case 'DISH':
                event.preventDefault()
                const newDishType = [...recipe.dishTypes]
                newDishType[event.target.id] = event.target.value
                return setRecipe( { 
                    ...recipe,
                    dishTypes: newDishType 
                } )

            
            case 'INSTRUCTION':
                event.preventDefault()
                const newInstructions = [...recipe.instructions]
                newInstructions[event.target.id] = event.target.value
                return setRecipe( { 
                    ...recipe,
                    instructions: newInstructions
                } )

            default: return
        }
    }
    
/*     const handleTitle = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            title: event.target.value 
        })
    } */

    const handleHealthscore = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            healthScore: event.target.value 
        } )
    }

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

    const handleDiets = ( event ) => {
        
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
    }   

    const handleScore = ( event ) => {
        event.preventDefault()
        setRecipe( { 
            ...recipe,
            score: event.target.value 
        } )
    }

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

/*     const handleClickAddDish = ( event ) => {
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

    const handleSubmit = ( event ) => {
        event.preventDefault()
        console.log( recipe )
        dispatch( createRecipe( recipe ) )
    }

    return (
        
        <form 
        onChange={ handleChange } 
        onSubmit={ handleSubmit }
        >
            <div className="fullCreator" >
            <div className="recipeCreator" >

                <div className="firstCol">
                    <div className="titleFirstCol" >
                    <h2>Main information</h2>
                    </div>
                    <div className="box">
                        
                        <h3 className="titleFirstCol">Title</h3>
                        
                        <input
                        className="mainInputs" 
                        type="text" 
                        name="TITLE" 
                        placeholder="Recipe title"
                        defaultValue={''} />
                        
                    </div>
                    <div className="box">

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
                    <div className="box" >

                        <h3>Score</h3>
                            
                        <input
                        className="mainInputs" 
                        type="number" 
                        value={ recipe.score } 
                        onChange={ handleScore }
                        />
                        
                    </div>
                    <div className="box" >

                        <h3>Health Score</h3>

                        <input 
                        className="mainInputs"
                        type="number" 
                        value={ recipe.healthScore }
                        onChange={ handleHealthscore }
                        />
                        
                    </div>
                    <div className="box" >

                        <h3>Url de la imagen</h3>
                        
                        <input 
                        className="mainInputs"
                        type="text" 
                        value={ recipe.img }
                        onChange={ handleImg }
                        />
                        
                    </div>
                </div>
                    
                <div className="contendorCreatorDiets">
                    <h2>Diet types</h2>
                {
                    dietsTypes.map( ( el, index ) => {
                        return (
                            <div key={index} className="divCheckbox">
                                <input 
                                className="selectDiet-creator"
                                key={el.id}
                                type="checkbox" 
                                name={el.name}
                                value={el.name}
                                onChange={ handleDiets } 
                                />
                                <label   > 
                                    {el.name} 
                                </label>
                                </div>
                        )
                    })
                }  
                </div>
                
                <div className="conteinerCreatorInstructions">
                    <h2>Instructions</h2>
                        <div className="conteinerBtnsInstructions">
                            <div className="creatorInstructionbtn">

                                { 
                                    (recipe.instructions.length < 5) ?
                                    <button 
                                    name="INSTRUCTION"
                                    onClick={ handleAdd }
                                    > + </button> : null
                                }

                            </div>
                            <div className="creatorInstructionbtn" >

                                {
                                    recipe.instructions.length ?
                                    <button 
                                    onClick={ handleClickRemoveInstruction }
                                    > - </button> :
                                    null
                                }
                                
                            </div>
                        </div> 
                    {
                        recipe.instructions.length ? recipe.instructions.map( ( element, index ) => (
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
                                    (recipe.dishTypes.length < 5) ?
                                    <button 
                                    name="DISH"
                                    onClick={ handleAdd }
                                    > + </button> : null
                                }

                            </div>
                            <div className="creatorInstructionbtn" >

                                {
                                    recipe.dishTypes.length ?
                                    <button 
                                    onClick={ handleClickRemoveDish }
                                    > - </button> :
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
                                className="instructionsCreatorTextArea"
                                name='DISH'
                                 
                                id={ index }
                                type="text" 
                                placeholder={ `Add Dish Tpye ${ index + 1 }` }
                                value={ recipe.dishTypes[index] } 
                                onChange={ handleChange }
                                />
                                
                                
                            </div>
                        )) : null       
                    }   
                                    
                </div>
                {/* <div className="conteinerDishTypes">
                    <h2>Dish Types</h2>
                    <div >
                        <label >
                            DishType :
                            <input 
                            type="text" 
                            value={ recipe.dishTypes } 
                            onChange={ handleDishTypes }
                            />
                        </label>
                    </div>
                </div> */}

            </div>
            <div className="conteiner-submitBtn">
                <input 
                className="finalButton"
                type="submit" 
                value="Create" 
                />
            </div>
            </div>
        </form>
    )
}

export default RecipeCreator;