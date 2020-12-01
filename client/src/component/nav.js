import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
export default class Nav extends Component {

    state={
        hastoken:""
    }

componentDidMount() {
    const cookies = new Cookies();
        this.setState({
            hastoken:cookies.get('session_maintance')
        })
        console.log(this.state)
}

    render() {
       
     
        let logout=()=>{
            const cookies = new Cookies();
            cookies.remove('session_maintance', {path: "/",domain: "localhost"})
            this.setState({
                hastoken:cookies.get('session_maintance')
            })
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">React App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/a/dashboard">Dash Board</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>

                    </ul>

                </div>
                <ul className="nav navbar-nav navbar-right nav-item">
                    <li><Link to="/signup" className="nav-link"><span className="glyphicon glyphicon-user"></span> Sign Up  </Link></li>
                    <li><Link to="/signin" className="nav-link"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    {this.state.hastoken ?  <li><Link onClick={()=>logout()} className="nav-link"><span className="glyphicon glyphicon-log-in"></span> Logout </Link></li>: null }               
                </ul>
            </nav>
        )
    }
}