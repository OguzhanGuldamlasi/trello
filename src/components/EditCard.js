import React from 'react';
import '../styles/EditCard.css';

class EditCard extends React.Component {
    componentDidMount() {
        this.setState({checklistItems:this.props.params.checklist},()=>console.log(this.state.checklistItems))

    }


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
        this.calculateProgress=this.calculateProgress.bind(this);
        this.state={
            checklistItems:[],
            showTextArea:false,
            showCommentSave:false,
            inputField:false,
            descButton:false,
            backgroundImage:null
        };

        // try{
        // document.getElementsByClassName("saveList")[0].style.display='none';
        // }catch (e) {
        //
        // }finally {
        //     document.getElementsByClassName("addListButton")[0].style.display='none';
        //     document.getElementsByClassName("addList")[0].style.visibility='hidden';
        //     document.getElementsByClassName("listContainer")[0].style.display='none';
        // }
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
        let commentArea=document.getElementById("commentInp");
        comment.text=commentArea.value;
        if(comment.text==='') {
            return;
        }
        comment.id=comment.text;
        let comments=this.props.params.comments;
        comments.push(comment);
        this.props.setTasks(undefined,undefined,undefined,comments);
        commentArea.value='';
        document.getElementById("commentInp").click();
        // document.getElementById("saveComment").remove();
        this.setState({showCommentSave:false})
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
        console.log("here");
        e.preventDefault();
        let textArea=document.getElementById("descdesc");
        let text=textArea.value;
        document.getElementsByClassName("list-group-item list-group-item-success")[0].innerText="Description : "+text;
        this.props.setTasks(undefined,undefined,text);
        this.setState({
            descButton:false
        })
    }
    calculateProgress(){

       let totalJob= this.state.checklistItems.length-1;
       let finishedJob=0;
        for (let i = 1; i <this.state.checklistItems.length ; i++) {
            if(this.state.checklistItems[i].done===true){
                finishedJob+=1;
            }
        }

        return (finishedJob/totalJob*100).toFixed(1);
    }
    render() {
        return (

            <div className='popup'>
                <div  className="wrapperEditCard">
                <div className="toDoDiv">
                            <h4>Enter Card Name</h4>
                            <div>
                            <input style={{width:'50%'}} className="form-control" placeholder="Enter the card name"
                                   onChange={e => this.setToDo(e)}/>
                            </div>
                        </div>
                        <div className="descDiv">
                            <h4 > Description</h4>
                            <div>
                                <textarea  style={{width:'%50'}} onBlur={e => this.saveDesc(e)} onClick={this.showDescButton}
                                          className="form-control" rows="5" id="descdesc"/>
                                <button id="descSave" className="btn btn-info"  onClick={e => this.saveDesc(e)}>Save
                                </button>
                                <div id="blockquote" className="list-group-item list-group-item-success">Description : {this.props.params.description}</div>
                            </div>
                        </div>
                        <div className="comments">
                            <div className="writeComment">
                                <input onClick={this.showSave} type="text" id="commentInp" className="form-control"
                                       placeholder="Write a comment"/>
                                <button style={{display: this.state.showCommentSave ? 'flex' : 'none'}}
                                    id="saveComment"    className="btn btn-success" onClick={(e) => this.saveComment(e)}>Save Comment
                                </button>
                            </div>
                            <h4>Comments</h4>
                            <ul className="list-group">
                                {this.props.params.comments.map(comment => {
                                    return <div id={comment.id}>
                                        <li className="list-group-item">
                                            <div>
                                                <span id={comment.id + "1"}>{comment.text}</span>
                                                <span>{comment.file}</span>
                                            </div>
                                        </li>
                                    </div>
                                })}
                            </ul>
                        </div>
                        <div className="addSection">
                            <div style={{overflow:'visible'}}><h4>Current Labels</h4>
                            <div style={{display:this.props.params.labels.length===0 ? 'none' : 'flex'}} className="currentLabels">
                                {this.props.params.labels.map((label)=>{
                                    console.log(label);
                                    return <div style={{color:"white"}} className={label.colour}>{label.id}</div>
                                })}
                            </div>
                            </div>
                            <h4> Choose Label</h4>
                            <div className="labelSection">
                                <div id="blueLabel" className="label label-primary" onClick={() => {
                                    let labels = this.props.params.labels;
                                    let inputArea=document.createElement("input");
                                    inputArea.className='form-control';
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText='Save';
                                    inputArea.placeholder='Optional';
                                    saveButton.className="btn btn-info";
                                    saveButton.addEventListener('click',(ev)=>ev.stopPropagation());
                                    document.getElementsByClassName("appendDiv")[0].append(inputArea);
                                    document.getElementsByClassName("appendDiv")[0].append(saveButton);
                                    saveButton.onclick=()=>{let label = {
                                        colour: "blue",
                                        id:inputArea.value
                                    };
                                        labels.push(label);
                                        this.forceUpdate();
                                        document.getElementsByClassName("appendDiv")[0].innerHTML="";
                                        this.props.setTasks(undefined,undefined,undefined,undefined,undefined,labels);}

                                }}>
                                    Blue Label</div>
                                <div id="greenLabel" className="label label-success" onClick={() => {
                                    let labels = this.props.params.labels;
                                    let inputArea=document.createElement("input");
                                    inputArea.className='form-control';
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText='Save';
                                    saveButton.className='btn btn-success';
                                    inputArea.placeholder='Optional';
                                    saveButton.addEventListener('click',(ev)=>ev.stopPropagation());
                                    document.getElementsByClassName("appendDiv")[0].append(inputArea);
                                    document.getElementsByClassName("appendDiv")[0].append(saveButton);
                                    saveButton.onclick=()=>{
                                        let label = {
                                        colour: "green",
                                        id:inputArea.value
                                    };
                                        labels.push(label);
                                        this.forceUpdate();
                                        document.getElementsByClassName("appendDiv")[0].innerHTML="";
                                        this.props.setTasks(undefined,undefined,undefined,undefined,undefined,labels);}

                                }}>
                                    Green Label</div>
                                <div id="redLabel" className="label label-danger" onClick={() => {
                                    let labels = this.props.params.labels;
                                    let inputArea=document.createElement("input");
                                    inputArea.className='form-control';
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText='Save';
                                    saveButton.className='btn btn-danger';
                                    inputArea.placeholder='Optional';
                                    saveButton.addEventListener('click',(ev)=>ev.stopPropagation());
                                    document.getElementsByClassName("appendDiv")[0].append(inputArea);
                                    document.getElementsByClassName("appendDiv")[0].append(saveButton);
                                    saveButton.onclick=()=>{let label = {
                                        colour: "red",
                                        id:inputArea.value
                                    };
                                        labels.push(label);
                                        this.forceUpdate();
                                        document.getElementsByClassName("appendDiv")[0].innerHTML="";
                                        this.props.setTasks(undefined,undefined,undefined,undefined,undefined,labels);}

                                }}>
                                   Red Label</div>
                            </div><div className="appendDiv"/>
                            <div className="checkListSection">
                                <button id="addCheck" style={{display: this.state.checklistItems.length>0 ? 'none' : 'flex'}}  className="btn btn-warning" onClick={(e)=>{
                                    document.activeElement.addEventListener("click",(ev)=>ev.stopPropagation());
                                    let inputArea=document.createElement("input");
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    document.activeElement.parentElement.append(inputArea);
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText="Save";
                                    saveButton.id="lol";
                                    inputArea.id="lol2"
                                    saveButton.className='btn btn-info';
                                    inputArea.className="form-control";
                                    saveButton.addEventListener("click",(ev)=>ev.stopPropagation());
                                    document.activeElement.parentElement.append(saveButton);
                                    inputArea.placeholder="Give a title from here";
                                    saveButton.onclick=()=>{
                                        if(inputArea.value===null||inputArea.value==='') {inputArea.placeholder="Fill this area "; return;}
                                        let title=inputArea.value;
                                        let checkList=[];
                                        checkList.push(title);
                                        this.props.setCheckList(checkList);
                                        console.log(title);
                                        this.setState({checklistItems:checkList},()=>console.log(this.state.checklistItems));
                                        inputArea.remove();
                                        saveButton.remove();
                                    };

                                }}>
                                    Add  Checklist
                                </button>
                                <button id="checklistItem" ref="but2" style={{display: this.state.checklistItems.length>0 ? 'flex' : 'none'}} className="btn btn-info" onClick={(e)=>{
                                    let inputArea=document.createElement("input");
                                    inputArea.type="text";
                                    inputArea.className="form-control";
                                    inputArea.placeholder="Add an item";
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.addEventListener('click',(ev)=>ev.stopPropagation());
                                    saveButton.className="btn btn-primary";
                                    saveButton.innerText="Save";
                                    document.getElementsByClassName("saveDiv")[0].append(inputArea);
                                    document.getElementsByClassName("saveDiv")[0].append(saveButton);
                                    saveButton.onclick=()=>{
                                        if(inputArea.value===null|| inputArea.value==='') {
                                            inputArea.placeholder="Fill this area " ;
                                            return;
                                        }
                                        let checkList=[...this.state.checklistItems];
                                        let item={
                                          id:inputArea.value,
                                          done:false
                                        };
                                        console.log(checkList);
                                        checkList.push(item);
                                        this.props.setCheckList(checkList);
                                        this.setState({checklistItems:checkList});
                                        console.log(this.state.checklistItems);
                                        let nodes=  document.activeElement.parentElement.childNodes;
                                        document.getElementsByClassName("saveDiv")[0].innerHTML="";
                                        this.forceUpdate()
                                    };
                                    let cancelButton=document.createElement("button");
                                    saveButton.style.margin="5px";
                                    saveButton.style.left="20%";
                                    saveButton.style.position="relative";
                                    cancelButton.style.margin="5px";
                                    cancelButton.style.left="40%";
                                    cancelButton.style.position="relative";
                                    cancelButton.className="btn btn-primary";
                                    cancelButton.innerText="Cancel";
                                    document.getElementsByClassName("saveDiv")[0].append(cancelButton);
                                    cancelButton.onclick=()=>{
                                        document.getElementsByClassName("saveDiv")[0].innerHTML="";
                                    }
                                }
                                }>
                                    Add Item to Checklist
                                </button>
                                <div className="saveDiv"/>
                            </div>
                            <div className="items" style={{visibility: this.state.checklistItems.length>0 ? 'visible' : 'hidden'}}>

                                <h5> Checklist :  {this.state.checklistItems[0]}</h5>
                                {/*<div className="funkyradio">*/}
                                {/*    <input type="checkbox" name="checkbox" id="checkbox1" />*/}
                                {/*    <label htmlFor="checkbox1">First Option default</label>*/}
                                {/*</div>*/}
                               <ul>
                                    {this.state.checklistItems.slice(1).map((item,index)=>{
                                        return <div id={item.id+index}><input type="checkbox" name="checkbox" className="form-check-input"  id={item.id+"lol"} checked={item.done}  onClick={()=>{
                                            let submission=[];
                                            let editedSubmissionId;
                                            if(document.activeElement.checked===true){
                                                item.done=true;
                                                window.JF.getFormSubmissions("92931856730969",response=>{
                                                    for (let j = 0; j <response.length ; j++) {
                                                        if(response[j].answers[9].answer==this.props.id){
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
                                                this.forceUpdate()});
                                            }
                                            else{
                                                item.done=false;
                                                window.JF.getFormSubmissions("92931856730969",response=>{
                                                    for (let j = 0; j <response.length ; j++) {
                                                        if(response[j].answers[9].answer==this.props.id){
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
                                                this.forceUpdate() });
                                            }
                                        }
                                        } /><span  id={item.id+index}> &nbsp; &nbsp; {item.id}</span>
                                        </div>
                                    })}
                                </ul>
                                <div style={{display:this.state.checklistItems.length>1 ? 'flex' : 'none'}}>
                                <div   className="progress-bar progress-bar-striped active" role="progressbar"
                                     aria-valuenow={this.calculateProgress()} aria-valuemin="20" aria-valuemax="80" style={{width:this.calculateProgress()+'%'}}>
                                    According to the checklist your progress is %{this.calculateProgress()}
                                </div>
                                </div>
                            </div>
                            <div className="coverIMG">
                                <input id="file" type="file" accept="image/*" name="file" className="inputfile" onChange={(e)=>{
                                    let file = document.getElementById("file").files[0];
                                    console.log(file);
                                    let reader = new FileReader();
                                    reader.readAsBinaryString(file);
                                    let decodedFile;
                                     reader.onload = ()=> {
                                       decodedFile=btoa(reader.result);
                                        this.props.setImg(decodedFile)
                                    };
                                    reader.onerror = function() {
                                        console.log('there are some problems');
                                    };

                                }} /><label id="for" htmlFor="file">Choose a file</label>
                            </div>
                        </div>

                        <button id="exitEdit" className="btn btn-info"  onClick={this.props.onClose}>Exit editing Card</button>
                </div>
            </div>
        );
    }
}
export default EditCard;