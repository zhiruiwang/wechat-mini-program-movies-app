const DB = require('../utils/db')

module.exports = {

  /**
   * 添加影评
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let movieId = +ctx.request.body.movie_id
    let content = ctx.request.body.content || null

    let recordings = ctx.request.body.recordings

    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO moviecomment(user, username, avatar, content, recordings, movie_id) VALUES (?, ?, ?, ?, ?, ?)', [user, username, avatar, content, recordings, movieId])
    }

    ctx.state.data = {}
  },

  /**
   * 获取影评列表
   */
  list: async ctx => {
    let movieId = +ctx.request.query.movie_id

    if (!isNaN(movieId)) {
      ctx.state.data = await DB.query('select * from moviecomment where moviecomment.movie_id = ?', [movieId])
    } else {
      ctx.state.data = []
    }
  },
}