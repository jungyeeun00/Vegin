import React, { useState, useEffect } from 'react';
import {
    useHistory,
    useParams,
    useLocation
} from 'react-router-dom';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter';
import RecipeService from 'service/RecipeService';

function RecipeDetailPage() {
    const history = useHistory();
    const location = useLocation();

    const id = useParams().id;
    const recipe = (location.state.recipe);
    
    const [ingres, setIngres] = useState([]);
    const [cates, setCates] = useState([]);
    const [steps, setSteps] = useState([]);

    /* 재료, 재료카테고리, 조리방법 */
    useEffect(() => {
        RecipeService.getIngredients(id).then(res => 
            setIngres(Object.values(res.data))
        )
        
        RecipeService.getIngredients(id).then(res => 
            setCates(Object.keys(res.data))
        )

        RecipeService.getSteps(id).then(res =>
            setSteps(res.data)
        )

        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <IndexNavbar />
            <div className="rd-main">
                <h2 id="rdTitle" className="rd-title">
                    {recipe.name}
                </h2>
                <div id="rdInfo" className="rd-info">
                    <span id="rdType" className="rd-info-text"> {recipe.category} </span>|       {/* 레시피 유형 */}
                    <span id="rdTime" className="rd-info-text"> {recipe.time} </span>|      {/* 조리 시간 */}
                    <span id="rdServing" className="rd-info-text"> {recipe.servings} </span>|       {/* 인분 수 */}
                    <span id="rdDiff" className="rd-info-text"> {recipe.difficulty} </span>|           {/* 난이도 */}
                    <span id="rdViews" className="rd-info-text"> 조회수 {recipe.views + 1} </span>   {/* 조회 수 */}
                </div>
                <img id="rdImg" className="rd-img" alt="recipe_img" src={recipe.img} />
                <div id="rdSubtitle1" className="rd-subtitle"> 재료 </div><div id="rdIngreds" className="rd-ingreds">
                    {
                        cates.map(
                            (cate, idx) =>
                            <div id="rdSsnIngred" key={idx}>
                                {cate}
                                {
                                    ingres[idx].map(
                                        (ingre) =>
                                        <div id="rdIngred1" className="rd-ingred" key={ingre.id}>
                                            <span id="rdIngredName1"> {ingre.name} </span>
                                            <span id="rdIngredAmt1"> {ingre.quantity} </span>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <div id="rdSubtitle2" className="rd-subtitle"> 조리 순서 </div>
                <div className="rd-steps">
                    {
                        steps.map(
                            (step) =>
                                <div id="rdStep" className="rd-step" key={step.no}>
                                    {step.img !== "" ?
                                    <img id="rdStepImg" className="rd-step-img" alt="recipe_step" src={step.img} />
                                    : null
                                    }
                                    <div id="rdStepText" className="rd-step-text">
                                        {step.no}. {step.content}
                                    </div>
                                </div>
                        )
                    }
                </div>

                <div className="btn-list">
                    <button type="button" className="btn-round btn"
                        onClick={() =>history.goBack()}> 목록 </button>
                </div>
            </div>
            <VeginFooter />
        </>
    );
}

export default RecipeDetailPage;