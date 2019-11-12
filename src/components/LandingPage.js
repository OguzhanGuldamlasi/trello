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
    }
    render() {
        return(
                <div className="landingPage">
                    <Login/>
                    <SignIn/>
                </div>
        )
    }
}
export default LandingPage;