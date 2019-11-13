import React from 'react'
import Home from "./Home";
import ReactDOM from 'react-dom';
class BoardComps extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            id:this.props.id,
        };
        this.findName=this.findName.bind(this);
        this.onClick=this.onClick.bind(this);
    }
    componentDidMount() {
        this.findName(this.state.id)
    }

    findName(id) {
        window.JF.getFormSubmissions("93143614742960", (response)=>{
            for(let i=0; i<response.length; i++){
                if(response[i].answers['3'].answer==id){
                    this.setState({name:response[i].answers['4'].answer})
                }
            }
        });
    }
    onClick(ev,id1,name1){
        ev.preventDefault();
        ReactDOM.render(<Home user={this.props.user} pass={this.props.pass} homes={this.props.homes} addHome={this.props.addHome} name={name1} id={id1}/>, document.getElementById('root'))
    }
    render() {
        return(
                <div onClick={(ev)=>this.onClick(ev,this.state.id,this.state.name)} style={{marginLeft:'40px',cursor:'pointer',width:"150px",height:"150px"}} className="card bg-dark text-white">
                     <div className="card-body">{this.state.name}</div>
                </div>
                )
    }
}
export default BoardComps;