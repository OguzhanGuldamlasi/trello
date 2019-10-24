import React from 'react'
import List from "./List"
import '../styles/home.css'
window.JF.initialize({apiKey:"1661f160d42273ac076477075ff09c51"});
window.JF.login(
    function success(){},
    function error(){
        window.alert("Could not authorize user");
    }
);

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardId:0,
            listId:0,
            cards:[],
            lists:[],
            cardInfos:[]
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
    componentDidMount() {
        console.log("mounted")
        let dbLists=[];
        let dbCards=[];
        let biggestCardId=-1;
        let getIndex= this.getIndex;
        let getCardId= this.getCardId;
        let deleteCard= this.deleteCard;
        let appendCard= this.appendCard;
        let incrementCardId= this.incrementCardId;
        let getListIndex= this.getListIndex;
        let deleteList= this.deleteList;
        let onDrop= this.onDrop;
        let mainId=0;
        window.JF.getFormSubmissions("92931856730969",(response)=>{
            for (let i = 0; i <response.length ; i++) {
                if(biggestCardId<response[i].answers[9].answer){
                    biggestCardId=response[i].answers[9].answer;
                }
                let obj={
                    cardId:response[i].answers[9].answer-1+1,
                    toDo:response[i].answers[3].answer,
                    description:response[i].answers[4].answer,
                    comments:response[i].answers[5].answer,
                    labels:response[i].answers[11].answer,
                    coverImg:response[i].answers[7].answer,
                    checklist:response[i].answers[10].answer,
                    listId:response[i].answers[12].answer,
                    showEditForm:false
                };
                dbCards.push(obj);
                this.setState({cardInfos:dbCards,cardId:biggestCardId-1+2});
            }
        });
        window.JF.getFormSubmissions("92931845207966",(response)=> {
            for (let i = 0; i <response.length ; i++) {
                let id=response[response.length-i-1].answers[3].answer;
                let name=response[response.length-i-1].answers[4].answer;
                let children=response[response.length-i-1].answers[5].answer;
                let state1={id,name,children};
                let list=<List onDrop={this.onDrop} cardInfos={this.state.cardInfos} deleteList={deleteList} getListIndex={getListIndex} key={id} incrementCardId={incrementCardId} getCardId={getCardId} deleteCard={deleteCard} appendCard={appendCard}  state={state1}/>;
                dbLists.push(list);
                id=id-1+2;
                mainId=id;
                this.setState({lists:dbLists,listId:mainId});
            }
        });

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
        let list=<List cardInfos={this.state.cardInfos} onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={state.id} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />;
        let targetId=event.currentTarget.id;
        let index=this.getListIndex(targetId);
        let arr=this.state.lists;
        arr.splice(index,0,list);
        this.setState({
            lists:arr,
        });
    }
    render(){

        return (
            <div className="HomeComp">
                <div className="addList">
                    <button className="addListButton" onClick={()=> {
                        document.activeElement.addEventListener("click",ev=>ev.stopPropagation());
                        let inputArea =document.createElement("input");
                        inputArea.className="listInput";
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
                            let newList=<List onDrop={this.onDrop} cardInfos={this.state.cardInfos} deleteList={this.deleteList} getListIndex={this.getListIndex} key={this.state.listId} listId={this.state.listId} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} name={inputArea.value}/>;
                            this.setState({
                                lists:[...this.state.lists,newList],
                                listId:this.state.listId+1
                            });
                        };
                    }}>Add List</button>
                </div>
                <div className="listContainer">
                    {this.state.lists.map(list=>{return list})}
                </div>
            </div>
        )
    }
}
export default Home