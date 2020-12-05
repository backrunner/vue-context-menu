<template>
  <li
    class="context-menu__item"
    @click.stop="handleClick"
    @contextmenu.prevent.stop
    >
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    manuallyClose: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('clicked');
      this.$parent.itemClicked(this.name);
      if (!this.manuallyClose) {
        this.$parent.close();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.context-menu__item {
  list-style: none;
}
</style>
