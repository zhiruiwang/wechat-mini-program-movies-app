const DB = require('../utils/db')

module.exports = {

  /**
   * 收藏影评
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let id = +ctx.request.body.id

    if (!isNaN(id)) {
      await DB.query('INSERT INTO favorite(id, user) VALUES (?, ?)', [id, user])
    }

    ctx.state.data = {}
  },

  /**
   * 获取收藏列表
   */
  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    if (!(user==null)) {
      ctx.state.data = await DB.query('SELECT moviecomment.id,moviecomment.username,moviecomment.avatar,moviecomment.content,moviecomment.recordings,moviecomment.duration,moviecomment.movie_id, movies.title, movies.image FROM favorite INNER JOIN moviecomment ON moviecomment.id = favorite.id INNER JOIN movies ON movies.id = moviecomment.movie_id WHERE favorite.user = ?', [user])
    } else {
      ctx.state.data = []
    }
  },
}