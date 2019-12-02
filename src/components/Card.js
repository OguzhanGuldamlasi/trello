import React from 'react'
import EditCard from "./EditCard";
import EmptyCard from "./EmptyCard";
import '../styles/Card.css'
// import Modal from '@material-ui/core/Modal';
import SimpleModal from "./Modal";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Card extends React.Component{
    submitCardAPI(state){
        if(state.cardId==-1){
            return ;
        }
        let submission=new Object();
        submission['9']=state.cardId;
        submission['3']=state.toDo;
        submission['4']=state.description;
        submission['5']=state.comments;
        submission['11']=state.labels;
        submission['7']=state.coverImg;
        submission['10']=state.checklist;
        submission['12']=state.listId;
        submission['13']='';
        submission['14']=this.props.homeid;
        submission['15']='';
        submission['16']=false;
        window.JF.createFormSubmission("92931856730969",submission,function (response) {});
    }
    setDueDate(date){
        let date1 = new Date();
        let date2 = new Date(this.state.dueDate);
        let diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays<=0){
            alert("Cannot enter past dates");
        }
        else{
            this.setState({ dueDate: date }, () => {
                console.log(this.state.dueDate, 'dueDate');
            });
            window.JF.getFormSubmissions("92931856730969", (response)=>{
                for(let i=0; i<response.length; i++){
                    if(response[i].answers['14'].answer==this.props.homeid&&response[i].answers['9'].answer==this.state.cardId){
                        response['15']=date;
                        window.JF.editSubmission(response[i].id, response, (response)=>{
                         console.log(response);
                        });
                        break;
                    }
                }
            });
        }
    }
    checkDueDate(){
        let date1 = new Date();
        let date2 = new Date(this.state.dueDate);
        let diffTime = Math.abs(date2 - date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
    }
    constructor(props){
        super(props);
        console.log(props)
        if(this.props.state!=null){
            if(this.props.state.cardId==-1) return ;
            this.state=this.props.state;
            this.state.listId=this.props.listId;
        }
        else{
            this.state={
                cardId:this.props.id,
                toDo:this.props.name,
                labels:[],
                checklist:[],
                showEditForm:false,
                description:'',
                comments:[],
                coverImg:'',
                owner:'',
                dueDate:'',
                finished:false,
                listId:this.props.listId
            };
            this.submitCardAPI(this.state)
        }
        this.checkDueDate=this.checkDueDate.bind(this);
        this.setDueDate=this.setDueDate.bind(this);
        this.setTasks=this.setTasks.bind(this);
        this.setCheckList=this.setCheckList.bind(this);
        this.setImg=this.setImg.bind(this);
        this.onDragStart=this.onDragStart.bind(this);
        this.onDrag=this.onDrag.bind(this);
        this.onDragOver=this.onDragOver.bind(this);
        this.submitCardAPI=this.submitCardAPI.bind(this);
        // this.getComponent=this.getComponent.bind(this);
        this.togglePopup=this.togglePopup.bind(this);
        this.setChecklist2=this.setChecklist2.bind(this);
        this.setOwner=this.setOwner.bind(this);
        this.setFinished=this.setFinished.bind(this)
    }
    setFinished(ev){
        ev.preventDefault();
        this.setState({finished:'true'},()=>console.log(this.state.finished));
        window.JF.getFormSubmissions("92931856730969", response=>{
            console.log("here1");
            for(let i=0; i<response.length; i++){
                console.log("here2");
                console.log(response[i].answers['9'].answer)
                console.log(this.props.id)
                console.log(response[i].answers['12'].answer)
                console.log(this.props.listId)
                if(response[i].answers['9'].answer==this.props.id && response[i].answers['12'].answer==this.props.listId){
                    let submission=new Object()
                    submission['10']=response[i].answers['10'].answer;
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
                    submission['16']=true;
                    console.log(response[i]);
                    window.JF.editSubmission(response[i].id, submission, (response)=>{
                        console.log(response)
                    })
                }
            }
        });
    }
    setOwner(userName){
        this.setState({owner:userName},()=>console.log(this.state.owner))
    }
    togglePopup() {
        let bool=!this.state.showEditForm;
        // this.setState({showEditForm: bool},resp=>this.getComponent());
    }
    setChecklist2(checklist){
        console.log("here");
        this.setState({checklist:checklist})
    }
    setCheckList(checklist=this.state.checklist){
        this.setTasks(undefined,undefined,undefined,undefined,undefined,undefined,checklist)
    }
    setImg(img){
        this.setTasks(undefined,undefined,undefined,undefined,img,undefined)
    }
    setTasks(ntoDo=this.state.toDo,ndueDate=this.state.dueDate,ndescription=this.state.description,ncomments=this.state.comments,ncoverImg=this.state.coverImg,nlabels=this.state.labels,nchecklist=this.state.checklist){
        this.setState({
            toDo:ntoDo,
            dueDate:ndueDate,
            description:ndescription,
            labels:nlabels,
            comments:ncomments,
            coverImg:ncoverImg,
            checklist:nchecklist,
        },()=>console.log(this.state));
        window.JF.getFormSubmissions("92931856730969",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[9].answer==this.state.cardId&&response[i].answers[14].answer==this.props.homeid){
                    let submissionId=response[i].id;
                    let submission=new Object();
                    submission['9']=this.state.cardId;
                    if(this.state.toDo!==undefined){submission['3']=this.state.toDo;}
                    else{submission['3']=''}
                    submission['4']=this.state.description;
                    if(this.state.comments!==undefined){submission['5']+=JSON.stringify(this.state.comments);}
                    else{submission['5']+=''}
                    if(this.state.labels!==undefined){
                        submission['11']+=JSON.stringify(this.state.labels);}
                    else{submission['11']+=''}
                    submission['7']=this.state.coverImg;
                    if(this.state.checklist!==undefined){submission['10']+=JSON.stringify(this.state.checklist);}
                    else{submission['10']+=''}
                    submission['12']=this.props.listId;
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                }
            }
        })


    }
    onDragStart(ev){
        this.props.onDragLeave();
        let json=JSON.stringify(this.state);
        ev.dataTransfer.setData("card",json);
        ev.dataTransfer.setData("listId",this.props.listId);
        let cards=document.getElementsByClassName("card");
        let card;
        for (let i = 0; i <cards.length ; i++) {
            if(cards[i].id==this.state.cardId){
                card=cards[i];
                break;
            }
        }
        card.style.backgroundColor="black";
        card.style.border="dashed";
    }
    onDrag(event){
        this.props.deleteChildren(this.state.cardId);
    }

    // getComponent(){
    //     if(this.state.showEditForm){
    //         this.props.editCard(<EditCard id={this.state.cardId} setImg={this.setImg} setTasks={this.setTasks} params={this.state} setCheckList={this.setCheckList} closePopup={this.togglePopup}/>);
    //     }
    //     else{
    //         this.props.editCard(null);
    //
    //     }
    // }
    onDragOver(ev){
        ev.preventDefault();
    }
    render() {
        let img=new Image();
        img.src=this.state.coverImg ? "data:image/png;base64,"+this.state.coverImg : "";
        return (
            <div style={{background:this.state.finished==="true" ? '#fa8900' :'#d8d8d8'}}   onDragEnter={this.props.onDragEnter}  onDragOver={this.onDragOver} onDrag={event => this.onDrag(event)} id={this.state.cardId} draggable={!(getCookieValue("user")===this.props.admin)} onDragStart={(e)=>this.onDragStart(e,this.state.cardId)} className='card' >
                <div className="toDO">
                    <span>{this.state.toDo}</span>
                </div>
                <div className="labels">
                    {this.state.labels.map(label=> {return <label className={label.colour}/>})}
                </div>

                <div className="images">
                    <span style={{visibility: this.state.description.length>0 ? 'visible' : 'hidden'}} className='Desc'/>
                    <span className='Comments' style={{visibility: this.state.comments.length > 0 ? 'visible' : 'hidden'}}/>
                    <span className="Checklist" style={{visibility: this.state.checklist.length > 0 ? 'visible' : 'hidden'}}/>
                </div>
                {/*position: relative;*/}
                {/*display: inline-flex;*/}
                <div style={{position:"relative",display:"inline-flex"}}  className="buttonDiv">
                    <SimpleModal admin={this.props.admin} setFinished={this.setFinished} setOwner={this.setOwner} setDueDate={this.setDueDate} checkDueDate={this.checkDueDate} setChecklist2={this.setChecklist2} img={this.state.coverImg} owner={this.state.owner} homeId={this.props.homeid} id={this.state.cardId} setImg={this.setImg} setTasks={this.setTasks} params={this.state} setCheckList={this.setCheckList} closePopup={this.togglePopup}/>
                    {/*<button className="editCard" onClick={this.togglePopup}>Edit</button>*/}
                    <button style={{cursor:getCookieValue("user")===this.props.admin? 'not-allowed':'pointer'}} className="btn btn-info" onClick={getCookieValue("user")===this.props.admin ?console.log():(event)=>{
                        this.props.deleteCard(this.state.cardId);
                        event.target.parentElement.parentElement.remove();
                        window.JF.getFormSubmissions("92931856730969",response=>{
                            for (let i = 0; i <response.length ; i++) {
                                if(response[i].answers[9].answer==this.state.cardId){
                                    window.JF.deleteSubmission(response[i].id,response=>console.log());
                                    return ;
                                }
                            }
                        })
                    }}>Delete</button>

                </div>
                {/*<img style={{cursor:"not-allowed"}}  className="img" src={img.src} height="60px" width="160px" alt=""/>*/}
            </div>
        );
    }
}
export default Card;
function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}