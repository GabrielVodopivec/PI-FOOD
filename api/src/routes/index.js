
require('dotenv').config();
const { API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6, API_KEY_7, API_KEY_9 } = process.env;

const API_KEY_10 = 0321321
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const accents = require('remove-accents');

const router = Router();
const axios = require('axios');


const { Recipes, Diets } = require ('../db.js');
const { Op } = require('sequelize');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiInfo = () => {
    let offset = 0;
    let arrInfo = [];
    while ( offset < 100 ) {
        arrInfo.push(axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_3}&addRecipeInformation=true&offset=${offset}`))
        offset = offset + 10;
    }  
    return arrInfo;
}

/* --------LLAMADO A LA API PARA OBTENER TODAS LAS RECETAS--------------------- */

const apiRecipes = Promise.all( apiInfo() )
     
    .then( ( info )  => {

        const allInfo = info.flatMap ( ( page ) => {
            return page.data;
        })
        return allInfo;
    })
    .then( ( page ) => {
        const infoPages = page.flatMap( ( el ) => {
            return el.results;
        })
        return infoPages;
    })
    .then( ( recipes ) => {
        const infoRecipes = recipes.map( ( el ) => {
            return {
                id: el.id,
                title: el.title,
                img: el.image,
                vegetarian: el.vegetarian,
                vegan: el.vegan,
                glutenFree: el.glutenFree,
                diets: el.diets.map( ( diet ) =>{
                    return {
                        name: diet
                    }
                }),
                score: el.spoonacularScore,
                healthScore: el.healthScore,
                summary: el.summary,
                dishTypes: el.dishTypes,
                instructions: el.analyzedInstructions[0]?.steps.map( ( instruction ) => {
                    return instruction.step
                })
            }
        });
        console.log( 'API recipes ready!' );
        return infoRecipes;
    })
    .catch( error => {
        console.log(error)
    })
    

/* ----------------------------------------------------------------------------------------- */
/* --------- LLAMADO A LA BASE DE DATOS ---------------------------------------------------- */

const dbRecipes = () => Recipes.findAll({
    include: [{
        model: Diets,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }]
    })
    .then( ( info  )=> {
        console.log( 'Database recipes ready!' );
        return info;
    })
    .catch ( ( error ) => {
        console.log( error );
    });


const allInfoRecipes = () =>  {
    return Promise.all( [ dbRecipes(), apiRecipes ] )
    .then( ( response ) => {
        return [ ...response[0], ...response[1] ];
    })
    .catch( ( error ) => {
        console.log( error );
    })};

let allRecipes = allInfoRecipes();


/* ------------------------------------------------------------------------------------------ */

router.get('/recipes', ( req, res ) => {
    
    const { name } = req.query;
    
    if ( name ) {

        allRecipes
        .then( ( recipes ) => {
            const founded = recipes.filter( ( recipe ) => {
                return accents.remove( recipe.title ).toLowerCase().includes( name.toLocaleLowerCase() )})
            founded.length ?
            res.status( 200 ).send( founded ) : 
            res.status( 404 ).send( "Recipe not found" );
        })
        .catch( ( error ) => {
            res.status( 400 ).send( "Request Failed" );
        });

    } else {
        
        allRecipes
        .then( ( pages ) => res.status(200).send(  pages ) )
        .catch ( ( error ) => {
            res.status( 400 ).send( 'Request failed' );
        });
    };
});

router.get('/recipes/:id', async ( req, res ) => {
    const { id } = req.params;
    
    allRecipes 
    .then( ( response ) => {
        let recipe = [];
        for( let i = 0; i < response.length; i++ ) {
            if ( response[i].id == id ) {
                recipe.push( response[i] );
                break;
            }
        }
        return recipe;     
    }) 
    .then ( ( recipe ) => {
        recipe.length ?
        res.status( 200 ).send( recipe ) :
        res.status( 400 ).send( "Invalid ID" );
    })
    .catch( ( error ) => {
        console.log( 'algo salio mal' );
        res.status( 400 ).send( "Request failed" );
    });
});

router.get( '/diets', async ( req, res ) => {
    const diets = [
        { name:'Gluten Free' }, 
        { name:'Ketogenic' }, 
        { name:'Vegetarian' },
        { name:'Vegan' },
        { name:'Pescetarian' },
        { name:'Lacto-Vegetarian' },
        { name:'Ovo-Vegetarian' },
        { name:'Paleo' },
        { name:'Primal' },
        { name:'Low FODMAP' },
        { name:'Whole30' }
    ];

    try {
        const filledDb = await Diets.findAll();

        if( !filledDb.length ) {
            const allDietsInDb = await Diets.bulkCreate( diets );
            return res.status( 200 ).send( allDietsInDb );
        }   

        res.status( 200 ).send( filledDb );

    } catch ( error ) {
        res.status( 400 ).send( "Request Failed" );
    };

});

router.post( '/recipes', async ( req, res ) => {
    const {
        title,
        img,
        diets,
        score,
        healthScore,
        summary,
        dishTypes,
        instructions
    } = req.body;

    try {
        const [ newRecipe, created ] = await Recipes.findOrCreate ({
            where: { title },
            defaults: {
            img,
            score,
            healthScore,
            summary,
            dishTypes,
            instructions
            }
        });
        const dietsDb = await Diets.findAll({
            where: {
                name: {
                    [ Op.in ]: diets
                }
            }
        });

        await newRecipe.addDiets( dietsDb );

        const completeRecipe = await Recipes.findOne({
            where: { title },
            include:[{
                model: Diets,
                attributes: ['name'],
                through: {
                  attributes: []
                }
              }]
        });

        res.status( 200 ).send( { wasCreated: created, completeRecipe } );

    } catch ( error ) {
        res.status( 400 ).send( "Request Failed" );
    };

    allRecipes = allInfoRecipes();
})

router.put('/recipes/:id', async ( req, res )=> {
    const {
        title,
        img,
        diets,
        score,
        healthScore,
        summary,
        dishTypes,
        instructions
    } = req.body;
    
    const { id } = req.params
    try{
        const recipeToUpdate = await Recipes.findByPk( id )
        const updated = await recipeToUpdate.update({
            title,
            img,
            score,
            healthScore,
            summary,
            dishTypes,
            instructions
        })  

        const dietsDb = await Diets.findAll({
            where: {
                name: {
                    [ Op.in ]: diets
                }
            }
        });
        
        const updatedRecipe = await updated.setDiets( dietsDb )
        
        res.status(200).send( updatedRecipe )

    } catch ( error ) {
        console.log( error )
    }

    allRecipes = allInfoRecipes();

})

router.delete('/recipes/:id', async ( req, res ) => {
    const { id } = req.params
    console.log(id)
    try {
        
        const deletedRecipe = await Recipes.destroy({
            where: { id: id }
        })
        res.status( 200 ).send( {data: 'Recipe Deleted', recipe:deletedRecipe} )
    } catch ( error ) {
        console.log( error )
    }
    allRecipes = allInfoRecipes();
})

module.exports = router;
