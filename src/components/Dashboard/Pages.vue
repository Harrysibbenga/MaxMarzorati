<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
        <b-nav-item to="/dashboard/pages/">Fanclub</b-nav-item>
        <b-nav-item to="/dashboard/pages/marketing">Marketing</b-nav-item>
        <b-nav-item to="/dashboard/pages/partners">Partners</b-nav-item>
        <b-nav-item to="/dashboard/pages/media">Media</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>
