/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { Typography, Container, Paper, Button, RadioGroup, FormControl, Stack } from '@mui/material';
import Navbar from '../components/nav';
import { decode } from 'he';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Score from '../components/scoreCard';
import supabase from '../utils/supabase';
import { useUserContext } from '../context/userContext';
import { useNavigate   } from 'react-router-dom';

function QuizPage() {


  const {user}  = useUserContext()
  const history = useNavigate();
  


  const [showScore, setShowScore] = React.useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const [totalEarnedBTC, setTotalEarnedBTC] = useState(0); // Toplam BTC tutarını tutacak state

  // Soru state
  const [questionCount, setQuestionCount] = useState(1)


  // cevap state
  const [trueAnswer, setTrueAnswer] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(0)

  // zaman state
  const [timer, setTimer] = useState(10); // Timer value in seconds


  const [extendedTimer, setExtendedTimer] = useState(0);
  const [timingJoker, setTimingJoker] = useState(user?.timingJoker)


  const [jokerCount, setJokerCount] = useState(user?.fiftyPercentJoker); // Assuming the user starts with 3 jokers
  const [jokerUsed, setJokerUsed] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState()

  const currentQuestions = shuffledQuestions[currentQuestionIndex];
 

  const fetchQuestions = async () => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple');
        const data = await response.json();

        if (response.ok) {
            const formattedQuestions = data.results.map((questionItem) => {
                // Shuffle the options
                const options = [...questionItem.incorrect_answers, questionItem.correct_answer].sort(() => Math.random() - 0.5);

                return {
                    soru: questionItem.question,
                    dogru_cevap: questionItem.correct_answer,
                    secenekler: options,
                };
            });

            // Shuffle the formatted questions
            const shuffledArray = formattedQuestions.sort(() => Math.random() - 0.5);
            setShuffledQuestions(shuffledArray);
            setCurrentQuestionIndex(0); // Set initial question index
        } else {
            console.error('Failed to fetch questions');
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};


//Generate Num
const generateRandomNumber = () => {
    const randomNumber = Math.random() * (0.0009 - 0.00009) + 0.00009;
    return randomNumber.toFixed(7);
};


const handleAnswer = (selectedOptionIndex) => {

    const correctAnswerIndex = currentQuestions && currentQuestions.secenekler.indexOf(currentQuestions.dogru_cevap);
    const randomBTC = generateRandomNumber();
    // Eğer 10. soruya gelindi ise skor sayfasına yönlendir
    if (questionCount === 10) {
        setShowScore(true);
    }


    if (correctAnswerIndex === selectedOptionIndex) {
        // Doğru cevap!
        toast.success(`${randomBTC} SOL Added 👋`, {
            position: "top-center"
          });
        setTrueAnswer(trueAnswer + 1)
        // Toplam kazanılan BTC'yi güncelle
        setTotalEarnedBTC((prev) => prev + parseFloat(randomBTC));
    }
    else {
        // Yanlış cevap!
        toast.error(`${randomBTC} SOL Deleted 😢`, {
            position: "top-center"
          });
        setWrongAnswer(true + 1)
        // Toplam kazanılan BTC'yi güncelle
        setTotalEarnedBTC((prev) => prev - parseFloat(randomBTC));
    }


    // Sonraki soruya geç
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionCount(questionCount + 1);
};

useEffect(() => {
    // Shuffle the questions when the component mounts
    
    fetchQuestions();
}, []);

useEffect(() => {
    // Update the correct answer index whenever a new question is displayed
    if (currentQuestions) {
        setCorrectAnswerIndex(currentQuestions.secenekler.indexOf(currentQuestions.dogru_cevap));
    }
}, [currentQuestions]);


useEffect(() => {
    // Start the timer when the component mounts or when the question changes
    const interval = setInterval(() => {
    
            setTimer((prev) => {
                if (prev === 0) {
                    // If the timer reaches 0, move to the next question or navigate if it's the last question
                    if (questionCount === 10) {
                        // Navigate to the score screen
                        setShowScore(true);
                    } else {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setQuestionCount(questionCount + 1);
                        handleNextQuestion();
                        return 10; // Reset the timer to 10 seconds for the next question
                    }
                } else {
                    return prev - 1;
                }
            });
        
    }, 1000);

    // Clean up the interval when the component unmounts or when the question changes
    return () => clearInterval(interval);
}, [currentQuestionIndex]);

 // Function to handle the button press and extend the timer
 const handleExtendTimer = () => {

      setTimer((prev) => prev + 10);
      setExtendedTimer((prev) => prev + 1);

      const newTimingJoker = timingJoker - 1
      const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { timingJoker: newTimingJoker }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
        }


      setTimingJoker(timingJoker - 1)
      addTicket()


};

const handleJoker = () => {


      const otherOptions = currentQuestions.secenekler.filter((_, index) => index !== correctAnswerIndex);
      const randomIndices = [];
      while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * otherOptions.length);
          if (!randomIndices.includes(randomIndex)) {
              randomIndices.push(randomIndex);
          }
      }

      // Seçilen 2 şıkkı silerek yeni şıkları oluştur
      const updatedOptions = currentQuestions.secenekler.filter((_, index) => !randomIndices.includes(index));

      // Güncellenmiş şıkları ve doğru cevabı ekleyerek yeni soru objesini oluştur
      const updatedQuestion = {
          ...currentQuestions,
          secenekler: updatedOptions,
      };

      // Güncellenmiş soruyu state array'indeki ilgili index'e at
      const updatedShuffledQuestions = [...shuffledQuestions];
      updatedShuffledQuestions[currentQuestionIndex] = updatedQuestion;
      setShuffledQuestions(updatedShuffledQuestions);

      const newFiftyPercent = jokerCount -1
      const addTicket = async () => {
          try {
            const { data, error } = await supabase.auth.updateUser({
              data: { fiftyPercentJoker: newFiftyPercent }
            })

            if (error) {
              console.error('Error updating user metadata:', error);
            } else {
              // Update state to reflect the new value

              console.log('User metadata updated successfully');
            }
          } catch (error) {
            console.error('Error updating user metadata:', error);
          }
      }

      // Joker kullanımını bir azalt
      setJokerUsed(true);
      setJokerCount(jokerCount - 1);
      addTicket()

 
};


useEffect(() => {
    // Reset the timer and mark the current timer as expired when a new question is displayed
    setJokerUsed(false)
    setTimer(10)
}, [currentQuestionIndex]);

const handleNextQuestion = () => {
    // Move to the next question
    const randomBTC = generateRandomNumber();
    // Yanlış cevap!
    toast({
        type: 'error',
        position: 'top',
        text1: 'Wrong Answer!',
        text2: `${randomBTC} Sol Deleted👋`,
        visibilityTime: 2000,
    });
    setWrongAnswer(true + 1)
    // Toplam kazanılan BTC'yi güncelle
    setTotalEarnedBTC((prev) => prev - parseFloat(randomBTC));
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionCount(questionCount + 1);
};


if (user?.health < 1) {
  history('/play'); // Redirect to '/play' page using useHistory hook
}

  return (
    <>
    <Navbar />
   
    <Container sx={{backgroundColor: "transparent"}}>
      {showScore ? (
        <Paper elevation={3} style={{ padding: 20, textAlign: 'center', width: "150%", height: "170%", backgroundColor: "#1F1147" }}>
     
         <Score token={totalEarnedBTC} trueAnswers={trueAnswer} totalToken={user?.token}/>
        </Paper>
      ) : (
        <Paper elevation={3} style={{ padding: 20, backgroundColor: "transparent" }}>
             <ToastContainer />
            <Stack direction={"row"} style={{
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   width: '100%', // Occupy the full width
   marginBottom: 25
            }}>
          <Typography variant="h5" gutterBottom sx={{color: "#FCFCFC"}}>
            Question {questionCount}/10
          </Typography>
          <Typography style={{color: 'white',fontSize: 15}}>{timer}s</Typography>
            </Stack>
          <Typography variant="body1" gutterBottom sx={{color: "#FCFCFC"}}>
          {currentQuestions && currentQuestions.soru ? decode(currentQuestions.soru) : "Question Loading..."}
          </Typography>
          <FormControl component="fieldset">
            <Stack style={{  margin: 10,}}>
            {currentQuestions && currentQuestions.secenekler.map((option, index) => (
                <Button
                onClick={() => handleAnswer(index)} 
                key={index}
                style={{   backgroundColor: "#361E70",
                borderRadius: 8,
                margin: 6,
               
            
            }}
                ><Typography style={{ padding: 10,
                    color: "#FEFEFE",
                    marginTop: 7,
                    fontWeight: "bold",
                    letterSpacing: 1,}}>{decode(option)}</Typography> </Button>
              ))}
            </Stack>
         
          </FormControl>
           {/* Joker buttons */}
           <Stack direction={"row"} style={{ marginTop: 20, justifyContent: 'center' }}>
              <Button
                onClick={handleExtendTimer}
                disabled={jokerUsed}
                style={{
                  backgroundColor: "#6949FD",
                  color: "#FEFEFE",
                  borderRadius: 8,
                  margin: 6,
                }}
              >
               Time Joker-{timingJoker}
              </Button>
              <Button
                onClick={handleJoker}
                disabled={jokerUsed}
                style={{
                  backgroundColor: "#6949FD",
                  color: "#FEFEFE",
                  borderRadius: 8,
                  margin: 6,
                }}
              >
               50% Fifty Chance-{jokerCount}
              </Button>
            </Stack>
     
        </Paper>
      )}
    </Container>
      </>
  );
}

export default QuizPage;
