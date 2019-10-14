import React from 'react'
import Card from "./Card";
import '../styles/List.css';

class List extends React.Component{
        constructor(props){
            super(props);
            this.state={
                name:this.props.name,
                children:[]
            };
            this.getIndex=this.getIndex.bind(this);
            this.appendChild=this.appendChild.bind(this);
            this.deleteChildren=this.deleteChildren.bind(this);
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
            let card =<Card deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.listId} deleteCard={this.props.deleteCard} id={cardId} key={cardId}/>;
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
            let state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");
            let card=<Card deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.listId} deleteCard={this.props.deleteCard}  state={state}/>;
            this.appendChild(card);
        };
        onDragOver(ev){
            ev.preventDefault();
        }

        render() {
            return(
                <div draggable onDrop={event => this.onDrop(event)} onDragOver={(e)=>this.onDragOver(e)} className="cardList">
                    <div   className="listName">{this.state.name}
                        <button onClick={()=>this.appendChild()}>Add another Card</button>
                    </div>
                    <div  className="cardContainer">
                        {this.state.children.map(child=>{return  <div className="cards">{child}</div>})}
                    </div>
                </div>
            )
        }
}
export default List;