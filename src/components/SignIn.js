import React from 'react'
import '../styles/SignIn.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
class SignIn extends React.Component{
    constructor(props){

        console.log(document.cookie);
        document.cookie="homeName=;homeId=;user=;password=;homes=;";
        document.cookie="homeId=;user=;password=;homes=;";
        document.cookie="user=;password=;homes=;";
        document.cookie="password=;homes=;";
        document.cookie="homes=;";
        super(props);
        this.state={
            users:[],
            user:false,
            pass:false,
            email:false,
        };
        this.saveUser=this.saveUser.bind(this);
        this.validateUsername=this.validateUsername.bind(this);
        this.validatePassword=this.validatePassword.bind(this);
        this.checkUser=this.checkUser.bind(this);
        this.checkMail=this.checkMail.bind(this);
        this.checkPass=this.checkPass.bind(this);
    }
    componentDidMount() {
        let arr=[];
        window.JF.getFormSubmissions("93141352586963", (response)=>{
            for(let i=0; i<response.length; i++){
                arr.push(response[i].answers['3'].answer);
            }
        }, this.setState({users:arr}));
    }

    saveUser(event){
        // event.preventDefault();
        console.log(document.cookie);
        let userName=document.getElementById("login").value;
        let password=document.getElementById("password").value;
        let email=document.getElementById("email").value;
        const dataToSubmit={
            name:userName,
            mail:email,
            message:"Welcome to Trello",
        };
        try {
            // console.log(dataToSubmit);
            // axios.post("http://localhost:5000", dataToSubmit).then(response => console.log(response)).catch(e => console.log(e));
        }catch (e) {
            console.log(e)
        }
        document.cookie=`user=${userName};`;
        document.cookie=`password=${password}`;
        document.cookie=`homes=;`
         let submission=new Object();
          submission['3'] = userName;
         submission['4'] = password;
           submission['5'] = null;
            submission['6']=email;
                    window.JF.createFormSubmission("93141352586963", submission,response=>{
                        console.log(response)
                    });

    }
    validatePassword(pw) {
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(pw.match(passw))
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    validateUsername(fld) {
        return fld.length >= 5;

    }
    checkPass(){
        let password=document.getElementById("password").value;
        if(this.validatePassword(password)===false){
            console.log("here")
            this.setState({pass:false})
            return false;
        }
        this.setState({pass:true})
        return true;
    }
    checkMail(){
        let email=document.getElementById("email").value;
        if(validateEmail(email)===false){
            console.log("here")
            this.setState({mail:false});
            return false;
        }
        this.setState({mail:true});
        return true;
    }
    checkUser(){
        let name=document.getElementById("login").value;
        if(this.validateUsername(name)===false){
            console.log("here")
            this.setState({user:false});
            return false;
        }
        for (let i = 0; i <this.state.users.length ; i++) {
            if(this.state.users[i]===name){
                console.log("here");
                this.setState({user:false});
                return false;
            }
        }

        this.setState({user:true});
        return true;
    }
    render() {
        // window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

        if(this.props.toggleSignUp){
        return(
                <form className="SignIn">
                    <h2 className="signInText">Sign Up</h2>
                    <input  onChange={this.checkUser} type="text" id="login" className="form-control" name="login" placeholder="UserName( bigger than 4)"/><div style={{display:!this.state.user?'inline':'none'}} className="userNameError">Wrong UserName</div>
                    <input onChange={this.checkMail} type="email" id="email" className="form-control" name="email" placeholder="email"/><div style={{display:!this.state.mail?'inline':'none'}} className="mailError">Wrong mail</div>
                    <input onChange={this.checkPass} type="password" id="password" className="form-control" name="login" placeholder="password"/><div style={{display:!this.state.pass?'inline':'none'}} className="passwordError">Wrong password</div>
                    <Link style={{visibility:this.state.pass&&this.state.user&&this.state.mail?'inherit':'hidden'}} className="errCheck" to="/board">
                    <button style={{visibility:this.state.pass&&this.state.user&&this.state.mail?'inherit':'hidden'}} id="buttonSign" type="submit"  className="fadeIn fourth" value="Sign in" onClick={event => this.saveUser(event)}>Sign Up</button>
                    </Link>
                    {/*<div className="errorCheckDiv"/>*/}

                </form>
        )}
        else{
            return null;
        }
    }
}
export default SignIn;