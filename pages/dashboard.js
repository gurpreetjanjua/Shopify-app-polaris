import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../redux/actions/authActions';

class Test extends React.Component {

    componentDidMount() {
        const { getData } = this.props;
        getData();
    }

    render() {
        return (
            <h1> Hello World!</h1>
        );
    }
}

const mapStateToProps = state => ({
    counter: state.counter.value
});


const mapDispatchToProps = {
    getData: getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);