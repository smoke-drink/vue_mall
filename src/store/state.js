import {
  adminInfoSession,
  currentMenuUrlSession,
  currentMenuOptionsSession,
  controlMapSession
} from '@/storage'

export default {
  // 当前登录用户信息
  adminInfo: adminInfoSession.getJSON(),
  // 当前激活的菜单
  currentMenuUrl: currentMenuUrlSession.get(),
  // 当前激活菜单的配置/参数
  currentMenuOptions: currentMenuOptionsSession.getJSON(),
  // 当前打开的所有 control
  controlMap: controlMapSession.getJSON()
}
