import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import config from '../../utility/config.json';
import messages from '../../utility/intl/messages.json';
import './index.css';

export default class SearchBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
        this.mapRenderList = this.mapRenderList.bind(this);
        this.sortLocations = this.sortLocations.bind(this);
    }

    sortLocations() {
        let locations = [ ...this.props.locations ];
        if(locations && locations.length) {
            locations.sort((l1, l2) => {
                return l1.distance > l2.distance ? 1 : l1.distance < l2.distance ? -1 : 0;
            })
        }
        return locations;
    }

    mapRenderList() {
        const locations = this.sortLocations();

        if (locations && locations.length) {
            return locations.map((loc, i) => {
                return (
                    <div className="list-item" key={i}>
                        <img className="list-item-thumbnail" src={loc.icon || config.defaultIcon} alt="ATM" />
                        <div className="list-item-content">
                            {loc.name}
                            <p className="address">{loc.address}</p>
                            {
                                loc.distance ?
                                <p className="distance">{loc.distance} Kms</p> :
                                <React.Fragment />
                            }
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="no-data">
                    {messages.noDataText}
                </div>
            );
        }
    }

    render() {
        const { mapRenderList } = this;
        const { onInput } = this.props;

        return (
            <div className="search-box">
                <input className="search-input" type="text" placeholder="Start Typing Your Location..." onChange={(event) => { onInput(event.target.value) }} />
                <div className="result-list">
                    {mapRenderList()}
                </div>
            </div>
        );
    }
}

SearchBox.defaultProps = {
    locations: []
};
SearchBox.propTypes = {
    locations: PropTypes.array,
    onInput: PropTypes.func.isRequired
};