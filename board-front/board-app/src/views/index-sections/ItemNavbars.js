import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, Nav } from 'reactstrap';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'assets/scss/paper-kit/_itemnav.scss'
import BestShopItems from './BestShopItems';
import FeaturedPlaceItems from './FeaturedPlaceItems';
import CommunityItems from './CommunityItems';
import BestRecipeItems from './BestRecipeItems';
import BoardService from 'service/BoardService';
import BestCommunityFreeItems from './BestCommunityFreeItems';


class ItemNavbars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'recipe',
            boards: [],
        }
    }

    componentDidMount() {
        BoardService.getBoards(1).then((res) => {
            this.setState({
                boards: res.data.list
            });
        });
    }

    getContent() {
        var featured = null;
        if (this.state.mode === 'recipe') {
            featured =
                <div className="recipe-main">
                    {/* <BestRecipeItems /> */}
                </div>
        } else if (this.state.mode === 'shop') {
            featured =
                <div className="shop-main">
                    <BestShopItems />
                </div>
        } else if (this.state.mode === 'place') {
            featured = <FeaturedPlaceItems />
        } else if (this.state.mode === 'community') {
            featured =
                <div className="community-main">
                        {this.state.boards.length != 0 && <BestCommunityFreeItems boards={this.state.boards} />}
                </div>
        }
        return featured;
    }

    render() {
        return (
            <>
                <h3><div className="featured-title"> FEATURED </div> </h3>
                <div className="featured-list">
                    <Navbar className="featured-navbar" expand="lg">
                        <Nav className="item-nav" navbar>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ mode: 'recipe' });
                                    }}
                                >
                                    <div className='featured-img-wrapper'>
                                        <img className="featured-img" alt="recipe" src={require("assets/img/item_recipe.png")} />
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ mode: 'shop' });
                                    }}
                                >
                                    <div className='featured-img-wrapper'>
                                        <img className="featured-img" alt="shop" src={require("assets/img/item_shop.png")} />
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ mode: 'place' });
                                    }}
                                >
                                    <div className='featured-img-wrapper'>
                                        <img className="featured-img" alt="place" src={require("assets/img/item_place.png")} />
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="#pablo"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ mode: 'community' });
                                    }}
                                >
                                    <div className='featured-img-wrapper'>
                                        <img className="featured-img" alt="community" src={require("assets/img/item_community.png")} />
                                    </div>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                {this.getContent()}
            </>
        );
    }
}
export default ItemNavbars;