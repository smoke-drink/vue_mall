import * as types from './types'

export const isEmsRouter = name => {
  return Object.keys(types).some(key => types[key] === name)
}

export default [
  {
    path: 'home',
    name: types.INDEX,
    component: resolve => require(['@/pages/ems/home'], resolve)
  },
  {
    path: 'store_offer',
    name: types.STORE_OFFER,
    component: resolve => require(['@/pages/ems/storeOffer'], resolve)
  },
  {
    path: 'store_order',
    name: types.STORE_ORDER,
    component: resolve => require(['@/pages/ems/storeOrder'], resolve)
  },
  {
    path: 'staff_order',
    name: types.STAFF_ORDER,
    component: resolve => require(['@/pages/ems/staffOrder'], resolve)
  },
  {
    path: 'circle',
    name: types.CIRCLE,
    component: resolve => require(['@/pages/ems/circle'], resolve)
  },
  {
    path: 'store_discount',
    name: types.STORE_DISCOUNT,
    component: resolve => require(['@/pages/ems/storeDiscount'], resolve)
  },
  {
    path: 'weixin_permisson',
    name: types.WEIXIN_PERMISSON,
    component: resolve => require(['@/pages/ems/weixinPermisson'], resolve)
  },
  {
    path: 'handover',
    name: types.HANDOVER,
    component: resolve => require(['@/pages/ems/handover'], resolve)
  },
  {
    path: 'radar',
    name: types.RADAR,
    component: resolve => require(['@/pages/ems/radar'], resolve)
  },
  {
    path: 'org',
    name: types.ORG,
    component: resolve => require(['@/pages/ems/org'], resolve)
  },
  {
    path: 'dept',
    name: types.DEPT,
    component: resolve => require(['@/pages/ems/department'], resolve)
  },
  {
    path: 'commission',
    name: types.COMMISSION,
    component: resolve => require(['@/pages/ems/commission'], resolve)
  },
  {
    path: 'store_category',
    name: types.STORE_CATEGORY,
    component: resolve => require(['@/pages/ems/storeCategory'], resolve)
  },
  {
    path: 'commission_apply_log',
    name: types.COMMISSION_APPLY_LOG,
    component: resolve => require(['@/pages/ems/commissionApplyLog'], resolve)
  },
  {
    path: 'trader_setting',
    name: types.TRADER_SETTING,
    component: resolve => require(['@/pages/ems/traderSetting'], resolve)
  },
  {
    path: 'activity',
    name: types.ACTIVItY,
    component: resolve => require(['@/pages/ems/activity'], resolve)
  },
  {
    path: 'spikeMange',
    name: types.SPIKE_MANAGE,
    component: resolve => require(['@/pages/ems/spikeMange'], resolve)
  },
  {
    path: 'bargainMange',
    name: types.BARGAIN_MANAGE,
    component: resolve => require(['@/pages/ems/bargainMange'], resolve)
  },
  {
    path: 'activityDiscountMange',
    name: types.ACTIVITY_DISCOUNT_MANAGE,
    component: resolve => require(['@/pages/ems/activityDiscountMange'], resolve)
  },
  {
    path: 'warrantySheetMange',
    name: types.WARRANTY_SHEET_MANAGE,
    component: resolve => require(['@/pages/ems/warrantySheetMange'], resolve)
  },
  {
    path: 'couponManage',
    name: types.COUPON_MANAGE,
    component: resolve => require(['@/pages/ems/couponManage'], resolve)
  },
  {
    path: 'extension',
    name: types.EXTENSION,
    component: resolve => require(['@/pages/ems/extension'], resolve)
  },
  {
    path: 'valueAddedMoneyManage',
    name: types.VALUE_ADDED_MONEY_MANAGE,
    component: resolve => require(['@/pages/ems/valueAddedMoneyManage'], resolve)
  },
  {
    path: 'redEnvelopesManage',
    name: types.RED_ENVELOPES_MANAGE,
    component: resolve => require(['@/pages/ems/redEnvelopesManage'], resolve)
  },
  {
    path: 'initgralManage',
    name: types.INTEGRAL_MANAGE,
    component: resolve => require(['@/pages/ems/initgralManage'], resolve)
  },
  {
    path: 'luckDrawManage',
    name: types.LUCK_DRAW_MANAGE,
    component: resolve => require(['@/pages/ems/luckDrawManage'], resolve)
  },
  {
    path: 'winningRecord',
    name: types.WINNING_RECORD,
    component: resolve => require(['@/pages/ems/winningRecord'], resolve)
  },
  {
    path: 'adv',
    name: types.ADV,
    component: resolve => require(['@/pages/ems/adv'], resolve)
  },
  {
    path: 'user_commission_stat',
    name: types.USER_COMMISSION_STAT,
    component: resolve => require(['@/pages/ems/userCommissionStat'], resolve)
  },
  {
    path: 'store_setting',
    name: types.STORE_SETTING,
    component: resolve => require(['@/pages/ems/storeSetting'], resolve)
  },
  {
    path: 'refund',
    name: types.REFUND,
    component: resolve => require(['@/pages/ems/refund'], resolve)
  },
  {
    path: 'trick',
    name: types.TRICK,
    component: resolve => require(['@/pages/ems/trick'], resolve)
  },
  {
    path: 'customer_list',
    name: types.CUSTOMER_LIST,
    component: resolve => require(['@/pages/ems/customerList'], resolve)
  },
  {
    path: 'message_push_manage',
    name: types.MESSAGE_PUSH_MANAGE,
    component: resolve => require(['@/pages/ems/messagePushManage'], resolve)
  },
  // {
  //   path: 'create_message',
  //   name: types.CREATE_MESSAGE,
  //   component: resolve => require(['@/pages/ems/createMessage'], resolve)
  // },
  {
    path: 'business_opportunity_manage',
    name: types.BUSINESS_OPPORTUNITY_MANAGE,
    component: resolve => require(['@/pages/ems/businessOpportunityManage'], resolve)
  },
  {
    path: 'vip_list',
    name: types.VIP_LIST,
    component: resolve => require(['@/pages/ems/vipList'], resolve)
  },
  {
    path: 'vip_level_settings',
    name: types.VIP_LEVEL_SETTINGS,
    component: resolve => require(['@/pages/ems/vipLevelSettings'], resolve)
  },
  {
    path: 'vip_settings',
    name: types.VIP_SETTINGS,
    component: resolve => require(['@/pages/ems/vipSettings'], resolve)
  }

  // , {
  //   path: 'website',
  //   name: types.WEBSTIE,
  //   component: resolve => require(['@/pages/ems/website'], resolve)
  // }, {
  //   path: 'product',
  //   name: types.PRODUCT,
  //   component: resolve => require(['@/pages/ems/product'], resolve)
  // }, {
  //   path: 'circle',
  //   name: types.CIRCLE,
  //   component: resolve => require(['@/pages/ems/circle'], resolve)
  // }, {
  //   path: 'org',
  //   name: types.ORG,
  //   component: resolve => require(['@/pages/ems/org'], resolve)
  // }, {
  //   path: 'radar',
  //   name: types.RADAR,
  //   component: resolve => require(['@/pages/ems/radar'], resolve)
  // }, {
  //   path: 'handover',
  //   name: types.HANDOVER,
  //   component: resolve => require(['@/pages/ems/handover'], resolve)
  // }, {
  //   path: 'order_list',
  //   name: types.ORDER_LIST,
  //   component: resolve => require(['@/pages/ems/orderList'], resolve)
  // }, {
  //   path: 'advert_list',
  //   name: types.ADVERT_LIST,
  //   component: resolve => require(['@/pages/ems/advertList'], resolve)
  // }, {
  //   path: 'advert_edit',
  //   name: types.ADVERT_EDIT,
  //   component: resolve => require(['@/pages/ems/advertEdit'], resolve)
  // }, {
  //   path: 'miniprogram_permisson',
  //   name: types.MINIPROGRAM_PERMISSON,
  //   component: resolve => require(['@/pages/ems/miniprogramPermisson'], resolve)
  // }, {
  //   path: 'weixin_permisson',
  //   name: types.WEIXIN_PERMISSON,
  //   component: resolve => require(['@/pages/ems/weixinPermisson'], resolve)
  // }
]
