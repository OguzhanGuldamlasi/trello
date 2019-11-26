import React from 'react'
import Login from "./Login";
import SignIn from "./SignIn";
import Board from "./Board";

import { BrowserRouter } from 'react-router-dom'

import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import ReactDOM from "react-dom";
import BoardRoute from "./BoardRoute";
function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
window.JF.initialize({apiKey:"1661f160d42273ac076477075ff09c51"});
window.JF.login(
    function success(){},
    function error(){
        window.alert("Could not authorize user");
    }
);
class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            user: undefined,
            password: undefined,
            homes: undefined,
            toggleSignUp:false,
        };
        this.setToggleSignUp=this.setToggleSignUp.bind(this);
    }
    setToggleSignUp(){
        console.log("here");
        this.setState({toggleSignUp:!this.state.toggleSignUp})
    }
    setUser = (u) =>{
        this.setState({user:u});
    };

    setPassword = (p) => {
        this.setState({password:p});
    };

    setHomes = (h) =>{
        this.setState({homes:h});
    };
    render() {
        let {user, password, homes} = this.state;
        if(user===undefined ){
            user=getCookieValue("user");
            password=getCookieValue("password");
            homes=getCookieValue("homes")
        }
        // console.log(document.cookie);
        const pageName=this.state.toggleSignUp ?  'LogIn' : 'SignIn';
        const linkName=pageName==="SignIn" ?  "SignIn" : '';
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={() => (
                        <div className="landingPage">

                            <Login  toggleSignUp={this.state.toggleSignUp} functionToggleSignUp={this.setToggleSignUp} setUser = {this.setUser} setPassword = {this.setPassword} setHomes = {this.setHomes}/>
                        </div>
                    )}
                    />
                    <Route  path='/SignIn' component={()=><div className="landingPage"><SignIn toggleSignUp={this.state.toggleSignUp} /></div>}/>
                    { homes !== undefined &&
                    <Route path='/board' component={() => <BoardRoute user={user} pass={password}  homes={homes}/>}/>
                    }


                </Switch>
                <Link to={linkName}>
                <button  id="hideThis" className="btn btn-success" onClick={this.setToggleSignUp}>{pageName}</button>
                </Link>
            </BrowserRouter>

        )
    }
}
export default LandingPage;