import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Toast extends PureComponent {
    render() {
        const { message, show } = this.props;
        return (
            <React.Fragment>
                {
                    <div className={`toast-message ${show ? '' : 'hide'}`}>
                        {message}
                    </div>
                }
            </React.Fragment>
        )
    }
}

Toast.defaultProps = {};
Toast.propTypes = {
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired
};