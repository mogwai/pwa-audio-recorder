from flask import Flask, Response, request
import os
app = Flask(__name__)


def predict(path):
    """
    FILL ME IN
    """
    return "Not sure :\ "


@app.route('/audio', methods=['POST'])
def receieve_wav():
    blob = request.files['data']
    filename = request.form['fname']
    filename = f"{filename}.{blob.content_type.replace('audio/', '')}"
    path = os.path.join('./', filename)
    blob.save(path)
    resp = Response(predict(path))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
