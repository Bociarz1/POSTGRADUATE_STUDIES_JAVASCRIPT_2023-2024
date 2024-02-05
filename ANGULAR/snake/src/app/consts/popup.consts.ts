import { GameStatusEnum } from '../enums/game-status.enum';
import { IPopupContent } from '../interfaces/popup.interface';

export const popupContent: Record<GameStatusEnum, IPopupContent> = {
  [GameStatusEnum.INIT]: {
    headerText: "Let's start the game",
    descriptionText: 'To start the game \n press Enter or click on the button',
    btnText: 'Start game',
  },
  [GameStatusEnum.PAUSED]: {
    headerText: 'Game Paused',
    descriptionText:
      'To get back into the game \n press Enter or click on the button',
    btnText: 'Continue game',
  },
  [GameStatusEnum.READY]: {
    headerText: 'Game over',
    descriptionText:
      'To restart the game \n press Enter or click on the button',
    btnText: 'Restart game',
  },
  [GameStatusEnum.STARTED]: {
    headerText: '',
    descriptionText: '',
    btnText: '',
  },
  [GameStatusEnum.UNKNOWN]: {
    headerText: '',
    descriptionText: '',
    btnText: '',
  },
};
