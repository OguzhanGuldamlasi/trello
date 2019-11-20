import React from 'react'
import BoardComps from "./BoardComps"
import '../styles/Board.css'
import mailjet from "node-mailjet"
import NodeMailer from "nodemailer";
// import sendmail from "sendmail";

import Home from "./Home";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";

function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            homeIds:this.props.homes,//
        };
        this.findBoardComp=this.findBoardComp.bind(this);
    }
    componentDidMount() {
        window.Email.send({
            port :"2525",
            SecureToken : "4a6bfe2a-bb8c-4d89-a330-068d7fd1f61c",
            Username : "oguzhanguldamlasi@gmail.com",
            Password : "66de0b65-68cc-4fe0-b105-ee42733814c7",
            To : 'oguzhan_g99@hotmail.com',
            From : "oguzhanguldamlasi@gmail.com",
            Subject : "This mail sent by board component",
            Body : "aldfkþasldkfþasdkfçwömerçmçzvmçcxmvçmvcþlkwerþksdaf"
        }).then(
            message => console.log(message)
        );
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

    render() {

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
                                        });
                                        let submission = new Object();
                                        submission['3'] =currentId-1+1;
                                        submission['4'] =inputArea.value;
                                        window.JF.createFormSubmission("93143614742960", submission,(response)=>{
                                        },()=>console.log(this.state));
                                        window.JF.getFormSubmissions("93141352586963",  async response=>{
                                            for(let i=0; i<response.length; i++){
                                                if(response[i].answers[3].answer==this.props.user&&response[i].answers[4].answer==this.props.pass){
                                                    let boards;
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