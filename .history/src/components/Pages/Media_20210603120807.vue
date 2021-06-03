<template>
  <mdb-container>
    <image-upload :image.sync="head"></image-upload>
  {{ head }}
    <form @submit.prevent="submitForm" class="pt-2 d-flex flex-column">
      <mdb-container>
        <mdb-row>
          <mdb-col>
            <h3>Media content</h3>
            <div class="d-flex flex-row">
              <mdb-btn @click="selectImage">Select image</mdb-btn>
              <mdb-btn @click="selectVideo">Select video</mdb-btn>
            </div>
            <mdb-row>
              <mdb-col class="col-6 col-md-4" v-for="(item, index) in galleryContent" :key="index">
                <img v-if="item.imgId" :src="item.url" :alt="item.alt" class="img-fluid" />
                <video class="video-fluid z-depth-1" autoplay loop muted v-if="item.videoId">
                  <source :src="item.url" type="video/mp4" />
                </video>

                <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Delete</button>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>

        <mdb-col class="col-12 pt-3">
          <mdb-btn type="submit">Update</mdb-btn>
        </mdb-col>
      </mdb-container>
    </form>
    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>
    <!-- image  -->

    <!-- selectImageModel -->
    <mdb-modal
      top
      position="top"
      fullHeight
      direction="top"
      :show="selectImageModel"
      @close="selectImageModel = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Select image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 p-0" v-for="(img, index) in imageList" :key="index">
              <div class="custom-control custom-checkbox custom-control-inline">
                <img :src="img.url" :alt="img.alt" class="img-fluid" />
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="img.id"
                  @click="selectedImage(img)"
                />
                <label class="custom-control-label" :for="img.id">
                  {{
                  img.alt
                  }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="selectImageModel = false">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveImageSelection">Confirm</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- video -->

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
  </mdb-container>
</template>

<script>
import { mediaCollection } from "../../../firebase";
import {
  mdbBtn,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
export default {
  components: {
    mdbBtn,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
  },
  data() {
    return {
      galleryContent: [],
      img: {
        id: "",
        content: "",
        alt: "",
        imgId: "",
      },
      selectImageModel: false,
      selectVideoModel: false,
      uploadMsg: "",
      file: "",
      video: {
        id: "",
        content: "",
        alt: "",
        videoId: "",
      },
      head: {
        url: '',
        alt: '',
        id: '',
      },
      msg: {
        message: "",
        type: "",
      },
      type: "",
    };
  },
  computed: {
    videoList() {
      return this.$store.getters["videos/getVideos"];
    },
    imageList() {
      return this.$store.getters["images/getImages"];
    },
    media() {
      return this.$store.getters["media/getMedia"];
    },
  },
  methods: {
    setData() {
      this.galleryContent = this.media.galleryContent;
    },
    reset() {
      this.galleryContent = [];
      this.img = {
        id: "",
        content: "",
        alt: "",
        imgId: "",
      };
      this.uploadMsg = "";
      this.file = "";
      this.video = {
        id: "",
        content: "",
        alt: "",
        videoId: "",
      };
      this.type = "";
    },
    updateMedia() {
      mediaCollection
        .doc(this.media.id)
        .update({
          head: this.head,
          galleryContent: this.galleryContent,
        })
        .then(() => {
          this.reset();
          this.setData();
          this.msg = {
            type: "success",
            message: "Media updated",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.msg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    submitForm() {
      this.updateMedia();
    },
    selectImage() {
      this.selectImageModel = true;
    },
    selectVideo() {
      this.selectVideoModel = true;
    },
    saveImageSelection() {
      this.selectImageModel = false;
      console.log(this.galleryContent);
    },
    saveVideoSelection() {
      this.selectVideoModel = false;
      console.log(this.galleryContent);
    },
    selectedVideo(item) {
      item.videoId = item.id;
      this.galleryContent.push(item);
    },
    selectedImage(item) {
      item.imgId = item.id;
      this.galleryContent.push(item);
    },
    removeItem(item) {
      for (var i = 0; i < this.galleryContent.length; i++) {
        if (this.galleryContent[i].imgId === item) {
          this.galleryContent.splice(i, 1);
        } else if (this.galleryContent[i].videoId === item) {
          this.galleryContent.splice(i, 1);
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.setData();
    }, 1500);
  },
};
</script>
