import React from 'react'
import '../styles/Login.css'
import Board from "./Board"
class Login extends React.Component{
    constructor(props){
        super(props)
        this.login=this.login.bind(this);
    }
    login(){
        let userName=document.getElementById("login").value;
        let password=document.getElementById("password").value;
        window.JF.getFormSubmissions("93141352586963",response=>{
            for (let i = 0; i <response.length ; i++) {
                console.log(response[i]);
                if(response[i].answers[3].answer==userName){
                                if(response[i].answer[4]==password){

                                }
                }
            }
        },response=>{console.log(response)});

        // return <Board homes={}/>;
    }
    render() {
        return(
            <div className="logIn">
                <form>
                    <input  type="text" id="login1" className="fadeIn second" name="login" placeholder="login"/>
                        <input  type="text" id="password1" className="fadeIn third" name="login" placeholder="password"/>
                    <button id="buttonSign" type="submit"  className="fadeIn fourth" value="Log in" onClick={this.login}>Log in</button>
                </form>
            </div>
        )
    }
}
export default Login;