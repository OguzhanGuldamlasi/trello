import React from 'react'
import BoardComps from "./BoardComps"
import Home from "./Home";
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            homeIds:this.props.homes,//
        };
    }
    render() {
        return (
            <div className="homeContainer ">
                <div className="AddHomeDiv">
                    <button className="addHome" onClick={()=>{
                        let inputArea=document.createElement("input");
                        inputArea.classNameName="addHome";
                        document.getElementsByClassName("addHome")[0].append(inputArea);
                        let saveButton=document.createElement("button");
                        saveButton.innerText="Add Board";
                        saveButton.addEventListener("click",ev=>ev.stopPropagation());
                        inputArea.addEventListener("click",ev=>ev.stopPropagation());
                        document.getElementsByClassName("addHome")[0].append(saveButton);
                        saveButton.onclick=()=>{
                            if(inputArea.value == null){
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
                                    window.JF.getFormSubmissions("93141352586963", response=>{
                                        for(let i=0; i<response.length; i++){
                                            if(response[i].answers[3].answer==this.props.user&&response[i].answers[4].answer==this.props.pass){
                                                console.log(response[i].answers[5].answer);
                                                let boards;
                                                boards=(response[i].answers[5].answer==="undefined")? ""+currentId : response[i].answers[5].answer+","+currentId;
                                                let sid=response[i].id;
                                                let userSubmission=new Object();
                                                userSubmission['3']=response[i].answers[3].answer;
                                                userSubmission['4']=response[i].answers[4].answer;
                                                userSubmission['5']=boards;
                                                window.JF.editSubmission(sid, userSubmission, (response)=>{
                                                });
                                                this.setState({homeIds:boards},()=>this.forceUpdate());
                                                break;
                                            }
                                        }

                                    });});
                            }
                        }
                    }
                }>Create new board</button>
                </div>
                <div className="Homes">
                    {this.state.homeIds.split(",").map(id=>{return <BoardComps findName={this.findName} id={id}/>})}
                </div>
            </div>
        );
    }
}
export default Board;