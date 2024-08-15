import json
import uuid
from datetime import datetime


class Video:
    def __init__(self, id, title, duration, url, owner, source_lan):
        self.id = id
        self.title = title
        self.duration: duration
        self.url: url
        self.owner: owner
        self.source_language: source_lan

class SceneBlock:
    def __init__(self, start_time, end_time, image):
        self.start_time = start_time
        self.end_time = end_time
        self.image = image

class SubtitleBlock:
    def __init__(self, start_time, end_time, text):
        self.start_time = start_time
        self.end_time = end_time
        self.text = text

class Subtitle:
    def __init__(self, language, collection):
        self.language = language
        self.collection = collection

class Project:
    def __init__(self, title, owner_id, video, scenes, subtitles):
        self.id = str(uuid.uuid4())
        self.created_date = datetime.now()
        self.updated_date = datetime.now()
        self.title = title
        self.owner_id = owner_id
        self.video = video
        self.scenes = scenes
        self.subtitles = subtitles


