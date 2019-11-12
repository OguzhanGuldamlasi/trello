import React from 'react'
import ReactDOM from 'react-dom';
import '../styles/Login.css'
import Board from "./Board"
class Login extends React.Component{
    constructor(props){
        super(props);
        this.addHome=this.addHome.bind(this);
        this.login=this.login.bind(this);
    }
    addHome(home){
        let arr=[...this.state.homes];
        arr.push(home);
        this.setState({homes:arr})
    }
    login(ev){
        ev.preventDefault();
        let userName=document.getElementById("login1").value;
        let password=document.getElementById("password1").value;
        window.JF.getFormSubmissions("93141352586963",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[3].answer==userName){
                                if(response[i].answers[4].answer==password){
                                    ReactDOM.render(<Board user={userName} pass={password}  homes={response[i].answers[5].answer} addHome={this.addHome}/>, document.getElementById('root'));
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
            <div className="logIn">
                <h2>Log in</h2>
                <form>
                    <input  type="text" id="login1" className="fadeIn second" name="login" placeholder="login"/>
                        <input  type="password" id="password1" className="fadeIn third" name="login" placeholder="password"/>
                    <button id="buttonSign" type="submit"  className="fadeIn fourth" value="Log in" onClick={ev=>this.login(ev)}>Log in</button>
                </form>
            </div>
        )
    }
}
export default Login;