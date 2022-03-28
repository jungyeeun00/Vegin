import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import RecipeItems from './RecipeItems';

class BestRecipeItems extends Component {
    render() {
        return (
            <>
                <ul className="recipe-best-table">
                    <li>
                        <NavLink href="/recipe-detail-page">
                            <RecipeItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/recipe-detail-page">
                            <RecipeItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/recipe-detail-page">
                            <RecipeItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="/recipe-detail-page">
                            <RecipeItems />
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}

export default BestRecipeItems;