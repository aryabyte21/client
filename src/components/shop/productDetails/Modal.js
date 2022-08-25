import React from "react";
import "./style.css";

function Modal({closeModal})
{
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h2>Write your Review!</h2>
                </div>
                <div className="body">
                    <p>content of the review will be here!</p>
                </div>
                <div className="footer">
                    <button onClick={() => {closeModal(false);}}>Cancel</button>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Modal