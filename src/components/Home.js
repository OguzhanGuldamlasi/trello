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
        this.onDrop=this.onDrop.bind(this);
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
        let array=this.state.lists;
        array.splice(index,1);
        this.setState({
            lists:array
        });
    }
    appendCard(card){
        this.setState({cards:[...this.state.cards,card]})
    }
    incrementCardId(){
        this.setState({cardId:this.state.cardId+1})
    }
    onDrop(event){
        let state;
        try{
             state=JSON.parse(event.dataTransfer.getData("list"));
             event.dataTransfer.clearData("list");
        }catch (e) {
            return ;
        }
        console.log(state);
        let list=<List  onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={state.id} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />;
        let targetId=event.currentTarget.id;
        let index=this.getListIndex(targetId);
        let arr=this.state.lists;
        arr.splice(index,0,list);
        this.setState({
            lists:arr,
        });
    }
    render(){
        let lists=[];
        this.state.lists.map(list=>lists.push(list));
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
                            let newList=<List onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={this.state.listId} listId={this.state.listId} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} name={inputArea.value}/>;
                            this.setState({
                                lists:[...this.state.lists,newList],
                                listId:this.state.listId+1
                            });
                        };
                    }}>Add List</button>
                </div>
                <div className="listContainer">
                    {lists}
                </div>
            </div>
        )
    }
}
export default Home