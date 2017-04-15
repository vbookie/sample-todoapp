import falcon
from bson.json_util import dumps, loads

from .data import TaskManager

class CollectionHandler(object):
    def __init__(self, taskManager: TaskManager):
        self._manager = taskManager

    def on_get(self, req, resp):
        tasks = self._manager.get_tasks()
        resp.body = dumps(tasks)
        resp.status = falcon.HTTP_OK

    def on_post(self, req, resp):
        data = loads(req.stream.read())
        taskid = self._manager.create_task(data["content"])
        task = self._manager.get_task(taskid)
        resp.body = dumps(task)
        resp.status = falcon.HTTP_OK

class ItemHandler(object):
    def __init__(self, taskManager: TaskManager):
        self._manager = taskManager

    def on_get(self, req, resp, id):
        task = self._manager.get_task(id)
        if task is None:
            resp.status = falcon.HTTP_NOT_FOUND
        else:
            resp.body = dumps(task)
            resp.status = falcon.HTTP_OK
        
    def on_put(self, req, resp, id):
        data = loads(req.stream.read())
        self._manager.edit_task(id, data)
        resp.status = falcon.HTTP_NO_CONTENT

    def on_delete(self, req, resp, id):
        self._manager.delete_task(id)
        resp.status = falcon.HTTP_NO_CONTENT
