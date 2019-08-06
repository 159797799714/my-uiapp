import API from './config.js'

export default {
  // 登录注册
  login: API.devApi + '/app.user/login',                                // 登录
  register: API.devApi + '/app.user/register',                          // 注册
  sendcode: API.devApi + '/app.user/sendcode',                          // 发送验证码
  resetpassword: API.devApi + '/app.user/resetpassword',                // 重置密码
  otherlogin: API.devApi + '/app.user/otherlogin',                      // 第三方登录
  otherregister: API.devApi + '/app.user/otherregister',                // 第三方登录完善信息
  smscodeyz: API.devApi + '/app.user/smscodeyz',                        // 验证码校验
  
  // 首页
  categorylist: API.devApi + '/article/categorylist',                   // 所有文章分类
  articlesbycategoryid: API.devApi + '/article/articlesbycategoryid',   // 通过分类ID获取文章列表
  activitytags: API.devApi + '/article/activitytags',                   // 所有标签分类
  articlesbysearch: API.devApi + '/article/articlesbysearch',           // 搜索文章列表
  index: API.devApi + '/page/index',                                    // 首页
  index_gethomebanners: API.devApi + '/article/gethomebanners',         // 首页轮播图

  // 详情页
  commentlike: API.devApi + '/article/commentlike',                      // 评论点赞
  commentunlike: API.devApi + '/article/commentunlike',                  // 评论取消点赞
  commentreplylike: API.devApi + '/article/commentreplylike',            // 评论回复点赞
  commentreplyunlike: API.devApi + '/article/commentreplyunlike',        // 评论回复取消点赞
  addcomments: API.devApi + '/article/addcomments',                      // 发表评论
  unLike: API.devApi + '/article/unLike',                                // 文章取消点赞
  detailing: API.devApi + '/article/detailing',                          // 文章详情接口
  like: API.devApi + '/article/like',                                    // 文章点赞
  
  // 商城
  promotions: API.devApi + '/goods/promotions',                                 // 促销活动
  goodscategory: API.devApi + '/category/goodscategory',                        // 获取所有商品分类
  recommendgoods: API.devApi + '/goods/recommendgoods',                         // 推荐商品列表
  getbrands: API.devApi + '/brands/getbrands',                                  // 品牌分类
  getflashsalegoodsbyone: API.devApi + '/flashsale/getflashsalegoodsbyone',     // 商城页展示一个限时抢购商品
  getseckillgoodsbyone: API.devApi + '/seckill/getseckillgoodsbyone',           // 商城页展示一个秒杀商品
  goodlists: API.devApi + '/goods/goodlists',                                   // 商城搜索
  goods_gethomebanners: API.devApi + '/goods/gethomebanners',                   // 商城首页轮播图
  goodscollection: API.devApi + '/goods/goodscollection',                       // 商品收藏与取消收藏
  goods_detail: API.devApi + '/goods/detail',                                   // 普通商品详情

  
  // 秒杀
  seckill_goodsbycategoryid: API.devApi + '/seckill/goodsbycategoryid',           // 通过秒杀活动ID获取秒杀商品列表
  seckill_categorys: API.devApi + '/seckill/categorys',                           // 秒杀活动分类
  seckill_detail: API.devApi + '/seckill/detail',                                 // 秒杀商品详情
  seckill_remind: API.devApi + '/seckill/remind',                                 // 秒杀商品提醒
  seckill_cancelremind: API.devApi + '/seckill/cancelremind',                     // 秒杀商品取消提醒
  
  // 限时抢购
  flashsale_categorys: API.devApi + '/flashsale/categorys',                         // 限时抢购活动分类
  flashsale_goodsbycategoryid: API.devApi + '/flashsale/goodsbycategoryid',         // 限时抢购活动分类ID获取商品列表
  flashsale_detail: API.devApi + '/flashsale/detail',                               // 限时抢购商品详情
  flashsale_remind: API.devApi + '/flashsale/remind',                               // 限时抢购商品加入提醒
  flashsale_cancelremind: API.devApi + '/flashsale/cancelremind',                   // 限时抢购商品取消提醒

  // 我的
  mylikearticles: API.devApi + '/app.center/mylikearticles',                        // 个人中心点赞文章列表
  mycollection: API.devApi + '/app.center/mycollection',                            // 个人中心收藏商品列表
  changepwd: API.devApi + '/app.center/changepwd',                                  // 更改密码
  modifypersonalinfo: API.devApi + '/app.center/modifypersonalinfo',                // 修改个人用户信息
  getuserinfo: API.devApi + '/app.center/getuserinfo',                              // 获取用户个人信息
  
  // 订单
  orderList: API.devApi + '/user.order/lists',                                      // 订单
  
  
  // 购物车 
  shopcarList: API.devApi + '/cart/lists',                                          // 购物车列表
  addcar: API.devApi + '/cart/add',                                                 // 添加购物车/ 增加购物车商品数量
  subcar: API.devApi + '/cart/sub',                                                 // 减少购物车商品数量
  delcar: API.devApi + '/cart/delete',                                              // 移出购物车 / 传多个goods_sku_id即可一次性删除多个商品
  buyNowinventory: API.devApi + '/order/buyNowinventory',                           // 下订单前检查库存是否充足
  
  
  
  
  // 下订单前检查库存 /order/buyNowinventory&goods_id=10234&goods_num=1&goods_sku_id=10028_10255_10258&wxapp_id=10001&token=4de6cf677435f27793fcd69731a43540
  
  
}