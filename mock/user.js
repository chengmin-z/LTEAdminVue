module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username, password } = config.formData()
      if (username === 'root' && password === 'root') {
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
      } else if (username === 'test' && password === 'test') {
        return {
          code: 0,
          message: true,
          detail: {
            user_role: 'editor',
            avatar: 'https://www.bupt.site/image/avata.png',
            username: 'test',
            token: '50612e11-2d17-4fbb-ba56-339550de95ec'
          },
          mock: true
        }
      } else {
        return {
          code: -2,
          message: false,
          detail: '账户或密码错误'
        }
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
    url: 'logout',
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
