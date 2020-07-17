import os
import hashlib
from flask import Flask, Response, request
import torchaudio

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receieve_wav():
    blob = request.files['data']
    filename = request.form['fname'] or 'recording'
    s = filename
    filename = s+"."+blob.content_type.replace("audio/", "")
    path = os.path.join('./', filename)

    blob.save(path)
    sig, sr = torchaudio.load(path)
    print(sig.shape, sr)
    return str(sig.shape)

@app.after_request
def apply_caching(resp):
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
