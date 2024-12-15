import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [isRecording, setIsRecording] = useState(false); 
  const [transcription, setTranscription] = useState(""); 
  const [language, setLanguage] = useState("en"); 

  let recordingTimeout;

  const startRecording = () => {
    console.log("Recording started...");
    setIsRecording(true);
    setTranscription("");
  };

  const stopRecording = async () => {
    console.log("Recording stopped...");
    setIsRecording(false);

    clearTimeout(recordingTimeout);

    try {
      const response = await axios.post("http://localhost:5000/transcribe", {
        audio: "dummy-audio", 
        language: language,
      });

      setTranscription(response.data.transcript);
    } catch (error) {
      console.error("Error fetching transcription:", error);
      setTranscription("Failed to fetch transcription.");
    }
  };

    const toggleLanguage = () => {
      setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    };

  return (
    <div className="app-container">
       <button className="language-switch" onClick={toggleLanguage}>
        {language === "en" ? "EN" : "AR"}
      </button>
      <div className="transcription-box">
        <h2 className="title">
          <em>Record your voice and watch your words come to life!</em>
        </h2>

        {transcription && (
          <p className="transcription-text">{transcription}</p>
        )}
      </div>

      <div className="button-section">
        <button
          className={`record-button ${isRecording ? "recording" : ""}`}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
        >
           <img
              src={require("./icon.png")}
              alt="Microphone Icon"
            className="mic-icon"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
