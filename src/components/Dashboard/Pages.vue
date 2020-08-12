<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
        <b-nav-item to="/dashboard/pages/">About</b-nav-item>
        <b-nav-item to="/dashboard/pages/simulator">Simulator</b-nav-item>
        <b-nav-item to="/dashboard/pages/f3">F3</b-nav-item>
        <b-nav-item to="/dashboard/pages/f4">F4</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>