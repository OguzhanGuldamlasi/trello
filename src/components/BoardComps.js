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
    onClick(id1,name1){
        // ReactDOM.render(<Home name={name1} id={id1}/>, document.getElementById('root'))
    }
    render() {
        return(
            <div className="card-columns">
                <div style={{cursor:'default'}} className="card bg-dark text-white">
                     <div className="card-body">{this.state.name}</div>
                </div>
            </div>
                )
    }
}
export default BoardComps;