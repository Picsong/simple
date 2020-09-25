import { getUserInfo } from '@/services/user';

export default {
  state: {
    name: '',
    avatar: '',
    role: ''
  },
  reducers: {
    update(prevState, payload) {
      return { ...prevState, ...payload };
    }
  },
  effects: (dispatch) => ({
    async fetchUserInfo() {
      const data = await getUserInfo();
      dispatch.user.update(data);
    }
  })
};
