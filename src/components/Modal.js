import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditCard from "./EditCard";
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        console.log(props)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button style={{cursor:props.params.finished==="true" ? 'not-allowed' :'pointer'}} className="btn btn-info" type="button" onClick={handleOpen}>
                Edit
            </button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.params.finished==="true"?console.log("finished"):open}
                onClose={handleClose}
            >
                <EditCard admin={props.admin} setFinished={props.setFinished} setOwner={props.setOwner} setDueDate={props.setDueDate} checkDueDate={props.checkDueDate} setChecklist2={props.setChecklist2} img={props.img} owner={props.owner} homeid={props.homeId} onClose={handleClose} id={props.id} setImg={props.setImg} setTasks={props.setTasks} params={props.params} setCheckList={props.setCheckList} closePopup={props.togglePopup}/>
                {/*<div style={modalStyle} className={classes.paper}>*/}
                    {/*<button onClick={props.togglePopup}>Edit</button>*/}
                    {/*<SimpleModal  />*/}
                {/*</div>*/}
            </Modal>
        </div>
    );
}
