from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Image
import app.s3_helpers as s3


image_routes = Blueprint('images', __name__)

@image_routes.route('', methods=['POST'])
@login_required
def upload_image():

    picture = request.files["image"]

    if not s3.image_file(picture.filename):
        return {"errors": "file type not permitted"}, 400

    picture.filename = s3.get_unique_filename(picture.filename)

    upload_image = s3.upload_image_file_to_s3(picture)

    if "url" not in upload_image:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return {"errors": upload_image }, 400

    url_image = upload_image["url"]


    form_data = request.form.to_dict()

    new_image = Image(
            task_id = form_data["task_id"] if form_data.get("task_id") else None,
            goal_id = form_data["goal_id"] if form_data.get("goal_id") else None,
            image_url = url_image,
        )

    db.session.add(new_image)
    db.session.commit()

    return new_image.to_dict()


@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Image.query.get(id)

    if not image:
        return {"errors": "Song not found"}

    imageKey = image.image_url.rsplit('/')[-1]

    s3.remove_image_file_from_s3(imageKey)

    db.session.delete(image)
    db.session.commit()
    return {"message": "Delete successful"}
