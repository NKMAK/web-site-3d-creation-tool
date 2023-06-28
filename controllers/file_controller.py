import os

def create_folder(project_name):
    current_directory = os.path.dirname(os.path.abspath(__file__))
    relative_path = "../project/"+project_name

    new_folder_path = os.path.join(current_directory, relative_path)

    try:
        os.makedirs(new_folder_path) 
        return 'Success: Folder created'
    except OSError as e:
        return 'Error: Failed to create folder'
    
def upload_file(project_name,glb_files):
    for file in glb_files:
        file.save("project/" +project_name+"/"+ file.filename)
    return 'ファイルが正常にアップロードされました'