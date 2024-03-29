module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      return {
        code: 0,
        message: true,
        detail: {
          user_role: 'admin',
          avatar: 'https://www.bupt.site/image/avata.png',
          username: 'root',
          token: '50612e11-2d17-4fbb-ba56-339550de95ec'
        },
        mock: true
      }
    }
  },

  // get user info
  {
    url: '/getCurrentUser',
    type: 'get',
    response: config => {
      return {
        code: 0,
        message: true,
        detail: {
          role: 'admin',
          avatar: 'https://www.bupt.site/image/avata.png',
          username: 'root'
        }
      }
      // return {
      //   code: -4,
      //   message: false,
      //   detail: '身份未验证'
      // }
    }
  },

  // user logout
  {
    url: '/dev-api/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: true,
        detail: 'success'
      }
    }
  }
]
