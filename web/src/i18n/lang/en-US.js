import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

const locale = {
  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Do you really log-out.',
  'operate.notice.conserve.success':'Data saved successfully!',
  'operate.notice.remove':'The data will be deleted and cannot be recovered after deletion. Please operate with caution! Are you sure to delete?',
}

export default {
  ...components,
  ...locale
}
