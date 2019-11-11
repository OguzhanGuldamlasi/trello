import React from 'react'
import Home from "./Home";
import ReactDOM from 'react-dom';
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            homeIds:this.props.homes,//
            homes:[]
        }
    }
    onClick(id1,name1){
        ReactDOM.render(<Home name={name1} id={id1}/>, document.getElementById('root'))
    }
    componentDidMount() {
        let arr=[];
        window.JF.getFormSubmissions("93143614742960", function(response){
            for(let i=0; i<response.length; i++){
                  let obj={
                     id: response[i].answers[3].answer,
                     name:response[i].answers[4].answer,
                  }
            }
        },()=>this.setState({homes:arr}));
    }
    render() {
        return (
            <div className="homeContainer ">
                <div className="AddHomeDiv">
                    <button className="addHome" onClick={()=>{
                        let inputArea=document.createElement("input");
                        inputArea.classNameName="addHome";
                        document.getElementsByClassName("addHome")[0].append(inputArea);
                        let saveButton=document.createElement("button");
                        saveButton.innerText="Add Board";
                        saveButton.addEventListener("click",ev=>ev.stopPropagation());
                        inputArea.addEventListener("click",ev=>ev.stopPropagation());
                        document.getElementsByClassName("addHome")[0].append(saveButton);
                        saveButton.onclick=()=>{
                            if(inputArea.value == null){
                                 inputArea.placeholder="Fill this area"
                            }
                            else{
                                let submission = new Object();
                                submission['3'] =
                                submission['4'] =inputArea.value;
                                let arr=[...this.state.homes];
                                let home=<Home name={inputArea.value} id={}/>;
                                arr.push(home);
                                this.setState({homes:arr});
                                window.JF.createFormSubmission("93143614742960", submission, function(response){
                                },()=>console.log(this.state));
                            }
                        }
                    }
                }>Create new board</button>
                </div>
                <div className="Homes">
                    {this.state.homes.map(home=>{return <div onClick={this.onClick(home.id,home.name)} id={home.id}><h3>{home.name}</h3></div>})}
                </div>
            </div>
        );
    }
}
export default Board;