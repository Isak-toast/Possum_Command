<template>
  <div>
    <h1>Vue 렌더링 로깅 예제</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">증가</button>
    <ChildComponent v-if="showChild" :count="count" />
    <button @click="toggleChild">자식 컴포넌트 토글</button>
    <!-- <VirtualDomExperiment /> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ChildComponent from './components/ChildComponent.vue';
// import VirtualDomExperiment from "./components/VirtualDomExperiment.vue";

export default {
  name: 'App',
  components: { ChildComponent },
  data() {
    return {
      showChild: true
    };
  },
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['increment']),
    toggleChild() {
      this.showChild = !this.showChild;
      console.log(`[App] 자식 컴포넌트 토글: ${this.showChild}`);
    }
  },
  created() {
    console.log(`✅ [App] created - 인스턴스 생성 완료 (mixin 이후 실행)`);
  },
  mounted() {
    console.log(`🎉 [App] mounted - DOM이 렌더링됨 (mixin 이후 실행)`);
  },
  beforeDestroy() {
    console.log(`🔴 [App] beforeDestroy - 컴포넌트 파괴 직전 (mixin 이후 실행)`);
  }
};
</script>
