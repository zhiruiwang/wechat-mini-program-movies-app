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

    let recordings = ctx.request.body.recordings || null
    let duration = ctx.request.body.duration || null

    if (!isNaN(movieId)) {
      await DB.query('INSERT INTO moviecomment(user, username, avatar, content, recordings, duration, movie_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [user, username, avatar, content, recordings, duration, movieId])
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

/**
 * 获取自己的影评列表
 */
  userlist: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    
    if (!(user == null)) {
      ctx.state.data = await DB.query('SELECT moviecomment.id,moviecomment.username,moviecomment.avatar,moviecomment.content,moviecomment.recordings,moviecomment.duration,moviecomment.movie_id, movies.title, movies.image FROM moviecomment INNER JOIN movies ON moviecomment.movie_id = movies.id WHERE moviecomment.user = ?', [user])
    } else {
      ctx.state.data = []
    }
  },
}