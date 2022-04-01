import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import RecipeItems from './RecipeItems';

class BestRecipeItems extends Component {
    render() {
        return (
            <>
                <ul className="recipe-best-table">
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/recipe-detail-page"
                            title="View Detail"
                        ><RecipeItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/recipe-detail-page"
                            title="View Detail"
                        ><RecipeItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/recipe-detail-page"
                            title="View Detail"
                        ><RecipeItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/recipe-detail-page"
                            title="View Detail"
                        ><RecipeItems />
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}

export default BestRecipeItems;