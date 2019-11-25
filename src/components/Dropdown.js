import React, { Component } from 'react';
import '../styles/Dropdown.css';
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            users:[]
        };
        window.JF.getFormSubmissions("93141352586963", (response)=>{
            let kullancilar=[];
            for(let i=0; i<response.length; i++){
                    if(response[i].answers['5'].answer.split(',').includes(this.props.homeid+"")){
                        kullancilar.push(response[i].answers['3'].answer);
                    }
            }
            this.setState({users:kullancilar});
        });
        this.onButtonClick=this.onButtonClick.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    onButtonClick(ev,name){
        ev.preventDefault();
        window.JF.getFormSubmissions("92931856730969", (response)=>{
            for(let i=0; i<response.length; i++){
                if(response[i].answers['9'].answer==this.props.id&&response[i].answers['14'].answer==this.props.homeid){
                    let submission=new Object();
                    response['13']=name;
                    window.JF.editSubmission(response[i].id, response, function(response){
                        document.getElementById("ownerHeader").innerText="Assigned to  "+name;
                    });
                    break;
                }
            }
        });
        // this.forceUpdate()
    }
    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    render() {
        {console.log(this.props)}
        return (
            <div>
                <button className="btn btn-primary" style={{color:'white',position:'relative'}} type="button" id="dropdownMenuButton"  onClick={this.showMenu}>
                    Assign User
                </button>

                {
                    this.state.showMenu
                        ? (
                            <div  style={{display:'flex'}}
                                className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                {this.state.users.map(user=>{return <button style={{marginLeft:'3px',marginTop:'3px'}} className="btn btn-info" onClick={ev=>{this.onButtonClick(ev,user.toString())}}>{user.toString()}</button>})}
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}
export default Card;