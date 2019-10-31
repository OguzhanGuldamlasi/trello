import React from 'react'
import Card from "./Card";
import '../styles/List.css';
import EmptyCard from "./EmptyCard";
let flag=0;
class List extends React.Component{
    componentDidMount() {
        let child=[];
        for (let i = 0; i <this.props.cardInfos.length ; i++) {
            if(this.props.cardInfos[i].listId==this.state.id){
                // if(this.props.cardInfos[i].labels.replace)
                let labels;
                let comments;
                let checklist;
                try{
                labels=JSON.parse(this.props.cardInfos[i].labels.replace("undefined", ""));}
                catch (e) {
                labels=[];
                }
                try{
               comments=JSON.parse(this.props.cardInfos[i].comments.replace("undefined",""));}
               catch (e) {
               comments=[];
               }
               try {
                    checklist = JSON.parse(this.props.cardInfos[i].checklist.replace("undefined", ""));
               }catch (e) {
                   checklist=[];
               }
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

                (child.push(<Card onDragOver={this.onDragOve} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} editCard={this.props.editCard} onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.id} deleteCard={this.props.deleteCard} id={this.props.cardInfos[i].cardId} key={this.props.cardInfos[i].cardId} state={state}/>));
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
        this.deleteEmptyCards=this.deleteEmptyCards.bind(this);
        this.onDragEnter=this.onDragEnter.bind(this);
        this.onDragLeave=this.onDragLeave.bind(this);
        this.onDragOver=this.onDragOver.bind(this);
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
        let card =<Card onDragOver={this.onDragOve} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} editCard={this.props.editCard} onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.id} deleteCard={this.props.deleteCard} id={cardId} key={cardId}/>;
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
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");

        }catch (e) {
            return ;
        }
        let card=<Card onDragOver={this.onDragOve} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} editCard={this.props.editCard} onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.id} deleteCard={this.props.deleteCard}  state={state}/>;
        this.appendChild(card);
        window.JF.getFormSubmissions("92931856730969",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[9].answer==state.cardId){
                    let submissionId=response[i].id;
                    let submission=new Object();
                    submission['9']=state.cardId;
                    submission['3']=state.toDo;
                    submission['4']=state.description;
                    submission['5']=JSON.stringify(state.comments);
                    submission['11']=JSON.stringify(state.labels);
                    submission['7']=state.coverImg;
                    submission['10']=JSON.stringify(state.checklist);
                    submission['12']=this.state.id;
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                }
            }
        });
    };
    onCardDrop=(ev)=>{

        ev.preventDefault();
        ev.stopPropagation();
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");
        }catch (e) {
            return ;
        }
        let card=<Card onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} editCard={this.props.editCard} onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.id} deleteCard={this.props.deleteCard}  state={state}/>;
        let arr=[...this.state.children];
        let element=document.getElementsByClassName("emptyDiv")[0].nextSibling;
        console.log(element.id);
        arr.splice(this.getIndex(element.id),0,card);
        this.setState({
            children:arr
        });
        for(let item of document.getElementsByClassName("emptyDiv")){
            item.remove();
        }
        window.JF.getFormSubmissions("92931856730969",response=>{
            for (let i = 0; i <response.length ; i++) {
                if(response[i].answers[9].answer==state.cardId){
                    let submissionId=response[i].id;
                    let submission=new Object();
                    submission['9']=state.cardId;
                    submission['3']=state.toDo;
                    submission['4']=state.description;
                    submission['5']=JSON.stringify(state.comments);
                    submission['11']=JSON.stringify(state.labels);
                    submission['7']=state.coverImg;
                    submission['10']=JSON.stringify(state.checklist);
                    submission['12']=this.state.id;
                    window.JF.editSubmission(submissionId,submission,rep=>console.log());
                }
            }
        }
    );
    };
    deleteEmptyCards(){//deleting empty cards to used at card drag
        let cards=[...this.state.children];
        for (let i = 0; i <cards.length ; i++) {
            if(cards[i].key==-1){
                cards.splice(i,1);
                break;
            }
        }
        this.setState({children:cards})
    }
    onDragOver(ev){
        ev.preventDefault();
    }
    onDragEnter(ev){
        ev.preventDefault();
        let card=<EmptyCard onDrop={this.onCardDrop} onDragLeave={this.onDragLeave} id={-1} key={-1}/>;
        let arr=[...this.state.children];
        arr.splice(this.getIndex(ev.currentTarget.id),0,card);
        this.setState({
            children:arr
        });
    }

    onDragLeave(ev){
        this.deleteEmptyCards();
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
                <div  onDrag={this.onDrag} onDragStart={this.onDragStart} id={this.state.id} draggable onDrop={this.props.onDrop}  onDragOver={(e)=>this.onDragOver(e)} className="cardList">
                    <div className="listName">
                        {this.state.name}
                    </div>
                    <a className="addCard" onClick={()=>this.appendChild()}>
                    <span className="addImage"/>
                    <span>
                       	&nbsp; 	&nbsp;Add a Card
                    </span>
                    </a>
                </div>
                <div className="cardContainer">
                    {this.state.children.map(child=> {return child})}
                </div>
                <div className="emptyList" onDragOver={event => this.onDragOver(event)} onDrop={event =>this.onDrop(event)}> (You can drop cards here or drop the cards on a card.)</div>
            </div>
        )
    }
}
export default List;