from flask import Flask, render_template,request,jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def reflect():
    return render_template("index.html")

@app.route("/build", methods=["GET"])
def build():
    return render_template("build.html")

@app.route("/uploadtest", methods=["GET"])
def upload():
    return render_template("uploadtest.html")

@app.route("/glb_upload", methods=["POST"])
def upload_file():
    
    files = request.files.getlist("glb_files")
    for file in files:
        # ファイルの処理を行う
        print(file)
        file.save("uploads/" + file.filename)
    return 'ファイルが正常にアップロードされました'

if __name__ == '__main__':
    app.debug = True
    app.run()