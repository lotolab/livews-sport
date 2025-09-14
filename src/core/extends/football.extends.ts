import { gameFBProcessEnum } from '@/core/types';

export const gameFBProcessOptions: SelectionItem[] = [
  {
    id: 0,
    label: '未开始',
    value: gameFBProcessEnum.unstart
  },
  {
    id: 1,
    label: '上半场',
    value: gameFBProcessEnum.firstHalf
  },
  {
    id: 2,
    label: '中场休息',
    value: gameFBProcessEnum.internal
  },
  {
    id: 3,
    label: '下半场',
    value: gameFBProcessEnum.secondHalf
  },
  {
    id: 4,
    label: '加时赛',
    value: gameFBProcessEnum.extraTime
  },
  {
    id: 8,
    label: '补时',
    value: gameFBProcessEnum.allowance
  },
  {
    id: 9,
    label: '完赛',
    value: gameFBProcessEnum.gameover
  }
];

export function translateGameFBProcessName(v: number): string {
  const find = gameFBProcessOptions.find((it) => it.value === v);

  return find?.label ?? '';
}
