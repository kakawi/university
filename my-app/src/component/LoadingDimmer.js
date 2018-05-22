import React  from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Dimmer, Loader } from 'semantic-ui-react'

class LoadingDimmer extends React.Component {
    render() {
        const { isLoading } = this.props.dimmer;

        return <Dimmer active={isLoading}>
            <Loader content='Loading' />
        </Dimmer>
    }
}

LoadingDimmer.propTypes = {
    dimmer: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired
    })
};

function mapStateToProps(state) {
    return {
        dimmer: state.dimmer
    }
}

export default connect(mapStateToProps)(LoadingDimmer)