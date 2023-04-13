import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [num,setNum] = useState(10)
  const [first,setFirst] = useState(0)
  const [secondNum,setSecondNum] = useState(10)
  const [showNum,setShowNum] = useState(false)
  const [option1,setOption1] = useState(0)
  const [option2,setOption2] = useState(0)
  const [option3,setOption3] = useState(0)
  const [mark,setMark] = useState(0)
  const [ans,setAns] = useState(0)
  const [username,setUserName] = useState("")
  const [showBox,setShowBox] = useState(false)
  
  // useEffect(()=>{
  //     setUserNum()
  // },[])


  const updateNum = (e) => {
    console.log(e.target.value)
   
      setNum(e.target.value)
  }

  const setUserNum = () => {
       setShowNum(true)
      if(num !== ""){
        const first = Math.round(Math.random()*num)
        const second = Math.round(Math.random() * 10)
        console.log(second)

        const ans = first * second
        console.log(ans)
        let op1 = (first * second) + 1
        
       

        let op2 = op1 + 2
        
        //setting the options
        const list = []
        list.push(op1)
        list.push(op2)
        list.push(ans)
        const arr = shuffleArray(list)
        
        setFirst(first)
        setSecondNum(second)
        setOption1(arr[0])
        setOption2(arr[1])
        setOption3(arr[2])
        setAns(ans)
        

        
      }
      
  }

  function shuffleArray(array) {
    // Clone the original array to avoid modifying it
    
    const newArray = array.slice();
  
    // Loop through the array in reverse order
    for (let i = newArray.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap the elements at indexes i and j
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  
    // Return the shuffled array
    return newArray;
  }

  console.log(shuffleArray([1,2,3]))

  const check = (e) => {
    const userChoice = Number(e.target.innerHTML)
    if(userChoice === ans){
      setMark(prev => prev + 1)
      setUserNum()
    }
    else{
      setShowNum(false)
      setShowBox(true)
      setUserNum()
    }
  }

  const resetGame = () => {
    setMark(0)
    setShowNum(false)
  }

  const cancel = () => {
    setShowBox(false)
    resetGame()
  }

  const save = async () => {
      
      try {
        const data = await axios.post('/create',{username,mark})
        console.log(data)
        setShowBox(false)
        resetGame()
      } catch (error) {
        console.log(error)
      }
     
  }

  return (
    <div className="App">
      <h2 className="title">Points</h2>
      <div className="mark-box">{mark}</div>
      <div className='input-box'>
        <label htmlFor="user-input">Enter Number</label>
        
        <div>
        <input type="number" id="user-input" placeholder="10"   onChange={(e)=>updateNum(e)}/>
        </div>
        <button className="btn" id="set-btn" onClick={setUserNum}>Set</button>
       
        
        
      </div>
      {
        showNum && <div className="num-container">
        <div className="num-div">{first}</div>
       <div className="num-div">X</div>
       <div className="num-div">{secondNum}</div>
        </div>
      }
      
      {
        showNum &&  <div className="answer-div">
        <div className="option" onClick={(e)=>check(e)}>{option1}</div>
        <div className="option" onClick={(e)=>check(e)}>{option2}</div>
        <div className="option" onClick={(e)=>check(e)}>{option3}</div>
      </div>
      }
      
    
      
      <button className="btn" id="reset-btn" onClick={resetGame}>Reset</button>

      {
        showBox &&  <div className="save-div">
        
        <div>
        <input type="text" placeholder="enter name" onChange={(e)=>setUserName(e.target.value)} />
       
        <div>
        <button className="btn" id="save-btn" onClick={save}>Save</button>
        <button className="btn" id="cancel-btn" onClick={cancel}>Cancel</button>
        </div>
        
        </div>
      </div>
      }

     
      

      
     

    </div>
  )
}

export default App
