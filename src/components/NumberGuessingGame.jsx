import React, { useState, useRef} from "react";
import "./NumberGuessingGame.css";
import logo from "./logo.png";
import congrat from "./9.gif";
import loser from "./8.png";
import "./index.css";
import bit_win from "./big_win.mp3";
import backgroud from "./background.mp3";
import jackpot from "./jackpot.mp3";
import headphone from "./55.png";

const NumberGuessingGame = () => {
  const [voice, setvoice] = useState(backgroud);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [anilogo, setanilogo] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [Infocss, setInforcss] = useState();
  let maxGasses = 5;
  const winRef = useRef(null);
  const jackpotRef = useRef(null);
  const backref = useRef(null);
  const [headphonecss, setheadphonecss] = useState({
    width: "200px",
    height: "200px",
    position: "absolute",
    top: "40vh",
    left: "44vw",
    background: "white",
    "border-radius": "10px",
    "font-size": "20px",
  });

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // useEffect(()=>{
  //     backref.current.play();
  // }, [backref])

  const playAudiobackground = () => {
    if (winRef.current) {
      winRef.current.play();
    }
  };
  const pauseAudiobackground = () => {
    if (winRef.current) {
      winRef.current.pause();
    }
  };

  const playAudiobackgroundjackpotRef = () => {
    if (jackpotRef.current) {
      jackpotRef.current.play();
    }
  };
  const pauseAudiobackgroundjackpotRef = () => {
    if (jackpotRef.current) {
      jackpotRef.current.pause();
    }
  };

  const pauseAudiobackgroundTime = () => {
    setTimeout(() => {
      pauseAudiobackground();
    }, 4000);
  };

  const pauseAudiobackgroundTimeJack = () => {
    setTimeout(() => {
      pauseAudiobackgroundjackpotRef();
    }, 4000);
  };
  function checkGuess() {
    if (attempts == maxGasses) {
      setGuess("");
      setanilogo(loser);
      setvoice(jackpot);
      playAudiobackgroundjackpotRef();
      pauseAudiobackgroundTimeJack();
      setMessage(
        `Game over! The number was ${secretNumber}. You used all ${maxGasses} attempts.`
      );
    } else {
      const userGuess = parseInt(guess);
      setAttempts(attempts + 1);

      if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        setMessage("Please enter a valid number between 1 and 100");
      } else if (userGuess === secretNumber) {
        setvoice(bit_win);
        setInforcss({
          color: "green",
          "font-family": "bold",
          "font-size": "20px",
        });
        setanilogo(congrat);
        playAudiobackground();
        pauseAudiobackgroundTime();
        setMessage(
          `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`
        );
      } else if (userGuess < secretNumber) {
        setInforcss({
          color: "red",
          "font-family": "bold",
          "font-size": "20px",
        });
        setMessage(
          `Try a higher number! total ${maxGasses} attempts. remaning attempts ${
            maxGasses - attempts
          }`
        );
      } else {
        setInforcss({
          color: "red",
          "font-family": "bold",
          "font-size": "20px",
        });
        setMessage(
          `Try a lower number! total ${maxGasses} attempts. remaning attempts ${
            maxGasses - attempts
          } `
        );
      }
      setGuess("");
    }
  }
  function ResetGuess() {
    setSecretNumber(generateRandomNumber());
    setAttempts(0);
    setMessage("");
    setGuess("");
    setanilogo("");
    pauseAudiobackground();
    pauseAudiobackgroundTimeJack();
    setvoice(backgroud);
  }
  let imgWinLosser = {
    width: "50vw",
    height: "30vh",
    position: "absolute",
    "z-index": "1",
    top: "60vh",
    left: "25vw",
  };

  let backgroundImage = {
    "background-repeat": "no-repeat",
    "background-size": "100vw 100vh",
    "background-origin": "content-box",
    "background-image":
      " url('https://cdnb.artstation.com/p/assets/images/images/023/943/197/large/slotopaint-gamedesign-spartanight06.jpg?1580830650')",
    height: "100vh",
  };

  let fontfaimily1 = {
    "font-family": "'Sedan SC ', serif",
    "font-weight": 400,
    "font-style": "normal",
  };

  function headphoneFunction() {
    setheadphonecss({
      display: "none",
    });
    backref.current.play();
  }
  // let audioRef = document.getElementById("backgroudMusic");

  // useEffect(()=>{
  //   audioRef.current.play();
  // }, [])

  return (
    <>
      <div style={backgroundImage}>
        <div>
          {/* <img src={win} style={imgWinLosser} alt="" /> */}
          <nav className="navbar navbar-0 bg-0">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img
                  src={logo}
                  alt=""
                  width="50"
                  height="50"
                  className="d-inline-block align-text-top"
                />
                <b>Guessing Master</b>
              </a>
            </div>
          </nav>
          <div className="container bg-0">
            <img src={anilogo} className="animation" />
            <audio ref={backref} id="backgroudMusic" autoplay loop >
              <source src={backgroud} type="audio/mpeg" />
            </audio>

            <audio ref={winRef} autoplay loop>
              <source src={bit_win} type="audio/mpeg" />
            </audio>
            <audio ref={jackpotRef} autoplay loop>
              <source src={jackpot} type="audio/mpeg" />
            </audio>
            <h1 className="sedan-sc-regular">
              <b>Number Guessing Game</b>
            </h1>
            <p className="bebas-neue-regular">
              <b>Guess a number between 1 and 100</b>
            </p>
            <input
              type="number"
              className="form-control"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button className="btn btn-outline-info m-2" onClick={checkGuess}>
              Guess
            </button>
            <button onClick={ResetGuess} className="btn btn-outline-info m-2">
              Reset
            </button>
            <p style={Infocss}>{message}</p>
            <div style={headphonecss} onClick={headphoneFunction}>
              <img
                src={headphone}
                style={{ width: "100px" }}
                alt=""
              />{" "}
              <br />
              <b
                className="sedan-sc-regular"
                style={{
                  "background-color": "green",
                  border: "2px solid black",
                  "border-radius": "10px",
                  padding: "5px",
                  color: "white",
                }}
              >
                Start Game{" "}
              </b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberGuessingGame;
