/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import AboutVeginPage from "views/examples/AboutVeginPage";
import AboutVeganPage from "views/examples/AboutVeganPage";
import ShopPage from "views/examples/ShopPage";
import RecipePage from "views/examples/RecipePage";
import RecipeDetailPage from "views/examples/RecipeDetailPage";
import ShopDetailPage from "views/examples/ShopDetailPage";
import PlacePage from "views/examples/PlacePage";
import CommunityPage from "views/examples/CommunityPage";
import PostPage from "views/examples/PostPage";
import WritePostPage from "views/examples/WritePostPage";
import ShopNavTab from "views/index-sections/ShopNavTab";
import ListBoardComponent from "views/index-sections/ListBoardComponent";
import CreateBoardComponent from "views/index-sections/CreateBoardComponent";
import ReadBoardComponent from "views/index-sections/ReadBoardComponent";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/about-vegin-page"
        render={(props) => <AboutVeginPage {...props} />}
      />
      <Route
        path="/about-vegan-page"
        render={(props) => <AboutVeganPage {...props} />}
      />
      <Route
        path="/recipe-page"
        render={(props) => <RecipePage {...props} />}
      />
      <Route
        path="/recipe-detail-page/:id"
        render={(props) => <RecipeDetailPage {...props} />}
      />
      <Route
        path="/shop-page"
        render={(props) => <ShopPage {...props} />}
      />
      <Route
        path="/shop-detail-page/:productId"
        render={(props) => <ShopDetailPage {...props} />}
      />
      {/* <Route
        path="/shop-detail-page"
        render={(props) => <ShopDetailPage {...props} />}
      /> */}
      <Route
        path="/place-page"
        render={(props) => <PlacePage {...props} />}
      />
      <Route
        path="/community-page"
        render={(props) => <CommunityPage {...props} />}
      />
      <Route
        path="/community-page/:tab"
        render={(props) => <CommunityPage {...props} />}
      />
      <Route
        path="/community-post-page"
        render={(props) => <PostPage {...props} />}
      />
      <Route
        path="/community-write-post-page"
        render={(props) => <WritePostPage {...props} />}
      />
      <Route
        path="/login-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/join-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/mypage-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route path='/board' component={ListBoardComponent}></Route>
      <Route path='/create-board/:no' component={CreateBoardComponent}></Route>
      <Route path='/read-board/:no' component={ReadBoardComponent}></Route>
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
