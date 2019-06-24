import API from './config.js'

export default {
  
  // 首页
  categorylist: API.devApi + '/article/categorylist',                   // 所有文章分类
  articlesbycategoryid: API.devApi + '/article/articlesbycategoryid',   // 通过分类ID获取文章列表
  activitytags: API.devApi + '/article/activitytags',                   // 所有标签分类
  articlesbysearch: API.devApi + '/article/articlesbysearch',           // 搜索文章列表
  index: API.devApi + '/page/index',                                    // 首页

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
  promotions: API.devApi + '/goods/promotions',                          // 促销活动
  goodscategory: API.devApi + '/category/goodscategory',                    // 获取所有商品分类
  recommendgoods: API.devApi + '/goods/recommendgoods',                  // 推荐商品列表
  getbrands: API.devApi + '/brands/getbrands',                           // 品牌分类
  getflashsalegoodsbyone: API.devApi + '/flashsale/getflashsalegoodsbyone', // 商城页展示一个限时抢购商品
  getseckillgoodsbyone: API.devApi + '/seckill/getseckillgoodsbyone',       // 商城页展示一个秒杀商品
  goodlists: API.devApi + '/goods/goodlists',                             // 商城搜索
  
  
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

}