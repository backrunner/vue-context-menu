<template>
  <div id="app">
    <div class="container" v-context="'contextMenu'">
      <div class="title">
        <span>@pwp-app/vue-context-menu</span>
      </div>
    </div>
    <ContextMenu
      ref="contextMenu"
      @item-clicked="itemClicked"
      >
      <ContextMenuItem name="1">1</ContextMenuItem>
      <ContextMenuItem name="2">2</ContextMenuItem>
      <ContextMenuItem name="3">3</ContextMenuItem>
    </ContextMenu>
  </div>
</template>

<script>
export default {
  methods: {
    itemClicked(name) {
      // eslint-disable-next-line no-console
      console.log('clicked', name);
    },
  },
};
</script>

<style lang="less">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    padding-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
}
.context-menu {
  border: 1px solid #666;
  &__item {
    padding: 8px 12px;
    color: #999;
    cursor: pointer;
  }
  &__item:hover {
    background: #dadada;
  }
}
</style>
