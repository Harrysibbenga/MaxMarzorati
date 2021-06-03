<template>
    <div>
        <!-- selectVideoModel -->
    <mdb-modal
      top
      position="top"
      fullHeight
      direction="top"
      :show="selectVideoModel"
      @close="selectVideoModel = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Select video</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 p-0" v-for="(vid, index) in videoList" :key="index">
              <div class="custom-control custom-checkbox custom-control-inline">
                <video class="video-fluid z-depth-1" autoplay loop muted>
                  <source :src="vid.url" type="video/mp4" />
                </video>
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="vid.id"
                  @click="selectedVideo(vid)"
                />
                <label class="custom-control-label" :for="vid.id">
                  {{
                  vid.alt
                  }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="selectVideoModel = false">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveVideoSelection">Confirm</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </div>
</template>