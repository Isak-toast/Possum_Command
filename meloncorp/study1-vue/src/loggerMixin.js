export default {
  beforeCreate() {
    console.log(`Mixin 🔍 [${this.$options.name || 'Anonymous'}] beforeCreate 단계`);

    try {
      console.log(`Mixin [${this.$options.name || 'Anonymous'}] this 확인:`, this);
      console.log(`Mixin [${this.$options.name || 'Anonymous'}] count 값:`, this.count);

      if (this.count !== undefined) {
        throw new Error(`Mixin [${this.$options.name || 'Anonymous'}] ❌ beforeCreate에서 데이터 접근 금지!`);
      }
    } catch (error) {
      console.error(`Mixin [${this.$options.name || 'Anonymous'}] 데이터 접근 불가:`, error);
    }
  },

  created() {
    console.log(`Mixin ✅ [${this.$options.name || 'Anonymous'}] created 단계 - 인스턴스 생성 완료`);

    // this 확인
    console.log(`Mixin [${this.$options.name || 'Anonymous'}] this 확인:`, this);

    // 데이터 초기화 확인
    console.log(`Mixin [${this.$options.name || 'Anonymous'}] count 값:`, this.count);

    // DOM 확인 ($el이 없음)
    if (!this.$el) {
      console.warn(`Mixin [${this.$options.name || 'Anonymous'}] ⚠ created 단계에서는 this.$el이 아직 없음!`);
    }
  },

  beforeMount() {
    console.log(`Mixin 🛠 [${this.$options.name || 'Anonymous'}] beforeMount 단계 - DOM이 생성되기 직전`);

    if (this.$el) {
      console.log(`Mixin [${this.$options.name || 'Anonymous'}] ⚠ beforeMount에서 this.$el 존재함:`, this.$el);
    } else {
      console.warn(`Mixin [${this.$options.name || 'Anonymous'}] ⚠ beforeMount에서 this.$el이 아직 없음`);
    }
  },

  mounted() {
    console.log(`Mixin 🎉 [${this.$options.name || 'Anonymous'}] mounted 단계 - DOM이 렌더링됨`);

    if (this.$el) {
      console.log(`Mixin [${this.$options.name || 'Anonymous'}] ✅ mounted에서 this.$el이 정상적으로 바인딩됨:`, this.$el);

      try {
        // `this.$el`을 직접 조작하여 오류 발생 여부 확인
        // this.$el.innerHTML = '<h2 style="color: red;">DOM이 조작되었습니다!</h2>';
        console.log(`Mixin [${this.$options.name || 'Anonymous'}] 🔧 this.$el.innerHTML 변경 성공!`);
      } catch (error) {
        console.error(`Mixin [${this.$options.name || 'Anonymous'}] ❌ this.$el.innerHTML 변경 실패:`, error);
      }
    } else {
      console.error(`Mixin [${this.$options.name || 'Anonymous'}] ❌ mounted에서 this.$el이 없음 - 예상치 못한 동작!`);
    }

    // **SSR(Server-Side Rendering)에서는 mounted가 호출되지 않음**
    if (this.$isServer) {
      console.warn(`Mixin [${this.$options.name || 'Anonymous'}] ⚠ SSR 환경에서는 mounted가 실행되지 않음!`);
    }
  },
  beforeUpdate() {
    console.log(`Mixin 🔄 [${this.$options.name}] beforeUpdate - DOM이 업데이트되기 직전`);

    // ❌ Vue 상태 직접 변경 금지 (무한 루프 발생 가능)
    // this.count++;

    // ❌ Vuex 상태 직접 변경도 금지
    // this.$store.commit('increment');

    console.warn(`Mixin ⚠ beforeUpdate에서 상태 변경 시 무한 루프 발생 가능!`);
  },

  updated() {
    console.log(`Mixin ✅ [${this.$options.name}] updated - DOM 업데이트 완료`);

    // ❌ Vue 상태 직접 변경 금지 (무한 루프 발생 가능)
    // this.count++;

    // ✅ 안전한 DOM 조작은 가능
    this.$nextTick(() => {
      console.log(`Mixin ✅ [${this.$options.name}] updated 후 안전한 DOM 조작 가능`);
      // this.$el.innerHTML = "<h2 style='color: green;'>updated 후 안전한 변경</h2>";
    });
  },
  // beforeUpdate() {
  //   console.log(`🔄 [${this.$options.name || 'Anonymous'}] beforeUpdate - DOM이 업데이트되기 직전`);

  //   // ⚠ 위험한 코드: beforeUpdate에서 상태 변경 (무한 루프 발생 가능)
  //   if (this.count < 5) {
  //     console.warn(`[${this.$options.name || 'Anonymous'}] ⚠ beforeUpdate에서 count 증가 시도!`);
  //     this.count++; // ❌ Vue 상태를 변경 → 무한 루프 발생 가능
  //   }

  //   // DOM을 직접 조작하여 상태 변경하는 경우
  //   if (this.$el) {
  //     console.warn(`[${this.$options.name || 'Anonymous'}] ⚠ beforeUpdate에서 this.$el을 조작하면 안 됨`);
  //     this.$el.innerHTML = "<h2 style='color: red;'>beforeUpdate에서 변경됨</h2>";
  //   }
  // },
  // updated() {
  //   console.log(`✅ [${this.$options.name || 'Anonymous'}] updated - DOM 업데이트 완료`);

  //   // ⚠ 위험한 코드: updated에서 상태 변경 (무한 루프 발생 가능)
  //   if (this.count < 10) {
  //     console.warn(`[${this.$options.name || 'Anonymous'}] ⚠ updated에서 count 증가 시도!`);
  //     this.count++; // ❌ updated에서 상태를 변경하면 계속 업데이트됨 (무한 루프 위험)
  //   }

  //   // 💡 해결 방법: $nextTick()을 활용해 안전한 DOM 조작
  //   this.$nextTick(() => {
  //     console.log(`[${this.$options.name || 'Anonymous'}] ✅ updated 후 안전한 DOM 조작 가능`);
  //     this.$el.innerHTML = "<h2 style='color: green;'>updated 후 안전한 변경</h2>";
  //   });
  // },

  beforeDestroy() {
    console.log(`Mixin [${this.$options.name}] 🔴 [beforeDestroy] 컴포넌트가 제거되기 직전!`);

    // ✅ Vue 인스턴스는 아직 존재함
    console.log(`Mixin [${this.$options.name}] this 존재?`, this); // Vue 인스턴스 출력됨

    // ✅ 데이터 접근 가능
    console.log(`Mixin [${this.$options.name}] count 값:`, this.count); // 정상 출력

    // ✅ DOM 조작 가능하지만, 의미 없음 (곧 삭제됨)
    this.$el.innerHTML = "<b>삭제됩니다!</b>";
    console.log(`Mixin [${this.$options.name}] this.$el 조작 성공!`);

    // ✅ 이벤트 리스너 정리 예시 (이벤트 제거)
    window.removeEventListener("resize", this.handleResize);

    // ✅ 타이머 제거
    clearInterval(this.timer);

    console.log(`Mixin [${this.$options.name}] 🔴 [beforeDestroy] 이벤트, 타이머 제거 완료!`);
  },
  destroyed() {
    console.log(`Mixin [${this.$options.name}] 💀 [destroyed] 컴포넌트가 완전히 제거됨!`);

    // ❌ Vue 인스턴스 접근 불가능
    try {
      console.log(`Mixin [${this.$options.name}] this 존재?`, this);
    } catch (e) {
      console.error(`Mixin [${this.$options.name}] ❌ this 접근 불가!`, e);
    }

    // ❌ 데이터 접근 불가능 (undefined or 에러)
    try {
      console.log(`Mixin [${this.$options.name}] count 값:`, this.count);
    } catch (e) {
      console.error(`Mixin [${this.$options.name}] ❌ count 접근 불가!`, e);
    }

    // ❌ DOM 조작 불가능
    try {
      this.$el.innerHTML = "변경 시도!";
      console.log(`Mixin [${this.$options.name}] this.$el 조작 성공!`);
      console.log(`Mixin [${this.$options.name}] this.$el.innerHTML:`, this.$el.innerHTML);
    } catch (e) {
      console.error(`Mixin [${this.$options.name}] ❌ this.$el 조작 불가!`, e);
    }

    console.log(`[${this.$options.name}] this._isDestroyed:`, this._isDestroyed); // true
    this.$nextTick(() => {
      console.log(`[${this.$options.name}] 🔍 destroyed 후 nextTick 실행!`);

      try {
        this.$el.innerHTML = "변경 시도2!";
        console.log(`Mixin [${this.$options.name}] this.$el 조작 성공!`);
        console.log(`Mixin [${this.$options.name}] this.$el.innerHTML:`, this.$el.innerHTML);
      } catch (e) {
        console.error(`Mixin [${this.$options.name}] ❌ this.$el 조작 불가!`, e);
      }

      console.log(`[${this.$options.name}] this._isDestroyed:`, this._isDestroyed);
    });
  }
};
