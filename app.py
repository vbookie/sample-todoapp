import ptvsd
import falcon
import tasks
from falcon_cors import CORS

# ptvsd.enable_attach("my_secret", address=('localhost', 4000))

cors = CORS(allow_origins_list=["http://localhost:3000"])
APP = application = falcon.API(middleware=[cors.middleware])

TASK_MANAGER = tasks.TaskManager()
TASKS_HANDLER = tasks.CollectionHandler(TASK_MANAGER)
TASK_HANDLER = tasks.ItemHandler(TASK_MANAGER)

APP.add_route('/api/tasks', TASKS_HANDLER)
APP.add_route('/api/tasks/{_id}', TASK_HANDLER)
