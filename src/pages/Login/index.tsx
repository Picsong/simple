import React, { useState } from 'react';
import { useRequest, useHistory, store, useAuth } from 'ice';
import { Input, Message, Form, Checkbox, Icon } from '@alifd/next';
import useCountDown from '@/hooks/useCountDown';
import { login } from './services/index';
import styles from './index.module.scss';

const { Item } = Form;

export interface IDataSource {
  loginName: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
}
const DEFAULT_DATA: IDataSource = {
  loginName: '',
  password: '',
  autoLogin: true,
  phone: '',
  code: ''
};
const Login = () => {
  const [postData, setValue] = useState(DEFAULT_DATA);
  const [isPhone, setIsPhone] = useState(false);
  const { currentSecond, isRunning, run } = useCountDown();
  const { loading, request } = useRequest(login);
  const dispatchers = store.useModelDispatchers('user');
  const history = useHistory();
  const [auth, setAuth] = useAuth();
  //表单字段值改变
  const formChange = (values: IDataSource) => {
    setValue(values);
  };
  //发送验证码
  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    run();
  };
  //表单提交
  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }

    request(values)
      .then((res) => {
        console.log(res);
        if (res.code == 666) {
          Message.success('登录成功');
          dispatchers.update({
            name: res.data.name,
            avatar: res.data.avatar,
            role: res.data.role
          });
          setAuth({ ...auth, ...res.data.auth });
          localStorage.setItem('token', res.data.token);
          history.push('/');
        } else {
          Message.error(res.message);
        }
      })
      .catch((e) => {
        Message.error('登录失败');
      });
  };

  const phoneForm = (
    <>
      <Item format="tel" required requiredMessage="必填" asterisk={false}>
        <Input
          name="phone"
          innerBefore={<span className={styles.innerBeforeInput}>+86丨</span>}
          maxLength={20}
          placeholder="手机号"
        />
      </Item>
      <Item format="number" required requiredMessage="必填" asterisk={false} style={{ marginBottom: 0 }}>
        <Input
          name="code"
          innerAfter={
            <span className={styles.innerAfterInput}>
              <span style={{ verticalAlign: 'middle' }}>丨</span>
              <Form.Submit
                text
                type="primary"
                style={{ width: 70 }}
                disabled={isRunning}
                onClick={sendCode}
                validate={['phone']}
                className={styles.sendCode}
              >
                {isRunning ? `${currentSecond}秒后再试` : '获取验证码'}
              </Form.Submit>
            </span>
          }
          maxLength={20}
          placeholder="验证码"
        />
      </Item>
    </>
  );

  const accountForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="loginName" maxLength={20} placeholder="用户名" />
      </Item>
      <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
        <Input.Password name="password" htmlType="password" placeholder="密码" />
      </Item>
    </>
  );
  return (
    <div className={styles.loginWrap}>
      <a href="#">
        <img
          className={styles.logo}
          src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
          alt="logo"
        />
      </a>
      <div className={styles.desc}>
        <span onClick={() => setIsPhone(false)} className={isPhone ? undefined : styles.active}>
          账户密码登录
        </span>
        丨
        <span onClick={() => setIsPhone(true)} className={isPhone ? styles.active : undefined}>
          手机号登录
        </span>
      </div>
      <Form value={postData} onChange={formChange} size="large">
        {isPhone ? phoneForm : accountForm}

        <div className={styles.infoLine}>
          <Item style={{ marginBottom: 0 }}>
            <Checkbox name="autoLogin" className={styles.infoLeft}>
              自动登录
            </Checkbox>
          </Item>
          <div>
            <a href="/" className={styles.link}>
              忘记密码
            </a>
          </div>
        </div>

        <Item style={{ marginBottom: 10 }}>
          <Form.Submit type="primary" loading={loading} onClick={handleSubmit} className={styles.submitBtn} validate>
            登录
          </Form.Submit>
        </Item>

        <div className={styles.infoLine}>
          <div className={styles.infoLeft}>
            其他登录方式 <Icon type="atm" size="small" />
          </div>
          <a href="#/user/register" className={styles.link}>
            注册账号
          </a>
        </div>
      </Form>
    </div>
  );
};

Login.pageConfig = {
  title: '登录-让世界更美好',
  scrollTop: true
};

export default Login;
