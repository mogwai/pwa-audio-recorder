(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(46)},24:function(e,t,n){},26:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(12),i=n.n(a),c=(n(24),n(5)),s=n.n(c),d=n(13),u=n(2),l=n(3),p=n(16),g=n(14),f=n(17),m=(n(26),function(){var e=2,t=[];this.onmessage=function(n){"encode"===n.data[0]?function(n){for(var o=n.length,r=new Uint8Array(o*e),a=0;a<o;a++){var i=a*e,c=n[a];c>1?c=1:c<-1&&(c=-1),c*=32768,r[i]=c,r[i+1]=c>>8}t.push(r),console.log(r)}(n.data[1]):"dump"===n.data[0]?function(n){var o=t.length?t[0].length:0,r=t.length*o,a=new Uint8Array(44+r),i=new DataView(a.buffer);i.setUint32(0,1380533830,!1),i.setUint32(4,36+r,!0),i.setUint32(8,1463899717,!1),i.setUint32(12,1718449184,!1),i.setUint32(16,16,!0),i.setUint16(20,1,!0),i.setUint16(22,1,!0),i.setUint32(24,n,!0),i.setUint32(28,n*e,!0),i.setUint16(32,e,!0),i.setUint16(34,8*e,!0),i.setUint32(36,1684108385,!1),i.setUint32(40,r,!0);for(var c=0;c<t.length;c++)a.set(t[c],c*o+44);t=[];var s=[a.buffer];postMessage(s,[s[0]])}(n.data[1]):"close"===n.data[0]&&this.close()}}),h=function(){var e=1,t=128,n=null,o=1152,r=[];function a(e){var t=new Float32Array(e),n=new Int16Array(e.length);return function(e,t){for(var n=0;n<e.length;n++){var o=Math.max(-1,Math.min(1,e[n]));t[n]=o<0?32768*o:32767*o}}(t,n),n}onmessage=function(i){var c;"encode"===i.data[0]?function(e){for(var t=a(e),i=t.length,c=0;i>=0;c+=o){var s=t.subarray(c,c+o),d=n.encodeBuffer(s);r.push(d),i-=o}}(i.data[1]):"dump"===i.data[0]?function(){var e=n.flush();e.length>0&&r.push(e),postMessage(r),r=[]}(i.data[1]):"init"===i.data[0]?(c=i.data[1],importScripts(c.baseUrl+"/workers/encoders/lame.min.js"),n=new lamejs.Mp3Encoder(e,c.sampleRate,t)):"close"===i.data[0]&&this.close()}},v=function(){var e=1,t=.4,n=null,o=[];onmessage=function(r){var a;"encode"===r.data[0]?function(e){var t=n.encode([e]);o.push(t)}(r.data[1]):"dump"===r.data[0]?function(){var e=n.finish("audio/ogg");postMessage(e),o=[]}(r.data[1]):"init"===r.data[0]?(a=r.data[1],importScripts(a.baseUrl+"/workers/encoders/OggVorbisEncoder.js"),n=new OggVorbisEncoder(a.sampleRate,e,t)):"close"===r.data[0]&&this.close()}},w=function(){function e(t){var n=this;Object(u.a)(this,e),this.startRecording=function(e){if("inactive"===n.state){if(navigator&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){n.audioCtx=new AudioContext,n.micGainNode=n.audioCtx.createGain(),n.outputGainNode=n.audioCtx.createGain(),n.config.createDynamicsCompressorNode&&(n.dynamicsCompressorNode=n.audioCtx.createDynamicsCompressor()),n.config.createAnalyserNode&&(n.analyserNode=n.audioCtx.createAnalyser()),(n.config.forceScriptProcessor||n.config.broadcastAudioProcessEvents||!n.config.usingMediaRecorder)&&(n.processorNode=n.audioCtx.createScriptProcessor(n.config.processorBufferSize,1,1)),n.audioCtx.createMediaStreamDestination?n.destinationNode=n.audioCtx.createMediaStreamDestination():n.destinationNode=n.audioCtx.destination,n.config.usingMediaRecorder||("mp3"===n.config.manualEncoderId?(n.encoderWorker=n.createWorker(h),n.encoderWorker.postMessage(["init",{baseUrl:n.baseUrl,sampleRate:n.audioCtx.sampleRate}]),n.encoderMimeType="audio/mpeg"):"ogg"===n.config.manualEncoderId?(n.encoderWorker=n.createWorker(v),n.encoderWorker.postMessage(["init",{baseUrl:n.baseUrl,sampleRate:n.audioCtx.sampleRate}]),n.encoderMimeType="audio/ogg"):(n.encoderWorker=n.createWorker(m),n.encoderMimeType="audio/wav"),n.encoderWorker.addEventListener("message",function(e){var t=new Event("dataavailable");"ogg"===n.config.manualEncoderId?t.data=e.data:t.data=new Blob(e.data,{type:n.encoderMimeType}),n._onDataAvailable(t)}));var t={audio:{echoCancellation:n.config.enableEchoCancellation}};return n.config.deviceId&&(t.audio.deviceId=n.config.deviceId),navigator.mediaDevices.getUserMedia(t).then(function(t){n._startRecordingWithStream(t,e)}).catch(function(e){alert("Error with getUserMedia: "+e.message),console.log(e)})}alert("Missing support for navigator.mediaDevices.getUserMedia")}},this.setMicGain=function(e){n.config.micGain=e,n.audioCtx&&n.micGainNode&&n.micGainNode.gain.setValueAtTime(e,n.audioCtx.currentTime)},this._startRecordingWithStream=function(e,t){n.micAudioStream=e,n.inputStreamNode=n.audioCtx.createMediaStreamSource(n.micAudioStream),n.audioCtx=n.inputStreamNode.context,n.onGraphSetupWithInputStream&&n.onGraphSetupWithInputStream(n.inputStreamNode),n.inputStreamNode.connect(n.micGainNode),n.micGainNode.gain.setValueAtTime(n.config.micGain,n.audioCtx.currentTime);var o=n.micGainNode;n.dynamicsCompressorNode&&(n.micGainNode.connect(n.dynamicsCompressorNode),o=n.dynamicsCompressorNode),n.state="recording",n.processorNode?(o.connect(n.processorNode),n.processorNode.connect(n.outputGainNode),n.processorNode.onaudioprocess=function(e){return n._onAudioProcess(e)}):o.connect(n.outputGainNode),n.analyserNode&&o.connect(n.analyserNode),n.outputGainNode.connect(n.destinationNode),n.config.usingMediaRecorder?(n.mediaRecorder=new MediaRecorder(n.destinationNode.stream),n.mediaRecorder.addEventListener("dataavailable",function(e){return n._onDataAvailable(e)}),n.mediaRecorder.addEventListener("error",function(e){return n._onError(e)}),n.mediaRecorder.start(t)):(n.outputGainNode.gain.setValueAtTime(0,n.audioCtx.currentTime),t&&(console.log("Time slicing without MediaRecorder is not yet supported. The resulting recording will not be playable."),n.slicing=setInterval(function(){"recording"===this.state&&this.encoderWorker.postMessage(["dump",this.context.sampleRate])},t)))},this._onAudioProcess=function(e){n.config.broadcastAudioProcessEvents&&n.em.dispatchEvent(new CustomEvent("onaudioprocess",{detail:{inputBuffer:e.inputBuffer,outputBuffer:e.outputBuffer}})),n.config.usingMediaRecorder||"recording"===n.state&&(n.config.broadcastAudioProcessEvents?n.encoderWorker.postMessage(["encode",e.outputBuffer.getChannelData(0)]):n.encoderWorker.postMessage(["encode",e.inputBuffer.getChannelData(0)]))},this.stopRecording=function(){"inactive"!==n.state&&(n.config.usingMediaRecorder?(n.state="inactive",n.mediaRecorder.stop()):(n.state="inactive",n.encoderWorker.postMessage(["dump",n.audioCtx.sampleRate]),clearInterval(n.slicing)))},this._onDataAvailable=function(e){if(n.chunks.push(e.data),n.chunkType=e.data.type,"inactive"===n.state){var t=new Blob(n.chunks,{type:n.chunkType}),o=URL.createObjectURL(t),r={ts:(new Date).getTime(),blobUrl:o,mimeType:t.type,size:t.size};n.chunks=[],n.chunkType=null,n.destinationNode&&(n.destinationNode.disconnect(),n.destinationNode=null),n.outputGainNode&&(n.outputGainNode.disconnect(),n.outputGainNode=null),n.analyserNode&&(n.analyserNode.disconnect(),n.analyserNode=null),n.processorNode&&(n.processorNode.disconnect(),n.processorNode=null),n.encoderWorker&&(n.encoderWorker.postMessage(["close"]),n.encoderWorker=null),n.dynamicsCompressorNode&&(n.dynamicsCompressorNode.disconnect(),n.dynamicsCompressorNode=null),n.micGainNode&&(n.micGainNode.disconnect(),n.micGainNode=null),n.inputStreamNode&&(n.inputStreamNode.disconnect(),n.inputStreamNode=null),n.config.stopTracksAndCloseCtxWhenFinished&&(n.micAudioStream.getTracks().forEach(function(e){return e.stop()}),n.micAudioStream=null,n.audioCtx.close(),n.audioCtx=null),n.em.dispatchEvent(new CustomEvent("recording",{detail:{recording:r}}))}},this._onError=function(e){console.log("error",e),n.em.dispatchEvent(new Event("error")),alert("error:"+e)},this.baseUrl=t,window.AudioContext=window.AudioContext||window.webkitAudioContext,this.em=document.createDocumentFragment(),this.state="inactive",this.chunks=[],this.chunkType="",this.encoderMimeType="audio/wav",this.config={broadcastAudioProcessEvents:!1,createAnalyserNode:!1,createDynamicsCompressorNode:!1,forceScriptProcessor:!1,manualEncoderId:"wav",micGain:1,processorBufferSize:2048,stopTracksAndCloseCtxWhenFinished:!0,usingMediaRecorder:"undefined"!==typeof window.MediaRecorder,enableEchoCancellation:!0}}return Object(l.a)(e,[{key:"createWorker",value:function(e){var t=e.toString().replace(/^function\s*\(\)\s*{/,"").replace(/}$/,""),n=new Blob([t]);return new Worker(URL.createObjectURL(n))}}]),e}(),b=n(15),N=n.n(b),C=function(e){function t(){var e,n;Object(u.a)(this,t);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(n=Object(p.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(a)))).state={url:"https://localhost:3000",recordings:[]},n.inputRef=r.a.createRef(),n.startRecording=function(){n.numAudioSamples=0,n.recorderSrvc.startRecording().then(function(){n.setState({isRecording:!0})}).catch(function(e){console.error("Exception while start recording: "+e),alert("Exception while start recording: "+e.message)})},n.stopRecording=function(){n.recorderSrvc.stopRecording(),n.setState({isRecording:!1})},n.onAudioProcess=function(e){n.numAudioSamples++;for(var t=e.detail.inputBuffer,o=e.detail.outputBuffer,r=0;r<o.numberOfChannels;r++)for(var a=t.getChannelData(r),i=o.getChannelData(r),c=0;c<t.length;c++)n.addNoise?i[c]=a[c]+.02*Math.random():i[c]=a[c]},n.onNewRecording=function(e){var t=n.state.recordings,o=e.detail.recording;t.push(o),n.getResponse(o),n.setState({recordings:t})},n.onChangeURL=function(e){var t=n.inputRef.current.value;n.setState({url:t})},n.getResponse=function(){var e=Object(d.a)(s.a.mark(function e(t){var o,r,a,i;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r=new FormData,console.log(t),r.append("data",t.blobUrl),e.next=6,N.a.post(n.state.url,r,{headers:{"Content-Type":"multipart/form-data"}});case 6:a=e.sent,o=a.data,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),o=e.t0.message;case 13:(i=n.state.recordings).find(function(e){return e.blobUrl===t.blobUrl}).responseData=o,n.setState({recordings:i});case 16:case"end":return e.stop()}},e,null,[[0,10]])}));return function(t){return e.apply(this,arguments)}}(),n}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.recorderSrvc=new w("."),this.recorderSrvc.em.addEventListener("recording",function(t){return e.onNewRecording(t)}),this.recorderSrvc.em.addEventListener("onaudioprocess",function(t){e.onAudioProcess(t)}),this.recorderSrvc.config.broadcastAudioProcessEvents=!0}},{key:"render",value:function(){var e=this.state,t=e.recordings,n=e.isRecording,o=e.url,a=n?this.stopRecording:this.startRecording,i=n?"Stop":"Record";return r.a.createElement("div",{className:"App"},r.a.createElement("label",null,"Send to:",r.a.createElement("input",{value:o,ref:this.inputRef,onChange:this.onChangeURL})),r.a.createElement("br",null),r.a.createElement("button",{onClick:a},i),r.a.createElement("div",{className:"recordings"},t.map(function(e){return r.a.createElement("div",{key:e.blobUrl},r.a.createElement("audio",{src:e.blobUrl,controls:!0}),r.a.createElement("p",null,e.responseData||"Retrieving Response..."))})))}}]),t}(r.a.Component),y=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function R(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(C,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/pwa-audio-recorder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/pwa-audio-recorder","/service-worker.js");y?(function(e,t){fetch(e).then(function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):R(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):R(t,e)})}}()}},[[18,1,2]]]);
//# sourceMappingURL=main.49ae20c9.chunk.js.map