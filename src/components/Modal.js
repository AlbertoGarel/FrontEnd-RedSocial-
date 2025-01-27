import React, {Component, Fragment} from 'react';
import {GET_USER, userRegister} from "../actions";

import './styles/Modal.css';
import $ from 'jquery';
import axios from 'axios';
import store from "../store";

// import Popper from 'popper.js';
class Modal extends Component {
// const Modal = (props) => {
    constructor(props) {
        super(props);
        this.state = {
            ModalRotate: 'empresa',
            logExitoUsuLog: '',
            logExitoEmpLog: '',
            logErrorUsuLog: '',
            logErrorEmpLog: '',
            usercityUsuLog: '',
            usercityEmpLog: '',
            RegExitoUsuLog: '',
            RegExitoEmpLog: '',
            RegErrorUsuLog: '',
            RegErrorEmpLog: '',
            valuesUsuLog: {
                loginEmailUsu: '',
                loginPasswordUsu: '',
            },
            valuesEmpLog: {
                loginEmailEmp: '',
                loginPasswordEmp: '',
            },
            validationsUsu : {
                emailUsu: '',
                passwordUsu: '',
            },
            validationsEmp : {
                emailEmp: '',
                passwordEmp: '',
            },
            rows: [],
            // citySelected: 1
        }
        // this.handleChanges = this.handleChanges.bind(this)
        this.myFormRef = React.createRef();
        // this.classModalRotate = this.classModalRotate.bind(this);
    }

    //validación de SELECT OPTION


    //envío de formulario
    handleSubmit = (ev) => {
        ev.preventDefault();
        const isValid = this.validateAll(ev);

        if (!isValid) {
            return false
        }

        // const values = JSON.stringify(this.state);
        if (ev.target.id === "login-formUsu") {
            const paramsBody = {
                "email": this.state.valuesUsuLog.loginEmailUsu,
                "password": this.state.valuesUsuLog.loginPasswordUsu
            };
            console.log(paramsBody)
            // this.myFormRef.reset();
            // userRegister(paramsBody);
            // axios.post('http://localhost:3000/users/login', paramsBody)
            //     .then(res => {
            //         if (res.status == 200) {
            //             store.dispatch({
            //                 type: GET_USER, payload: {
            //                     id: res.data.id,
            //                     username: res.data.user_name,
            //                     address: res.data.address,
            //                     token: res.data.token,
            //                     email: res.data.email,
            //                     role: res.data.role
            //                 }
            //             });
            //             localStorage.setItem('user', JSON.stringify(res.data))
            //             window.location.href = "/";
            //             // this.setState({logExito: res})
            //         } else {
            //             this.setState({logError: 'error en login'})
            //         }
            //
            //     })
            //     .catch(err => {
            //         this.setState({logError: 'Error en login'})
            //         setTimeout(function () {
            //             this.setState({logError: ''})
            //         }.bind(this), 2000)
            //     });
        } else {
            let paramsBody = {
                "email": this.state.valuesEmpLog.loginEmailEmp,
                "password": this.state.valuesEmpLog.loginPasswordEmp,
            };
            console.log(paramsBody)
            // axios.post('http://localhost:3000/users/register', paramsBody)
            //     .then(res => {
            //         this.setState({
            //             RegExito: res.data.message,
            //             RegError: '',
            //         });
            //         if (res.status == 200) window.location.href = "/";
            //         // this.handleSubmit("login-form")
            //     })
            //     .catch(err => {
            //         this.setState({
            //             RegError: err.message,
            //             RegExito: ''
            //         })
            //     });
            // this.myFormRef.reset();
        }
    };
    handleChangeusu = (ev) => {
        const {name, value} = ev.target;
        this.setState({
            valuesUsuLog: {
                ...this.state.valuesUsuLog,
                [name]: value
            }
        })
    };
    handleChangeEmp = (ev) => {
        const {name, value} = ev.target;
        this.setState({
            valuesEmpLog: {
                ...this.state.valuesEmpLog,
                [name]: value
            }
        })
    };
    validateAll = (ev) => {
        // const {usercity} = this.state
        const {loginEmailUsu, loginPasswordUsu} = this.state.valuesUsuLog;
        const {loginEmailEmp, loginPasswordEmp} = this.state.valuesEmpLog;
        const validationsUsu = {
            loginEmailUsu: '',
            loginPasswordUsu: '',
        };
        const validationsEmp = {
            loginEmailEmp: '',
            loginPasswordEmp: '',
        };
        let isValid = true;

        if (ev.target.id === "login-formUsu") {
            if (!loginPasswordUsu) {
                validationsUsu.loginPasswordUsu = 'Password es requerido.';
                isValid = false;
            }
            if (!(/[A-Z]/).test(loginPasswordUsu)) {
                validationsUsu.loginPasswordUsu = 'Al menos una letra mayuscula es requerida.';
                isValid = false;
            }
            if (!(/[a-z]/).test(loginPasswordUsu)) {
                validationsUsu.loginPasswordUsu = 'Al menos una letra minúcula es requerida.';
                isValid = false;
            }
            if (!(/[1-9]/).test(loginPasswordUsu)) {
                validationsUsu.loginPasswordUsu = 'Al menos un dígitoa es requerido.';
                isValid = false;
            }
            if (!loginEmailUsu) {
                validationsUsu.loginEmailUsu = 'Email es requerido'
                isValid = false
            }
            if (loginEmailUsu && !/\S+@\S+\.\S+/.test(validationsUsu)) {
                validationsUsu.loginEmailUsu = 'Formato de Email debe ser :  example@mail.com';
                isValid = false
            }
            if (loginPasswordUsu < 8) {
                validationsUsu.password = 'Longitud mínima de 8 caracteres es requerida.';
                isValid = false;
            }
            if (!isValid) {
                this.setState({validationsUsu})
            }
            return isValid;
        } else {
            if (loginPasswordEmp < 8) {
                validationsEmp.loginPasswordEmp = 'Longitud mínima de 8 caracteres es requerida.';
                isValid = false;
            }
            if (!(/[A-Z]/).test(loginPasswordEmp)) {
                validationsEmp.loginPasswordEmp = 'Al menos una letra mayuscula es requerida.';
                isValid = false;
            }
            if (!(/[a-z]/).test(loginPasswordEmp)) {
                validationsEmp.loginPasswordEmp = 'Al menos una letra minúcula es requerida.';
                isValid = false;
            }
            if (!(/[1-9]/).test(loginPasswordEmp)) {
                validationsEmp.loginPasswordEmp = 'Al menos un valor numérico es requerido.';
                isValid = false;
            }
            if (!loginPasswordEmp) {
                validationsEmp.loginPasswordEmp = 'Password es requerido.';
                isValid = false;
            }
            if (!loginEmailEmp) {
                validationsEmp.loginEmailEmp = 'Email es requerido'
                isValid = false
            }
            if (loginEmailEmp && !/\S+@\S+\.\S+/.test(loginEmailEmp)) {
                validationsEmp.loginEmailEmp = 'Formato de Email debe ser :  example@mail.com'
                isValid = false
            }
            if (!isValid) {
                this.setState({validationsEmp})
            }

            return isValid
        }
    };

    validateOneUsu = (ev) => {
        const {name} = ev.target;
        const value = this.state.valuesUsuLog[name];
        let message = '';

        if (!value) {
            message = `${name} es requerido`
        }

        if (value && name === 'name' && (value.length < 8 || value.length > 50)) {
            message = 'Nombre debe contener de 8 a 20 caracteres.'
        }

        if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            message = 'Formato de Email debe ser :  example@mail.com'
        }

        this.setState({
            validations: {
                ...this.state.validationsUsu,
                [name]: message
            }
        })
    };
    validateOneEmp = (ev) => {
        const {name} = ev.target;
        const value = this.state.valuesEmpLog[name];
        let message = '';

        if (!value) {
            message = `${name} es requerido`
        }

        if (value && name === 'name' && (value.length < 8 || value.length > 50)) {
            message = 'Nombre debe contener de 8 a 20 caracteres.'
        }

        if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            message = 'Formato de Email debe ser :  example@mail.com'
        }

        this.setState({
            validations: {
                ...this.state.validationsEmp,
                [name]: message
            }
        })
    };

    // render Selects
    componentDidMount() {

    }

    renderTopCities(res) {
        // let elems = [];
        // res.data.map((cat) => {
        //
        //     elems.push(
        //         <Fragment key={cat.id}>
        //             <option value={cat.id}>{cat.name}</option>
        //         </Fragment>
        //     )
        // });
        // this.setState({rows: elems})
    }

    // handleChanges = (ev) => {
    //     // this.setState({citySelected: ev.target.value});
    //     // this.setState({ values:{usercity: ev.target.value}})
    //     this.setState({usercity: ev.target.value})
    // };
    //Handler Button Flip
    handleEmpresa = () => {
        // this.setState({ModalRotate: 'usuario'})
        if(this.state.ModalRotate === 'usuario'){
            this.setState({ModalRotate: 'empresa'})
        }else{
            this.setState({ModalRotate: 'usuario'})
        }
    };

    render() {
        $(function () {

            $('#login-form-link').click(function (ev) {
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                ev.preventDefault();
            });
            $('#register-form-link').click(function (ev) {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $(this).addClass('active');
                ev.preventDefault();
            });


        });
        return (
            <Fragment>
                <div className="modal-wrapper "
                     style={{
                         transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    <div className="modal-header">
                        <h3>© Tech Talent</h3>
                        {/*<button id="btn-empresa" type="button" className="btn btn-primary btn-lg ">*/}
                        <div className="back">
                            <i className="fa fa-1x fa-exchange"/>
                            {this.state.ModalRotate}
                        </div>

                        <span className="close-modal-btn" onClick={this.props.close}><i
                            className="fa fa-2x fa-window-close-o"/></span>
                    </div>
                    {/*flip inicio*/}
                    <div className="flip-container">
                        <div className="flipper">
                            {/*flip inicio*/}

                            {/*flip delante*/}
                            <div className="front" style={this.state.ModalRotate == 'empresa' ? {transform: 'rotateY(180deg)'} : {}}>
                                {/*flip delante*/}
                                <div className="modal-body">
                                    <div className="row formulario-row">
                                        <div className="col-md-12 col-md-offset-3">
                                            <div className="panel panel-login">
                                                <div className="panel-heading">
                                                    <div className="row formulario-row">
                                                        <div className="col-12">
                                                            <h2>Login Usuario</h2>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row formulario-row">
                                                        <div className="col-lg-12">
                                                            <p className="error">{this.state.logError}</p>
                                                            <p className="correcto">{this.state.logExito}</p>
                                                            <form id="login-form"
                                                                  onSubmit={(ev) => this.handleSubmit(ev)}
                                                                  method="post" role="form" style={{display: 'block'}}
                                                                  ref={(login) => this.myFormRef = login}>
                                                                <div className="form-group">
                                                                    <input type="email"

                                                                           name="loginEmailUsu"
                                                                           onChange={this.handleChangeusu}
                                                                           onBlur={this.validateOneUsu}

                                                                           id="loginEmailUsu" tabIndex="1"
                                                                           className="form-control"
                                                                           placeholder="Email"/>
                                                                    <p className="error">{this.state.validationsUsu.loginEmailUsu}</p>
                                                                </div>
                                                                <div className="form-group">
                                                                    <input type="password"

                                                                           name="loginPasswordUsu"
                                                                           onChange={this.handleChangeusu}
                                                                           onBlur={this.validateOneUsu}

                                                                           id="loginPasswordUsu"
                                                                           tabIndex="2" className="form-control"
                                                                           placeholder="Contraseña"/>
                                                                    <p className="error">{this.state.validationsUsu.loginPasswordUsu}</p>
                                                                </div>
                                                                {/*<div className="form-group text-center">*/}
                                                                {/*    <input type="checkbox" tabIndex="3" className=""*/}
                                                                {/*           name="remember"*/}
                                                                {/*           id="remember"/>*/}
                                                                {/*    <label htmlFor="remember"> Recordarme</label>*/}
                                                                {/*</div>*/}
                                                                <div className="form-group">
                                                                    <div className="row formulario-row">
                                                                        <div className="col-sm-6 col-sm-offset-3">
                                                                            <input type="submit"

                                                                                   name="login-submit"

                                                                                   id="login-submit" tabIndex="4"
                                                                                   className="form-control btn btn-login"
                                                                                   value="Iniciar sesión"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*flip fin delante*/}
                                </div>
                                {/*flip fin delante*/}

                                {/*flip fin*/}
                            </div>
                            {/*flip inicio detras*/}
                            <div className="back" style={this.state.ModalRotate == 'empresa' ? {transform: 'rotateY(0deg)'} : {}}>

                                <div className="row formulario-row">
                                    <div className="col-md-12 col-md-offset-3">
                                        <div className="panel panel-login">
                                            <div className="panel-heading">
                                                <div className="row formulario-row">
                                                    <div className="col-12">
                                                        <h2>Login Empresa</h2>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </div>
                                            <div className="panel-body">
                                                <div className="row formulario-row">
                                                    <div className="col-lg-12">
                                                        <p className="error">{this.state.logError}</p>
                                                        <p className="correcto">{this.state.logExito}</p>
                                                        <form id="login-form"
                                                              onSubmit={(ev) => this.handleSubmit(ev)}
                                                              method="post" role="form" style={{display: 'block'}}
                                                              ref={(login) => this.myFormRef = login}>
                                                            <div className="form-group">
                                                                <input type="email"

                                                                       name="loginEmailEmp"
                                                                       onChange={this.handleChangeEmp}
                                                                       onBlur={this.validateOneEmp}

                                                                       id="loginEmailEmp" tabIndex="1"
                                                                       className="form-control"
                                                                       placeholder="Email"/>
                                                                <p className="error">{this.state.validationsEmp.loginEmailEmp}</p>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="password"

                                                                       name="loginPasswordEmp"
                                                                       onChange={this.handleChangeEmp}
                                                                       onBlur={this.validateOneEmp}

                                                                       id="loginPasswordEmp"
                                                                       tabIndex="2" className="form-control"
                                                                       placeholder="Contraseña"/>
                                                                <p className="error">{this.state.validationsEmp.loginPasswordEmp}</p>
                                                            </div>
                                                            {/*<div className="form-group text-center">*/}
                                                            {/*    <input type="checkbox" tabIndex="3" className=""*/}
                                                            {/*           name="remember"*/}
                                                            {/*           id="remember"/>*/}
                                                            {/*    /!*<label htmlFor="remember"> Recordarme</label>*!/*/}
                                                            {/*</div>*/}
                                                            <div className="form-group">
                                                                <div className="row formulario-row">
                                                                    <div className="col-sm-6 col-sm-offset-3">
                                                                        <input type="submit"

                                                                               name="login-submit"

                                                                               id="login-submit" tabIndex="4"
                                                                               className="form-control btn btn-login"
                                                                               value="Iniciar sesión"/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*flip fin detras*/}
                        </div>
                        {/*flip fin*/}
                    </div>
                    <div className="modal-footer">
                        {/*<button className="btn-cancel" onClick={this.props.close}>CLOSE</button>*/}
                        { this.state.ModalRotate == 'usuario' ?
                            <button className="btn-continue btn-primary raised" onClick={this.handleEmpresa}><i
                                className="fa fa-3x fa-building-o"/>
                                Login Empresas
                            </button>
                            :
                            < button className="btn-continue" onClick={this.handleEmpresa}><i
                            className="fa fa-3x fa-users"/>
                            Login Usuarios
                            </button>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default Modal;
