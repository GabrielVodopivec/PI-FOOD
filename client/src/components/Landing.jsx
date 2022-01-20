import React from "react";

import { Link } from "react-router-dom";


const LandingPage = () => {

    return (
    <div className="landingPage">
        <div className="conteinerstartBtn" >
        <Link to = '/home'>
            <button className="startBtn"> GET IN ! </button>
        </Link>
        </div>
    </div>
    )
}

export default LandingPage;