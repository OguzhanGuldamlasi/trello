import React from 'react'
import '../styles/EmptyCard.css'
class EmptyCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.id
        };
    }
    render() {
        return(
            <div onDragOver={ev=>ev.preventDefault()} onDragEnter={ev=>ev.preventDefault()} onDragLeave={ev=>ev.preventDefault()}   onDrop={ev=>console.log("")} className="emptyDiv"></div>
        )
    }
}
export default EmptyCard;