<template>
  <div class="bauhaus-home">
    <div class="grid-container">
      <div class="grid-item item-1">
        <div class="shape-circle"></div>
      </div>
      <div class="grid-item item-2">
        <h1 class="main-title">NOTE<br>NOTE</h1>
      </div>
      <div class="grid-item item-3">
        <div class="shape-triangle"></div>
      </div>
      <div class="grid-item item-4">
        <div class="shape-rect"></div>
      </div>
      <div class="grid-item item-5">
        <p class="subtitle">FORM FOLLOWS FUNCTION</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
  .bauhaus-home {
    width: 100vw;
    height: 100vh;
    background-color: var(--bauhaus-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding-top: 60px; /* Space for Navbar */
  }

  .grid-container {
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 200px 200px;
    gap: 0;
    border: 4px solid var(--bauhaus-black);
    background-color: var(--bauhaus-white);
    box-shadow: 20px 20px 0px var(--bauhaus-black);
  }

  .grid-item {
    border: 2px solid var(--bauhaus-black);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .item-1 {
    background-color: var(--bauhaus-blue);
  }

  .item-2 {
    grid-column: span 2;
    background-color: var(--bauhaus-white);
  }

  .item-3 {
    background-color: var(--bauhaus-yellow);
  }

  .item-4 {
    background-color: var(--bauhaus-red);
  }

  .item-5 {
    background-color: var(--bauhaus-black);
    color: var(--bauhaus-white);
  }

  .main-title {
    font-size: 80px;
    line-height: 0.9;
    margin: 0;
    text-align: left;
    font-weight: 900;
    color: var(--bauhaus-black);
  }

  .subtitle {
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
    padding: 20px;
  }

  /* Shapes */
  .shape-circle {
    width: 150px;
    height: 150px;
    background-color: var(--bauhaus-white);
    border-radius: 50%;
  }

  .shape-triangle {
    width: 0;
    height: 0;
    border-left: 80px solid transparent;
    border-right: 80px solid transparent;
    border-bottom: 160px solid var(--bauhaus-black);
  }

  .shape-rect {
    width: 100px;
    height: 100px;
    background-color: var(--bauhaus-white);
    transform: rotate(45deg);
  }
</style>
