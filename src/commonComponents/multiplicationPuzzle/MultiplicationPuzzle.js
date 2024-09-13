import React, { useState, useEffect } from "react";

const MultiplicationPuzzle = ({ setCaptchaVerified, setError,setErrorMessage }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");

  // Function to generate one two-digit number and one single-digit number
  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 90) + 10); // Generates a two-digit number between 10 and 99
    setNum2(Math.floor(Math.random() * 9) + 1); // Generates a single-digit number between 1 and 9
    setUserAnswer("");
    setMessage("");
  };

  // Initialize numbers on component mount
  useEffect(() => {
    generateNumbers();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Check if the user's answer is correct
  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setCaptchaVerified(true);
      setError((prevState) => ({
        ...prevState,
        captchaVerified: false,
      }));
       setMessage("Correct! You can proceed.");
      setErrorMessage('')
    } else {
      setCaptchaVerified(false);
        setError((prevState) => ({
          ...prevState,
          captchaVerified: true,
        }));
        setErrorMessage('Incorrect Answer, please try again.')
         setMessage("");
      // setMessage("Incorrect, please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <img src="/icons/refresh.svg" height={22} width={22} onClick={generateNumbers}/>
        <div className="border-[1px] border-gray-200 border-solid w-[70px] text-center">
          <p>
            {num1} + {num2}
          </p>
        </div>
        =
        <div className="border-[1px] border-gray-200 border-solid w-[40px] text-center">
          <input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            placeholder=""
            className="w-[100%]"
          />
        </div>
        <button onClick={checkAnswer}>Check</button>
      </div>
      <p className="text-[14px] text-green-600 text-center mt-1">{message}</p>
    </div>
  );
};

export default MultiplicationPuzzle;
