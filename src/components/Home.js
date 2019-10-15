import React from 'react'
import List from "./List"
import '../styles/home.css'
import Card from "./Card"
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardId:0,
            listId:0,
            cards:[],
            lists:[]
        };
        this.getIndex=this.getIndex.bind(this);
        this.getCardId=this.getCardId.bind(this);
        this.deleteCard=this.deleteCard.bind(this);
        this.appendCard=this.appendCard.bind(this);
        this.incrementCardId=this.incrementCardId.bind(this);
        this.getListIndex=this.getListIndex.bind(this);
        this.deleteList=this.deleteList.bind(this);
    }
    getIndex(id){
        for (let i = 0; i <this.state.cards.length ; i++) {
            if(id==this.state.cards[i].key){
                return i;
            }
        }
    }
    getCardId(){
        return this.state.cardId;
    }
    deleteCard(id){
        let index=this.getIndex(id);
        this.setState({
            cards:this.state.cards.filter((_,i)=>i!==index)
        });
    }
    getListIndex(id){
        for (let i = 0; i <this.state.lists.length ; i++) {
            if(id+""===this.state.lists[i].key){
                return i;
            }
        }
    }
    deleteList(id){
        let index=this.getListIndex(id);
        this.setState({
            lists:this.state.lists.filter((_, i) => i !== index)
        });
    }
    appendCard(card){
        this.setState({cards:[...this.state.cards,card]})
    }
    incrementCardId(){
        this.setState({cardId:this.state.cardId+1})
    }
    onDrop(event){
        let state=JSON.parse(event.dataTransfer.getData("list"));
        event.dataTransfer.clearData("list");
        let list=<List deleteList={this.deleteList} getListIndex={this.getListIndex} key={this.listId} listId={this.listId} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />
        let targetId=event.currentTarget.children.item(0).children.item(0).id;
        let index=this.getListIndex(targetId);
        const newData=this.state.lists.slice(0);
        newData.push(list);
        this.setState({
            lists:newData
        })
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
                        document.getElementsByClassName("addList")[0].append(saveButton);
                        saveButton.onclick=()=>{
                            if(inputArea.value==='' ||inputArea.value===null){
                                inputArea.placeholder="Enter a name";
                                return ;
                            }
                            let newList=<List deleteList={this.deleteList} getListIndex={this.getListIndex} key={this.state.listId} listId={this.state.listId} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} name={inputArea.value}/>;
                            this.setState({
                                lists:[...this.state.lists,newList],
                                listId:this.state.listId+1
                            });
                        };
                    }}>Add List</button>
                </div>
                <div className="listContainer">
                    {this.state.lists.map(list=> {return <div   className={"lists"} onDrop={event => this.onDrop(event)}>{list}</div>})}
                </div>
            </div>
        )
    }
}
export default Home