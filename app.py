import asyncio #pip install flask[async]
from flask import Flask, render_template,request
from controllers.file_controller import create_folder,upload_file

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

@app.route("/save_project", methods=["POST"])
async def save_project():
    project_name = request.form.get("project_name")
    glb_files = request.files.getlist("glb_files")
    
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, create_folder, project_name)
    await loop.run_in_executor(None, upload_file,project_name,glb_files)
    
    return 'Success: Folder created and file saved'

if __name__ == '__main__':
    app.debug = True
    app.run()