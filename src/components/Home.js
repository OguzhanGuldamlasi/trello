import React from 'react'
import List from "./List"
import Card from "./Card"
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardId:0,
            listId:0,
            cards:[],
            lists:[]
        }
        this.getIndex=this.getIndex.bind(this);
        this.getCardId=this.getCardId.bind(this);
        this.deleteCard=this.deleteCard.bind(this);
        this.appendCard=this.appendCard.bind(this);
        this.incrementCardId=this.incrementCardId.bind(this);
    }
    getIndex(id){
        for (let i = 0; i <this.state.cards.length ; i++) {
            if(id==this.state.cards[i].key){
                return i;
            }
        }
    }
    getCardId(){
        console.log(this.state.cardId)
        return this.state.cardId;
    }
    deleteCard(id){
        let index=this.getIndex(id);
        this.setState({
            cards:this.state.cards.filter((_,i)=>i!==index)
        });
    }
    appendCard(card){
        this.setState({cards:[...this.state.cards,card]})
    }
    incrementCardId(){
        this.setState({cardId:this.state.cardId+1})
    }
    render(){
        return (
            <div className="HomeComp">
                <div className="addList">
                    <button className="addListButton" onClick={()=> {
                        let inputArea =document.createElement("input");
                        inputArea.placeholder="Enter a list name";
                        document.getElementsByClassName("addList")[0].append(inputArea);
                        let saveButton=document.createElement("button");
                        saveButton.innerText="Save";
                        document.getElementsByClassName("addList")[0].append(saveButton)
                        saveButton.onclick=()=>{
                            if(inputArea.value==='' ||inputArea.value===null){
                                inputArea.placeholder="Enter a name";
                                return ;
                            }
                            let newList=<List incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} name={inputArea.value}/>
                            this.setState({
                                lists:[...this.state.lists,newList]
                            })
                        }
                    }}>Add List</button>
                </div>
                <div className="listContainer">
                    {this.state.lists.map(list=> {return <div>{list}</div>})}
                </div>
            </div>
        )
    }
}
export default Home