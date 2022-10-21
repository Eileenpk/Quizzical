import { useEffect, useState } from "react"

export default function Test({question, correctAnswer, incorrectAnswer, selectedAnswer,handleClick, randomOrdered }) {
    
    const selectAnswer = (id, question) => {
        console.log(id)
        handleClick(id, question)
    }

    return (
        <section className="question" >
            <h2 className="test--question">{question}</h2>
            <div className='test--possible_answers_container'>
                {randomOrdered.map((choice, index) => {
                        return (
                            <div 
                                className={selectedAnswer===choice ? 'selected test--possible_answer' :'test--possible_answer'} id={choice} onClick={() => selectAnswer(choice, question)} key={index} >
                                <p className='test--choice'> {choice} </p>
                            </div>   
                        )
                    })
                }
            </div>
        </section>
    )
}