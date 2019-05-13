import React from "react";
import "./App.css";
import RecorderService from "./audio/RecorderService";
import axios from "axios";

class App extends React.Component {
  state = {
    url: "http://localhost:8080",
    recordings: []
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.recorderSrvc = new RecorderService(".");
    this.recorderSrvc.config.usingMediaRecorder = false;
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
    const newR = e.detail.recording;
    
    recordings.push(newR);
    this.getResponse(newR);
    this.setState({ recordings });
  };

  onChangeURL = e => {
    const url = this.inputRef.current.value;
    this.setState({ url });
  };

  getResponse = async recording => {
    let message;
    try {
      const formData = new FormData();
      const blob = await fetch(recording.blobUrl).then(r => r.blob());
      formData.append("fname", "recording");
      formData.append("data", blob);
      const res = await axios.post(this.state.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      message = res.data;
    } catch (e) {
      message = e.message;
    }
    const recordings = this.state.recordings;
    recordings.find(x => x.blobUrl === recording.blobUrl).responseData = message;
    this.setState({ recordings });
  };

  render() {
    const { recordings, isRecording, url } = this.state;
    const action = isRecording ? this.stopRecording : this.startRecording;
    const actionText = isRecording ? "Stop" : "Record";
    return (
      <div className="App">
        <label>
          Send to:
          <input value={url} ref={this.inputRef} onChange={this.onChangeURL} />
        </label>
        <br />
        <button onClick={action}>{actionText}</button>
        <div className="recordings">
          {recordings.map(x => {
            return (
              <div key={x.blobUrl}>
                <audio src={x.blobUrl} controls={true} />
                <p>{x.responseData || "Retrieving Response..."}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
