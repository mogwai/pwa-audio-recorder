import React from "react";
import "./App.css";
import RecorderService from "./audio/RecorderService";

class App extends React.Component {
  state = {
    recordings: []
  };

  componentDidMount() {
    this.recorderSrvc = new RecorderService(".");
    this.recorderSrvc.em.addEventListener("recording", evt =>
      this.onNewRecording(evt)
    );
    this.recorderSrvc.em.addEventListener("onaudioprocess", evt => {
      this.onAudioProcess(evt);
    });
    this.recorderSrvc.config.broadcastAudioProcessEvents = true;
  }

  startRecording = () => {
    this.numAudioSamples = 0;
    this.recorderSrvc
      .startRecording()
      .then(() => {
        this.setState({
          isRecording: true
        });
      })
      .catch(error => {
        console.error("Exception while start recording: " + error);
        alert("Exception while start recording: " + error.message);
      });
  };

  stopRecording = () => {
    this.recorderSrvc.stopRecording();
    this.setState({
      isRecording: false
    });
  };

  onAudioProcess = e => {
    this.numAudioSamples++;

    let inputBuffer = e.detail.inputBuffer;
    let outputBuffer = e.detail.outputBuffer;
    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      let inputData = inputBuffer.getChannelData(channel);
      let outputData = outputBuffer.getChannelData(channel);
      // Each sample
      for (let sample = 0; sample < inputBuffer.length; sample++) {
        if (this.addNoise) {
          outputData[sample] = inputData[sample] + Math.random() * 0.02;
        } else {
          outputData[sample] = inputData[sample];
        }
      }
    }
  };

  onNewRecording = e => {
    const recordings = this.state.recordings;
    recordings.push(e.detail.recording);
    this.setState({ recordings });
  };

  render() {
    const { recordings, isRecording } = this.state;
    const recording = recordings[recordings.length - 1];
    const action = isRecording ? this.stopRecording : this.startRecording;
    const actionText = isRecording ? "Stop" : "Record";
    return (
      <div className="App">
        <button onClick={action}>{actionText}</button>
        <br></br>
        {recording && <audio src={recording.blobUrl} controls="true" />}
      </div>
    );
  }
}

export default App;
