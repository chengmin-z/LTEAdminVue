module.exports = [
  {
    url: '/getAllUser',
    type: 'post',
    response: config => {
      return {
        code: 0,
        message: true,
        detail: [
          {
            'id': 0,
            'username': 'root',
            'password': '3506402',
            'role': 'admin'
          },
          {
            'id': 0,
            'username': 'test',
            'password': '3556498',
            'role': 'user'
          }
        ]
      }
    }
  }
]
