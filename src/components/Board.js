import React from 'react'
import BoardComps from "./BoardComps"
import '../styles/Board.css'
// import mailjet from "node-mailjet"
import NodeMailer from "nodemailer";
// import sendmail from "sendmail";

import Home from "./Home";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import axios from "axios";
// async function sendMail(){
//     "use strict";
//     const nodemailer = require("nodemailer");
//
// // async..await is not allowed in global scope, must use a wrapper
//     async function main() {
//         // Generate test SMTP service account from ethereal.email
//         // Only needed if you don't have a real mail account for testing
//         let testAccount = await nodemailer.createTestAccount();
//
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email",
//             port: 587,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: testAccount.user, // generated ethereal user
//                 pass: testAccount.pass // generated ethereal password
//             }
//         });
//
//         // send mail with defined transport object
//         let info = await transporter.sendMail({
//             from: '"Fred Foo ?" <foo@example.com>', // sender address
//             to: "oguzhanguldamlasi@gmail.com", // list of receivers
//             subject: "Hello ?", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>" // html body
//         });
//
//         console.log("Message sent: %s", info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//
//         // Preview only available when sending through an Ethereal account
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     }
//
//     main().catch(console.error);
//
// }

function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
class Board extends React.Component{
    constructor(props){
        try{
        document.getElementById("hideThis").remove();}
        catch (e) {

        }
        super(props);
        this.state={
            homeIds:this.props.homes,//
        };
        console.log(props);
        window.JF.getFormSubmissions("93141352586963", function(response){
            for(let i=0; i<response.length; i++){
                let userName=response[i].answers[3].answer;
                let password=response[i].answers[4].answer;
            }
        });
        // sendMail().then(response=>console.log(response));
        this.getBoardUsers=this.getBoardUsers.bind(this);
        this.findBoardComp=this.findBoardComp.bind(this);
    }
    componentDidMount() {
        // sendMail()
        // window.Email.send({
        //     port :"2525",
        //     SecureToken : "4a6bfe2a-bb8c-4d89-a330-068d7fd1f61c",
        //     Username : "oguzhanguldamlasi@gmail.com",
        //     Password : "66de0b65-68cc-4fe0-b105-ee42733814c7",
        //     To : 'oguzhan_g99@hotmail.com',
        //     From : "oguzhanguldamlasi@gmail.com",
        //     Subject : "This mail sent by board component",
        //     Body : "aldfkþasldkfþasdkfçwömerçmçzvmçcxmvçmvcþlkwerþksdaf"
        // }).then(
        //     message => console.log(message)
        // );
        window.JF.getFormSubmissions("93141352586963",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[3].answer==this.props.user){
                    if(response[i].answers[4].answer==this.props.pass){
                        // ReactDOM.render(<Board user={userName} pass={password}  homes={response[i].answers[5].answer} addHome={this.addHome}/>, document.getElementById('root'));
                        this.setState({homeIds:response[i].answers[5].answer})
                    }
                }
            }
        },response=>{console.log(response)});
    }
    findBoardComp(id){
        console.log(id);
        // console.log(this.state.homeIds)
        let homes=this.state.homeIds.split(",");
        for (let i = 0; i <homes.length ; i++) {
            if(id==homes[i]){
                return  <BoardComps setName={this.props.setName} setId={this.props.setId} user={this.props.user} pass={this.props.pass} homes={this.props.homes} addHome={this.props.addHome} findName={this.findName} id={id}/>;
            }
        }
    }
    getBoardUsers(){

    }
    render() {
        try{
            document.getElementById("hideThis").remove();}
        catch (e) {

        }
        const {user,pass} = this.props;
        if (user !== undefined){
            // document.cookie=`user=${user} ; domain=http://localhost:3000/board`;
            // document.cookie=`pass=${pass}; domain=http://localhost:3000/board`;
            return (
                <div className="homeContainer ">
                    <div className="AddHomeDiv">
                        <button className="btn btn-outline-warning" onClick={()=>{
                            let inputArea=document.createElement("input");
                            inputArea.className="form-control";
                            inputArea.id="inputss";
                            inputArea.addEventListener("keyup",function (event) {
                                if(event.key==="Enter"){
                                    saveButton.click();
                                }
                            })
                            document.getElementsByClassName("headerItems")[0].append(inputArea);
                            let saveButton=document.createElement("button");
                            saveButton.innerText="Add Board";
                            saveButton.id="saveButss";
                            saveButton.className="btn btn-outline-warning";
                            saveButton.addEventListener("click",ev=>ev.stopPropagation());
                            inputArea.addEventListener("click",ev=>ev.stopPropagation());
                            document.getElementsByClassName("headerItems")[0].append(saveButton);
                            saveButton.onclick=()=>{
                                if(inputArea.value == null||inputArea.value===""){
                                    inputArea.placeholder="Fill this area"
                                }
                                else{
                                    window.JF.getFormSubmissions("93144069017960", response=>{
                                        let currentId=response[0].answers[3].answer;
                                        window.JF.getFormSubmissions("93144069017960",(response)=>{
                                            let subId= response[0].id;
                                            let incrementedId=currentId-1+2;
                                            let submission=new Object();
                                            submission['3']=incrementedId;
                                            window.JF.editSubmission(subId, submission, (response)=>{
                                            })
                                            // let users=[];
                                            // window.JF.getFormSubmissions(formID, function(response){
                                            //     for(let i=0; i<response.length; i++){
                                            //         if(response[i].answers['5'].answer.split(',').splice(1).includes(this.state));
                                            //
                                            //     }
                                            // });
                                            // const dataToSubmit={
                                            //     name:userName,
                                            //     mail:email,
                                            //     message:"Welcome to Trello",
                                            // };
                                            // try {
                                            //     // console.log(dataToSubmit);
                                            //     axios.post("http://localhost:5000", dataToSubmit).then(response => console.log(response)).catch(e => console.log(e));
                                            // }catch (e) {
                                            //     console.log(e)
                                            // }

                                        });
                                        let submission = new Object();
                                        submission['3'] =currentId-1+1;
                                        submission['4'] =inputArea.value;
                                        window.JF.createFormSubmission("93143614742960", submission,(response)=>{
                                        },()=>console.log(this.state));
                                        window.JF.getFormSubmissions("93141352586963",  async response=>{
                                            for(let i=0; i<response.length; i++){
                                                console.log("I'm here")
                                                console.log(response[i].answers[3].answer);
                                                console.log(this.props.user);
                                                console.log(response[i].answers[4].answer);
                                                console.log(this.props.pass);
                                                if(response[i].answers[3].answer==this.props.user&&response[i].answers[4].answer==this.props.pass){
                                                    let boards;
                                                    console.log("I'm here")
                                                    boards=(response[i].answers[5].answer==="undefined")? ""+currentId : response[i].answers[5].answer+","+currentId;
                                                    let sid=response[i].id;
                                                    let userSubmission=new Object();
                                                    userSubmission['3']=response[i].answers[3].answer;
                                                    userSubmission['4']=response[i].answers[4].answer;
                                                    userSubmission['5']=boards;
                                                    window.JF.editSubmission(sid, userSubmission, (response)=>{
                                                    });
                                                    await this.setState({homeIds:boards},()=>this.forceUpdate());
                                                    document.getElementsByClassName("headerItems")[0].innerHTML="";
                                                    break;
                                                }
                                            }

                                        });});
                                }
                            }
                        }
                        }>Create new board</button>
                        <div className="headerItems"/>
                        {/*<div className="headerImg"/>*/}
                        {/*<div className="header">My Trello</div>*/}
                    </div>
                    <h1 style={{textAlign:"center"}}>Your Boards</h1>
                    <div style={{display:'inline-flex'}} className="Homes">
                        {this.state.homeIds.split(",").slice(1).map(id=>{
                            return  <BoardComps setName={this.props.setName} setId={this.props.setId} user={this.props.user} pass={this.props.pass} homes={this.props.homes} addHome={this.props.addHome} findName={this.findName} id={id}/>
                        })}
                    </div>
                    {/*<div style={{display:this.state.homeIds.includes(getCookieValue("homeId"))? "block":"none"}} className="lastVisited">*/}
                    {/*    <h2>Last visited board</h2>*/}
                    {/*    {*/}
                    {/*        this.findBoardComp(getCookieValue("homeId"))*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>
            );
        }
    }

}
export default Board;

/*
 var transporter = NodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'oguzhanguldamlasi@gmail.com',
                pass: 'Clau0onix'
            }
        });

        var mailOptions = {
            from: 'oguzhanguldamlasi@gmail.com',
            to: 'oguzhanguldamlasi@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });


 */