import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import RecipeService from 'service/RecipeService';
import { faUser, faHourglass, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BestRecipeItems(props) {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        RecipeService.getFeatured().then((res) => {
            setRecipes(res.data);
        })
    }, []);

    return (
        <>
            <div className='recipe-featured'>
                {/* <ul className="recipe-items-table"> */}
                <ul className="recipe-best-table">
                    {
                        recipes.map(
                            recipe =>
                                <li key={recipe.id}>
                                    <Link
                                        className="pt-0 mt-0"
                                        data-placement="bottom"
                                        title="Featured Recipes"
                                        to={{
                                            pathname: `/recipe-detail-page/${recipe.id}`,
                                            state: {
                                                recipe: recipe
                                            }
                                        }}
                                    >
                                        <div id="recipeItem" className="item" align="center">
                                            {/* 레시피 이미지 */}
                                            <img id="recipeImg" className="item-img" alt="recipe_img" src={recipe.img} />
                                            <p id="recipeTitle" className="item-title">{recipe.name}</p>   {/* 요리명 */}
                                            <span id="recipeServing" className="recipe-text">       {/* 인분 수 */}
                                                <FontAwesomeIcon icon={faUser} /> {recipe.servings}
                                            </span>
                                            <span id="recipeTime" className="recipe-text">          {/* 조리 시간 */}
                                                <FontAwesomeIcon icon={faHourglass} /> {recipe.time}
                                            </span>
                                            <span id="recipeViews" className="recipe-text">         {/* 조회 수 */}
                                                <FontAwesomeIcon icon={faEye} /> {recipe.views}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                        )}
                </ul>
            </div>
        </>
    );
}

export default BestRecipeItems;