import { MenuButtonActionEnum } from '../enums/menu-buttons.enum.ts';
import { IMenuButton } from '../interfaces/menu-buttons.interface.ts.js';

export const menuButtons: IMenuButton[] = [
  {
    title: 'start game',
    action: MenuButtonActionEnum.START_GAME,
  },
  {
    title: 'top players',
    action: MenuButtonActionEnum.SHOW_STATS,
  },
];
