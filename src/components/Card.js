import React from 'react'
import EditCard from "./EditCard";
import '../styles/Card.css'
class Card extends React.Component{
    submitCardAPI(state){
        let submission=new Object();
        submission['9']=state.cardId;
        submission['3']=state.toDo;
        submission['4']=state.description;
        submission['5']=state.comments;
        submission['11']=state.labels;
        submission['7']=state.coverImg;
        submission['10']=state.checklist;
        submission['12']=state.listId;
        window.JF.createFormSubmission("92931856730969",submission,function (response) {});
    }
    constructor(props){
        super(props);
        if(this.props.state!=null){
            this.state=this.props.state;
            this.state.listId=this.props.listId;
        }
        else{
            this.state={
                cardId:this.props.id,
                toDo:'',
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
        this.submitCardAPI=this.submitCardAPI.bind(this)
    }
    togglePopup() {
        this.setState({
            showEditForm: !this.state.showEditForm
        });
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
        });
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
                    if(this.state.checkilst!==undefined){submission['10']+=JSON.stringify(this.state.checklist);}
                    else{submission['10']+=''}
                    submission['12']=this.props.listId;
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                }
            }
        })
    }
    onDragStart(ev){
        let json=JSON.stringify(this.state);
        ev.dataTransfer.setData("card",json);
    }
    onDrag(event){
        this.props.deleteChildren(this.state.cardId);
    }
    onDragOver(event){
        event.preventDefault();
    }
    render() {
        return (
            <div onDrop={this.props.onDrop} onDragOver={event => this.onDragOver(event)} onDrag={event => this.onDrag(event)} id={this.state.cardId} draggable onDragStart={(e)=>this.onDragStart(e,this.state.cardId)} className='card' >
                <div className="coverImg" style={{background : this.state.coverImg==null  ?  null :  `${this.state.coverImg}`}} />
                <div className="labels">
                    {this.state.labels.map(label=> {return <label className={label.colour}>{label.id}</label>})}
                </div>
                <div className="toDO">
                    <span>{this.state.toDo}</span>
                </div>
                <div>
                    {this.state.showEditForm ? <EditCard setImg={this.setImg} setTasks={this.setTasks} params={this.state} setCheckList={this.setCheckList} closePopup={this.togglePopup.bind(this)}/> : null}
                </div>
                <div className="buttonDiv">
                    <button onClick={this.togglePopup.bind(this)}>Edit</button>
                    <button className="deleteCard" onClick={(event)=>{
                        this.props.deleteCard(this.state.cardId);
                        event.target.parentElement.parentElement.remove();
                        window.JF.getFormSubmissions("92931856730969",response=>{
                            for (let i = 0; i <response.length ; i++) {
                                if(response[i].answers[9].answer==this.state.cardId){
                                    console.log("delete");
                                    window.JF.deleteSubmission(response[i].id,response=>console.log());
                                    return ;
                                }
                            }
                        })
                    }}>Delete</button>
                </div>
                <div>
                    <span className='Desc' style={{visibility: this.state.description.length>0 ? 'visible' : 'hidden'}} >add image here</span>
                    <span className='Comments' style={{visibility: this.state.comments.length>0 ? 'visible' : 'hidden'}}>{this.state.comments.length} add image here</span>
                </div>
            </div>
        );
    }
}
export default Card;