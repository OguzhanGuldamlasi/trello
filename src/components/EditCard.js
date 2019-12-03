import React from 'react';
import '../styles/EditCard.css';
import Card from "./Dropdown";
function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
class EditCard extends React.Component {
    componentDidMount() {
        this.setState({checklistItems:this.props.params.checklist},()=>console.log(this.state.checklistItems))

    }

    editCheckList(itemName,index,ev){

        // ev.preventDefault();
        let inputArea=document.createElement("input");
        let saveButton=document.createElement("button");
        inputArea.id="removeThis1";
        inputArea.placeholder="Edit this checklist item";
        inputArea.className="form-control";
        saveButton.id="removeThis2";
        saveButton.className="btn btn-secondary";
        document.getElementById(itemName+index+"lol").append(inputArea);
        document.getElementById(itemName+index+"lol").append(saveButton);
        saveButton.innerText="Save";
        saveButton.onclick=(ev)=>{
            ev.preventDefault();

            if(inputArea.value==''){
                inputArea.placeholder="Fill this area"
            }
            else{
                let items=[...this.state.checklistItems];
                for (let i = 1; i < items.length; i++) {
                    console.log(itemName);
                    console.log(this.state.checklistItems);
                    if(itemName==items[i].id){
                        console.log("here3");
                        items[i].id=inputArea.value;
                        console.log(items);
                        this.setState({checklistItems:items},()=>this.forceUpdate());
                        console.log(this.state.checklistItems)
                    }
                }
                this.props.setChecklist2(items);
                document.getElementById("removeThis1").remove();
                document.getElementById("removeThis2").remove();
                window.JF.getFormSubmissions("92931856730969", response=>{
                    for(let i=0; i<response.length; i++){
                        if(response[i].answers['9'].answer==this.props.id && response[i].answers['14'].answer==this.props.homeid){
                            let submission=new Object()
                            submission['10']=JSON.stringify(items);
                            submission['9']=response[i].answers['9'].answer;
                            submission['3']=response[i].answers['3'].answer;
                            submission['4']=response[i].answers['4'].answer;
                            submission['5']=response[i].answers['5'].answer;
                            submission['11']=response[i].answers['11'].answer;
                            submission['7']=response[i].answers['7'].answer;
                            submission['12']=response[i].answers['12'].answer;
                            submission['13']=response[i].answers['13'].answer;
                            submission['14']=response[i].answers['14'].answer;
                            submission['15']=response[i].answers['15'].answer;
                            console.log(response[i]);
                            window.JF.editSubmission(response[i].id, submission, (response)=>{
                                console.log(response)
                            })
                        }
                    }
                });            }
        }
    }
    deleteCheckList(itemName){
        let items=[...this.state.checklistItems];
        for (let i = 1; i < items.length; i++) {
            if(itemName==items[i].id){
                items.splice(i, 1);
            }
        }
        this.setState({checklistItems:items},this.forceUpdate());
        window.JF.getFormSubmissions("92931856730969", response=>{
            for(let i=0; i<response.length; i++){
                if(response[i].answers['9'].answer==this.props.id && response[i].answers['14'].answer==this.props.homeid){
                    let submission=new Object()
                    submission['10']=JSON.stringify(items);
                    submission['9']=response[i].answers['9'].answer;
                    submission['3']=response[i].answers['3'].answer;
                    submission['4']=response[i].answers['4'].answer;
                    submission['5']=response[i].answers['5'].answer;
                    submission['11']=response[i].answers['11'].answer;
                    submission['7']=response[i].answers['7'].answer;
                    submission['12']=response[i].answers['12'].answer;
                    submission['13']=response[i].answers['13'].answer
                    submission['14']=response[i].answers['14'].answer;
                    console.log(response[i]);
                    window.JF.editSubmission(response[i].id, submission, (response)=>{
                        console.log(response)
                    })
                }
            }
        });

    }
    constructor(props){
        super(props);
        console.log(props)
        this.getRemainingDays=this.getRemainingDays.bind(this);
        this.editComment=this.editComment.bind(this);
        this.deleteComment=this.deleteComment.bind(this);
        this.deleteCheckList=this.deleteCheckList.bind(this);
        this.setToDo=this.setToDo.bind(this);
        this.openTextArea=this.openTextArea.bind(this);
        this.saveDesc=this.saveDesc.bind(this);
        this.saveComment=this.saveComment.bind(this);
        this.showSave=this.showSave.bind(this);
        this.showDescButton=this.showDescButton.bind(this);
        this.closeDescButton=this.closeDescButton.bind(this);
        this.closeComments=this.closeComments.bind(this);
        this.calculateProgress=this.calculateProgress.bind(this);
        this.onMouseOver=this.onMouseOver.bind(this);
        this.state={
            checklistItems:[],
            showTextArea:false,
            showCommentSave:false,
            inputField:false,
            descButton:false,
            backgroundImage:null
        };
        console.log(document.cookie);
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
          id:'',
          user:getCookieValue("user"),
      };
        let commentArea=document.getElementById("commentInp");
        comment.text=commentArea.value;
        if(comment.text==='') {
            commentArea.placeholder="Please type something";
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
    deleteComment(id,ev){
        ev.preventDefault();
        console.log(this.props.params.comments);
        let comments=[...this.props.params.comments];
        for (let i = 0; i <comments.length ; i++) {
            if(comments[i].id==id){
                comments.splice(i,1);
                break;
            }
        }
        this.props.setTasks(undefined,undefined,undefined,comments);
    }
    editComment(id,ev){
        ev.preventDefault();
        let inputArea = document.createElement("input");
        let saveButton = document.createElement("button");
        inputArea.placeholder="Edit this comment";
        saveButton.innerText="Save";
        inputArea.className="form-control";
        saveButton.className="btn btn-light";
        document.getElementById(id+"append").append(inputArea);
        document.getElementById(id+"append").append(saveButton);
        saveButton.onclick=(ev)=>{ev.preventDefault();
            if(inputArea.value==''){
                inputArea.placeholder="Need input";
                return ;
            }
            else{
                let arr=[...this.props.params.comments];
                for (let i = 0; i <arr.length ; i++) {
                    if(arr[i].id==id){
                        arr[i].id=inputArea.value;
                        arr[i].text=inputArea.value;
                        break;
                    }
                }
                inputArea.remove();
                saveButton.remove();
                this.props.setTasks(undefined,undefined,undefined,arr)
            }
        }
    }
    setDueDate(ev){
        ev.preventDefault();
        let inputArea = document.createElement("input");
        let saveButton = document.createElement("button");
        inputArea.placeholder="MM/DD/YYYY";
        inputArea.id="removed";
        inputArea.style.marginRight="5px";
        saveButton.innerText="Save";
        saveButton.id="removed2";
        inputArea.className="form-control";
        saveButton.className="btn btn-light";
        document.getElementsByClassName("dateAppendDiv")[0].append(inputArea);
        document.getElementsByClassName("dateAppendDiv")[0].append(saveButton);
        saveButton.onclick=(ev)=>{ev.preventDefault();
            if(inputArea.value==''){
                inputArea.placeholder="Need input";
                return ;
            }
            else{
                this.props.setDueDate(inputArea.value);
                document.getElementById("removed").remove();
                document.getElementById("removed2").remove();

            }
        }
    }
    getRemainingDays(){
        let date1 = new Date();
        let date2 = new Date(this.props.params.dueDate);
        let diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    onMouseOver(ev,user,user1){
        ev.preventDefault();
        if(user1!==getCookieValue("user")) return;
        console.log(ev.currentTarget);
        document.getElementById(user+"123").style.display='inherit';
    }
    onMouseLeave(ev,user,user1){
        ev.preventDefault();
        if(user1!==getCookieValue("user")) return;
        document.getElementById(user+"123").style.display='none';
    }
    render() {
        let isAdminOnline=getCookieValue("user")===this.props.admin;
        let img=new Image();
        img.src=this.props.img ? "data:image/png;base64,"+this.props.img : "";
        return (
            <div className='popup'>
                <div  className="wrapperEditCard">
                    <div>
                    {/*<button  onClick={this.props.onClose} type="button" className="close" aria-label="Close">*/}
                    {/*    <span aria-hidden="true">&times;</span>*/}
                    {/*</button>*/}
                        <img style={{display:this.props.img==''? 'none' : 'inherit' ,borderTopLeftRadius:'14.9px',borderTopRightRadius:'17.5px'}} className="img" src={img.src} height="300px" width="752px" alt=""/>
                    </div>
                    <h3 id={"ownerHeader"}>Owner:{this.props.owner==''? "No one assigned to card" : this.props.owner}</h3>
                    <h4 style={{display:this.props.params.dueDate=='' ? 'none':'inherit'}}>Due Date :{this.props.params.dueDate}(Remaining Days:{this.getRemainingDays()})</h4>
                    <div className="fix"/>
                    <div className="lollol" style={{display:this.props.owner==''? 'inline-block':'none'}}>
                        <div style={{display:isAdminOnline? 'inline-flex ':'none'}} className="DropDown">
                            <Card admin={getCookieValue("user")} isAdminOnline={isAdminOnline} setOwner={this.props.setOwner} id={this.props.id} homeid={this.props.homeid}/>
                        </div>
                    </div>
                    <div>
                        <button  style={{position:'relative',top:'1px',padding:'5px',margin:'5px'}} onClick={(ev)=>this.setDueDate(ev)} className="btn btn-primary">Set Due Date</button>
                        <div style={{display:'inline-flex',top:'3px',position:'relative'}} className="dateAppendDiv"/>
                    </div>
                        <div className="toDoDiv">
                            <h4 id="cardName">Enter Card Name</h4>
                            <div className="fix"/>
                            <div>
                            <input readOnly={(getCookieValue("user")===this.props.admin)}  defaultValue={this.props.params.toDo} id="dynamicName" style={{width:'50%',padding:'5px'}} className="form-control" placeholder="Dynamically"
                                   onChange={e => this.setToDo(e)}/>
                            </div>
                        </div>
                        <div className="descDiv">
                            <h4 id="forDesc"> Description</h4>
                            <div className="fix"/>
                            <div>
                                <textarea readOnly={(getCookieValue("user")===this.props.admin)} defaultValue={this.props.params.description} style={{width:'700px',height:'100px',marginBottom:'10px',position:'relative',left:'25px',resize:'none'}} onBlur={e => this.saveDesc(e)} onClick={this.showDescButton}
                                          className="form-control" rows="5" id="descdesc"/>
                                {/*<button id="descSave" className="btn btn-info"  onClick={e => this.saveDesc(e)}>Save*/}
                                {/*</button>*/}
                                <div style={{display:'none'}} id="qweqwe" className="list-group-item list-group-item-success">Description : {this.props.params.description}</div>
                            </div>
                        </div>
                        <div className="comments">
                            <h4  className="line">Comments</h4>
                            <div className="fix"/>
                            {/*<div className="line"/>*/}
                            <ul className="list-group">
                                {this.props.params.comments.map(comment => {
                                    return <div onMouseLeave={(ev)=>this.onMouseLeave(ev,comment.id,comment.user)} onMouseOver={(ev)=>this.onMouseOver(ev,comment.id,comment.user)} id={comment.id}>
                                        <li  style={{margin:'10px',width:'95%',left:'10px'}} className="list-group-item">
                                            <div  style={{display:'contents'}}>
                                                <span>{comment.user}&nbsp;:&nbsp;</span>
                                                <span style={{marginRight:'10px',position:'relative',top:'0.5px'}} id={comment.id + "1"}>{comment.text}</span>
                                                <span>{comment.file}</span>
                                                <div id={comment.id+"123"} style={{display:'none'}}>
                                                    <button onClick={ev=>{this.editComment(comment.id,ev)}} style={{background:'transparent',marginRight:'5px'}} id="editComment"   className="btn btn-light comment-action">Edit</button>
                                                    <div style={{display:'inline-flex'}} id={comment.id+"append"}/>
                                                    <button onClick={ev=>this.deleteComment(comment.id,ev)} style={{background:'transparent',marginRight:'5px'}} id="deleteComment" className="btn btn-light comment-action">Delete</button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                })}
                            </ul>
                            <div className="writeComment">
                                <input readOnly={(getCookieValue("user")===this.props.admin)}  onClick={getCookieValue("user")!==this.props.admin?this.showSave: console.log("")} type="text" id="commentInp" className="form-control"
                                       placeholder="Write a comment"/>
                                <button style={{display: this.state.showCommentSave ? 'flex' : 'none'}}
                                        id="saveComment"    className="btn btn-success" onClick={(e) => this.saveComment(e)}>Save Comment
                                </button>
                            </div>
                        </div>
                        <div className="addSection">

                            <h4 style={{padding:'5px'}} > Choose Label</h4>
                            <div className="fix"/>
                            {/*<div style={{borderBottom:'2px solid black'}}/>*/}
                            <div className="labelSection">
                                <div style={{position:'relative',left:'32%'}} className="labelDiv">
                                <div style={{cursor:isAdminOnline?'not-allowed':'pointer'}} id="blueLabel" className="label label-primary" onClick={isAdminOnline ? console.log():() => {
                                    let labels = this.props.params.labels;
                                    let inputArea=document.createElement("input");
                                    inputArea.className='form-control';
                                    inputArea.id="myInputArea";
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText='Save';
                                    saveButton.id='mySaveButton';
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
                                <div style={{cursor:isAdminOnline?'not-allowed':'pointer'}} id="greenLabel" className="label label-success" onClick={isAdminOnline ? console.log():() => {
                                    let labels = this.props.params.labels;
                                    let inputArea=document.createElement("input");
                                    inputArea.className='form-control';
                                    inputArea.id="myInputArea";
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText='Save';
                                    saveButton.id='mySaveButton';
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
                                <div style={{cursor:isAdminOnline?'not-allowed':'pointer'}} id="redLabel" className="label label-danger" onClick={isAdminOnline ? console.log():() => {
                                    let labels = this.props.params.labels;
                                    let inputArea=document.createElement("input");
                                    inputArea.className='form-control';
                                    inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                    let saveButton=document.createElement("button");
                                    saveButton.innerText='Save';
                                    saveButton.id='mySaveButton';
                                    saveButton.className='btn btn-danger';
                                    inputArea.placeholder='Optional';
                                    inputArea.id="myInputArea";
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
                                </div>
                                <div style={{marginTop:'10px'}} className="appendDiv"/>
                                <div  style={{overflow:'visible',display:this.props.params.labels.length===0 ? 'none' : 'block'}}>
                                    <h4 style={{padding:'5px'}}>Current Labels</h4>
                                    <div className="fix"/>
                                    <div style={{display:this.props.params.labels.length===0 ? 'none' : 'flex'}} className="currentLabels">
                                        {this.props.params.labels.map((label)=>{
                                            console.log(label);
                                            return <div style={{color:"white"}} className={label.colour}>{label.id}</div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <h4 style={{padding:'5px'}}>Checklist</h4>
                            <div className="fix"/>
                            <div className="checkListSection">
                                <button id="addCheck" style={{display: this.state.checklistItems.length>0 ? 'none' : 'flex',cursor:isAdminOnline?'not-allowed':'pointer'}}  className="btn btn-warning" onClick={isAdminOnline?console.log(""):()=>{
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
                                    inputArea.placeholder="Give  title to checklist from here";
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
                                <h5 style={{display:this.state.checklistItems.length>0 ? 'inherit':'none',marginLeft:'3px',borderBottom:'1px solid grey'}}> Checklist :  {this.state.checklistItems[0]}   {this.state.checklistItems.length===1 ? '(No items in checklist)' : ''}</h5>

                            </div>
                            <div className="items" style={{display: this.state.checklistItems.length>0 ? 'inherit' : 'none'}}>

                                {/*<h5 style={{marginLeft:'3px',borderBottom:'1px solid grey'}}> Checklist :  {this.state.checklistItems[0]}</h5>*/}
                                {/*<div className="funkyradio">*/}
                                {/*    <input type="checkbox" name="checkbox" id="checkbox1" />*/}
                                {/*    <label htmlFor="checkbox1">First Option default</label>*/}
                                {/*</div>*/}
                               <ul style={{display:'inline-grid'}}>
                                    {this.state.checklistItems.slice(1).map((item,index)=>{
                                        return <div style={{marginBottom:'7px',display:'inline-flex'}} id={item.id+index}><input  style={{position:'relative',top:'8px',left:'50px'}} type="checkbox" name="checkbox" className="form-check-input"  id={item.id+"lol"} checked={item.done}  onClick={()=>{
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
                                        } /><span style={{position: 'relative', top: '8px',left:'45px'}} id={item.id+index}> &nbsp; &nbsp; {item.id}</span><button onClick={ev=>this.editCheckList(item.id,index,ev)}  className="btn btn-secondary">Edit</button><div style={{display:'inline-flex'}} id={item.id+index+"lol"} className="appendEditDiv"/><button className="btn btn-secondary" onClick={ev=>this.deleteCheckList(item.id)}>Delete</button>
                                        </div>
                                    })}
                                </ul>
                                <div style={{display:this.state.checklistItems.length>1 ? 'flex' : 'none'}}>
                                <div  id="progressBar"  className="progress-bar progress-bar-striped active" role="progressbar"
                                     aria-valuenow={this.calculateProgress()} aria-valuemin="0" aria-valuemax="100" style={{width:this.calculateProgress()+'%'}}>
                                    According to the checklist your progress is %{this.calculateProgress()}
                                </div>
                                </div>
                            </div>
                            <button id="checklistItem" ref="but2" style={{display: this.state.checklistItems.length>0 ? 'flex' : 'none'}} className="btn btn-info" onClick={(e)=>{
                                let inputArea=document.createElement("input");
                                inputArea.type="text";
                                inputArea.className="form-control";
                                inputArea.placeholder="Add an item";
                                inputArea.style.width='400px';
                                inputArea.style.position='relative';
                                inputArea.style.left='171px';
                                inputArea.addEventListener('click',(ev)=>ev.stopPropagation());
                                let saveButton=document.createElement("button");
                                saveButton.addEventListener('click',(ev)=>ev.stopPropagation());
                                saveButton.className="btn btn-primary";
                                saveButton.innerText="Save";
                                saveButton.style.position="relative";
                                saveButton.style.left='37%';
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
                                saveButton.style.left="37%";
                                saveButton.style.position="relative";
                                cancelButton.style.margin="5px";
                                cancelButton.style.left="43%";
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
                            <h4 style={{padding:'5px'}} >Choose Cover Image</h4>
                            <div className="fix"/>
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

                                }} /><label style={{padding:'6px 12px',position:'relative',left:'273px'}} id="for"  htmlFor="file">Choose a Cover Image</label>
                            </div>
                        </div>
                    <button id="exitEdit" className="btn btn-success"  onClick={this.props.onClose}>Save</button>
                    <button style={{position: 'relative',
                        top: '-5px',
                        left: '500px'}} className="btn btn-success" onClick={(ev)=>this.props.setFinished(ev)}>Finish the Card</button>

                </div>

            </div>
        );
    }
}
export default EditCard;