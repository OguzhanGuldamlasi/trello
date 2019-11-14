import React from 'react'
import ReactDOM from 'react-dom';
import '../styles/Login.css'
import Board from "./Board"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
class Login extends React.Component{
    constructor(props){
        super(props);
        this.addHome=this.addHome.bind(this);
        this.login=this.login.bind(this);
        this.state={
            userName:undefined,
        }
    }
    addHome(home){
        let arr=[...this.state.homes];
        arr.push(home);
        this.setState({homes:arr})
    }
    login(ev){
        const {setUser, setPassword, setHomes} = this.props;
        // ev.preventDefault();
        let userName=document.getElementById("login1").value;
        let password=document.getElementById("password1").value;
        window.JF.getFormSubmissions("93141352586963",response=>{
            for (let i = 0; i <response.length ; i++) {
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

                                    setUser("");
                                    setPassword("");
                                    setHomes([]);
                                }
                }
            }
        },response=>{console.log(response)});
        let errorMSG=document.createElement("span");
        errorMSG.innerText="No such user";
        document.getElementById("login1").append(errorMSG)
    }
    render() {


        return(
            <div  className="logIn">
                <h2>Log in</h2>
                <form>
                    <input   type="text" id="login1" className="fadeIn second" name="login" placeholder="UserName"/>
                    <input  type="password" id="password1" className="fadeIn third" name="login" placeholder="password"/>
                    <Link to="/board">
                        <button id="buttonSign" type="submit"  className="fadeIn fourth" value="Log in" onClick={ev=>this.login(ev)}>Log in</button>
                    </Link>
                </form>
            </div>
        )
    }
}
export default Login;