import React from 'react'
import List from "./List"
// import axios from 'axios'
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
import axios from 'axios';

class Home extends React.Component{
    // insertionSort(){
    //     let arr=[...this.state.lists];
    //     arr.sort((a,b)=>{
    //         // console.log(a.props.index);
    //         if(parseInt(a.props.index)<parseInt(b.props.index)){
    //             return -1
    //         }else{
    //             return 1;
    //         }
    //     });
    //     this.setState({lists:arr});
    //
    // }
    // initNotifications(){
    //     if(window.Notification){
    //         window.Notification.requestPermission((permission)=> {
    //             if(permission==='granted'){
    //                 this.setState({notificationsEnabled:true},()=>console.log(this.state.notificationsEnabled))
    //             }
    //             else{
    //                 console.log("ignored")
    //             }
    //         });
    //     }
    //     else{
    //         console.log("Your browser doesnt support notifications")
    //     }
    // }
    showNotifications(header,message){
        console.log("hereee");
        if(this.state.notificationsEnabled){
            let notification=new Notification(header,{
                body:message,
                icon:"https://www.jotform.com/resources/assets/logo/jotform-icon-transparent-280x280.png"},
                setTimeout(function () {
                    notification.close();
                },10000)
            )
        }else{
            console.log("notifications are closed")
        }
    }
    checkDueDate(date){
        let date1 = new Date();
        let date2 = new Date(date);
        let diffTime = Math.abs(date2 - date1);
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
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
            notificationsEnabled:true,
            // editCard:null
        };
        this.checkDueDate=this.checkDueDate.bind(this);
        this.showNotifications=this.showNotifications.bind(this);
        // this.initNotifications=this.initNotificat/ions.bind(this);
        // this.insertionSort=this.insertionSort.bind(this);
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
        this.setIndexes=this.setIndexes.bind(this);
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
                        dueDate:response[i].answers['15'].answer,
                        showEditForm:false
                    };
                    dbCards.push(obj);
                    if(obj.dueDate!==''&&this.checkDueDate(obj.dueDate)<=7 && this.checkDueDate(obj.dueDate)>=0){
                        this.showNotifications(`${obj.toDo}'s due date is approaching`,`${obj.toDo}'s due date is ${obj.dueDate} you have`+" "+this.checkDueDate(obj.dueDate)+" days left");
                    }
                }}
            this.setState({cardInfos:dbCards,cardId:biggestCardId-1+2});
             window.JF.getFormSubmissions("92931845207966",(response)=> {
                 for (let i = 0; i <response.length ; i++) {
                     if(response[i].answers[6].answer==this.state.homeId){
                         let id=response[i].answers[3].answer;
                         let name=response[i].answers[4].answer;
                         let index=response[i].answers[5].answer;
                         let homeId=response[i].answers[6].answer;
                         let state1={id,name,index,homeId};
                         let list=<List index={index} homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId} /*editCard={this.editCard}*/ onDrop={this.onDrop} cardInfos={this.state.cardInfos} deleteList={deleteList} getListIndex={getListIndex} key={id} incrementCardId={incrementCardId} getCardId={getCardId} deleteCard={deleteCard} appendCard={appendCard}  state={state1}/>;
                         dbLists.push(list);
                         id=id-1+2;
                         mainId=id;
                         // this.insertionSort(dbLists);
                         this.setState({lists:dbLists,listId:mainId});
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
            if(id==this.state.lists[i].key){
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
        let list=<List index={0} homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId}/* editCard={this.editCard}*/ cardInfos={this.state.cardInfos} onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={state.id} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />;
        let targetId=event.currentTarget.id;
        let index=this.getListIndex(targetId);
        let arr=this.state.lists;
        arr.splice(index,0,list);
        this.setState({
            lists:arr,
        },()=>this.forceUpdate());
        this.setIndexes(list.key)
        // document.getElementsByClassName("listDiv")[0].remove();
    }

    setIndexes(id){
        let arr=[...this.state.lists];
        let index=this.getListIndex(id);
        // let arr=[];
        // for (let i = index; i <this.state.lists.length ; i++) {
        //     arr.push(this.state.lists[i]);
        // }
        for (let i = 0; i <arr.length ; i++) {
           window.JF.getFormSubmissions("92931845207966", (response)=>{
                for(let j=0; j<response.length; j++){
                    if(response[j].answers['6'].answer==this.state.homeId&&arr[i].key==response[j].answers['3'].answer){
                        let submission=new Object();
                        submission['3']=response[j].answers['3'].answer;
                        submission['4']=response[j].answers['4'].answer;
                        submission['5']=this.getListIndex(response[j].answers['3'].answer);
                        submission['6']=response[j].answers['6'].answer;
                        window.JF.editSubmission(response[j].id, submission, (response)=>{
                        });
                        break;
                    }
                }
            });
        }
    }
    onListDrop(ev){
        ev.preventDefault();
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("list"));
            ev.dataTransfer.clearData("list");
        }catch (e) {
            // state=JSON.parse(ev.dataTransfer.getData("card"));
            // let listID=ev.dataTransfer.getData("listId");
            // for (let i = 0; i <this.state.lists.length ; i++) {
            //     console.log(this.state.lists[i]);
            // }
            return ;
        }
        let list=<List index={this.state.length} homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId} /*editCard={this.editCard}*/ cardInfos={this.state.cardInfos} onDrop={this.onDrop} deleteList={this.deleteList} getListIndex={this.getListIndex} key={state.id} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} state={state} />;
        let arr=this.state.lists;
        arr.push(list);
        this.setState({
            lists:arr,
        },()=>console.log("lol"));
        this.setIndexes(list.key)
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
                        let error=document.createElement("div");
                        error.innerText="User you entered already on board";
                        error.style.position="relative";
                        error.style.width="100px";
                        error.style.margin="10px";
                        error.style.color="white";
                        error.style.top="10px";
                        document.getElementsByClassName("lollol")[0].append(error);
                        setTimeout(()=>error.remove(),3000);
                        return ;
                    }
                    //
                    bool=true;
                    let id=response[i].id;
                    user['3']=response[i].answers['3'].answer;
                    user['4']=response[i].answers['4'].answer;
                    user['5']=response[i].answers['5'].answer+','+this.props.id;
                    user['6']=response[i].answers['6'].answer;
                    window.JF.editSubmission(id, user, (response)=>{
                        const dataToSubmit={
                            name:userName,
                            mail:user['6'],
                            message:`You are added to board ${this.state.name}`,
                        };
                        try {
                            axios.post("http://localhost:5000", dataToSubmit).then(response => console.log(response)).catch(e => console.log(e));
                            return ;
                        }catch (e) {
                            console.log(e)
                        }
                    },()=>console.log(response))
                }
            }
            let error=document.createElement("div");
            // error.innerText="No such user";
            error.style.position="relative";
            error.style.width="100px";
            error.style.margin="10px";
            error.style.color="white";
            error.style.top="10px";
            document.getElementsByClassName("lollol")[0].append(error);
            setTimeout(()=>error.remove(),3000);

        });
    }
    backToBoards(){
        // ReactDOM.render(<Board user={this.props.user} pass={this.props.pass}  homes={this.props.homes} addHome={this.addHome}/>, document.getElementById('root'));
    }
    render(){
        document.cookie=`homeName=${this.state.name}`;
        document.cookie=`homeId=${this.state.homeId}`;
        let arr=[...this.state.lists];
            arr.sort((a,b)=>{
                // console.log(a.props.index);
                if(parseInt(a.props.index)<parseInt(b.props.index)){
                    return -1
                }else{
                    return 1;
                }
            });

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
                            // console.log(this.state.lists.length);
                            let newList=<List  index={this.state.lists.length} homeId={this.state.homeId} takeInfos={this.takeInfos} homeid={this.state.homeId}/* editCard={this.editCard}*/ onDrop={this.onDrop} cardInfos={this.state.cardInfos} deleteList={this.deleteList} getListIndex={this.getListIndex} key={this.state.listId} listId={this.state.lists.length} incrementCardId={this.incrementCardId} getCardId={this.getCardId} deleteCard={this.deleteCard} appendCard={this.appendCard} name={inputArea.value}/>;
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
                    document.getElementsByClassName("lollol")[0].style.display="inline-flex";
                }
                } className="btn btn-secondary">Add Another User</button>
                <div style={{display:'none'}}  className="lollol">
                    <input style={{margin:"10px"}} id="takeIt" placeholder="Enter An User name" type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button onClick={(ev)=>{
                            ev.preventDefault();
                            this.addUser(document.getElementById("takeIt").value);
                        }
                        } style={{marginTop:"4px"}} id="buttonUser" className="btn btn-secondary" type="button">Add User</button>
                    </div>
                </div>
                <h1 className={"headerForHome"} style={{textAlign:"center"}}>{this.state.name}</h1>
                <div style={{display:'inline-flex'}} >
                    <div     className="listContainer">
                        {arr.map(list=>{return list})}
                    </div>
                    <div style={{height: '2000px', width: '1000px'}}  onDragOver={ev=>ev.preventDefault()} onDrop={(ev)=>this.onListDrop(ev)} className="forListDrop"/>
                </div>
            </div>
        )
    }
}
export default Home