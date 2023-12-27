const { TODO_ACTION, toDoListFileName } = require('../consts');
const { readFile } = require('fs').promises;
const { createFileIfDontExist } = require('./validators.module');

const showToDoList = {
  command: TODO_ACTION.SHOW_TODO_LIST,
  describe: "Show 'toDo' list to the user",
  handler: async function () {
    try {
      await createFileIfDontExist();
      const toDoList = await readFile('./' + toDoListFileName, 'utf-8');
      console.log(`[LOG]: 'todo' list has been read correctly`);
      console.log(toDoList);
    } catch (error) {
      console.log('[ERROR LOG]: ' + error);
    }
  },
};

module.exports = {
  showToDoList,
};
