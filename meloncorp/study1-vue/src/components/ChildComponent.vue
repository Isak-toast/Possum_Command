<template>
    <div>
      <p>자식 컴포넌트 - count: {{ count }}</p>
    </div>
  </template>

  <script>
  export default {
    name: 'ChildComponent',
    props: {
      count: Number
    }
  };
  </script>
