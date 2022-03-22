import React, { Component } from 'react';
import { faUser, faHourglass, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RecipeItems extends Component {
    render() {
        return (
            <>
                <div id="recipeItem" className="item" align="center">
                    <img id="recipeImg" className="item-img" alt="recipe_img" src={require("assets/img/recipe_item.jpg")} />
                    <p id="recipeTitle" className="item-title">요리명</p>
                    <span id="recipeServing" className="recipe-text">
                        <FontAwesomeIcon icon={faUser} /> 3인분
                    </span>
                    <span id="recipeTime" className="recipe-text">
                        <FontAwesomeIcon icon={faHourglass} /> 40분
                    </span>
                    <span id="recipeViews" className="recipe-text">
                        <FontAwesomeIcon icon={faEye} /> 4,836
                    </span>
                </div>
            </>
        );
    }
}

export default RecipeItems;