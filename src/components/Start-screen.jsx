export default function Start ({startGame}) {
    return (
        <section className='start-screen'>
            
            <div className='start-screen--content_wapper' >
            <h1 className='start-screen--header'>Quizzical</h1>
            <p className='start-screen--text' >Click the button to start game</p>
            <button className='start-screen--btn btn' onClick={startGame}>Start Quiz</button>
            </div>
            
        </section>
    )
}