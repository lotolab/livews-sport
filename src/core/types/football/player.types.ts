export interface PlayerBase {
  playerid?: string;
  name: string;
  no: string;
  age?: number;
  printName?: string; // 球衣名称
  birthday?: string;
  intro: string;
}

export interface FBGamePlayer extends PlayerBase {
  jerseyNumber?: string; // 球员号码
  position?: string; //
  isStarting?: boolean;
  [k: string]: any;
}
