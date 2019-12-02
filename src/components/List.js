import React from 'react'
import Card from "./Card";
import '../styles/List.css';
import EmptyCard from "./EmptyCard";
let flag=0;
class List extends React.Component{
    getCards(cardInfos=[]){
        let child=[];

        for (let i = 0; i <cardInfos.length ; i++) {
            let labels;
            let comments;
            let checklist;
            try{
                labels=JSON.parse(cardInfos[i].labels.replace("undefined", ""));}
            catch (e) {
                labels=[];
            }
            try{
                comments=JSON.parse(cardInfos[i].comments.replace("undefined",""));}
            catch (e) {
                comments=[];
            }
            try {
                checklist = JSON.parse(cardInfos[i].checklist.replace("undefined", ""));
            }catch (e) {
                checklist=[];
            }
            let state={
                cardId:cardInfos[i].cardId,
                toDo:cardInfos[i].toDo,
                labels:labels,
                checklist:checklist,
                showEditForm:false,
                description:cardInfos[i].description,
                comments:comments,
                owner:cardInfos[i].owner,
                coverImg:cardInfos[i].coverImg,
                listId:cardInfos[i].listId,
                dueDate:cardInfos[i].dueDate,
                finished:cardInfos[i].finished
            };
            if(state.finished==true){
                state.dueDate=''
            }
            (child.push(<Card admin={this.props.admin}  homeid={this.props.homeid} onDragOver={this.onDragOve} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} /*editCard={this.props.editCard} */ onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.id} deleteCard={this.props.deleteCard} id={cardInfos[i].cardId} key={cardInfos[i].cardId} state={state}/>));

            this.setState({
                children:child
            });
        }
    }
    componentDidMount() {
        console.log(this.props.homeId);

           let cardInfos=[];
           window.JF.getFormSubmissions("92931856730969", (response)=>{
           for (let i = 0; i <response.length ; i++) {
                if(this.props.homeId==response[i].answers[14].answer&&response[i].answers[12].answer==this.state.id){
                    let obj={
                        cardId:response[i].answers[9].answer-1+1,
                        toDo:response[i].answers[3].answer,
                        description:response[i].answers[4].answer,
                        comments:response[i].answers[5].answer,
                        labels:response[i].answers[11].answer,
                        coverImg:response[i].answers[7].answer,
                        owner:response[i].answers[13].answer,
                        checklist:response[i].answers[10].answer,
                        listId:response[i].answers[12].answer,
                        dueDate:response[i].answers[15].answer,
                        finished:response[i].answers[16].answer,
                        showEditForm:false
                    };
                    cardInfos.push(obj);
                }
                this.getCards(cardInfos)
           }
        });
        // let cardInfos=this.props.takeInfos(this.state.id).then(value => console.log(value));
        // console.log(cardInfos);
    }
    submitListAPI(state){
        let submission=new Object();
        submission['3']=state.id;
        submission['4']=state.name;
        submission['5']=this.props.index;
        submission['6']=this.props.homeid;
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
                state:this.props.index,
                children:[]

            };
            this.submitListAPI(this.state);
        }
        this.submitListAPI=this.submitListAPI.bind(this);
        // this.submitListAPI=this.submitListAPI.bind(this);
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
        this.getCards=this.getCards.bind(this);
        this.setTasks=this.setTasks.bind(this);
    }
    appendChild(draggedCard=null,name){
        if(draggedCard!=null){
            this.setState({
                children:[
                    ...this.state.children,
                    draggedCard,
                ],
            },()=>this.state.children);
            return;
        }
        let cardId=this.props.getCardId();
        let card =<Card admin={this.props.admin} name={name} homeid={this.props.homeid} onDragOver={this.onDragOve} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter}/* editCard={this.props.editCard}*/ onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} getIndex={this.getIndex} listId={this.state.id} deleteCard={this.props.deleteCard} id={cardId} key={cardId}/>;
        this.setState({
            children:[
                ...this.state.children,
                card,
            ],
        },()=>console.log(this.state.children,""));
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
                    submission['5']=response[i].answers[5].answer;
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
        },);
        this.props.deleteCard(id);
    }
    onDrop=(ev)=>{
        try{
        document.getElementsByClassName("emptyDiv")[0].remove();}
        catch (e) {

        }
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");

        }catch (e) {
            return ;
        }
        let card=<Card admin={this.props.admin} homeid={this.props.homeid} onDragOver={this.onDragOve} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter} /*editCard={this.props.editCard}*/ onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.id} deleteCard={this.props.deleteCard}  state={state}/>;
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
                    window.JF.editSubmission(submissionId,submission,rep=>()=>console.log(this.state.children,""));
                }
            }
        });
    };
    onCardDrop=(ev)=>{
        // ev.preventDefault();
        // ev.stopPropagation();
        let state;
        try{
            state=JSON.parse(ev.dataTransfer.getData("card"));
            ev.dataTransfer.clearData("card");
            console.log(state)
        }catch (e) {
            return ;
        }
        let card=<Card admin={this.props.admin} homeid={this.props.homeid} onDragLeave={this.onDragLeave} onDragEnter={this.onDragEnter}/* editCard={this.props.editCard}*/ onDrop={this.onCardDrop} deleteChildren={this.deleteChildren} key={state.cardId}  listId={this.state.id} deleteCard={this.props.deleteCard}  state={state}/>;
        let arr=[...this.state.children];
        let element=document.getElementsByClassName("emptyDiv")[0].nextSibling;
        // console.log(element)
        arr.splice(this.getIndex(element.id),0,card);
        this.setState({
            children:arr
        });
        document.getElementsByClassName("emptyDiv")[0].remove();
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
                // console.log("932213213j21ljk3klj231jkl")
                cards.splice(i,1);
                break;
            }
        }
        this.setState({children:cards},);
    }
    onDragOver(ev){
        ev.preventDefault();
        // console.log("Dragged a list")
        // document.getElementsByClassName("emptyDiv")[0]
        // this.deleteEmptyCards();
    }
    findElementToDrop(target){

    }
    onDragEnter(ev){
        ev.preventDefault();
        console.log(ev.currentTarget);
        if(document.getElementsByClassName("emptyDiv") [0] !==undefined){return;}
        let div = document.createElement("div");
        div.className = "emptyDiv";
        div.ondragover=(ev)=>{ev.preventDefault()};
        div.ondragenter=(ev)=>{ev.preventDefault()};
        div.ondrop = (ev)=>{ ev.preventDefault();this.onCardDrop(ev)};
        div.ondragleave=()=>{
            document.getElementsByClassName("emptyDiv")[0].remove();
        };
        // ev.currentTarget.appendChild(div);
        ev.currentTarget.parentNode.insertBefore(div, ev.currentTarget);
        // ev.currentTarget.parentNode.insertBefore(div,ev.currentTarget)
        // ev.currentTarget.appendChild(div);
        // console.log(ev.currentTarget.previousSibling);
        // ev.currentTarget.parentNode.insertBefore(div, ev.currentTarget);
        // for (let i = 0; i <this.state.children ; i++) {
        //     console.log(this.state.children[i])
        //     if(this.state.children[i].key==-1){
        //         console.log("11001010101010")
        //         return ;
        //     }
        // }
        // this.deleteEmptyCards();
        // let card=<EmptyCard onDrop={this.onCardDrop} onDragLeave={this.onDragLeave} id={-1} key={-1}/>;
        // let arr=[...this.state.children];
        // arr.splice(this.getIndex(ev.currentTarget.id),0,card);
        // this.setState({
        //     children:arr
        // });
    }

    onDragLeave(ev){
        // this.deleteEmptyCards();
    }
    onDragStart(event){
        let json=JSON.stringify(this.state);
        console.log("dragStart");
        event.dataTransfer.setData("list",json);
        let lists=document.getElementsByClassName("cardList");
        let card;
        for (let i = 0; i <lists.length ; i++) {
            if(lists[i].id==this.state.id){
                card=lists[i];
                break;
            }
        }
        card.style.backgroundColor="transparent";
        card.style.border="solid";
    }
    onDrag(){
        this.props.deleteList(this.state.id);
    }
    setTasks(ev,name){
        ev.preventDefault();
        console.log(name);
        this.setState({name:name},()=>console.log(this.state.name));
        window.JF.getFormSubmissions("92931845207966", (response)=>{
            for(let i=0; i<response.length; i++){
                if(response[i].answers[3].answer==this.state.id&&response[i].answers[6].answer==this.props.homeId){
                    let submission=new Object();
                    submission['3']=response[i].answers[3].answer;
                    submission['4']=name;
                    submission['5']=response[i].answers[5].answer;
                    submission['6']=response[i].answers[6].answer;
                    window.JF.editSubmission(response[i].id, submission, (response)=>{

                    });
                    break;
                }
            }
        });

    }
    render() {
        return(
            <div className="container">
                <div  onDrag={this.onDrag} onDragStart={this.onDragStart} id={this.state.id} draggable={!(getCookieValue("user")===this.props.admin)} onDrop={this.props.onDrop}  onDragOver={(e)=>this.onDragOver(e)} className="cardList">
                    <input contentEditable="true" onChange={(ev)=>this.setTasks(ev,document.getElementById(this.state.index+123123+"").value)} id={this.state.index+123123+""} defaultValue={this.state.name} style={{color:'white',border:'0px',position:'relative',left:'-30px'}}  className="listName">
                    </input>
                    <button className="addCard" onClick={()=>{
                        let inputArea=document.createElement("input");
                        inputArea.className="form-control";
                        let saveButton=document.createElement("button");
                        document.getElementById(this.state.id).append(inputArea);
                        document.getElementById(this.state.id).append(saveButton);
                        saveButton.innerText="Save";
                        saveButton.id=this.state.id+"lol1";
                        inputArea.id=this.state.id+"lol2";
                        saveButton.className="btn btn-success";
                        saveButton.style.marginTop="5px";
                        inputArea.style.marginTop="5px";
                        saveButton.style.position="relative";
                        saveButton.style.left="105px";
                        saveButton.addEventListener("click",ev=>ev.stopPropagation());
                        inputArea.addEventListener("click",ev=>ev.stopPropagation());
                        saveButton.onclick=()=>{
                          if(inputArea.value===""||inputArea.value===undefined){
                              inputArea.placeholder="Enter a valid name";
                              return ;
                          }
                          else{

                              this.appendChild(null,inputArea.value)
                              document.getElementById(this.state.id+"lol1").remove()
                              document.getElementById(this.state.id+"lol2").remove()
                          }
                        };
                        }}>
                        <span >
                            Add a Card
                        </span>

                    </button>
                    <div id={this.state.id}/>
                </div>
                <div  className="cardContainer">
                    {this.state.children.map(child=> {return child})}
                </div>
                <div onDragEnter={(ev) => {
                    // console.log(JSON.parse(ev.dataTransfer.getData("list")));
                    // if(ev.dataTransfer.getData("list")=='') return ;
                    let div = document.createElement("div");
                    // console.log(document.getElementsByClassName("emptyDiv")[0]);
                    // if(document.getElementsByClassName("emptyDiv")[0]!==undefined){
                    //     return ;
                    // }
                    ev.preventDefault();
                    div.className = "emptyDiv";
                    div.ondrop = this.onDrop;
                    ev.currentTarget.appendChild(div);
                }
                } onDragLeave={(ev) => {
                    // if(ev.dataTransfer.getData("list")=='') return ;

                    ev.currentTarget.lastChild.remove();
                }} className="emptyList" onDragOver={event => this.onDragOver(event)} onDrop={event => this.onDrop(event)}/>
            </div>
        )
    }
}
export default List;
function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}