import vue from 'vue'
import dialogComponent from '../main.vue'

// 创建构造器
const dialogConstructor = vue.extend(dialogComponent)
let seed = 1
function dialogCreator(dialogObject = {}) {
  return new Promise((res, rej) => {

    const dialogDom = new dialogConstructor({
      el: document.createElement('div'),
      data() {
        return {
          overlayVisible: true,
          isComponent: false,
          dialogContent: {
            title: '',
            content: '',
            showCancelButton: true,
            showConfirmButton: true,
            confirmText: '确认',
            cancelShow: '取消',
            ...dialogObject
          }
        }
      },
      methods: {
        confirmClick(...args) {
          console.log('click confirmClick2222')
          res(...args)
          this.closeDialogFunction()
        },
        cancelClick(...args) {
          rej(...args)
          this.closeDialogFunction()
        }
      },
    })
    let dialogDomId = 'coo-dialog__' + seed++
    document.body.appendChild(dialogDom.$el)
    dialogDom.id = dialogDomId
  })
}

function cooDialog() {
  window.$cooDialog = vue.prototype.$cooDialog = dialogCreator
}

export default cooDialog
