import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, Nav } from 'reactstrap';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'assets/scss/paper-kit/_itemnav.scss'

function ItemNavbars() {
  return (
      <>
       <h3><div className="item-title"> FEATURED </div> </h3>
            <div className="item-list">
            <Navbar className="item-navbar" expand="lg">
                <Nav className="item-nav" navbar>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='item-img-wrapper'>
                        <img className="item-img" alt="recipe" src={require("assets/img/item_recipe.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='item-img-wrapper'>
                        <img className="item-img" alt="shop" src={require("assets/img/item_shop.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='item-img-wrapper'>
                        <img className="item-img" alt="place" src={require("assets/img/item_place.png")} />
                    </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    >
                    <div className='item-img-wrapper'>
                        <img className="item-img" alt="community" src={require("assets/img/item_community.png")} />
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