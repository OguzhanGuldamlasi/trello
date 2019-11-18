import React from 'react'
import List from "./List"
import EditCard from "./EditCard";
import '../styles/home.css'
import ReactDOM from "react-dom";
import Board from "./Board";
import { BrowserRouter } from 'react-router-dom'

import {
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
class Home extends React.Component{
    insertionSort(){

        let arr=[...this.state.lists];
        arr.sort(function(a,b){
            if(a.key<b.key){
                return -1
            }else{
                return 1;
            }
        });
        console.log(arr);
        this.setState({lists:arr});
        console.log(this.state.lists)
    }
    constructor(props){
        super(props);
        this.state={
            name:this.props.name,
            homeId:this.props.id,
            cardId:0,
            listId:0,
            cards:[],
            lists:[],
            cardInfos:[],
            // editCard:null
        };
        this.insertionSort=this.insertionSort.bind(this);
        this.onListDrop=this.onListDrop.bind(this);
        this.getIndex=this.getIndex.bind(this);
        this.getCardId=this.getCardId.bind(this);
        this.deleteCard=this.deleteCard.bind(this);
        this.appendCard=this.appendCard.bind(this);
        this.incrementCardId=this.incrementCardId.bind(this);
        this.getListIndex=this.getListIndex.bind(this);
        this.deleteList=this.deleteList.bind(this);
        this.onDrop=this.onDrop.bind(this);
        // this.showEditCard=this.showEditCard.bind(this);
        // this.editCard=this.editCard.bind(this);
        this.backToBoards=this.backToBoards.bind(this);
        this.addUser=this.addUser.bind(this);
        this.takeInfos=this.takeInfos.bind(this);
    }
    // showEditCard(){
    //     return this.state.editCard;
    // }
    async takeInfos(listId){
        let infos=[];
        await window.JF.getFormSubmissions("92931856730969", (response)=>{
            for (let i = 0; i <response.length ; i++) {
                if(this.state.homeId==response[i].answers[14].answer&&response[i].answers[12].answer==listId){
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
                    infos.push(obj);
                }}
                return infos;
        });
    }
    componentDidMount() {
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
         window.JF.getFormSubmissions("92931856730969", async (response)=>{
            for (let i = 0; i <response.length ; i++) {
                if(this.state.homeId==response[i].answers[14].answer){
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
                }}
            this.setState({cardInfos:dbCards,cardId:biggestCardId-1+2});
             window.JF.getFormSubmissions("92931845207966",(response)=> {
                 for (let i = 0; i <response.length ; i++) {
                     if(response[i].answers[6].answer==this.state.homeId){
                         let id=response[response.length-i-1].answers[3].answer;
                         let name=response[response.length-i-1].answers[4].answer;
                         let children=response[response.length-i-1].answers[5].answer;
                         let state1={id,name,children};
                         let list=<List index={this.state.lists.length} homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId} /*editCard={this.editCard}*/ onDrop={this.onDrop} cardInfos={this.state.cardInfos} deleteList={deleteList} getListIndex={getListIndex} key={id} incrementCardId={incrementCardId} getCardId={getCardId} deleteCard={deleteCard} appendCard={appendCard}  state={state1}/>;
                         dbLists.push(list);
                         id=id-1+2;
                         mainId=id;
                         // this.insertionSort(dbLists);
                         this.setState({lists:dbLists,listId:mainId},()=>this.insertionSort());
                     }
                 }
             });
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
        console.log("here")
        let state;
        try{
            state=JSON.parse(event.dataTransfer.getData("list"));
            event.dataTransfer.clearData("list");
        }catch (e) {
            return ;
        }
        let list=<List homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId}/* editCard={this.editCard}*/ cardInfos={this.state.cardInfos} onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={state.id} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />;
        let targetId=event.currentTarget.id;
        let index=this.getListIndex(targetId);
        let arr=this.state.lists;
        arr.splice(index,0,list);
        this.setState({
            lists:arr,
        });
    }
    // setIndexes(){
    //
    // }
    onListDrop(ev){
        ev.preventDefault();
        console.log(ev);
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("list"));
            console.log(state);
            ev.dataTransfer.clearData("list");
        }catch (e) {
            state=JSON.parse(ev.dataTransfer.getData("card"));
            let listID=ev.dataTransfer.getData("listId");
            for (let i = 0; i <this.state.lists.length ; i++) {
                console.log(this.state.lists[i]);
            }
            return ;
        }
        let list=<List homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId} /*editCard={this.editCard}*/ cardInfos={this.state.cardInfos} onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={state.id} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />;
        let arr=this.state.lists;
        arr.push(list);
        this.setState({
            lists:arr,
        },()=>console.log("lol"));
    }
    // editCard(card){
    //     this.setState({editCard:card},resp=>this.forceUpdate());
    // }
    addUser(userName){
        let user= new Object();
        let bool=false;
        window.JF.getFormSubmissions("93141352586963", (response)=>{
            for(let i=0; i<response.length; i++){
                if(response[i].answers['3'].answer===userName){
                    //check the users board!!!
                    if(response[i].answers['5'].answer.split(",").slice(1).includes(this.props.id+"")){
                        console.log("This user already on board");
                        return ;
                    }
                    //
                    bool=true;
                    let id=response[i].id;
                    user['3']=response[i].answers['3'].answer;
                    user['4']=response[i].answers['4'].answer;
                    user['5']=response[i].answers['5'].answer+','+this.props.id;
                    window.JF.editSubmission(id, user, (response)=>{
                        console.log(response)
                    },()=>console.log(response))
                }
            }
        });
    }
    backToBoards(){
        // ReactDOM.render(<Board user={this.props.user} pass={this.props.pass}  homes={this.props.homes} addHome={this.addHome}/>, document.getElementById('root'));
    }
    render(){
        document.cookie=`homeName=${this.state.name}`;
        document.cookie=`homeId=${this.state.homeId}`;
        return (
            <div className="HomeComp">
                {/*<img id="imag" src="../images/jotform-logo-orange-400x200.png" alt=""/>*/}
                {/*{this.state.editCard}*/}
                <div className="addList">
                    {/*<div>Add name and position it</div>*/}
                    <button className="addListButton" onClick={(ev)=> {
                        // ev.preventDefault();
                        // console.log(ev.defaultPrevented)
                        let inputArea =document.createElement("input");
                        inputArea.className="listInput";
                        inputArea.placeholder="Enter a list name";
                        inputArea.addEventListener("keyup",function (event) {
                            if(event.key==="Enter"){
                                saveButton.click();
                            }
                        })
                        document.getElementsByClassName("addList")[0].append(inputArea);
                        let saveButton=document.createElement("button");
                        saveButton.className="saveList";
                        let span=document.createElement("span");
                        span.innerText="Save";
                        saveButton.appendChild(span);
                        document.getElementsByClassName("addList")[0].append(saveButton);
                        saveButton.onclick=()=>{
                            if(inputArea.value==='' ||inputArea.value===null){
                                inputArea.placeholder="Enter a name";
                                return ;
                            }
                            // {console.log(this.)}
                            let newList=<List  index={this.state.lists.length} homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId}/* editCard={this.editCard}*/ onDrop={this.onDrop} cardInfos={this.state.cardInfos} deleteList={this.deleteList} getListIndex={this.getListIndex} key={this.state.listId} listId={this.state.listId} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} name={inputArea.value}/>;
                            this.setState({
                                lists:[...this.state.lists,newList],
                                listId:this.state.listId+1
                            });
                            document.activeElement.parentElement.childNodes[1].remove();
                            document.activeElement.parentElement.childNodes[1].remove();
                        };
                    }}>Add List</button>
                    {/*<div ></div>*/}
                </div>
                <Link to="/board">
                <button style={{marginTop:"5px"}} onClick={this.backToBoards} className="btn btn-secondary">Back to my Boards</button>
                </Link>
                <button style={{marginTop:"5px",marginLeft:"5px"}} onClick={(ev)=>
                {
                    ev.preventDefault();
                    // let inputArea=document.createElement("input");
                    //     inputArea.className="";
                    //     inputArea.placeholder="Enter an UserName";
                    //     document.getElementsByClassName("appendButton")[0].append(inputArea);
                    document.getElementsByClassName("input-group mb-3")[0].style.display="inline";
                }
                } className="btn btn-secondary">Add Another User</button>
                <div style={{display:'none'}} className="input-group mb-3">
                    <input id="takeIt" placeholder="Enter An User name" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button onClick={(ev)=>{
                            ev.preventDefault();
                            this.addUser(document.getElementById("takeIt").value);
                        }
                        } className="btn btn-outline-secondary" type="button">Add User</button>
                    </div>
                </div>
                <h1 style={{textAlign:"center"}}>{this.state.name}</h1>
                <div style={{display:'inline-flex'}} >
                    <div     className="listContainer">
                        {this.state.lists.map(list=>{return list})}
                    </div>
                    <div style={{height: '2000px', width: '1000px'}}  onDragOver={ev=>ev.preventDefault()} onDrop={(ev)=>this.onListDrop(ev)} className="forListDrop"/>
                </div>
            </div>
        )
    }
}
export default Home