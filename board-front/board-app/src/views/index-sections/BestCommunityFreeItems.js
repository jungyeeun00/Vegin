import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import CommunityItems from './CommunityItems';

class BestCommunityFreeItems extends Component {
    render() {
        return (
            <>
                <ul className="community-best-table">
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/community-post-page"
                            title="View Detail"
                        ><CommunityItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/community-post-page"
                            title="View Detail"
                        ><CommunityItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/community-post-page"
                            title="View Detail"
                        ><CommunityItems />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href="/community-post-page"
                            title="View Detail"
                        ><CommunityItems />
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}

export default BestCommunityFreeItems;