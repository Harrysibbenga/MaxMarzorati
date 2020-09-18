<template>
  <div>
    <div class="container text-center">
      <mdb-btn color="primary" class="ml-0" inline @click="newVideo">Add new video</mdb-btn>
    </div>
    <mdb-container fluid class="p-0 pt-5">
      <mdb-row>
        <mdb-col class="col-4" v-for="(video, index) in videoList" :key="index">
          <video class="video-fluid z-depth-1" autoplay loop muted>
            <source :src="video.url" type="video/mp4" />
          </video>
          <p>name: {{ video.name }}</p>
          <p>alt: {{ video.alt }}</p>
          <div class="text-center">
            <a @click="deleteItem(video)">
              <mdb-icon icon="trash-alt" />
            </a>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span class="text-danger">
          Are you sure you want to delete this video ? ( any documents that use
          this video will need to be changed )
        </span>
        {{ toDeleteItem.name }}
        <mdb-btn color="primary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="secondary" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
    </mdb-modal>

    <!-- uploadvideo -->
    <mdb-modal size="md" :show="uploadvideo" @close="closeVideoUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload video</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row">
          <div class="col-12">
            <div class="md-form">
              <mdb-input label="Description" inline v-model.trim="img.alt" />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="videoInput">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="videoInput"
                  aria-describedby="videoInput"
                  @change="checkFile($event)"
                  ref="videoInput"
                  accept="video/jpeg video/png"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  v-if="file.name"
                >{{ file.name }}</label>
                <label class="custom-file-label" for="inputGroupFile01" v-else>Video</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeVideoUpload">Close</mdb-btn>
        <mdb-btn color="primary" size="sm" :disabled="img.alt == ''" @click="saveFile(type)">Save</mdb-btn>
      </mdb-modal-footer>
      <transition name="fade">
        <div
          v-if="uploadMsg.message != ''"
          :class="`bg-${uploadMsg.type}`"
          class="text-white text-center"
        >
          <p>{{ uploadMsg.message }}</p>
        </div>
      </transition>
    </mdb-modal>
  </div>
</template>

<script>
import { videoCollection } from "../../../firebase";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbIcon,
  mdbCol,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbRow,
} from "mdbvue";
export default {
  data() {
    return {
      toDeleteItem: {
        id: "",
        name: "",
        alt: "",
        url: "",
      },
      deleteModal: false,
      uploadvideo: false,
      file: "",
      msg: {
        message: "",
        type: "",
      },
      img: {
        alt: "",
      },
    };
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbIcon,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    mdbCol,
    mdbRow,
  },
  computed: {
    videoList() {
      return this.$store.getters["videos/getVideos"];
    },
    uploadMsg() {
      return this.$store.getters["videos/getMsg"];
    },
  },
  methods: {
    newVideo() {
      this.uploadvideo = true;
    },
    checkFile(event) {
      this.file = event.target.files[0];
      videoCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              let msg = {
                type: "warning",
                message: "Video with this name already exists",
              };
              this.$store.commit("videos/setMsg", msg);
              this.file = "";
              return;
            }
          });
        });
    },
    deleteItem(item) {
      this.deleteModal = true;
      this.toDeleteItem = {
        id: item.id,
        name: item.name,
        alt: item.alt,
        url: item.url,
      };
    },
    cancelDelete() {
      this.toDeleteItem = {
        id: "",
        name: "",
        alt: "",
        url: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      videoCollection
        .doc(this.toDeleteItem.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Video deleted",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((error) => {
          this.msg = {
            type: "warning",
            message: error.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    saveFile() {
      let payload = {};
      payload.file = this.file;
      payload.alt = this.img.alt;
      this.$store.dispatch("videos/uploadVideo", payload);
      setTimeout(() => {
        this.uploadvideo = false;
        this.file = "";
        this.img.alt = "";
      }, 2000);
    },
    closeVideoUpload() {
      this.uploadvideo = false;
      this.file = "";
      this.img.alt = "";
    },
  },
};
</script>
