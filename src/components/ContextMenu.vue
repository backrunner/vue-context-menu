<template>
  <ul
    :id="domId"
    class="context-menu"
    >

  </ul>
</template>

<script>
export default {
  data() {
    return {
      domId: `context-menu-${new Date().valueOf()}`,
    };
  },
  methods: {
    show() {
      document.documentElement.addEventListener('click', this.handleClickAway);
    },
    // events
    handleClickAway(el) {
      console.log(el);
    },
  },
}
</script>
