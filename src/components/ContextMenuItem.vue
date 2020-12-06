<template>
  <li
    class="context-menu__item"
    :data-name="name"
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
  },
};
</script>

<style lang="less" scoped>
.context-menu__item {
  list-style: none;
}
</style>
