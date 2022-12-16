import React, { useState } from 'react'

import "./PasswordGen.css";
import { Divider } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters
} from "./character";

const PasswordGen = () => {
  let [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  let [includeUppercase, setUppercase] = useState(false);
  let [includeLowercase, setLowercase] = useState(false);
  let [includeNumbers, setNumbers] = useState(false);
  let [includeCharacters, setCharacter] = useState(false);

  let handleGeneratePassword = (e) => {
    e.preventDefault();
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeCharacters
    ) {
      notify("Atleast Check one Checkbox", "error");
      // alert("Atleast Check one Checkbox")
    }
    let characterList = "";

    if (includeLowercase) {
      characterList += lowerCaseLetters;
    }
    if (includeUppercase) {
      characterList += upperCaseLetters;
    }
    if (includeNumbers) {
      characterList += numbers;
    }
    if (includeCharacters) {
      characterList += specialCharacters;
    }
    setPassword(generaterPassword(characterList));
  };

  let generaterPassword = (list) => {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * list.length);
      password += list.charAt(randomIndex);
    }
    return password;
  };

  let notify = (msg, type) => {
    if (type === "error") {
      toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } else {
      toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

 let handleCopy=(e)=>{
  e.preventDefault();
  if (!password) {
    notify("Empty", "error");
  } else {
    notify("Text Copied!", "sucess");
  }
 }

  return (
    <>
      <div className="outerContainer">
        <div className="innerContainer">
          <h1 className="heading">Password Generator</h1>
          <div className="password-container">
            <input type="text" className="password" value={password} />
            <CopyToClipboard text={password}>
              <button className="copytBtn">
                copy
              </button>
            </CopyToClipboard>
          </div>
          <Divider className="divider" />
          <div className="passwordLength">
            <p className="heading2">Password Length</p>
            <input
              type="number"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              min="10"
              max="20"
            />
          </div>
          <div className="checkboxContainer">
            <div className="inputContainer">
              <label className="inputLabel">Include Uppercase</label>
              <input
                type="checkbox"
                className="inputCheck"
                checked={includeUppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Include Lowercase</label>
              <input
                type="checkbox"
                className="inputCheck"
                checked={includeLowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Include Numbers</label>
              <input
                type="checkbox"
                className="inputCheck"
                checked={includeNumbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Include Special character</label>
              <input
                type="checkbox"
                className="inputCheck"
                checked={includeCharacters}
                onChange={(e) => setCharacter(e.target.checked)}
              />
            </div>
          </div>
          <button className="btnGen" onClick={handleGeneratePassword}>
            Generate Password
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default PasswordGen