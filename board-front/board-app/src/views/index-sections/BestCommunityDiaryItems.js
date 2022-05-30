import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import DiaryItems from './DiaryItems';

class BestCommunityDiaryItems extends Component {
    render() {
        return (
            <>
                <ul className="community-best-table">
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-diary/${this.props.diarys[0].no}`}
                            title="다이어리"
                        ><DiaryItems board={this.props.diarys[0]}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-diary/${this.props.diarys[1].no}`}
                            title="다이어리"
                        ><DiaryItems board={this.props.diarys[1]}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-diary/${this.props.diarys[2].no}`}
                            title="다이어리"
                        ><DiaryItems board={this.props.diarys[2]}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="pt-0 mt-0"
                            data-placement="bottom"
                            href={`/read-diary/${this.props.diarys[3].no}`}
                            title="다이어리"
                        ><DiaryItems board={this.props.diarys[3]}/>
                        </NavLink>
                    </li>
                </ul>
            </>
        );
    }
}

export default BestCommunityDiaryItems;