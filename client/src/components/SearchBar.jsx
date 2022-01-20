import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { searchRecipe, selectPage } from "../actions";

export default function SearchBar () {

    const dispatch = useDispatch();
    
    const [ name, setName ] = useState('')

    const handleChange = (event) => {
        console.log(event.target.value)
        event.preventDefault();
        setName(event.target.value)
    }

    const handleSubmit = ( event ) => {
        event.preventDefault()
        console.log(name)
        name.length && dispatch( searchRecipe( name ) ) 
        name.length && dispatch( selectPage( 1 ));
        setName( '' );
    }

    return (
        <div className="filters-conteiner">
            <div className="search-container">
                <form className="search-form"
                    
                    onSubmit={ handleSubmit }
                    >
                    <input 
                        className="search-input"
                        type="text" 
                        placeholder="Search Recipe" 
                        value={name}
                        onChange={ (event) => handleChange(event) }
                        />
                    {name.length ? <input className="search-btn" type="submit" value="🔎" /> : null}
                </form>
            </div>
        </div>
    )
}