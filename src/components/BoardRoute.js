import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Board from './Board'
import BoardComps from './BoardComps'
import Home from "./Home";

// The Roster component matches one of two different routes
// depending on the full pathname
function getCookieValue(a) {
    let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
class BoardRoute extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:undefined,
            id:undefined,
        }
        this.setName=this.setName.bind(this);
        this.setId=this.setId.bind(this);
    }
    setName(name){
        this.setState({name:name})
    }
    setId(id){
        this.setState({id:id})
    }
    render(){
        console.log("BoardRoute");
        console.log(document.cookie)
        let homeId=this.state.id===undefined? getCookieValue("homeId") : this.state.id;
        let homeName=this.state.name===undefined? getCookieValue("homeName") : this.state.name;
        console.log(getCookieValue("homeId"))
        console.log(getCookieValue("homeName"))
        console.log(this.state.id)
        console.log(this.state.name)
        return(
    <Switch>
        <Route exact path='/board' component={() => <Board setName={this.setName} setId={this.setId}  user={this.props.user} pass={this.props.pass} homes={this.props.homes} />}/>
        <Route path='/board/:string' component={() => <Home user={this.props.user} pass={this.props.pass} homes={this.props.homes}  name={homeName} id={homeId}/>}/>

    </Switch>)}
}

export default BoardRoute;
