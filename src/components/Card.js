import React from 'react'
import EditCard from "./EditCard";
import '../styles/Card.css'
class Card extends React.Component{
    constructor(props){
        super(props);
        if(this.props.state!=null){
                this.state=this.props.state;
        }
        else{
            this.state={
                cardId:this.props.id,
                toDo:this.props.name,
                labels:[],
                checklist:[],
                dueDate:new Date(),
                showEditForm:false,
                description:'',
                comments:[],
                coverImg:'',
            };
        }
        this.setTasks=this.setTasks.bind(this);
        this.setCheckList=this.setCheckList.bind(this);
        this.setImg=this.setImg.bind(this);
        this.onDragStart=this.onDragStart.bind(this);
        this.onDrag=this.onDrag.bind(this);
    }
    togglePopup() {
        this.setState({
            showEditForm: !this.state.showEditForm
        });
    }
    setCheckList(checklist=this.state.checklist){
        this.setState({
            checklist:checklist
        })
    }
    setImg(img){
        this.setState({
            coverImg:img
        })
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
        })
    }
    onDragStart(ev){
        let json=JSON.stringify(this.state);
        ev.dataTransfer.setData("card",json);
    }
    onDrag(event){
        this.props.deleteChildren(this.state.cardId);
    }
    render() {
        return (
            <div  onDrag={event => this.onDrag(event)} id={this.state.cardId} draggable onDragStart={(e)=>this.onDragStart(e,this.state.cardId)} className='card' >
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