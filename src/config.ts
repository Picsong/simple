export default {
  local: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}/api`
  },
  daily: {
    baseURL: 'https://daily.example.com/api'
  },
  prod: {
    baseURL: 'https://example.com/api'
  }
};
