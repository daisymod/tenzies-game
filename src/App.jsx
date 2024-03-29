import { useState, useEffect } from 'react'
import './App.css'
import { nanoid } from 'nanoid'
import Die from './Die'
import Confetti from 'react-confetti'

/**
 * Updates to do:
 * CSS: put real dots on the dice +
 * Track the number of rolls      +
 * Track time it took to win      +
 * Save best time to localStorage +
 */
function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(0)
  const [bestTime, setBestTime] = useState( function(){
    return JSON.parse(localStorage.getItem('bestTime')) || 0
  })


  useEffect(() => {
    /** .every() looks for spec condition, if every item turns true, it will return true */
    const allHeld = dice.every(die => die.isHeld)
    const firstVal = dice[0].value
    const allSame = dice.every(die => die.value === firstVal)
    if(allHeld && allSame){
      setTenzies(true)
      setIsRunning(false);
      if(bestTime > seconds || bestTime === 0){
        localStorage.setItem('bestTime', JSON.stringify(seconds))
      }
    }
  }, [dice])

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(()=>setSeconds(seconds+1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, seconds]);

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
  }

  const diceElements = dice.map((die)=>{
    return <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        id={die.id}
        holdDie={() => holdDie(die.id)}
      />
  })

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die :
          generateNewDie()
      }))
      setNumberOfRolls(oldNumber => ++oldNumber)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setNumberOfRolls(0)

      if(bestTime > seconds || bestTime === 0){
        setBestTime(seconds)
      }
      setSeconds(0);
      setIsRunning(true);
    }
  }

  function holdDie(id){
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die 
    }))
  }

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <br/>
      <div>
        {bestTime != 0 && <p>Best Time: {bestTime} seconds</p>}
        {seconds}
      </div>
      <div className='container'>
        {diceElements}
      </div>
      <button
        className='btn' 
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button><br/>
      <p>Number of rolls: {numberOfRolls}</p>
    </main>
  )
}

export default App
