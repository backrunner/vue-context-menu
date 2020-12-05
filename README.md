# vue-context-menu

A context menu component for Vue users.

## Install

```bash
$ npm install @pwp-app/vue-context-menu
```

## Usage

Import to your project:

```javascript
import VueContextMenu from '@pwp-app/vue-context-menu';
Vue.use(VueContextMenu, {
  useItem: true,  // Also register ContextMenuItem component
  mobileSupport: true,  // Enable mobile gesture support
  touchTimeout: 600,  // optional, default value is 600, decide how long the menu will show after touch
});
```

Also you can set a alias to resolve `@pwp-app/vue-context-menu` to `vue-context-menu`.

Then you can use it like this:

```vue
<template>
    <div
      class="container"
      v-context="'contextMenu'"
      >
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
```

The `v-context` is the directive to set the trigger, it should be a `string` and should be the same as the `ref` you've bound to `ContextMenu`.

`itemClicked` is a function like this:

```javascript
itemClicked(name) {
  console.log('clicked', name);
},
```

The `name` is the name you've already bound to `ContextMenuItem`.

If you wanna bind click event in this way, you should import `ContextMenuItem` as well, and be sure you've already set a name to `ContextMenuItem`.

Also you can bind a function to the `clicked` event of `ContextMenuItem`, the `name` property is not required in this way.

`ContextMenuItem` is a optional component, if you don't like it, you can write your own things and put them under the `ContextMenu`.

## Props

### ContextMenu

As for `ContextMenu`, it has these two props:

#### width

Decide the width of menu.

type: `Number`

default: `120`

#### overflow

If set to false, **the menu will always in the viewport and never overflow to the outside.**

type: `Boolean`

default: `false`

### ContextMenuItem

As for `ContextMenuItem`, it has these two props:

#### name

Be used to judge which item has been clicked.

type: `String`

#### manuallyClose

If you don't want the menu automatically close after you clicked the menu item, you can set this prop to `true`.

type: `Boolean`

default: `false`

## License

MIT
