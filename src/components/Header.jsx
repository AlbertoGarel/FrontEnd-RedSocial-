import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
/**
 * IMPORT BOOTSTRAP
 * */
import 'bootstrap/dist/css/bootstrap.min.css';
/**
 *  IMPORT LIBRARIES OF BOOTSTRAP
 * */
import 'bootstrap/dist/js/bootstrap.bundle.min';
/**
 * IMPORT OWN STYLES
 * */
import './styles/Header.css';
/**
 * IMPORT COMPONENTS AND CONTAINERS
 * */
import Identificate from "../components/Identificate";
import Carrito from "../components/Carrito"
import Modal from "./Modal"
/**
 * IMPORT ACTIONS
 * */
import {search} from '../actions'
import {connect} from 'react-redux'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            isShowing: false,
        };
        this.textInput = React.createRef()
    }
    triggerOpenModalHandler = () => {
        this.setState({
            isShowing: true
        });
    };

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    };


    componentDidMount() {

    }




    render() {

        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light flex-shrink-1">
                    <Link to="/" id="enlace-logo" ><img
                        src="./assets/icons/logTT.png"
                        alt="logo mercahome"
                        id="nav_logo"
                    />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div id="search_cont" className="form-inline my-2 my-lg-0">
                            <span id="search_span"><i className="fa fa-2x fa-search"/></span>

                        </div>
                        <div className="menu-left" role="menu">
                            <Link to="/categorias" className="menu-item subhead1-b" data-test="categories-link"
                            >
                                <label className="menu-item__label">SECCIÖN</label>
                                <span className="menu-item__border"/>
                            </Link>
                            {/*{*/}
                            {/*    this.props.user.role === 'admin' ?*/}

                            {/*    <Link className="menu-item subhead1-b" data-test="my-products-link"*/}
                            {/*          to="/admin"*/}
                            {/*    >*/}
                            {/*        <label className="menu-item__label">Admin</label>*/}
                            {/*        <span className="menu-item__border"/>*/}
                            {/*    </Link>*/}
                            {/*        :*/}
                            {/*        ''*/}
                            {/*}*/}
                        </div>
                        {/*{ this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }*/}

                        {/*<button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>*/}

                        <Modal
                            className="modal"
                            show={this.state.isShowing}
                            close={this.closeModalHandler}>
                            //
                        </Modal>
                        <div className="menu-right">

                            <Identificate evento={this.triggerOpenModalHandler}/>
                            <Carrito/>

                        </div>

                    </div>
                </nav>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        // desc: state.Search.desc,
        // user: state.Users,
    }
}

export default connect(mapStateToProps)(Header);
