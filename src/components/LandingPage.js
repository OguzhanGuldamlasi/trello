import React from 'react'
import Login from "./Login";
import SignIn from "./SignIn";
window.JF.initialize({apiKey:"1661f160d42273ac076477075ff09c51"});
window.JF.login(
    function success(){},
    function error(){
        window.alert("Could not authorize user");
    }
);
class LandingPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            homeId:0,
        };
        this.getHomeId=this.getHomeId.bind(this);
        this.setHomeId=this.setState.bind(this);
    }
    componentDidMount() {
        let biggestHomeId=0;
        window.JF.getFormSubmissions("93143614742960", function(response){
            for(let i=0; i<response.length; i++){
              if(response[i].answers[3].answer>biggestHomeId)response[i].answers[3].answer=biggestHomeId;
            }
        },()=>this.setState({homeId:biggestHomeId}),console.log(this.state.homeId));
    }
    getHomeId(){
        return this.state.homeId;
    }
    setHomeId(){
        this.setState({homeId:this.state.homeId+1})
    }
    render() {
        return(
                <div className="landingPage">
                    <Login getHomeId={this.getHomeId} setHomeId={this.setHomeId}/>
                    <SignIn/>
                </div>
        )
    }
}
export default LandingPage;