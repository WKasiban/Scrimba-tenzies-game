import React from "react";
import "./style.css"
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [round, setRound] = React.useState(0)

    React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid() 
        }
    }

    function allNewDice() {
        const newArr = []
        for (let i=0; i < 10; i++) {
            newArr.push(generateNewDie())
        }
        return newArr
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDie => oldDie.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
            setRound(round => round + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRound(0)
        }
    }

    function holdDice(id) {
        setDice(oldDie => oldDie.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)


    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <p className="count">{tenzies ? `You won in ${round} times!` : `Number of roll : ${round}`}</p>
            <button className="roll-btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}