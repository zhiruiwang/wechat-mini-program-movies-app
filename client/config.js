/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://ogdmtqfn.qcloud.la/';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传录音接口
        uploadUrl: `${host}/weapp/upload/Web/UpVoice`,

        // 获取电影列表
        movieList: `${host}/weapp/movies`,

        // 获取电影详情
        movieDetail: `${host}/weapp/movies/`,

        // 拉取用户信息
        user: `${host}/weapp/user`,

        // 添加影评
        addComment: `${host}/weapp/moviecomment`,

        // 获取影评列表
        commentList: `${host}/weapp/moviecomment`,

        // 添加收藏
        addfavorite: `${host}/weapp/favorite`,

        // 获取收藏列表
        favoriteList: `${host}/weapp/favorite`,
    }
};

module.exports = config;
