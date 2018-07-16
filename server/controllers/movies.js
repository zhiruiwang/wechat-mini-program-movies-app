const DB = require('../utils/db.js')

module.exports = {
  /**
   * 拉取商品列表
   * 
   */

  list: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies;")
  },

  randommovie: async ctx => {
    ctx.state.data = await DB.query("SELECT * FROM movies ORDER BY RAND() LIMIT 1;")
  },

  detail: async ctx => {
    let movieId = + ctx.params.id
    let movies

    if (!isNaN(movieId)) {
      movies = (await DB.query('select * from movies where movies.id = ?', [movieId]))[0]
    } else {
      movies = {}
    }
    ctx.state.data = movies
  }
}