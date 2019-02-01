import React, { Component } from 'react';
import SearchBox from '../../components/SearchBox';
import messages from '../../utility/intl/messages.json';
import { searchPlacesByText, searchPlacesByLatLng } from '../../utility/api';
import './index.css';
import config from '../../utility/config.json';
import LoadingIndicator from '../../components/LoadingIndicator';
import Toast from '../../components/Toast';

export class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            isLoading: false,
            latitude: null,
            longitude: null,
            error: {
                message: '',
                isShow: false
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.showError = this.showError.bind(this);
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    isLoading: true
                }, () => {
                    searchPlacesByLatLng(position.coords.latitude, position.coords.longitude, this.checkErrorAndSetLocation);
                });
            }, (err) => {
                console.log(err);
            });
        }
    }

    handleInput(searchText) {
        if (!searchText) {
            return this.setState({ locations: [] });
        };

        this.setState({ isLoading: true }, () => {
            const { latitude, longitude } = this.state;
            searchPlacesByText(searchText, this.checkErrorAndSetLocation, latitude, longitude);
        })
    }

    checkErrorAndSetLocation = (err, locations) => {
        if (!err) {
            let _locations = [];
            for(let i = 0; i < locations.length; i++) {
                _locations.push({
                    name: locations[i].name,
                    address: locations[i].formatted_address || locations[i].vicinity,
                    icon: locations[i].icon,
                    distance: (this.state.latitude && this.state.longitude) ? (window.google.maps.geometry.spherical.computeDistanceBetween(
                        new window.google.maps.LatLng(this.state.latitude, this.state.longitude),
                        locations[i].geometry.location
                    )/1000).toFixed(2) : 0
                });
            }

            this.setState({ locations: _locations });
        } else {
            this.setState({ locations: [] });
            this.showError(err);
        }

        this.setState({ isLoading: false });
    }

    showError(message) {
        this.setState({
            error: {
                message,
                isShow: true
            }
        });

        setTimeout(() => {
            this.setState({
                error: {
                    message: '',
                    isShow: false
                }
            });
        }, 3000);
    }

    render() {
        const { handleInput } = this;
        let { locations, isLoading, error } = this.state;
        return (
            <div className="search-page">
                <h1 className="search-page-header"> {messages.searchPageHeader} </h1>
                <p className="search-page-subtitle"> Your browser location will help us show ATMs near you. </p>
                <SearchBox locations={locations} onInput={handleInput} />
                <LoadingIndicator loadingText={config.loadingText} show={isLoading} />
                <Toast message={error.message} show={error.isShow} />
            </div>
        );
    }
}