import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Example extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dropdownOpen:false,
            users:[],
        };
        window.JF.getFormSubmissions("93141352586963", (response)=>{
            let kullancilar=[];
            for(let i=0; i<response.length; i++){
                if(this.props.admin!=response[i].answers['3'].answer&&response[i].answers['5'].answer.split(',').includes(props.homeId+"")){
                    kullancilar.push(response[i].answers['3'].answer);
                }
            }
            this.toggle=this.toggle.bind(this);
            this.removeUser=this.removeUser.bind(this);
            this.state.users=kullancilar;
        })
    }
    toggle(){this.setState({dropdownOpen:!this.state.dropdownOpen})};

    removeUser(ev,id){
        ev.preventDefault();
        window.JF.getFormSubmissions("93141352586963", (response)=>{
            for(let i=0; i<response.length; i++){
                if(response[i].answers['3'].answer==id){
                    let submission = new Object();
                    let arr=response[i].answers['5'].answer.split(",");
                    for (let j = 0; j <arr.length ; j++) {
                        if(arr[j]==this.props.homeId){
                            arr.slice(j,1);
                            break;
                        }
                    }
                    let string="";
                    for (let j = 0; j <arr.length ; j++) {
                        string+=arr[j]
                    }

                    submission['3'] = response[i].answers[3].answer;
                    submission['4'] = response[i].answers[4].answer;
                    submission['5'] = string;
                    submission['6'] = response[i].answers[6].answer;
                    window.JF.editSubmission(response[i].id, submission, function(response){
                    })
                }
            }
            let arr=[...this.state.users];
            for (let i = 0; i <arr.length ; i++) {
                if(arr[i]==id){
                    arr.slice(i,1);
                    break;
                }
            }
            this.setState({users:arr},this.forceUpdate)
            console.log(this.state.users)
        });
    }

    render(){
        return (
        <ButtonDropdown style={{margin:'5px',position:'relative',display:this.props.admin!==this.props.user?'none':'inherit'}} isOpen={this.state.dropdownOpen}  toggle={this.toggle}>
            <DropdownToggle caret>
                Remove User
            </DropdownToggle>
            <DropdownMenu >
                {this.state.users.map(id=> {return <DropdownItem  style={{display:this.props.admin==id ? 'none': 'inherit'}} onClick={(ev)=>this.removeUser(ev,id)}>{id}</DropdownItem>})}
            </DropdownMenu>
        </ButtonDropdown>
        );
    };
}

export default Example;