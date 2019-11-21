import React from 'react'
import '../styles/SignIn.css'
import axios from 'axios'
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
        let email=document.getElementById("email").value;
        let bool=this.validateUsername(userName);
        const dataToSubmit={
            name:userName,
            mail:email,
            message:"Welcome to Trello",
        };
        try {
            // console.log(dataToSubmit);
            axios.post("http://localhost:5000", dataToSubmit).then(response => console.log(response)).catch(e => console.log(e));
        }catch (e) {
            console.log(e)
        }

        if(!bool){
            document.getElementsByClassName("saved")[0].style.display='none';
            document.getElementsByClassName("error")[0].style.visibility="inherit";
            document.getElementsByClassName("error")[0].innerText="Enter a valid UserName";
            event.preventDefault();
            return false;
        }
        bool=this.validatePassword(password);
        if(bool){
            document.getElementsByClassName("saved")[0].style.display='none';
            document.getElementsByClassName("error")[0].style.visibility="inherit";
            document.getElementsByClassName("error")[0].innerText="Enter a valid Password";
            event.preventDefault();
            return false;
        }
        window.JF.getFormSubmissions("93141352586963",response=>{
            if(response.length===0){
                let submission = new Object();
                submission['3'] = userName;
                submission['4'] = password;
                submission['5'] = null;
                submission['6']= email;
                window.JF.createFormSubmission("93141352586963", submission,response=>{
                });
            }
            else{for (let i = 0; i <response.length ; i++) {
                console.log(response[i].answers[3].answer);
                if(response[i].answers[3].answer===userName){
                    document.getElementsByClassName("saved")[0].style.display='none';
                    document.getElementsByClassName("error")[0].style.visibility="inherit";
                    document.getElementsByClassName("error")[0].innerText="This username already taken";
                    document.getElementsByClassName("saved")[0].style.display="none";
                }
                else{
                    document.getElementsByClassName("error")[0].style.visbility="hidden";
                    document.getElementsByClassName("saved")[0].style.display="block";
                    let submission = new Object();
                    submission['3'] = userName;
                    submission['4'] = password;
                    submission['5'] = null;
                    submission['6']=email;
                    window.JF.createFormSubmission("93141352586963", submission,response=>{
                        console.log(response)
                    });
                }
            }}

        },response=>{console.log(response)});

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
        return true;
    }
    render() {
        return(
                <form className="SignIn">
                    <h2 className="signInText">Sign in</h2>
                    <input  type="text" id="login" className="fadeIn second" name="login" placeholder="UserName"/>
                    <input  type="email" id="email" className="fadeIn third" name="email" placeholder="email"/>
                    <input  type="password" id="password" className="fadeIn third" name="login" placeholder="password"/>
                    <button id="buttonSign" type="submit"  className="fadeIn fourth" value="Sign in" onClick={event => this.saveUser(event)}>SignIn</button>
                    <div className="saved"  style={{display:'none'}} ><a  href="https://icon-library.net/icon/successful-icon-10.html"/>Successful Sign</div>
                    <div className="error" style={{visibility:'hidden'}}><img alt="" src="http://cdn.jotfor.ms/images/exclamation-octagon.png"/></div>
                </form>
        )
    }
}
export default SignIn;