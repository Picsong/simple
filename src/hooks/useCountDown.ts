import { useState, useDebugValue, useEffect, useCallback } from 'react';

interface IProps {
  immediate?: boolean;
  second?: number;
  delay?: number;
}
let timer: NodeJS.Timeout | null = null;

const initialValue: IProps = {
  immediate: false,
  second: 60,
  delay: 1000
};

/**
 * 倒计时hook（常用于发送验证码等）
 * @param {boolean} immediate   是否立即触发--默认false
 * @param {number} second   秒数--默认60
 * @param {number} delay    延迟时间--默认1000
 */
export default function useCountDown({ immediate = false, second = 60, delay = 1000 }: IProps = initialValue) {
  const [currentSecond, setCurrentSecond] = useState(second); // 当前倒计时时间
  const [isRunning, setIsRunning] = useState(false); // 定时器是否在运行
  // 定时器启动函数
  const run = useCallback(() => {
    if (timer) return;
    setIsRunning(true);
    timer = setInterval(() => {
      setCurrentSecond((currentSecond) => {
        if (currentSecond === 0) {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
          setIsRunning(false);
          return second; // 恢复为初始值
        }
        return currentSecond - 1;
      });
    }, delay);
  }, []);

  useEffect(() => {
    if (immediate) run();
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);

  useDebugValue('倒计时hook');
  return {
    currentSecond,
    isRunning,
    run
  };
}
