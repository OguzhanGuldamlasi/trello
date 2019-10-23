import React from 'react'
import Card from "./Card";
import '../styles/List.css';
class List extends React.Component{
    componentDidMount() {
        let child=[];
        for (let i = 0; i <this.props.cardInfos.length ; i++) {
            if(this.props.cardInfos[i].listId==this.state.id){
               let labels=[];
               let comments=[];
               let checklist=[];
               let state={
                  cardId:this.props.cardInfos[i].cardId,
                  toDo:this.props.cardInfos[i].toDo,
                  labels:labels,
                  checklist:checklist,
                  showEditForm:false,
                  description:this.props.cardInfos[i].description,
                  comments:comments,
                  coverImg:this.props.cardInfos[i].coverImg,
                  listId:this.props.cardInfos[i].listId
                };

                (child.push(<Card onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.id} deleteCard={this.props.deleteCard} id={this.props.cardInfos[i].cardId} key={this.props.cardInfos[i].cardId} state={state}/>));
            }
        }
        this.setState({
            children:child
        });
    }
    submitListAPI(state){
        let submission=new Object();
        submission['3']=state.id;
        submission['4']=state.name;
        submission['5']="";
        window.JF.createFormSubmission("92931845207966",submission,function (response) {
        });
    }
    constructor(props){
        super(props);
        if(this.props.state!=null){
            this.state=this.props.state;
            this.state.children=[];
        }
        else{
            this.state={
                id:this.props.listId,
                name:this.props.name,
                children:[]
            };
            this.submitListAPI(this.state);
        }
        this.submitListAPI=this.submitListAPI.bind(this);
        this.submitListAPI=this.submitListAPI.bind(this);
        this.getIndex=this.getIndex.bind(this);
        this.appendChild=this.appendChild.bind(this);
        this.deleteChildren=this.deleteChildren.bind(this);
        this.onDragStart=this.onDragStart.bind(this);
        this.onCardDrop=this.onCardDrop.bind(this);
        this.onDrag=this.onDrag.bind(this);
    }
    appendChild(draggedCard=null){
        if(draggedCard!=null){
            this.setState({
                children:[
                    ...this.state.children,
                    draggedCard,
                ],
            });
            return;
        }
        let cardId=this.props.getCardId();
        let card =<Card onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.id} deleteCard={this.props.deleteCard} id={cardId} key={cardId}/>;
        this.setState({
            children:[
                ...this.state.children,
                card,
            ],
        });
        this.props.incrementCardId();
        this.props.appendCard(card);
        let id=this.state.id;
        window.JF.getFormSubmissions("92931845207966",response=> {
            for (let i = 0; i <response.length; i++) {
                if(response[i].answers[3].answer==id){
                    let submissionId=response[i].id;
                    let submission=new Object();
                    submission['3']=response[i].answers[3].answer;
                    submission['4']=response[i].answers[4].answer;
                    submission['5']=","+response[i].answers[5].answer+cardId+",";
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                    return;
                }
            }
        });
    }
    getIndex(id){
        for (let i = 0; i <this.state.children.length ; i++) {
            if(id==this.state.children[i].key){
                return i;
            }
        }
    }
    deleteChildren(id){
        let index=this.getIndex(id);
        this.setState({
            children:this.state.children.filter((_, i) => i !== index)
        });
        this.props.deleteCard(id);
    }
    onDrop=(ev)=>{
        console.log("onDrop");
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");

        }catch (e) {
            ev.dataTransfer.clearData("card");
            return ;
        }
        let card=<Card onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.id} deleteCard={this.props.deleteCard}  state={state}/>;
        this.appendChild(card);
        window.JF.getFormSubmissions("92931856730969",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[9].answer==state.cardId){
                    console.log("here");
                    let submissionId=response[i].id;
                    let submission=new Object();
                    console.log(state.cardId);
                    submission['9']=state.cardId;
                    submission['3']=state.toDo;
                    submission['4']=state.description;
                    submission['5']=state.comments;
                    submission['11']=state.labels;
                    submission['7']=state.coverImg;
                    submission['10']=state.checklist;
                    submission['12']=this.state.id;
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                }
            }
        })
    };
    onCardDrop=(ev)=>{
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");
        }catch (e) {
            return ;
        }
        let card=<Card onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.id} deleteCard={this.props.deleteCard}  state={state}/>;
        let arr=[...this.state.children];
        arr.splice(this.getIndex(ev.currentTarget.id),0,card);
        this.setState({
            children:arr
        });
        window.JF.getFormSubmissions("92931856730969",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[9].answer==state.cardId){
                    let submissionId=response[i].id;
                    let submission=new Object();
                    submission['9']=state.cardId;
                    submission['3']=state.toDo;
                    submission['4']=state.description;
                    submission['5']=state.comments;
                    submission['11']=state.labels;
                    submission['7']=state.coverImg;
                    submission['10']=state.checklist;
                    submission['12']=this.state.id;
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                }
            }
        })
    };
    onDragOver(ev){
        ev.preventDefault()
    }
    onDragStart(event){
        let json=JSON.stringify(this.state);
        event.dataTransfer.setData("list",json);
    }
    onDrag(){
        this.props.deleteList(this.state.id);
    }
    render() {
        return(
            <div className="container">
                <div onDrag={this.onDrag} onDragStart={this.onDragStart} id={this.state.id} draggable onDrop={this.props.onDrop}  onDragOver={(e)=>this.onDragOver(e)} className="cardList">
                    Drag the lists here to change the position.
                    <button onClick={()=>this.appendChild()}>Add another Card</button>
                </div>
                <div className="emptyList" onDragOver={event => this.onDragOver(event)} onDrop={event =>this.onDrop(event)}>{this.state.name}  (You can drop cards here or drop the cards on a card.)</div>
                <div className="cardContainer">
                    {this.state.children.map(child=> {return child})}
                </div>
            </div>
        )
    }
}
export default List;