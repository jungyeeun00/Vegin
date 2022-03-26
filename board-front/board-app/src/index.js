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
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/shop-page"
        render={(props) => <ShopPage {...props} />}
      />
      <Route
        path="/place-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/community-page"
        render={(props) => <LandingPage {...props} />}
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
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
