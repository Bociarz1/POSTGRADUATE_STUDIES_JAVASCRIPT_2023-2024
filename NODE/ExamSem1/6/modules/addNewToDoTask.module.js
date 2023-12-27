const { TODO_ACTION, toDoListFileName } = require('../consts');
const { appendFile } = require('fs').promises;
const { createFileIfDontExist, isTaskValid } = require('./validators.module');

const addNewToDoTask = {
  command: `${TODO_ACTION.ADD_NEW_TODO_TASK} [newToDoTask]`,
  describe: "Add new item to 'toDo' list",
  handler: async function (argv) {
    try {
      const { newToDoTask } = argv;
      if (!isTaskValid(newToDoTask)) return;
      await createFileIfDontExist();
      await appendFile('./' + toDoListFileName, newToDoTask + '\n');
      console.log(`[LOG]: task: '${newToDoTask}' has been added to 'todo' list`);
    } catch (error) {
      console.log('[ERROR LOG]: ' + error);
    }
  },
};

module.exports = {
  addNewToDoTask,
};
