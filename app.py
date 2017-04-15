import ptvsd
import falcon
import tasks

# ptvsd.enable_attach("my_secret", address=('localhost', 3000))

APP = application = falcon.API()

TASK_MANAGER = tasks.TaskManager()
TASKS_HANDLER = tasks.CollectionHandler(TASK_MANAGER)
TASK_HANDLER = tasks.ItemHandler(TASK_MANAGER)

APP.add_route('/tasks', TASKS_HANDLER)
APP.add_route('/tasks/{id}', TASK_HANDLER)
