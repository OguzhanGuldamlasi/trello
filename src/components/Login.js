import React from 'react'
import ReactDOM from 'react-dom';
import '../styles/Login.css'
import Board from "./Board"
import {
    ConditionalLink,
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import LandingPage from "./LandingPage";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.addHome=this.addHome.bind(this);
        this.login=this.login.bind(this);
        this.state={
            userName:undefined,
            bool:true,
            bool1:true
        }
        this.getPass=this.getPass.bind(this);
        this.getUser=this.getUser.bind(this)
    }
    addHome(home){
        let arr=[...this.state.homes];
        arr.push(home);
        this.setState({homes:arr})
    }
    getUser(){
        if(this.state.bool){
            this.setState({bool:false});
            return getCookieValue("user")
        }
        return "";
    }
    getPass(){
        if(this.state.bool1){
            this.setState({bool1:false});
            getCookieValue("password")
        }
        return "";
    }
    login(ev){
        const {setUser, setPassword, setHomes} = this.props;
        // ev.preventDefault();
        let userName=document.getElementById("login1").value;
        let password=document.getElementById("password1").value;
        window.JF.getFormSubmissions("93141352586963",response=>{
            for (let i = 0; i <response.length ; i++) {
                console.log(response)
                if(response[i].answers[3].answer==userName){
                    if(response[i].answers[4].answer==password){
                        this.setState({userName:userName});
                        console.log("here");
                        document.cookie=`user=${userName};`;
                        document.cookie=`password=${password}`;
                        document.cookie=`homes=${response[i].answers[5].answer}`;
                        setUser(userName);
                        setPassword(password);
                        console.log(document.cookie);
                        setHomes(response[i].answers[5].answer);
                        break;
                    }
                    else{

                        // setUser("");
                        // setPassword("");
                        // setHomes([]);
                    }
                }
            }
        },response=>{console.log(response)});
    }
    render() {
        // document.getElementById("login1").innerText=getCookieValue("user");
        // document.getElementById("password1").innerText=getCookieValue("pass");

        return(
            <div  className="logIn">
                <h2>Log in</h2>
                <form>
                    <input  type="text" id="login1" className="form-control" name="login" placeholder="UserName"/>
                    <input  type="password" id="password1" className="form-control" name="login" placeholder="password"/>
                    <Link to="/board">
                        <button id="buttonSign" type="submit"  className="form-control" value="Log in" onClick={ev=>this.login(ev)}>Log in</button>
                    </Link>
                </form>
            </div>
        )
    }
}
export default Login;
function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
