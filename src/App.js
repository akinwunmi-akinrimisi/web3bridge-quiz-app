import React, { useState, useEffect } from "react";
import "./App.css";
import useTimer from "./useTimer"; 

const questions = [
  {
    question: "What is the main function of a smart contract?",
    options: ["To automate agreements", "To store data", "To create cryptocurrencies", "To mine blocks"],
    answer: "To automate agreements",
  },
  {
    question: "Which language is primarily used for writing Ethereum smart contracts?",
    options: ["JavaScript", "Python", "Solidity", "C++"],
    answer: "Solidity",
  },
  {
    question: "What does ERC stand for in ERC20?",
    options: ["Ethereum Request for Comment", "Ethereum Reference Contract", "Ether Real Contract", "Ethereum Registered Code"],
    answer: "Ethereum Request for Comment",
  },
  {
    question: "What is the maximum supply of Bitcoin?",
    options: ["18 million", "21 million", "15 million", "30 million"],
    answer: "21 million",
  },
  {
    question: "Which consensus algorithm does Ethereum currently use?",
    options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Proof of Authority"],
    answer: "Proof of Stake",
  },
  {
    question: "Which of the following is NOT a blockchain?",
    options: ["Bitcoin", "Ethereum", "Hyperledger", "Google Cloud"],
    answer: "Google Cloud",
  },
  {
    question: "What is gas in the context of Ethereum?",
    options: ["Fuel for transactions", "A smart contract", "An EVM opcode", "Ether's equivalent"],
    answer: "Fuel for transactions",
  },
  {
    question: "What is the purpose of a private key?",
    options: ["To encrypt messages", "To generate a public key", "To sign transactions", "To store tokens"],
    answer: "To sign transactions",
  },
  {
    question: "What does 'mining' refer to in blockchain?",
    options: ["Finding a block", "Generating a wallet", "Sending tokens", "Using EVM opcodes"],
    answer: "Finding a block",
  },
  {
    question: "Which of these networks is specifically designed for private blockchains?",
    options: ["Bitcoin", "Ethereum", "Quorum", "Polkadot"],
    answer: "Quorum",
  }
];

const App = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null)); // initial values = null/empty
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useTimer(30);

  useEffect(() => {
    if (timeLeft === 0) {
      goToNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (selectedOption) => {
    const updatedAnswers = [...userAnswers]; // copies
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setTimeLeft(30); 
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(30); 
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        score += 1;
      }
    });
    return score;
  };

  const restartQuiz = () => {
    setIsQuizStarted(false); 
    setCurrentQuestion(0); 
    setUserAnswers(Array(questions.length).fill(null)); 
    setIsQuizFinished(false); 
    setTimeLeft(30); 
  };

  const endQuizEarly = () => {
    const confirmEnd = window.confirm("Are you sure you want to end the quiz early?");
    if (confirmEnd) {
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3">
        {!isQuizStarted ? (
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Welcome to the Blockchain Quiz!</h1>
            <button
              onClick={() => setIsQuizStarted(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Start Quiz
            </button>
          </div>
        ) : isQuizFinished ? (
          <div className="text-center max-h-[75vh] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-md md:text-lg mb-6">You scored {calculateScore()} out of {questions.length}.</p>
            <div className="space-y-4 mb-6">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-left ${
                    userAnswers[index] === question.answer ? "bg-green-100 border-l-4 border-green-500" : "bg-red-100 border-l-4 border-red-500"
                  }`}
                >
                  <p className="font-semibold">{index + 1}. {question.question}</p>
                  <p className="ml-4">
                    Your Answer: <span className={userAnswers[index] === question.answer ? "text-green-700" : "text-red-700"}>{userAnswers[index]}</span>
                  </p>
                  {userAnswers[index] !== question.answer && (
                    <p className="ml-4 text-green-700">Correct Answer: {question.answer}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={restartQuiz}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="text-left text-lg md:text-xl mb-2 font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="text-right text-lg md:text-xl font-bold mb-4">
              Time Left: <span className={timeLeft <= 10 ? "text-red-600" : ""}>{timeLeft}s</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">{questions[currentQuestion].question}</h1>
            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-2 md:p-4 rounded-lg ${
                    userAnswers[currentQuestion] === option
                      ? "bg-white text-blue-600 border-2 border-blue-500"
                      : "bg-blue-500 text-white"
                  } hover:bg-blue-700`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={goToPreviousQuestion}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                onClick={goToNextQuestion}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
              <button
                onClick={endQuizEarly}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                End Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;