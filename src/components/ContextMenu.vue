<template>
  <ul
    :id="domId"
    ref="menu"
    class="context-menu"
    v-if="show"
    @click.stop="handleItemClick"
    @contextmenu.prevent.stop
    :style="style"
    >
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 120,
    },
    overflow: {
      type: Boolean,
      default: false,
    },
    manuallyClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      domId: `context-menu-${new Date().valueOf()}`,
      show: false,
      style: null,
    };
  },
  mounted() {
    if (!this.$parent.$refs.contextMenu) {
      this.$parent.$refs.contextMenu = this;
    }
  },
  computed: {
    baseStyles() {
      let width;
      if (typeof this.width === 'number') {
        width = `${this.width}px`;
      } else if (typeof this.width === 'string') {
        if (/^\d+$/.test(this.width)) {
          width = `${this.width}px`;
        } else {
          width = this.width;
        }
      }
      return {
        position: 'fixed',
        width,
      };
    },
  },
  methods: {
    open(e) {
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;

      this.show = true;
      document.addEventListener('click', this.close);
      document.addEventListener('contextmenu', this.close, true);
      document.addEventListener('mousewheel', this.close);

      if (this.overflow) {
        this.style = {
          ...this.baseStyles,
          left: `${clientX}px`,
          top: `${clientY}px`,
        };
      } else {
        this.style = {
          ...this.baseStyles,
          left: '-99999px',
          top: '-99999px',
        };
      }
      if (this.overflow) {
        return;
      }
      this.$nextTick(() => {
        const vpWidth = document.documentElement.clientWidth;
        const vpHeight = document.documentElement.clientHeight;
        const menuWidth = this.$refs.menu.clientWidth;
        const menuHeight = this.$refs.menu.clientHeight;
        const limitWidth = vpWidth - menuWidth;
        const limitHeight = vpHeight - menuHeight;
        let left = -99999;
        let top = -99999;
        if (clientX < 0) {
          left = 0;
        } else if (clientX > limitWidth) {
          left = limitWidth;
        } else {
          left = clientX;
        }
        if (clientY < 0) {
          top = 0;
        } else if (clientY > limitHeight) {
          top = limitHeight;
        } else {
          top = clientY;
        }
        this.style = {
          ...this.baseStyles,
          left: `${left}px`,
          top: `${top}px`,
        };
        this.$forceUpdate();
      });
    },
    close() {
      this.style = {
        ...this.baseStyles,
        left: '-99999px',
        top: '-99999px',
      };
      document.removeEventListener('click', this.close);
      document.removeEventListener('contextmenu', this.close, true);
      document.removeEventListener('mousewheel', this.close);
      this.show = false;
    },
    handleItemClick(e) {
      this.$emit('item-clicked', e.target.dataset.name);
      if (!this.manuallyClose) {
        this.close();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.context-menu {
  list-style: none;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  z-index: 2333;
}
</style>
