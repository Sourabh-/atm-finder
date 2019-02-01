import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class LoadingIndicator extends PureComponent {
    render() {
        const { loadingText, show } = this.props;
        return (
            <React.Fragment>
                {
                    show && <div className="loading-indicator">
                        {loadingText}
                    </div>
                }
            </React.Fragment>
        )
    }
}

LoadingIndicator.defaultProps = {};
LoadingIndicator.propTypes = {
    loadingText: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};

export default LoadingIndicator;