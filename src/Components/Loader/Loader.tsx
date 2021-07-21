import React from 'react';
import { connect } from 'react-redux';
import action from '../../Redux/Actions/LoaderAction';
import './Loader.scss';

const mapStateToProps = (reduxState: any, ownProps: any) => ({
    ...reduxState.loaderState
});

export class LoaderComponent extends React.Component<any> {
    render() {    
        return (
            <div className="OnPageLoading">
                {this.props.loading &&
                    // <div className="loading-component--style">
                    //     <div className="loader"></div>
                    // </div>
                    <div className="container">
                        <div className="item-1"></div>
                        <div className="item-2"></div>
                        <div className="item-3"></div>
                        <div className="item-4"></div>
                        <div className="item-5"></div>
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, {...action})(LoaderComponent);