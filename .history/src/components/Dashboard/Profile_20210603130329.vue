<template>
  <div>
    <div class="custom-control custom-switch text-center">
      <input v-model="imgSwitch" type="checkbox" class="custom-control-input" id="customSwitches">
      <label class="custom-control-label" for="customSwitches" >Change front page display image ?</label>
    </div>
    <mdb-container v-if="imgSwitch">
      <profile-image></profile-image>
    </mdb-container>
    <mdb-container v-else>
    <form @submit.prevent="submitForm" class="pt-2 d-flex flex-column">
      <mdb-container>
        <mdb-row>
          <mdb-col class="col-12 text-center pb-3 pt-2">
            <h3 class="pb-3">Driver Images</h3>
            <mdb-container fluid>
              <mdb-row>
                <mdb-col>
                  <img
                    v-if="headline.url"
                    :src="headline.url"
                    :alt="headline.alt"
                    class="img-fluid"
                  />

                  <img
                    v-else
                    :src="defaultImage"
                    alt="Placeholder image"
                    class="img-fluid"
                  />
                  <mdb-btn @click="headlineImage">Headline image</mdb-btn>
                </mdb-col>
              </mdb-row>
            </mdb-container>
          </mdb-col>

          <mdb-col class="col-12">
            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="First Name" inline v-model.trim="firstName" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="Last Name" inline v-model.trim="lastName" />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input label="Lives" inline v-model.trim="lives" />
              </div>
              <div class="md-form col-6">
                <mdb-input label="DOB" inline v-model.trim="dob" />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input
                  label="Race number"
                  inline
                  v-model.trim="raceNumber"
                />
              </div>
              <div class="md-form col-6">
                <mdb-input label="Sponsors" inline v-model.trim="sponsors" />
              </div>
            </div>
          </mdb-col>

          <mdb-col class="col-12 text-center pb-4">
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Facebook link</span>
              <mdb-input
                slot="body"
                label="Facebook link"
                v-model="social.platforms.facebook"
              ></mdb-input>
              <mdb-btn slot="reference">Facebook</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">insta link</span>
              <mdb-input
                slot="body"
                label="insta link"
                v-model="social.platforms.insta"
              ></mdb-input>
              <mdb-btn slot="reference">insta</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Twitter link</span>
              <mdb-input
                slot="body"
                label="Twitter link"
                v-model="social.platforms.twitter"
              ></mdb-input>
              <mdb-btn slot="reference">Twitter</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Google+ link</span>
              <mdb-input
                slot="body"
                label="Gplus link"
                v-model="social.platforms.gplus"
              ></mdb-input>
              <mdb-btn slot="reference">Google+</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Twitch link</span>
              <mdb-input
                slot="body"
                label="Twitch link"
                v-model="social.platforms.twitch"
              ></mdb-input>
              <mdb-btn slot="reference">Twitch</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Pinterest link</span>
              <mdb-input
                slot="body"
                label="Pinterest link"
                v-model="social.platforms.pinterest"
              ></mdb-input>
              <mdb-btn slot="reference">Pinterest</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Youtube link</span>
              <mdb-input
                slot="body"
                label="Youtube link"
                v-model="social.platforms.youtube"
              ></mdb-input>
              <mdb-btn slot="reference">Youtube</mdb-btn>
            </mdb-popover>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Career Highlights</h3>
            <app-editor2 :content.sync="career.content"></app-editor2>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Max Facts</h3>
            <app-editor2 :content.sync="bio.content"></app-editor2>
          </mdb-col>
        </mdb-row>

        <mdb-row>
          <mdb-col>
            <h3>Gallery content</h3>
            <div class="d-flex flex-row">
              <mdb-btn @click="newImage">New image</mdb-btn>
              <mdb-btn @click="selectImage">Select image</mdb-btn>
            </div>
            <mdb-row>
              <mdb-col
                class="col-6 col-md-4"
                v-for="(img, index) in galleryContent"
                :key="index"
              >
                <img :src="img.url" :alt="img.alt" class="img-fluid" />
                <button
                  class="btn btn-danger btn-sm"
                  @click="removeItem(img.id)"
                >
                  Delete
                </button>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>

        <mdb-col class="col-12 pt-3">
          <mdb-btn type="submit">Update Driver</mdb-btn>
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

    <!-- existsModal -->
    <mdb-modal size="md" :show="existsModal" @close="existsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Image exists with that name</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row col-12 col-md-6 col-lg-4 py-3">
          <p>Would you like to use this one ?</p>
        </div>
        <img :src="img.content.url" :alt="img.content.alt" class="img-fluid" />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="declineUse"
          >No</mdb-btn
        >
        <mdb-btn color="primary" size="sm" @click="confirmUse">Yes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- uploadImage -->
    <mdb-modal size="md" :show="uploadImage" @close="closeImageUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload image</mdb-modal-title>
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
                <span class="input-group-text" id="imageInput">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="imageInput"
                  aria-describedby="imageInput"
                  @change="checkFile($event)"
                  ref="imageInput"
                  accept="image/jpeg image/png"
                />
                <label
                  class="custom-file-label"
                  for="inputGroupFile01"
                  v-if="file.name"
                  >{{ file.name }}</label
                >
                <label class="custom-file-label" for="inputGroupFile01" v-else
                  >Image</label
                >
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeImageUpload"
          >Close</mdb-btn
        >
        <mdb-btn
          color="primary"
          size="sm"
          :disabled="img.alt == ''"
          @click="saveFile(type)"
          >Save</mdb-btn
        >
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

    <!-- selectModel -->
    <mdb-modal
      top
      position="top"
      fullHeight
      direction="top"
      :show="selectModel"
      @close="selectModel = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Select image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 p-0" v-for="(img, index) in images" :key="index">
              <div class="custom-control custom-checkbox custom-control-inline">
                <img :src="img.url" :alt="img.alt" class="img-fluid" />
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="img.id"
                  @click="selected(img)"
                />
                <label class="custom-control-label" :for="img.id">
                  {{ img.alt }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="selectModel = false"
          >Close</mdb-btn
        >
        <mdb-btn color="primary" @click="saveSelection">Confirm</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
  </div>
</template>

<script>
import { profileCollection, imageCollection } from "../../../firebase";
import profileImage from '../UI/profileImage'

import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbPopover,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
export default {
  data() {
    return {
      bio: {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      },
      imgSwitch: false,
      firstName: "",
      lastName: "",
      lives: "",
      dob: "",
      raceNumber: "",
      sponsors: "",
      headline: {
        url: "",
        alt: "",
        imgId: "",
      },
      career: {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      },
      social: {
        url: "",
        alt: "",
        imgId: "",
        platforms: {
          facebook: "",
          website: "",
          twitter: "",
          gplus: "",
          insta: "",
          twitch: "",
          pinterest: "",
          youtube: "",
        },
      },
      galleryContent: [],
      selectedImages: [],
      updatedImage: null,
      img: {
        id: "",
        content: "",
        alt: "",
      },
      hover: false,
      msg: "",
      edit: false,
      pageNumber: 0,
      file: "",
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
      existsModal: false,
      selectModel: false,
      uploadImage: false,
    };
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbPopover,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    profileImage
  },
  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    images() {
      return this.$store.getters["images/getImages"];
    },
  },
  methods: {
    setData() {
      this.bio = this.profile.bio;
      this.firstName = this.profile.firstName;
      this.lastName = this.profile.lastName;
      this.lives = this.profile.lives;
      this.dob = this.profile.dob;
      this.raceNumber = this.profile.raceNumber;
      this.sponsors = this.profile.sponsors;
      this.headline = this.profile.headline;
      this.career = this.profile.career;
      this.social = this.profile.social;
      this.galleryContent = this.profile.galleryContent;
    },
    reset() {
      this.bio = {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      };
      this.firstName = "";
      this.lastName = "";
      this.lives = "";
      this.dob = "";
      this.raceNumber = "";
      this.sponsors = "";
      this.headline = {
        url: "",
        alt: "",
        imgId: "",
      };
      this.career = {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      };
      this.social = {
        url: "",
        alt: "",
        imgId: "",
      };
      this.social.platforms = {
        facebook: "",
        website: "",
        twitter: "",
        gplus: "",
        insta: "",
        twitch: "",
        pinterest: "",
        youtube: "",
      };
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    updateDriver() {
      if (this.headline.url == "") {
        this.headline.url = this.defaultImage;
        this.headline.alt = "Placeholder image";
        this.headline.imgId = "";
      }
      profileCollection
        .doc(this.profile.id)
        .update({
          bio: this.bio,
          firstName: this.firstName,
          lastName: this.lastName,
          lives: this.lives,
          dob: this.dob,
          raceNumber: this.raceNumber,
          sponsors: this.sponsors,
          headline: this.headline,
          career: this.career,
          social: this.social,
          galleryContent: this.galleryContent,
        })
        .then(() => {
          this.reset();
          this.setData();
          this.msg = {
            type: "success",
            message: "Profile updated",
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
      if (this.dob == "" || this.firstName == "" || this.lastName == "") {
        this.msg = {
          type: "warning",
          message: "Missing information check the form is completely filled",
        };
        setTimeout(() => {
          this.msg = {
            type: "",
            message: "",
          };
        }, 2000);
      } else {
        this.updateDriver();
      }
    },
    headlineImage() {
      this.uploadImage = true;
      this.type = "headline";
    },
    newImage() {
      this.uploadImage = true;
      this.type = "new";
    },
    selectImage() {
      this.selectModel = true;
    },
    checkFile(event) {
      this.file = event.target.files[0];
      imageCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              this.existsModal = true;
              this.uploadImage = false;
              this.img.content = doc.data();
              this.img.id = doc.id;
              return;
            }
          });
        });
    },
    saveFile() {
      let payload = {};
      payload.file = this.file;
      payload.alt = this.img.alt;
      this.$store
        .dispatch("images/uploadImage", payload)
        .then((img) => {
          this.img.content = img;
          if (this.type == "headline") {
            this.headline.imgId = this.img.content.id;
            this.headline.url = this.img.content.url;
            this.headline.alt = this.img.content.alt;
          } else if (this.type == "new") {
            this.galleryContent.push(this.img.content);
          }
        })
        .then(() => {
          this.$store.dispatch("global/setLoading", false);
          this.file = "";
          this.img.alt = "";
          setTimeout(() => {
            this.uploadImage = false;
          }, 2000);
        });
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.type = "";
      this.file = "";
      this.img.alt = "";
      if (this.edit) {
        this.editModal = true;
      }
    },
    confirmUse() {
      if (this.type == "headline") {
        this.headline.imgId = this.img.id;
        this.existsModal = false;
        this.headline.url = this.img.content.url;
        this.headline.alt = this.img.content.alt;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      } else if (this.type == "new") {
        this.galleryContent.push(this.img.content);
        this.existsModal = false;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      }
    },
    declineUse() {
      this.existsModal = false;
      this.img.content = "";
      this.img.id = "";
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
    saveSelection() {
      this.selectModel = false;
    },
    selected(img) {
      this.galleryContent.push(img);
    },
    removeItem(img) {
      console.log(img);
      for (var i = 0; i < this.galleryContent.length; i++) {
        if (this.galleryContent[i].id === img) {
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
