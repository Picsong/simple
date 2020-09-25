import React, { useState } from 'react';
import { Input, Message, Form, Checkbox, Icon } from '@alifd/next';
import useCountDown from '@/hooks/useCountDown';
import styles from './index.module.scss';

const { Item } = Form;

export interface IDataSource {
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  code: string;
}
const DEFAULT_DATA: IDataSource = {
  email: '',
  password: '',
  rePassword: '',
  phone: '',
  code: ''
};

Register.pageConfig = {
  title: '注册-让世界更美好',
  scrollTop: true
};
export default function Register() {
  const [postData, setValue] = useState(DEFAULT_DATA);
  const [isPhone, setIsPhone] = useState(false);
  const { currentSecond, isRunning, run } = useCountDown();
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
  //检查两次密码一致
  const checkPass = (rule: {}, values: string, callback: (errors?: string) => void) => {
    if (values && values !== postData.password) {
      return callback('密码不一致');
    } else {
      return callback();
    }
  };
  //表单提交
  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    Message.success('注册成功');
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
      <Item format="number" required requiredMessage="必填" asterisk={false}>
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
  return (
    <div className={styles.loginWrap}>
      <a href="#">
        <img
          className={styles.logo}
          src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
          alt="logo"
        />
      </a>
      <div style={{ fontSize: 24, marginTop: 24 }}>注册账号</div>
      <Form value={postData} onChange={formChange} size="large">
        <Item format="email" required requiredMessage="必填">
          <Input name="email" size="large" maxLength={20} placeholder="邮箱" />
        </Item>
        <Item required requiredMessage="必填">
          <Input.Password name="password" size="large" htmlType="password" placeholder="至少六位密码，区分大小写" />
        </Item>
        <Item required requiredTrigger="onFocus" requiredMessage="必填" validator={checkPass}>
          <Input.Password name="rePassword" size="large" htmlType="password" placeholder="确认密码" />
        </Item>
        {phoneForm}
        <Item>
          <Form.Submit type="primary" onClick={handleSubmit} className={styles.submitBtn} validate>
            注册账号
          </Form.Submit>
        </Item>
        <Item style={{ textAlign: 'center' }}>
          <a href="#/user/login" className={styles.link}>
            使用已有账号登录
          </a>
        </Item>
      </Form>
    </div>
  );
}
