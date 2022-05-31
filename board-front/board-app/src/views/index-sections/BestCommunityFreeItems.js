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
                            href={`/read-board/${this.props.boards[0].no}`}
                            title="자유게시판"
                        ><CommunityItems board={this.props.boards[0]}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-board/${this.props.boards[1].no}`}
                            title="자유게시판"
                        ><CommunityItems board={this.props.boards[1]}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-board/${this.props.boards[2].no}`}
                            title="자유게시판"
                        ><CommunityItems board={this.props.boards[2]}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-board/${this.props.boards[3].no}`}
                            title="자유게시판"
                        ><CommunityItems board={this.props.boards[3]}/>
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}

export default BestCommunityFreeItems;