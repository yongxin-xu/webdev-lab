from email.mime import image
from flask import Response, request
from flask_restful import Resource
from models import Post, db, Following
from views import get_authorized_user_ids

import json

def get_path():
    return request.host_url + 'api/posts/'

class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):  # HTTP GET
        # get posts created by one of these users:
        args = request.args
        # 1. Query the following table
        user_ids = get_authorized_user_ids(self.current_user) 

        try:
            limit = int(args.get('limit') or 20)
        except:
            # could not convert to an integer
            return Response(json.dumps({"message": "The limit parameter is not an integer."}), mimetype="application/json", status=400)

        if limit > 50:
            return Response(json.dumps({"message": "The limit parameter is too big."}), mimetype="application/json", status=400)

        posts = Post.query.filter(Post.user_id.in_(user_ids)).limit(limit).all()
        return Response(json.dumps([post.to_dict() for post in posts]), mimetype="application/json", status=200)

    def post(self): # HTTP POST
        # create a new post based on the data posted in the body 
        body = request.get_json()

        if not body.get('image_url'):
            return Response(json.dumps({"message": "image_url is required."}), mimetype="application/json", status=400)

        new_post = Post(
            image_url=body.get('image_url'),
            user_id=self.current_user.id,
            caption=body.get('caption'),
            alt_text=body.get('alt_text')
        )
        db.session.add(new_post)
        db.session.commit()

        # insert the post content into the database and do validations
        return Response(json.dumps(new_post.to_dict()), mimetype="application/json", status=201)
        
class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
        

    def patch(self, id):
        # update post based on the data posted in the body 
        body = request.get_json()
        print(body)
        
        # 1. retrive the existing post from the database
        post = Post.query.get(id)
        if not post:
            return Response(json.dumps({"message": "id={0} is invalid".format(id)}), mimetype="application/json", status=404)

        if post.user_id != self.current_user.id:
            return Response(json.dumps({"message": "id={0} not authorized".format(id)}), mimetype="application/json", status=404)

        # 2. set the new values (only if requested)
        if body.get('image_url'):
            post.image_url = body.get('image_url')
        if body.get('caption'):
            post.caption = body.get('caption')
        if body.get('alt_text'):
            post.alt_text = body.get('alt_text')

        # 3. commit the updated post back to the database
        db.session.commit()

        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)


    def delete(self, id):
        post = Post.query.get(id)
        if not post:
            return Response(json.dumps({"message": "id={0} is invalid".format(id)}), mimetype="application/json", status=404)

        # the user can only delete his/her own post
        if post.user_id != self.current_user.id:
            return Response(json.dumps({"message": "you should only be able to delete your own post"}), mimetype="application/json", status=404) 

        Post.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(json.dumps({"message": "Post = id={0} was successfully deleted.".format(id)}), mimetype="application/json", status=200)


    def get(self, id):
        user_ids = get_authorized_user_ids(self.current_user) 
        
        # get the post based on the id
        post = Post.query.get(id)
        if not post:
            return Response(json.dumps({"message": "id={0} is invalid".format(id)}), mimetype="application/json", status=404)
        if post.user_id not in user_ids:
            return Response(json.dumps({"message": "id={0} not authorized".format(id)}), mimetype="application/json", status=404)

        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

def initialize_routes(api):
    api.add_resource(
        PostListEndpoint, 
        '/api/posts', '/api/posts/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    api.add_resource(
        PostDetailEndpoint, 
        '/api/posts/<int:id>', '/api/posts/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )