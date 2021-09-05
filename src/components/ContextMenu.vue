<template>
  <div class="contextmenu" v-if="show" :style="styles">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      @click="onClick(item)"
      class="mg-6 context__btn"
    >
      <v-icon>{{ item.icon }}</v-icon>
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      show: false,
      items: [],
      xPos: 0,
      yPos: 0,
    };
  },
  methods: {
    onShow({ items, caller }) {
      this.show = true;
      this.items = items;
      this.setPosition(caller);
    },
    onClose() {
      this.show = false;
      this.items = [];
    },
    setPosition(caller) {
      const computedPosition = caller.getBoundingClientRect();
      this.xPos = computedPosition.left;
      this.yPos = computedPosition.top;
    },
    onClick(item) {
      item.action();
      this.$editor.closeEditor();
    },
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos}px`,
        left: `${this.xPos - 30}px`,
      };
    },
  },
  mounted() {
    this.$editor.EventBus.$on("showEditor", this.onShow);
    this.$editor.EventBus.$on("closeEditor", this.onClose);
  },
  beforeDestroy() {
    this.$editor.EventBus.$off("showEditor", this.onShow);
    this.$editor.EventBus.$off("closeEditor", this.onClose);
  },
};
</script>

<style scoped>
.contextmenu {
  position: absolute;
  background: white;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.39);
  border-radius: 10px;
}
.context__btn {
  cursor: pointer;
}
.context__btn:hover {
  background: wheat;
}
</style>