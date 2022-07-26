import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'layouts.usermenu.dialog.title': '消息',
  'layouts.usermenu.dialog.content': '确定退出登录吗？',
  'operate.notice.conserve.success':'数据保存成功!',
  'operate.notice.remove':'数据将被删除，删除后不可恢复，请谨慎操作！确认删除吗？',
}

export default {
  ...components,
  ...locale
}
