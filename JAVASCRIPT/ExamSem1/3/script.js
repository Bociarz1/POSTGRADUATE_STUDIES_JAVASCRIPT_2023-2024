const { SodokoBoard } = require('./classes/SodokoBoard');
const { DIFFICULTY_LEVEL } = require('./consts/difficulty');

const sodoko = new SodokoBoard(DIFFICULTY_LEVEL[10]);
sodoko.solve();
