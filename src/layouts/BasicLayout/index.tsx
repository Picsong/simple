import React, { FC, useState, useEffect } from 'react';
import { useRequest } from 'ice';
import { Shell, ConfigProvider } from '@alifd/next';
import { getUserInfo } from '@/services/user';
import HeadNav from './components/HeadNav';
import PageNav from './components/PageNav';
import styles from './index.module.scss';

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}

const BasicLayout: FC = ({ children }) => {
  const { data, request } = useRequest(getUserInfo);
  const getDevice: IGetDevice = (width) => {
    const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      request();
    }
  }, [request]);
  return (
    <ConfigProvider device={device}>
      <Shell type="brand" fixedHeader style={{ minHeight: '100vh' }}>
        <Shell.Branding>
          <img className={styles.rectangular} src="/public/favicon.png" alt="logo" />
          <span style={{ marginLeft: 10 }}>App Name</span>
        </Shell.Branding>
        <Shell.Navigation direction="hoz" align="left">
          <HeadNav />
        </Shell.Navigation>
        <Shell.Action>
          <img src={data?.avatar} className={styles.avatar} alt={data?.role} />
          <span style={{ marginLeft: 10 }}>{data?.name}</span>
        </Shell.Action>

        <Shell.Navigation fixed>
          <PageNav />
        </Shell.Navigation>

        <Shell.Content>{children}</Shell.Content>

        {/* <Shell.Footer>
          <span>Alibaba Fusion</span>
          <span>@ 2019 Alibaba Piecework 版权所有</span>
        </Shell.Footer> */}
      </Shell>
    </ConfigProvider>
  );
};

export default BasicLayout;
