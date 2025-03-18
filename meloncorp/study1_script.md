Vue.js 라이프사이클 훅과 상태 관리 핵심 정리
1. Vue 라이프사이클 훅 총정리
라이프사이클	this	data()	computed	methods	$el (DOM)	주요 용도
beforeCreate	✅ 존재함	❌ 없음	❌ 없음	❌ 없음	❌ 없음	로깅, 디버깅
created	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	❌ 없음	API 호출, 데이터 초기화
beforeMount	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	⚠️ 생성 예정	렌더링 직전 준비
mounted	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	✅ 존재함	DOM 조작, 외부 라이브러리 연동
beforeUpdate	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	✅ 존재함	업데이트 전 상태 확인
updated	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	✅ 존재함	DOM 업데이트 완료 확인
beforeDestroy	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	✅ 존재함	리소스 정리, 이벤트 해제
destroyed	✅ 존재함	✅ 있음	✅ 있음	✅ 있음	✅ 존재함	최종 정리 확인
2. 주의해야 할 상태 변경 패턴
beforeUpdate와 updated에서의 상태 변경 위험성
안전한 상태 변경 방법
3. Vue.nextTick() 이해하기
nextTick이 필요한 이유
Vue는 데이터 변경 시 DOM을 비동기적으로 업데이트
데이터 변경 직후 DOM이 아직 업데이트되지 않은 상태
정확한 사용 예시
4. 상태 관리 핵심 정리
상황	❌ 잘못된 방법	✅ 올바른 방법
beforeUpdate/updated에서 상태 변경	this.count++	상태 변경 금지 또는 $nextTick() 활용
computed 속성 변경	this.computedValue = 123	getter만 사용, 변경은 mutation으로
props 변경	this.propValue++	로컬 상태로 복사 후 $emit('update:prop')
DOM 접근 및 조작	created에서 this.$el 접근	mounted에서 접근하거나 $nextTick() 사용
5. 최종 요약
생명주기 이해: 각 훅의 특성과 사용 가능한 리소스 파악
상태 변경 주의: beforeUpdate/updated에서 상태 변경 시 무한 루프 발생
DOM 조작: mounted 이후에만 안전하게 조작 가능
$nextTick(): DOM 업데이트 완료 후 실행되는 비동기 콜백 활용
최적의 위치:
API 호출 → created
DOM 조작 → mounted
이벤트 정리 → beforeDestroy
Happy Vue Coding! 🚀