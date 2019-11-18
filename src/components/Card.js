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
        submission['14']=this.props.homeid;
        window.JF.createFormSubmission("92931856730969",submission,function (response) {});
    }
    constructor(props){
        super(props);

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
                listId:this.props.listId
            };
            this.submitCardAPI(this.state)
        }
        this.setTasks=this.setTasks.bind(this);
        this.setCheckList=this.setCheckList.bind(this);
        this.setImg=this.setImg.bind(this);
        this.onDragStart=this.onDragStart.bind(this);
        this.onDrag=this.onDrag.bind(this);
        this.onDragOver=this.onDragOver.bind(this);
        this.submitCardAPI=this.submitCardAPI.bind(this);
        // this.getComponent=this.getComponent.bind(this);
        this.togglePopup=this.togglePopup.bind(this)
    }
    togglePopup() {
        let bool=!this.state.showEditForm;
        // this.setState({showEditForm: bool},resp=>this.getComponent());
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
                if(response[i].answers[9].answer==this.state.cardId){
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
            <div   onDragEnter={this.props.onDragEnter}  onDragOver={this.onDragOver} onDrag={event => this.onDrag(event)} id={this.state.cardId} draggable onDragStart={(e)=>this.onDragStart(e,this.state.cardId)} className='card' >
                <div className="labels">
                    {this.state.labels.map(label=> {return <label className={label.colour}/>})}
                </div>
                <div className="toDO">
                    <span>{this.state.toDo}</span>
                </div>
                <div className="images">
                    <span style={{visibility: this.state.description.length>0 ? 'visible' : 'hidden'}} className='Desc'/>
                    <span className='Comments' style={{visibility: this.state.comments.length > 0 ? 'visible' : 'hidden'}}/>
                    <span className="Checklist" style={{visibility: this.state.checklist.length > 0 ? 'visible' : 'hidden'}}/>
                </div>
                {/*position: relative;*/}
                {/*display: inline-flex;*/}
                <div style={{position:"relative",display:"inline-flex"}}  className="buttonDiv">
                    <SimpleModal  id={this.state.cardId} setImg={this.setImg} setTasks={this.setTasks} params={this.state} setCheckList={this.setCheckList} closePopup={this.togglePopup}/>
                    {/*<button className="editCard" onClick={this.togglePopup}>Edit</button>*/}
                    <button className="deleteCard" onClick={(event)=>{
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
                <img className="img" src={img.src} height="100px" width="100px" alt=""/>
            </div>
        );
    }
}
export default Card;
