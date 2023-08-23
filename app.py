import asyncio #pip install flask[async]
import json
from flask import Flask, render_template,request
from controllers.file_controller import create_folder,upload_file,save_json_file,save_css
app = Flask(__name__)

@app.route("/", methods=["GET"])
def reflect():
    project_name=request.args.get("project")

    if project_name is None:
        return render_template("index.html",project_json=None)

    with open("static/project/"+project_name+"/json/projectData.json",encoding="utf-8_sig") as f:
        project_json = json.load(f)
    return render_template("index.html",project_json=project_json)

@app.route("/build", methods=["GET"])
def build():
    return render_template("build.html")

@app.route("/save_project", methods=["POST"])
async def save_project():
    project_name = request.form.get("project_name")
    json_data =request.form.get("json_data")
    css_text = request.form.get("css_text")
    print(json_data)
    glb_files = request.files.getlist("glb_files")
    image_files = request.files.getlist("image_files")
    
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, create_folder, project_name)
    await loop.run_in_executor(None, upload_file,project_name+"/glb/",glb_files)
    await loop.run_in_executor(None, upload_file,project_name+"/image/",image_files)
    await loop.run_in_executor(None, save_css,project_name,css_text)
    await loop.run_in_executor(None, save_json_file,project_name,json_data)
    
    return 'Success: Folder created and file saved'

if __name__ == '__main__':
    app.debug = True
    app.run()