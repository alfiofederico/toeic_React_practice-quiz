import axios from "axios"
import { useEffect, useState } from "react";

const App =() => {

  const [chosenLevel, setChosenLevel] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [correctAnswers, setCorrectAnswers] =useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)

 
 

 const getRandomQuiz = () => {
    const options = {
      method: "GET",
      url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
      params: { level: chosenLevel, area: "toeic" },
      headers: {
        "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
 }

 console.log(questions)
 useEffect(() =>{
    if (chosenLevel) {
      
      getRandomQuiz()
    }
 }, [chosenLevel])

 const checkAnswer = (option, optionIndex, correctAnswer) => {
 
    if(optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
      setScore((score) => score + 1)
    
      
    } else {
      setScore((score) => score - 1);

    }
    setClicked([...clicked, option])
 }

  return (
    <div className="app">
      {!chosenLevel && (
        <div className="level-selection">
          <h1>English Quiz (TOEIC training)</h1>

          <select
            name="levels"
            id="levels"
            value={chosenLevel}
            onChange={(e) => setChosenLevel(e.target.value)}
          >
            <option value={null}>Select a level</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
            <option value="5">Level 5</option>
            <option value="6">Level 6</option>
            <option value="7">Level 7</option>
            <option value="8">Level 8</option>
            <option value="9">Level 9</option>
            <option value="10">Level 10</option>
          </select>
        </div>
      )}


      {chosenLevel && questions && (
        <div className="questions-area">
          <div className="sticky">
            <h1>Welcome to Level {chosenLevel}!</h1>
            <h3>
              Your score is: <span className="red">{score}</span>
            </h3>
          </div>
          <div className="questions">
            {questions.quizlist.map((question, _questionIndex) => (
              <div key={_questionIndex} className="question-box">
                {question.quiz.map((tip, _index) => (
                  <p key={_index}>{tip}</p>
                ))}

                <div className="question-buttons">
                  {question.option.map((option, optionIndex) => (
                    <div key={optionIndex} className="question-button">
                      <button
                        disabled={clicked.includes(option)}
                        
                        className="btn"
                        onClick={() =>
                          checkAnswer(option, optionIndex + 1, question.correct)
                        }
                      >
                        {option}
                      </button>

                      {correctAnswers.includes(option) && (
                        <p className="red">Correct!</p>
                      )}
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
            ))}
          </div>
          <button
            className="btn-b"
            onClick={() => {
              setChosenLevel(null);
              setScore(0);
            }}
          >
            Go back
          </button>
        </div>
      )}
    </div>
  );
}

export default App
