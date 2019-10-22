import React from 'react'
import Card from "./Card";
import '../styles/List.css';

class List extends React.Component{
    submitListAPI(state){
        let submission=new Object();
        submission['3']=state.id;
        submission['4']=state.name;
        submission['5']="";
        window.JF.createFormSubmission("92931845207966",submission,function (response) {
            console.log(response)
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
            console.log(response)
            for (let i = 0; i <response.length; i++) {
                if(response[i].answers[3].answer==id){
                    console.log(response[i]);
                    let submissionId=response[i].id;
                    let submission=new Object();
                    submission['3']=response[i].id;
                    submission['4']=response[i].name;
                    submission['5']=response[i].answers[5].answer=cardId+",";
                    window.JF.editSubmission(submissionId,submission,rep=>console.log(rep));
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
            ev.dataTransfer.clearData("card");
            return ;
        }
        let card=<Card onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.listId} deleteCard={this.props.deleteCard}  state={state}/>;
        this.appendChild(card);

    };
    onCardDrop=(ev)=>{
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");
        }catch (e) {
            return ;
        }
        let card=<Card onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.listId} deleteCard={this.props.deleteCard}  state={state}/>;
        let arr=[...this.state.children];
        arr.splice(this.getIndex(ev.currentTarget.id),0,card);
        this.setState({
            children:arr
        });
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
                <div id={this.state.id} onDrop={this.props.onDrop}  onDragOver={(e)=>this.onDragOver(e)} className="cardList">
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