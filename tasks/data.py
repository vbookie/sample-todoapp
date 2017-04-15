from pymongo import MongoClient
from bson.objectid import ObjectId

class TaskManager(object):
    def __init__(self):
        client = MongoClient()
        self._db = client.todo_tasks_database

    def get_tasks(self):
        return self._db.tasks.find()

    def get_task(self, id):
        if type(id) is str:
            id = ObjectId(id)
        task = self._db.tasks.find_one({"_id": id})
        return task

    def create_task(self, content):
        task = {"content": content, "completed": False}
        return self._db.tasks.insert_one(task).inserted_id

    def edit_task(self, id, task):
        self._db.tasks.update_one({"_id": ObjectId(id)}, {"$set": {"content": task["content"], "completed": task["completed"]}})

    def delete_task(self, id):
        self._db.tasks.delete_one({"_id": ObjectId(id)})
        