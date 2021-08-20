export default {
  install(Vue) {

    if (this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$editor = {
      EventBus: new Vue(),
      showEditor(id) {
        this.EventBus.$emit('showEditor', id)
      },
      deleteRow(rowID) {
        this.EventBus.$emit('deleteRow', rowID)
        console.log('delete row', rowID)
      }
    }
  }

}