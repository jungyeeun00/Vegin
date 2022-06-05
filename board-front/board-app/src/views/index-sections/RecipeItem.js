import React from 'react';
import { faUser, faHourglass, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecipeService from 'service/RecipeService';
import { Link } from 'react-router-dom';

function RecipeItem(props) {

    return (
        <>
            {/* 레시피 아이템 */}
            <Link
                className="pt-0 mt-0"
                data-placement="bottom"
                title="View Detail"
                to={{
                    pathname: `/recipe-detail-page/${props.recipe.id}`,
                    state: {
                        recipe: props.recipe
                    }
                }}
                key={props.recipe.id}
                onClick= {() => {RecipeService.setViews(props.recipe.id); sessionStorage.setItem("scrollPosition", window.pageYOffset);}}
            >
                {/* <RecipeItems /> */}
                {/* 레시피 아이템 */}
                <div id="recipeItem" className="item" align="center">
                    {/* 레시피 이미지 */}
                    <img id="recipeImg" alt="recipe_img" src={props.recipe.img} />
                    <p id="recipeTitle" className="item-title">{props.recipe.name}</p>   {/* 요리명 */}
                    <span id="recipeServing" className="recipe-text">       {/* 인분 수 */}
                        <FontAwesomeIcon icon={faUser} /> {props.recipe.servings}
                    </span>
                    <span id="recipeTime" className="recipe-text">          {/* 조리 시간 */}
                        <FontAwesomeIcon icon={faHourglass} /> {props.recipe.time}
                    </span>
                    <span id="recipeViews" className="recipe-text">         {/* 조회 수 */}
                        <FontAwesomeIcon icon={faEye} /> {props.recipe.views}
                    </span>
                </div>
            </Link>
        </>
    );
}

export default RecipeItem;