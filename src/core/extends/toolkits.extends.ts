import { ToolkitNameEnum, type ToolkitSetting } from '@lotolab/live-common';

export const defaultRightTopTime: ToolkitSetting = {
  name: ToolkitNameEnum.RightTopTime,
  type: 'PTR',
  show: true,
  cssProperties: {
    top: 18,
    right: 24,
    color: '#070227ff'
  },
  children: {}
};
