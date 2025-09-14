export interface TeamBase {
  teamid: string;
  teamName: string;
  shortname?: string;
  city?: string;
  logo?: string;
}

export interface FBTeamStatics extends TeamBase {
  type: 'football';
  homeField?: string; // 主场 场地名称
  [k: string]: any;
}
