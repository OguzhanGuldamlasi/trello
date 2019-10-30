import React from 'react';
import '../styles/EditCard.css';

class EditCard extends React.Component {
    constructor(props){
        super(props);
        this.setToDo=this.setToDo.bind(this);
        this.openTextArea=this.openTextArea.bind(this);
        this.saveDesc=this.saveDesc.bind(this);
        this.saveComment=this.saveComment.bind(this);
        this.showSave=this.showSave.bind(this);
        this.showDescButton=this.showDescButton.bind(this);
        this.closeDescButton=this.closeDescButton.bind(this);
        this.closeComments=this.closeComments.bind(this);
        this.state={
            showTextArea:false,
            showCommentSave:false,
            inputField:false,
            descButton:false,
            backgroundImage:null
        };
    }
    closeComments(){
        this.setState({
            inputField:false,
            showCommentSave:false,
        })
    }
    closeDescButton(){
        this.setState({descButton:false})
    }
    showDescButton(){
        this.setState({descButton:true})
    }
    showSave(){
        this.setState({showCommentSave:true,inputField:true})
    }
    saveComment(e){
      let  comment={
          text:'',
          file:'',
          id:''
      };
        let commentArea=document.getElementsByClassName("commentInput")[0];
        comment.text=commentArea.value;
        if(comment.text==='') {
            return;
        }
        comment.id=comment.text;
        let comments=this.props.params.comments;
        comments.push(comment);
        this.props.setTasks(undefined,undefined,undefined,comments);
        commentArea.value='';
    }
    setToDo(e){
        e.preventDefault();
        this.props.setTasks(e.target.value);
    }
    openTextArea(e){
        e.preventDefault();
        this.setState({
            showTextArea:true
        })
    }
    saveDesc(e){
        e.preventDefault();
        let textArea=document.getElementsByClassName("textArea")[0];
        let text=textArea.value;
        this.setState({
            showTextArea:false
        });
        this.props.setTasks(undefined,undefined,text);
        textArea.value="";
        this.setState({
            descButton:false
        })
    }
    render() {
        let i;
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <div className="editForm">
                        <div className="toDoDiv">
                            <input className="toDoName" placeholder={this.props.params.toDo}
                                   onChange={e => this.setToDo(e)}/>
                        </div>
                        <div className="descDiv">
                            Description
                            <div>
                                <textarea onBlur={e => this.saveDesc(e)} onClick={this.showDescButton}
                                          className="textArea"/>
                                <button style={{visibility: this.state.descButton ? 'visible' : 'hidden'}}
                                        className="saveDesc" onClick={e => this.saveDesc(e)}>Save
                                </button>
                            </div>
                            <span>{this.props.params.description}</span>
                        </div>
                        <div className="comments">
                            <div className="writeComment">
                                <input onClick={this.showSave} type="text" className="commentInput"
                                       placeholder="Write a comment"/>
                                <button style={{visibility: this.state.showCommentSave ? 'visible' : 'hidden'}}
                                        className="saveComment" onClick={(e) => this.saveComment(e)}>Save Comment
                                </button>
                            </div>
                            <div>Comments</div>
                            <ul>
                                {this.props.params.comments.map(comment => {
                                    return <div id={comment.id}>
                                        <li>
                                            <div>
                                                <span id={comment.id + "1"}>{comment.text}</span>
                                                <span>{comment.file}</span>
                                            </div>
                                        </li>
                                        <button className="deleteButton" onClick={() => {
                                            document.getElementById(comment.id).innerHTML = null;
                                            let comments = this.props.params.comments;
                                            for (let i = 0; i < comments.length; i++) {
                                                if (comments[i] === comment) {
                                                    comments.splice(i, 1);
                                                }
                                            }
                                        }}>Delete
                                        </button>
                                    </div>
                                })}
                            </ul>
                        </div>
                        <div className="addSection">
                            <span> Add to Card</span>
                            <div> Choose Label</div>
                            <div className="labelSection">
                                <button className="greenLabel">
                                    <input id="green" type="checkbox" onClick={() => {
                                        let labels =this.props.params.labels
                                        if (document.activeElement.checked === true) {

                                            let label = {
                                                colour: "green",
                                                id: ""
                                            };
                                            let inputArea = document.createElement("input");
                                            let saveButton = document.createElement("button");
                                            document.activeElement.parentElement.append(inputArea);
                                            document.activeElement.parentElement.append(saveButton);
                                            inputArea.placeholder = "Name (optional)";
                                            saveButton.innerText = "Save";
                                            saveButton.onclick = () => {
                                                if (inputArea.value !== '' || inputArea.value !== null) {
                                                    label.id = inputArea.value;
                                                }
                                                labels.push(label);
                                                this.props.setTasks(undefined, undefined, undefined, undefined, undefined,  labels);
                                                document.activeElement.parentElement.childNodes[1].remove();
                                                document.activeElement.parentElement.childNodes[1].remove();
                                            }
                                        } else {
                                            if (document.activeElement.parentElement.childNodes[2] === undefined)
                                                return;
                                            document.activeElement.parentElement.childNodes[2].remove();
                                            document.activeElement.parentElement.childNodes[1].remove()
                                        }
                                    }
                                    }/></button>
                                <button className="blueLabel">
                                    <input id="blue" type="checkbox" onClick={() => {
                                        let labels = this.props.params.labels;
                                        if (document.activeElement.checked === true) {
                                            let label = {
                                                colour: "blue",
                                                id: ""
                                            };
                                            let inputArea = document.createElement("input");
                                            let saveButton = document.createElement("button");
                                            document.activeElement.parentElement.append(inputArea);
                                            document.activeElement.parentElement.append(saveButton);
                                            inputArea.placeholder = "Name (optional)";
                                            saveButton.innerText = "Save";
                                            saveButton.onclick = () => {
                                                if (inputArea.value !== '' || inputArea.value !== null) {
                                                    label.id = inputArea.value;
                                                }
                                                labels.push(label);
                                                this.props.setTasks(undefined, undefined, undefined, undefined, undefined, labels);
                                                document.activeElement.parentElement.childNodes[1].remove();
                                                document.activeElement.parentElement.childNodes[1].remove();
                                            }
                                        } else {
                                            if (document.activeElement.parentElement.childNodes[2] === undefined)
                                                return;
                                            document.activeElement.parentElement.childNodes[2].remove();
                                            document.activeElement.parentElement.childNodes[1].remove()
                                        }
                                    }
                                    }/></button>
                                <button className="redLabel">
                                    <input id="red" type="checkbox" onClick={() => {
                                        let labels = this.props.params.labels;
                                        if (document.activeElement.checked === true) {
                                            let label = {
                                                colour: "red",
                                                id: ""
                                            };
                                            let inputArea = document.createElement("input");
                                            let saveButton = document.createElement("button");
                                            document.activeElement.parentElement.append(inputArea);
                                            document.activeElement.parentElement.append(saveButton);
                                            inputArea.placeholder = "Name (optional)";
                                            saveButton.innerText = "Save";
                                            saveButton.onclick = () => {
                                                if (inputArea.value !== '' || inputArea.value !== null) {
                                                    label.id = inputArea.value;
                                                }
                                                labels.push(label);
                                                this.props.setTasks(undefined,undefined,undefined,undefined,undefined,labels);
                                                document.activeElement.parentElement.childNodes[1].remove();
                                                document.activeElement.parentElement.childNodes[1].remove();
                                            }
                                        } else {
                                            if (document.activeElement.parentElement.childNodes[2] === undefined)
                                                return;
                                            document.activeElement.parentElement.childNodes[2].remove();
                                            document.activeElement.parentElement.childNodes[1].remove()
                                        }
                                    }
                                    }/></button>
                            </div>
                            <div className="checkListSection">
                                <button style={{visibility: this.props.params.checklist.length>0 ? 'hidden' : 'visible'}}  className="checkListButton" onClick={(e)=>{
                                    document.activeElement.addEventListener("click",(ev)=>ev.stopPropagation());
                                    let inputArea=document.createElement("input");
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    document.activeElement.append(inputArea);
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText="Save";
                                    saveButton.addEventListener("click",(ev)=>ev.stopPropagation());
                                    document.activeElement.append(saveButton);
                                    inputArea.placeholder="Give a title from here";
                                    saveButton.onclick=()=>{
                                        if(inputArea.value===null||inputArea.value==='') {inputArea.placeholder="Fill this area "; return;}
                                        let title=inputArea.value;
                                        let checkList=[];
                                        checkList.push(title);
                                        this.props.setCheckList(checkList);
                                    };

                                }}>
                                    Add to Checklist
                                </button>
                                <button ref="but2" style={{visibility: this.props.params.checklist.length>0 ? 'visible' : 'hidden'}} className="addItem" onClick={(e)=>{
                                    let inputArea=document.createElement("input");
                                    inputArea.placeholder="Add an item";
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.addEventListener('click',(ev)=>ev.stopPropagation());
                                    saveButton.innerText="Save";
                                    document.activeElement.append(inputArea);
                                    document.activeElement.append(saveButton);
                                    saveButton.onclick=()=>{
                                        if(inputArea.value===null|| inputArea.value==='') {
                                            inputArea.placeholder="Fill this area " ;
                                            return;
                                        }
                                        let checkList=this.props.params.checklist;
                                        let item={
                                          id:inputArea.value,
                                          done:false
                                        };
                                        checkList.push(item);
                                        this.props.setCheckList(checkList);
                                    };
                                    let cancelButton=document.createElement("button");
                                    cancelButton.innerText="Cancel";
                                    document.activeElement.append(cancelButton);
                                    cancelButton.onclick=()=>{
                                        let nodes=  document.activeElement.parentElement.childNodes;
                                        nodes.item(3).remove();
                                        nodes.item(2).remove();
                                        nodes.item(1).remove();
                                    }
                                }
                                }>
                                    Add Item
                                </button>
                            </div>
                            <div className="items" style={{visibility: this.props.params.checklist.length>0 ? 'visible' : 'hidden'}}>
                                {this.props.params.checklist[0]}
                                <ul>
                                    {this.props.params.checklist.slice(1).map((item,index)=>{
                                        return <li><div><span style={{backgroundColor : item.done  ?  'blue' :  'transparent'}} id={item.id+index}>{item.id}</span><input onClick={()=>{
                                            let submission=[];
                                            let editedSubmissionId;
                                            if(document.activeElement.checked===true){
                                                item.done=true;
                                                document.getElementById(item.id+index).style.backgroundColor="blue";
                                                window.JF.getFormSubmissions("92931856730969",response=>{
                                                    for (let j = 0; j <response.length ; j++) {
                                                        if(response[j].answers[9].answer==this.props.id){
                                                            console.log("here");
                                                            editedSubmissionId=response[j].id;
                                                            submission['9']=response[j].answers[9].answer;
                                                            submission['3']=response[j].answers[3].answer;
                                                            submission['4']=response[j].answers[4].answer;
                                                            submission['5']=response[j].answers[5].answer;
                                                            submission['11']=response[j].answers[11].answer;
                                                            submission['7']=response[j].answers[7].answer;
                                                            submission['10']=response[j].answers[10].answer;
                                                            submission['12']=response[j].answers[12].answer;
                                                            let checklist=JSON.parse(submission['10'].replace("undefined",""));
                                                            console.log(checklist);
                                                            for (let k = 0; k <checklist.length ; k++) {
                                                                if(checklist[k].id==item.id){
                                                                   checklist[k].done=true;
                                                                    break;
                                                                }
                                                            }
                                                            submission['10']=JSON.stringify(checklist);
                                                            window.JF.editSubmission(editedSubmissionId,submission,response=>console.log(response));
                                                            break;
                                                        }
                                                    }
                                                });
                                            }
                                            else{
                                                item.done=false;
                                                document.getElementById(item.id+index).style.backgroundColor="transparent";
                                                window.JF.getFormSubmissions("92931856730969",response=>{
                                                    for (let j = 0; j <response.length ; j++) {
                                                        if(response[j].answers[9].answer==this.props.id){
                                                            console.log("here");
                                                            editedSubmissionId=response[j].id;
                                                            submission['9']=response[j].answers[9].answer;
                                                            submission['3']=response[j].answers[3].answer;
                                                            submission['4']=response[j].answers[4].answer;
                                                            submission['5']=response[j].answers[5].answer;
                                                            submission['11']=response[j].answers[11].answer;
                                                            submission['7']=response[j].answers[7].answer;
                                                            submission['10']=response[j].answers[10].answer;
                                                            submission['12']=response[j].answers[12].answer;
                                                            let checklist=JSON.parse(submission['10'].replace("undefined",""));
                                                            console.log(checklist);
                                                            for (let k = 0; k <checklist.length ; k++) {
                                                                if(checklist[k].id==item.id){
                                                                    checklist[k].done=false;
                                                                    break;
                                                                }
                                                            }
                                                            submission['10']=JSON.stringify(checklist);
                                                            window.JF.editSubmission(editedSubmissionId,submission,response=>console.log(response));
                                                            break;
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                        } checked={item.done} type="checkbox"/></div></li>
                                    })}
                                </ul>
                            </div>
                            <div className="coverIMG">
                                <input className="imgInput" type="file" accept="image/*" onInput={(e)=>{
                                    console.log(document.getElementsByClassName("imgInput")[0].files);
                                    let url=URL.createObjectURL(document.getElementsByClassName("imgInput")[0].files[0]);
                                    this.props.setImg("url(" + url + ") no-repeat");
                                }} />
                            </div>
                            <div className="attachments">

                            </div>
                        </div>
                        <button onClick={this.props.closePopup}>close me</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditCard;