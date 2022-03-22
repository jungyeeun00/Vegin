import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, Nav } from 'reactstrap';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'assets/scss/paper-kit/_itemnav.scss'

function ItemNavbars() {
  return (
      <>
       <h3><div className="featured-title"> FEATURED </div> </h3>
            <div className="featured-list">
            <Navbar className="featured-navbar" expand="lg">
                <Nav className="item-nav" navbar>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='featured-img-wrapper'>
                        <img className="featured-img" alt="recipe" src={require("assets/img/item_recipe.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='featured-img-wrapper'>
                        <img className="featured-img" alt="shop" src={require("assets/img/item_shop.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='featured-img-wrapper'>
                        <img className="featured-img" alt="place" src={require("assets/img/item_place.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='featured-img-wrapper'>
                        <img className="featured-img" alt="community" src={require("assets/img/item_community.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                </Nav>
            </Navbar>
            </div>
        </>
  );
}

export default ItemNavbars;