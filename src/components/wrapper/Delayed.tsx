//@ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    waitBeforeShow: number;
}

class Delayed extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.state = { hidden: true };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ hidden: false });
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}

Delayed.propTypes = {
    waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;