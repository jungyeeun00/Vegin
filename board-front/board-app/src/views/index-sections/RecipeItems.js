import React, { Component } from 'react';
import { faUser, faHourglass, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RecipeItems extends Component {
    render() {
        return (
            <>
                {/* 레시피 아이템 */}
                <div id="recipeItem" className="item" align="center">
                    {/* 레시피 이미지 */}
                    <img id="recipeImg" className="item-img" alt="recipe_img" src={require("assets/img/recipe_item.jpg")} />
                    <p id="recipeTitle" className="item-title">요리명</p>   {/* 요리명 */}
                    <span id="recipeServing" className="recipe-text">       {/* 인분 수 */}
                        <FontAwesomeIcon icon={faUser} /> 3인분
                    </span>
                    <span id="recipeTime" className="recipe-text">          {/* 조리 시간 */}
                        <FontAwesomeIcon icon={faHourglass} /> 40분
                    </span>
                    <span id="recipeViews" className="recipe-text">         {/* 조회 수 */}
                        <FontAwesomeIcon icon={faEye} /> 4,836
                    </span>
                </div>
            </>
        );
    }
}

export default RecipeItems;