import React from 'react'
import Card from "./Card";
import '../styles/List.css';

class List extends React.Component{
        constructor(props){
            super(props);
            if(this.props.state!=null){
                this.state=this.props.state;
            }
            else{
                this.state={
                    id:this.props.listId,
                    name:this.props.name,
                    children:[]
                };
            }

            this.getIndex=this.getIndex.bind(this);
            this.appendChild=this.appendChild.bind(this);
            this.deleteChildren=this.deleteChildren.bind(this);
            this.onDragStart=this.onDragStart.bind(this);
            this.onCardDrop=this.onCardDrop.bind(this);
            this.onDrag=this.onDrag.bind(this)
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
            console.log("done")
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
                <div id={this.state.id} onDrop={this.props.onDrop} onDrag={event=>this.onDrag()}  draggable  onDragStart={event => this.onDragStart(event)} onDragOver={(e)=>this.onDragOver(e)} className="cardList">
                    Drag the lists here to change the position.
                    <button onClick={()=>this.appendChild()}>Add another Card</button>
                </div>
                    <div className="emptyList" onDragOver={event => this.onDragOver(event)} onDrop={event =>this.onDrop(event)}>{this.state.name}  (You can drop cards here or drop the cards on a card.)</div>
                    <div className="cardContainer">
                        {this.state.children.map(child=> <Card {...child}/>)}
                    </div>
                </div>
            )
        }
}
export default List;