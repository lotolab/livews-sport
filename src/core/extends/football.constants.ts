import type {
  FBGameLiveBase,
  FBGameLiveStatistics,
  ScreenSize
} from '../types';

export const defaultScreenSize: ScreenSize = {
  width: 1920,
  height: 1080
};

/**
 *
 */
export const initBase: FBGameLiveBase = {
  gameid: '',
  liveid: '',
  title: '',
  subtitle: '',
  firstHalfMin: 45,
  secondHalfMin: 45,
  extraTimeMin: 30,
  gameDate: '',
  gameStartTime: '',
  city: '',
  soccerField: '',
  homeTeam: '主隊',
  homeTeamShort: '',
  awayTeam: '客隊',
  awayTeamShort: '',
  kickOffTime: ''
};

export const initStat: FBGameLiveStatistics = {
  gameid: '',
  liveid: '',
  gameProgress: 0,
  timingSumed: false,
  timingStartTime: '',
  homeTeamid: '',
  homeIcon: '',
  homeTeamGoals: 0,
  homeRedCards: 0,
  homeYellowCards: 0,
  awayTeamid: '',
  awayIcon: '',
  awayTeamGoals: 0,
  awayRedCards: 0,
  awayYellowCards: 0,
  injuryTime: '',
  firstHalfMin: 45,
  secondHalfMin: 45,
  extraTimeMin: 30
};
