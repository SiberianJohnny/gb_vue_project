export default {
  install(Vue) {

    if (this.installed) {
      return
    }

    this.installed = true;
    this.caller = null;

    Vue.prototype.$editor = {
      EventBus: new Vue(),

      showEditor({ event, items }) {
        const caller = event.target
        if (this.caller !== caller) {
          this.caller = caller
          this.EventBus.$emit('showEditor', { caller, items })
        } else {
          this.closeEditor()
        }
      },
      closeEditor() {
        this.EventBus.$emit('closeEditor')
        this.caller = null
      },
      deleteRow(rowID) {
        this.EventBus.$emit('deleteRow', rowID)
        console.log('delete row', rowID)
      }
    }
  }

}