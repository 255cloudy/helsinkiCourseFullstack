import { useState } from 'react'

const StatisticLine = (props)=>{
    const {text, value} = props
    return (
        // <p>{text} <span>{value}</span></p>
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr> 
    )
}
const Statistics = (props)=>{
    const {good, neutral, bad, all, average, positive} = props
    if(all>0) return(
        <>
            <h2>Statistics</h2>
            <table>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="Neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={all}/>
                <StatisticLine text="average" value={average}/>
                <StatisticLine text="positive" value={positive + " %"}/>
            </table>
        </>
    )
    return (
        <div>
             <h2>Statistics</h2>
             <p>No feedback given</p>
        </div> 
    )
    
}
const Button = (props)=>{
    const {text, id, handler} = props
    return (
        <button id={id} onClick={handler}>{text}</button>
    )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [all,  setAll] = useState(0)
  const [positive, setPositive] = useState(0)


  function updateStatistics(e){
    const btnId = e.target.id
    const newAll = all+1
    setAll(newAll)
    let newVal = 0
    switch (btnId) {
        case 'goodBtn':
            newVal = good+1
            setGood(newVal)
            setAverage((newVal - bad)/newAll )
            setPositive((newVal/newAll)*100) 
            break
        case 'neutralBtn':
            setNeutral(neutral+1)
            break
        case 'badBtn':
            newVal = bad+1
            setBad(newVal)
            setAverage((good - newVal)/newAll )
            setPositive((good/newAll)*100) 
            break
    }    
  }
  return (
    <div>
        <h2>give feedback</h2>
        <div className='flex flex-row'>
            <Button id="goodBtn" text="good" handler={updateStatistics} />
            {/* <button onClick={updateStatistics} id="goodBtn">good</button> */}
            <Button id="neutralBtn" text="neutral" handler={updateStatistics} />
            <Button handler={updateStatistics} id="badBtn" text="bad"/>
        </div>
        <div>
            <Statistics all={all} good={good} bad={bad} neutral={neutral} average={average} positive={positive}/>
        </div>        
    </div>
  )
}

export default App