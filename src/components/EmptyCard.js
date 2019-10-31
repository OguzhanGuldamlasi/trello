import React from 'react'
import '../styles/EmptyCard.css'
class EmptyCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.id
        };
        this.onDragLeave=this.onDragLeave.bind(this);
    }
    onDragLeave=(ev)=>{
        this.props.onDragLeave();
    };
    render() {
        return(
            <div onDragOver={e => e.preventDefault()} onDragLeave={this.onDragLeave} onDrop={this.props.onDrop} className="emptyDiv">

            </div>
        )
    }
}
export default EmptyCard;