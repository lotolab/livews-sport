export const useSocket = () => {
  const wsConfig = window.wsConfig;

  return {
    wsurl: wsConfig.wsURL,
    gameid: wsConfig.gameid
  };
};
