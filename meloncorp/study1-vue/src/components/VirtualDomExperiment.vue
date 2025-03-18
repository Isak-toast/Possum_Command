<template>
  <div>
    <h1 ref="title">Vue Virtual DOM 실험</h1>
    <p>Count: {{ count }}</p>
    <button @click="update">업데이트</button>
  </div>
</template>

<script>
export default {
  name: "VirtualDomExperiment",
  data() {
    return { count: 0 };
  },
  mounted() {
    console.log("[Mounted] Virtual DOM (this._vnode):", this._vnode);
    console.log("[Mounted] 실제 DOM (this.$el):", this.$el);
  },
  methods: {
    update() {
      console.log("[Update] Before: ", this.$refs.title.innerText);

      this.count++; // Virtual DOM 변경

      this.$nextTick(() => {
        console.log("[Update] After: ", this.$refs.title.innerText);
      });
    }
  }
};
</script>
