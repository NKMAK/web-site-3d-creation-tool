import os
import json

def create_folder(project_name):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    relative_path = "../static/project/"+project_name

    new_folder_path = os.path.join(current_directory, relative_path)

    try:
        os.makedirs(new_folder_path) 
        os.makedirs(new_folder_path+"/glb") 
        os.makedirs(new_folder_path+"/image") 
        os.makedirs(new_folder_path+"/json") 
        os.makedirs(new_folder_path+"/css") 
        return "Success: Folder created"
    except OSError as e:
        return "Error: Failed to create folder"

def upload_file(project_name,files):
    for file in files:
        file.save("static/project/" +project_name+ file.filename)
    return "ファイルが正常にアップロードされました"

def save_json_file(project_name,json_data):
    with open("static/project/" +project_name+"/json/projectData.json", 'w', encoding='UTF-8') as f:
        f.write(json_data)
    return "File saved successfully"

def save_css(project_name,css_text):
    with open("static/project/" +project_name+"/css/project.css", 'w') as f:
        f.write(css_text)
    return "File saved successfully"