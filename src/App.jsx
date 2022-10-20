import { useState, useEffect } from 'react'
import yellowblob from './assets/yellowblob.png'
import blueblob from './assets/blueblob.png'
import './App.css'
import Test from './components/Test'
import Start from './components/Start-screen'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [quiz, setQuiz] = useState([])
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const [answersChecked, setAnswersChecked] = useState(false)
  const [count, setCount] = useState(0)
  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuiz(prevQuiz => {
          return data.results.map(question => {
            const possibleAnswers = [...question.incorrect_answers, question.correct_answer]
            function randomOrder (a, b) {  
              return 0.5 - Math.random()
            } 
            const randomOrdered = possibleAnswers.sort(randomOrder)
            
            return {
              question: question.question,
              correctAnswer: question.correct_answer,
              incorrectAnswer: question.incorrect_answers,
              randomOrdered: randomOrdered
            }
          })
        })
      })
  },[])
  
  const startGame = () => {
    setGameStarted(true) 
}

const handleClick = (id, quest) => {
  setQuiz(prevQuiz => {
    return prevQuiz.map(question => {
      if(quest === question.question) {
        return {
          ...question,
          selectedAnswer: id
        }
      } else {
        return question
      }
    })
  })
  
}
 
const questionElements = quiz.map((question, index) => {
  return <Test {...question} key={index}  handleClick={handleClick}  />
})
const checkAnswers = () => {
  setAnswersChecked(true)
  quiz.map(question => {
    setNumberOfQuestions(prevNumber => prevNumber + 1)
    if(question.correctAnswer === question.selectedAnswer) {
      setCount(prevCount => prevCount + 1)
    }
    console.log(question.correctAnswer
      )
    console.log(count)
  })
}
  return (
    <div className="App">
      <img src={yellowblob} alt=""  className='app--img app--img_top'/>
      {!gameStarted && <Start startGame={startGame} />}
      {gameStarted && <div className='quiz--container'>
        {questionElements}
        {answersChecked && <p>You scored {count}/{numberOfQuestions} correct answers</p>}
        <button className='btn check--answers_btn' onClick={checkAnswers}>
          { answersChecked ? 'Play again' : 'Check answers'}</button>
      </div>}
      <img src={blueblob} alt=""  className='app--img app--img_bottom'/>
    </div>
  )
}

export default App
