export const timediffer = (string: string) => {
  const ago_time = new Date(string).getTime();
  const now_time = new Date().getTime();
  const times = Math.round(now_time - ago_time) / 1000 / 60;
  let time_result;

  if (times < 2) {
    time_result = '1분 전';
  } else if (times < 60) {
    time_result = Math.round(times).toString() + '분 전';
  } else if (times < 120) {
    time_result = '1 시간 전';
  } else if (times < 1440) {
    time_result = Math.round(times / 60) + '시간 전';
  } else if (times < 2880) {
    time_result = '1일 전';
  } else if (times < 4340) {
    time_result = '2일 전';
  } else {
    time_result = Math.round(times / 60 / 24) + '일 전';
  }
  return time_result;
};
