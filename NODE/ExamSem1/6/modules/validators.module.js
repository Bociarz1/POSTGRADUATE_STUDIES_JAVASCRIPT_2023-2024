const { toDoListFileName } = require('../consts');
const { writeFile, stat } = require('fs').promises;

const showValidLaunch = `You can:
1) SHOW 'todo' LIST by write: 
    node app.js lista
2) ADD TO 'todo' LIST NEW TASK by write:
    node app.js dodaj "something to do"`;

async function isFileExist() {
  return !!(await stat('./' + toDoListFileName).catch((e) => false));
}
function createNewtoDoListFile() {
  writeFile('./' + toDoListFileName, '[TO DO LIST]: \n');
}
async function createFileIfDontExist() {
  try {
    const isExist = await isFileExist('./' + toDoListFileName);
    if (!isExist) {
      await createNewtoDoListFile('./' + toDoListFileName);
      console.log(`[LOG]: 'todo' list has been created`);
    }
  } catch (error) {
    console.log('[ERROR LOG]: ' + error);
  }
}

const invalidCommand = {
  command: '*',
  describe: 'Invalid command',
  handler: function () {
    console.log(`[ERROR LOG]: Invalid command! ${showValidLaunch}`);
  },
};

function isTaskValid(task) {
  if (typeof task !== 'string') {
    console.log('[ERROR LOG]: New added task can not be empty!');
    return false;
  }
  return true;
}

module.exports = { createFileIfDontExist, invalidCommand, isTaskValid };
