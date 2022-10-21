
export default function Results({count, numberOfQuestions, answersChecked, quiz}) {
    // const possibleAnswers = quiz.randomOrdered
    // .map(answer => {
    //     if (answer === question.selectedAnswer && question.selectedAnswer === question.correctAnswer) {
    //         return (
    //             <p className="correct test--possible_answer">{answer}</p>
    //         )
    //     } else if (answer===question.selectedAnswer) {
    //         return (
    //             <p className="wrong test--possible_answer">{answer}</p>
    //         )
    //     }else {
    //         return (
    //             <p className="wrong test--possible_answer">{answer}</p>
    //         )
    //     }
    // })
    const checkedQuestions = quiz.map(question => {
        const ordered = question.randomOrdered
        const possibleAnswers = ordered.map(answer => {
        if (answer === question.selectedAnswer && question.selectedAnswer === question.correctAnswer || answer === question.correctAnswer) {
            return (
                <p className="correct test--possible_answer">{answer}</p>
            )
        } else if (answer===question.selectedAnswer) {
            return (
                <p className="wrong test--possible_answer">{answer}</p>
            )
        }else {
            return (
                <p className="test--possible_answer">{answer}</p>
            )
        }
    })
        return (
            <section className="question">
                <h2 className="test--question">{question.question}</h2>
                <div className='test--possible_answers_container'>
                    {possibleAnswers}
                </div>
            </section>
        )
    })

    return (
        <section>
            {checkedQuestions}
        </section>
    )
}