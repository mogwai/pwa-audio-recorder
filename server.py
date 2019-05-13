import os
import hashlib
from flask import Flask, Response, request
from fastai.basic_train import load_learner

LEARN_PATH = './'
LEARN_NAME = 'export.pkl'

app = Flask(__name__)
learn = None

def predict(path):
    if learn is None:
        learn = load_learner(LEARN_PATH, LEARN_NAME)
    learn.predict()
    """
    FILL ME IN
    """
    return "Not sure :\ "
        

@app.route('/audio', methods=['POST'])
def receieve_wav():
    blob = request.files['data']
    filename = request.form['fname'] or 'recording'
    buf = blob.read()
    hasher = hashlib.md5()
    hasher.update(buf)
    md5 = hasher.hexdigest()
    s = filename + "_" + md5
    filename = s+blob.content_type.replace("audio/", "")
    path = os.path.join('./', filename)

    blob.save(path)
    resp = Response(predict(path))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == "__main__":
    
    app.run(host='0.0.0.0', port=8080)
