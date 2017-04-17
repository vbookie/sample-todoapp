import json
import falcon

from .data import TaskManager
from .utils import SimpleEncoder

class CollectionHandler(object):
    def __init__(self, taskManager: TaskManager):
        self._manager = taskManager

    def on_get(self, req, resp):
        tasks = list(self._manager.get_tasks())
        resp.body = json.dumps(tasks, cls=SimpleEncoder)
        resp.status = falcon.HTTP_OK

    def on_post(self, req, resp):
        data = json.loads(req.stream.read())
        taskid = self._manager.create_task(data["content"])
        task = self._manager.get_task(taskid)
        resp.body = json.dumps(task, cls=SimpleEncoder)
        resp.status = falcon.HTTP_OK

class ItemHandler(object):
    def __init__(self, taskManager: TaskManager):
        self._manager = taskManager

    def on_get(self, req, resp, _id):
        task = self._manager.get_task(_id)
        if task is None:
            resp.status = falcon.HTTP_NOT_FOUND
        else:
            resp.body = json.dumps(task, cls=SimpleEncoder)
            resp.status = falcon.HTTP_OK
        
    def on_put(self, req, resp, _id):
        data = json.loads(req.stream.read())
        self._manager.edit_task(_id, data)
        resp.status = falcon.HTTP_NO_CONTENT

    def on_delete(self, req, resp, _id):
        self._manager.delete_task(_id)
        resp.status = falcon.HTTP_NO_CONTENT
