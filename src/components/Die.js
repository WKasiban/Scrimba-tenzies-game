import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <div className="die-block" style={styles} onClick={props.holdDice}>
            <h2 className="die-num" onClick={props.allNewDice}>{props.value}</h2>
        </div>
    )
}