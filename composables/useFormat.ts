export const useNumFormat = (num: number) => {
  if (num >= 10000) {
    if (num >= 10000000) return (num / 10000000).toFixed(1) + '亿';
    return (num / 10000).toFixed(1) + '万';
  }
  return num + '';
};

export const useTimeFormat = (date: string) => {
  const crtDate = new Date(Date.parse(date));
  const curDate = new Date();
  if (Math.abs(curDate.getFullYear() - crtDate.getFullYear()) > 0) {
    return Math.abs(curDate.getFullYear() - crtDate.getFullYear()) + '年前';
  } else if (Math.abs(curDate.getMonth() - crtDate.getMonth()) > 0) {
    return Math.abs(curDate.getMonth() - crtDate.getMonth()) + '个月前';
  } else if (Math.abs(curDate.getDay() - crtDate.getDay()) > 0) {
    const day = Math.abs(curDate.getDay() - crtDate.getDay());
    if (day < 7) return day + '天前';
    return day / 7 + '周前';
  } else if (Math.abs(curDate.getHours() - crtDate.getHours())) {
    return Math.abs(curDate.getHours() - crtDate.getHours()) + '小时前';
  } else if (Math.abs(curDate.getMinutes() - crtDate.getMinutes()) > 0) {
    return Math.abs(curDate.getMinutes() - crtDate.getMinutes()) + '分钟前';
  } else if (Math.abs(curDate.getSeconds() - crtDate.getSeconds()) >= 0)
    return Math.abs(curDate.getMinutes() - crtDate.getMinutes()) + '秒前';
};
