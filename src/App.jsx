import { useState, useEffect } from 'react'
import yellowblob from './assets/yellowblob.png'
import blueblob from './assets/blueblob.png'
import './App.css'
import Test from './components/Test'
import Start from './components/Start-screen'
import Results from './components/Results'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [quiz, setQuiz] = useState([])
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const [answersChecked, setAnswersChecked] = useState(false)
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({})
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
    setQuiz(prevQuiz => {
      return prevQuiz.map(quest => {
        const q = quest.question
        const noQuotes = q.replaceAll('&quot;', '')
        const noApostrophe = noQuotes.replaceAll('&#039;', '')
        console.log(noQuotes)
        const randomOrderedMap = quest.randomOrdered
        randomOrderedMap.map(answer => {
          const a = answer.replaceAll('&quot;', '')
          const noApos = a.replaceAll('&#039;', '')
          const noChar = noApos.replaceAll('&amp;', '')
          return [noChar]
        })
        return {
          ...quest,
          question: noApostrophe
        }
      })
    })

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
  return <Test {...question} key={index}  handleClick={handleClick} answersChecked={answersChecked} quiz={quiz} />
})
// console.log(quiz)
const checkAnswers = () => {
  setAnswersChecked(true)
  setCount(0)
  setNumberOfQuestions(0)
  
  quiz.map(question => {
    setNumberOfQuestions(prevNumber => prevNumber + 1)
    if(question.correctAnswer === question.selectedAnswer) {
      setCount(prevCount => prevCount + 1)
    }
  })
}

const playAgain = () => {
  setGameStarted(false)
  window.location.reload(false);

  console.log('you clicked play again!')
}
// 
  return (
    <div className="App">
      <img src={yellowblob} alt=""  className='app--img app--img_top'/>
      {!gameStarted && <Start startGame={startGame} />}
      {gameStarted && !answersChecked && <div className='quiz--container'>
        {questionElements}
        <button className='btn check--answers_btn' onClick={checkAnswers}>
          Check answers</button>
      </div>} {answersChecked && gameStarted &&
      <div>{<Results quiz={quiz} count={count} numberOfQuestions={numberOfQuestions} answersChecked={answersChecked}/>}
        <div className='test--score_container'>
        <p className='test--score'>You scored {count}/{numberOfQuestions} correct answers</p>
        <button className='btn play--again_btn' onClick={playAgain}>
          Play again</button>
        </div>
      </div> }
      <img src={blueblob} alt=""  className='app--img app--img_bottom'/>
    </div>
  )
}

export default App
