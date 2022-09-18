import { useEffect, useState } from 'react';

function calcLeftTime(endDateTimeStampMs: number) {
  const leftTimeStamp = endDateTimeStampMs - Date.now();
  if (leftTimeStamp > 0) {
    // 代表时间没到，计算剩余天数、小时、分钟即可,1天86400000毫秒
    const days = Math.floor(leftTimeStamp / 86400000);
    const leftLessOneDayMs = leftTimeStamp - days * 86400000;
    // 1小时3600000毫秒
    const hours = Math.floor(leftLessOneDayMs / 3600000);
    // 1分钟 60000毫秒
    const minutes = Math.floor((leftLessOneDayMs - hours * 3600000) / 60000);
    // 1秒 10000毫秒
    const seconds = Math.floor(((leftLessOneDayMs - hours * 3600000) % 60000) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
      isOutOfDate: false,
    };
  }
  return {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOutOfDate: true,
  };
}

/**
 * 倒计时Hook，判断是否到时间，返回剩余天数、小时、分钟、秒
 * @param endTimeStamp 通过 https://tool.lu/timestamp/ ,将北京时间xxxx-xx-xx xx:xx:xx转换为时间戳，单位为ms，或者使用 new Date().getTime()获取时间戳
 * @param step 倒计时的间隔，默认1000ms
 * @returns
 */
function useTimeCountDown(endDateTimeStampMs: number, step = 1000) {
  const [leftDays, setLeftDays] = useState<number>(0);
  const [leftHours, setLeftHours] = useState<number>(0);
  const [leftMinutes, setLeftMinutes] = useState<number>(0);
  const [leftSeconds, setLeftSeconds] = useState<number>(0);
  const [isOutOfDate, setIsOutOfDate] = useState<boolean>(
    calcLeftTime(endDateTimeStampMs).isOutOfDate,
  );

  // count down
  useEffect(() => {
    const { days, hours, minutes, seconds, isOutOfDate } = calcLeftTime(endDateTimeStampMs);
    setLeftDays(days);
    setLeftHours(hours);
    setLeftMinutes(minutes);
    setLeftSeconds(seconds);
    setIsOutOfDate(isOutOfDate);
    if (isOutOfDate) return;
    const intervalId = setInterval(() => {
      const result = calcLeftTime(endDateTimeStampMs);
      setLeftDays(result.days);
      setLeftHours(result.hours);
      setLeftMinutes(result.minutes);
      setLeftSeconds(result.seconds);
      setIsOutOfDate(result.isOutOfDate);
      if (result.isOutOfDate) clearInterval(intervalId);
    }, step);
    return () => {
      clearInterval(intervalId);
    };
  }, [endDateTimeStampMs, step]);

  return { leftDays, leftHours, leftMinutes, leftSeconds, isOutOfDate };
}

export default useTimeCountDown;
