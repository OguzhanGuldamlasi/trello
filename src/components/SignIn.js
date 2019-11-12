import React from 'react'
import '../styles/SignIn.css'

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.saveUser=this.saveUser.bind(this);
        this.validateUsername=this.validateUsername.bind(this);
        this.validatePassword=this.validatePassword.bind(this);
    }

    saveUser(event){
        event.preventDefault();
        let userName=document.getElementById("login").value;
        let password=document.getElementById("password").value;
        let bool=this.validateUsername(userName);
        if(!bool){
            document.getElementsByClassName("error")[0].style.visibility="inherit";
            document.getElementsByClassName("error")[0].innerText="Wrong UserName";
            event.preventDefault();
            return false;
        }
        bool=this.validatePassword(password);
        if(bool){
            document.getElementsByClassName("error")[0].style.visibility="inherit";
            document.getElementsByClassName("error")[0].innerText="Wrong Password";
            event.preventDefault();
            return false;
        }
        window.JF.getFormSubmissions("93141352586963",response=>{
            for (let i = 0; i <response.length ; i++) {
                console.log(response[i]);
               if(response[i].answers[3].answer==userName){
                   document.getElementsByClassName("error")[0].style.visibility="inherit";
                   document.getElementsByClassName("error")[0].innerText="This username already taken";
                   event.preventDefault();
                   return false;
               }
            }
        },response=>{console.log(response)});
        let submission = new Object();
        submission['3'] = userName;
        submission['4'] = password;
        submission['5'] = undefined;
        window.JF.createFormSubmission("93141352586963", submission,response=>{
            console.log(response)
        });
    }
    validatePassword(pw) {
        return /[A-Z]/       .test(pw) &&
            /[a-z]/       .test(pw) &&
            /[0-9]/       .test(pw) &&
            /[^A-Za-z0-9]/.test(pw) &&
            pw.length > 4;

    }
    validateUsername(fld) {
        let error = "";
        let illegalChars = /\W/; // allow letters, numbers, and underscores
        if (fld.value == "") {
            error = "You didn't enter a username.\n";
            // document.getElementsByClassName("");
            return false;

        } else if ((fld.length < 5) || (fld.length > 15)) {
            error = "The username is the wrong length.\n";
            return false;

        } else if (illegalChars.test(fld.value)) {
            error = "The username contains illegal characters.\n";
            return false;

        }
        document.getElementsByClassName("saved")[0].style.visibility='inherit';
        return true;
    }
    render() {
        return(
                <form className="SignIn">
                    <h2 className="signInText">Sign in</h2>
                    <input  type="text" id="login" className="fadeIn second" name="login" placeholder="UserName"/>
                    <input  type="password" id="password" className="fadeIn third" name="login" placeholder="password"/>
                    <button id="buttonSign" type="submit"  className="fadeIn fourth" value="Sign in" onClick={event => this.saveUser(event)}>SignIn</button>
                    <div className="saved"  style={{visibility:'hidden'}} ><a  href="https://icon-library.net/icon/successful-icon-10.html"/>Successful Sign</div>
                    <div className="error" style={{visibility:'hidden'}}><img alt="" src="http://cdn.jotfor.ms/images/exclamation-octagon.png"/></div>
                </form>
        )
    }
}
export default SignIn;