import React from 'react';
import '../styles/EditCard.css';

class EditCard extends React.Component {
    componentDidMount() {

        for (let i = 0; i <this.props.params.labels.length ; i++) {
            if(this.props.params.labels[i].colour=="green"){
                document.getElementById("green").checked=true;
            }
            if(this.props.params.labels[i].colour=="red"){
                document.getElementById("red").checked=true;
            }
            if(this.props.params.labels[i].colour=="blue"){
                document.getElementById("blue").checked=true;
            }
        }
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

        try{
        document.getElementsByClassName("saveList")[0].style.display='none';
        }catch (e) {
            
        }finally {
            document.getElementsByClassName("addListButton")[0].style.display='none';
            document.getElementsByClassName("addList")[0].style.visibility='hidden';
            document.getElementsByClassName("listContainer")[0].style.display='none';
        }
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
        document.getElementsByClassName("commentInput")[0].click();
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
        let textArea=document.getElementsByClassName("form-control")[0];
        let text=textArea.value;
        this.setState({
            showTextArea:false
        });
        console.log(text)
        document.getElementsByClassName("printDesc")[0].innerText=textArea.value;
        this.props.setTasks(undefined,undefined,text);
        textArea.value="";
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
        return finishedJob/totalJob*100;
    }
    render() {
        return (
            <div className='popup'>
                        <div className="toDoDiv">
                            <h3 className="name">Enter Card Name</h3>
                            <div>
                            <input className="toDoName" placeholder="Enter the card name"
                                   onChange={e => this.setToDo(e)}/>
                            </div>
                        </div>
                        <div className="descDiv">
                            <h3 className="descName"> Description</h3>
                            <div>
                                <textarea onBlur={e => this.saveDesc(e)} onClick={this.showDescButton}
                                          className="form-control" rows="5" id="comment"/>
                                <button style={{display: this.state.descButton ? 'flex' : 'none'}}
                                        className="saveDesc" onClick={e => this.saveDesc(e)}>Save
                                </button>
                                <div className="printDesc">{this.props.params.description}</div>
                            </div>
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
                                    </div>
                                })}
                            </ul>
                        </div>
                        <div className="addSection">
                            <div> Choose Label</div>
                            <div className="labelSection">
                                <div className="greenLabel" style={{}}>
                                    <input id="green" type="checkbox"  onClick={() => {
                                        let labels =this.props.params.labels;
                                        if (document.activeElement.checked === true) {
                                            let label = {
                                                colour: "green",
                                                id: ""
                                            };
                                                labels.push(label);
                                                this.props.setTasks(undefined, undefined, undefined, undefined, undefined,  labels);
                                        }
                                    }
                                    }/></div>
                                <div className="blueLabel">
                                    <input id="blue" type="checkbox" onClick={() => {
                                        let labels = this.props.params.labels;
                                        if (document.activeElement.checked === true) {
                                            let label = {
                                                colour: "blue",
                                                id: ""
                                            };
                                                labels.push(label);
                                                this.props.setTasks(undefined, undefined, undefined, undefined, undefined, labels);
                                            }
                                        }
                                    }
                                    /></div>
                                <div className="label label-danger">
                                    <input id="red" type="checkbox" onClick={() => {
                                        let labels = this.props.params.labels;
                                        if (document.activeElement.checked === true) {
                                            let label = {
                                                colour: "red",
                                                id: ""
                                            };
                                                labels.push(label);
                                                this.props.setTasks(undefined,undefined,undefined,undefined,undefined,labels);


                                        }
                                    }
                                    }/>High Priority</div>
                            </div>
                            <div className="checkListSection">
                                <button style={{display: this.state.checklistItems.length>0 ? 'none' : 'flex'}}  className="checkListButton" onClick={(e)=>{
                                    document.activeElement.addEventListener("click",(ev)=>ev.stopPropagation());
                                    let inputArea=document.createElement("input");
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    document.activeElement.parentElement.append(inputArea);
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText="Save";
                                    saveButton.addEventListener("click",(ev)=>ev.stopPropagation());
                                    document.activeElement.parentElement.append(saveButton);
                                    inputArea.placeholder="Give a title from here";
                                    saveButton.onclick=()=>{
                                        if(inputArea.value===null||inputArea.value==='') {inputArea.placeholder="Fill this area "; return;}
                                        let title=inputArea.value;
                                        let checkList=[];
                                        checkList.push(title);
                                        this.props.setCheckList(checkList);
                                        this.setState({checklistItems:checkList},()=>console.log(this.state.checklistItems));
                                        inputArea.remove();
                                        saveButton.remove();
                                    };

                                }}>
                                    Add  Checklist
                                </button>
                                <button ref="but2" style={{display: this.state.checklistItems.length>0 ? 'flex' : 'none'}} className="addItem" onClick={(e)=>{
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
                                        this.setState({checklistItems:checkList});
                                        console.log(this.state.checklistItems);
                                        let nodes=  document.activeElement.parentElement.childNodes;
                                        nodes.item(3).remove();
                                        nodes.item(2).remove();
                                        nodes.item(1).remove();
                                        this.forceUpdate()
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
                                    Add Item to Checklist
                                </button>
                            </div>
                            <div className="items" style={{visibility: this.state.checklistItems.length>0 ? 'visible' : 'hidden'}}>
                               Checklist :  {this.state.checklistItems[0]}
                                        <div className="progress-bar progress-bar-striped active" role="progressbar"
                                             aria-valuenow={this.calculateProgress()} aria-valuemin="0" aria-valuemax="100" style={{width:this.calculateProgress()+'%'}}>
                                            According to the checklist your progress is %{this.calculateProgress()}
                                        </div>

                               <ul>
                                    {this.state.checklistItems.slice(1).map((item,index)=>{
                                        return <li><div id={item.id+index}><span  id={item.id+index}>{item.id}</span><input className="itemCheck" id={item.id+"lol"}  onClick={()=>{
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
                                        }  type="checkbox"/>

                                        </div></li>
                                    })}
                                </ul>
                            </div>
                            <div className="coverIMG">
                                <input className="imgInput" type="file" accept="image/*" onInput={(e)=>{
                                    let url=URL.createObjectURL(document.getElementsByClassName("imgInput")[0].files[0]);
                                    this.props.setImg("url(" + url + ") no-repeat");
                                }} />
                            </div>
                        </div>
                        <button onClick={this.props.closePopup}>close me</button>
            </div>
        );
    }
}
export default EditCard;