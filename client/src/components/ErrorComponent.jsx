/* import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { clearError } from "../actions";

export default  function ErrorComponent () {

    const dispatch = useDispatch()
    const mensajeDeError = useSelector( state => state.mensajeDeError)

    const handleClick = () => {
        dispatch( clearError() )
    }

    return (
        <div className="errorMessage">
            <div className="conteinerError">
                <h1 >{mensajeDeError}</h1>
                <Link to = '/home'>
                    <button className="finalButton" onClick={handleClick}> Go Back! </button>
                </Link> 
            </div>
        </div>
    )
} */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { clearError } from "../actions";

class ErrorComponent extends Component {
    render() {
        return(
            <div className="errorMessage">
                <div className="conteinerError">
                    <h1 >{this.props.mensajeDeError}</h1>
                    <Link to = '/home'>
                        <button className="finalButton" onClick={ this.props.clearError }> Go Back! </button>
                    </Link> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        mensajeDeError: state.mensajeDeError 
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return {
        clearError: () => dispatch( clearError() )
    }
}

export default connect( 
    mapStateToProps, 
    mapDispatchToProps )( ErrorComponent );