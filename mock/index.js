module.exports = {
  'GET /api/user/auth': (req, res) => {
    res.send({
      role: 'admin',
      auth: {
        var: true,
        let: true,
        const: true
      }
    });
  },
  'GET /api/user/info': (req, res) => {
    res.send({
      name: 'picsong',
      avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
      role: 'admin'
    });
  },

  'POST /api/user/login': (req, res) => {
    const { loginName, password } = req.body;
    console.log(loginName, password);
    if (loginName == 'picsong' && password == '123456') {
      res.send({
        code: 666,
        message: '登录成功',
        data: {
          name: 'picsong',
          avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
          token: 'picsong.top',
          role: 'admin',
          auth: {
            var: true,
            let: true,
            const: true
          }
        }
      });
    } else {
      res.send({
        code: 333,
        message: '账号密码错误',
        data: null
      });
    }
  }
};
