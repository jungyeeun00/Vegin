import React, { Component } from 'react';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import VeginFooter from 'components/Footers/VeginFooter';

class RecipeDetailPage extends Component {
    render() {
        return (
            <>
                <IndexNavbar />

                <div className="rd-main">
                    <h2 id="rdTitle" className="rd-title">
                        병아리콩 파스타
                    </h2>

                    <div id="rdInfo" className="rd-info">
                        <span id="rdType" className="rd-info-text"> 식사대용 </span>|       {/* 레시피 유형 */}
                        <span id="rdTime" className="rd-info-text"> 조리 60분 </span>|      {/* 조리 시간 */}
                        <span id="rdServing" className="rd-info-text"> 2인분 </span>|       {/* 인분 수 */}
                        <span id="rdDiff" className="rd-info-text"> 초급 </span>|           {/* 난이도 */}
                        <span id="rdViews" className="rd-info-text"> 조회 수 1695 </span>   {/* 조회 수 */}
                    </div>

                    <img id="rdImg" className="rd-img" alt="recipe_img" src={require("assets/img/recipe_detail.jpg")} />

                    <div id="rdSubtitle1" className="rd-subtitle"> 재료 </div>
                    <div id="rdIngreds" className="rd-ingreds">
                        <div id="rdGenIngred">  {/* 일반 재료 */}
                            [일반 재료]
                            <div id="rdIngred1" className="rd-ingred">
                                <span id="rdIngredName1" className="rd-ingred-name"> 병아리콩 </span>
                                <span id="rdIngredAmt1" className="rd-ingred-amt"> 80g </span>
                            </div>
                            <div id="rdIngred2" className="rd-ingred">
                                <span id="rdIngredName2"> 브로콜리 </span>
                                <span id="rdIngredAmt2"> 1/2송이 </span>
                            </div>
                            <div id="rdIngred3" className="rd-ingred">
                                <span id="rdIngredName3"> 노랑 파프리카 </span>
                                <span id="rdIngredAmt3"> 1개 </span>
                            </div>
                        </div>
                        <div id="rdSsnIngred">    {/* 양념 재료 */}
                            [양념 재료]
                            <div id="rdIngred1" className="rd-ingred">
                                <span id="rdIngredName1"> 크림 소스 </span>
                                <span id="rdIngredAmt1"> 350g </span>
                            </div>
                            <div id="rdIngred2" className="rd-ingred">
                                <span id="rdIngredName2"> 천일염 </span>
                                <span id="rdIngredAmt2"> 한 꼬집 </span>
                            </div>
                        </div>
                    </div>

                    <div id="rdSubtitle2" className="rd-subtitle"> 조리 순서 </div>
                    <div className="rd-steps">
                        <div id="rdStep1" className="rd-step">
                            <img id="rdStepImg1" className="rd-step-img" alt="recipe_step1" src={require("assets/img/recipe_step1.jpg")} />
                            <div id="rdStepText1" className="rd-step-text">
                                ① 브로콜리는 작은 송이로 잘라 소금물에 살짝 데치고, 방울 토마토를 4등분 한다.
                            </div>
                        </div>
                        <div id="rdStep2" className="rd-step">
                            <img id="rdStepImg2" className="rd-step-img" alt="recipe_step2" src={require("assets/img/recipe_step2.jpg")} />
                            <div id="rdStepText2" className="rd-step-text">
                                ② 병아리콩은 물에 약 4시간정도 불린 후 20분 정도 삶는다.
                            </div>
                        </div>
                        <div id="rdStep3" className="rd-step">
                            <img id="rdStepImg3" className="rd-step-img" alt="recipe_step3" src={require("assets/img/recipe_step3.jpg")} />
                            <div id="rdStepText3" className="rd-step-text">
                                ③ 파프리카를 직화로 구워 껍질을 태운다.
                            </div>
                        </div>
                        <div id="rdStep4" className="rd-step">
                            <img id="rdStepImg4" className="rd-step-img" alt="recipe_step4" src={require("assets/img/recipe_step4.jpg")} />
                            <div id="rdStepText4" className="rd-step-text">
                                ④ 태운 파프리카를 얼음물에 식힌다.
                            </div>
                        </div>
                        <div id="rdStep5" className="rd-step">
                            <img id="rdStepImg5" className="rd-step-img" alt="recipe_step5" src={require("assets/img/recipe_step5.jpg")} />
                            <div id="rdStepText5" className="rd-step-text">
                                ⑤ 파프리카 껍질을 벗겨 모양대로 채 썰어준다.
                            </div>
                        </div>
                        <div id="rdStep6" className="rd-step">
                            <img id="rdStepImg6" className="rd-step-img" alt="recipe_step6" src={require("assets/img/recipe_step6.jpg")} />
                            <div id="rdStepText6" className="rd-step-text">
                                ⑥ 팬에 크림 소스를 살짝 데운 후, 접시에 모든 야채를 담은 뒤 모짜렐라 치즈로 장식한다.
                            </div>
                        </div>
                    </div>

                    <div className="btn-list">
                        <button type="button" class="btn-round btn"
                            onClick={() => this.props.history.goBack()}> 목록 </button>
                    </div>
                    {/* <NavLink to="/recipe-page">
                        <button type="button" class="btn-round mr-1 btn btn-list"> 목록 </button>
                    </NavLink> */}
                </div>
                <VeginFooter/>
            </>
        );
    }
}

export default RecipeDetailPage;