<template>
    <mdb-container fluid class="my-10">
      <h3>Partners</h3>
      <mdb-row v-for="(item, index) in items" :key="index">
        <mdb-col cols="10">
          <mdb-col cols="6">
            <image-upload :image.sync="item.image"></image-upload>
          </mdb-col>
          <mdb-col cols="12">
            <app-editor2 :content.sync="item.content" />
          </mdb-col>
        </mdb-col>
        <mdb-col cols="2" class="my-auto text-center">
          <mdb-icon class="green-text" @click.native="add()" icon="plus"></mdb-icon>
          <mdb-icon v-if="index != 0" class="red-text" @click.native="remove(index)"
            icon="minus"></mdb-icon
          >
        </mdb-col>
      </mdb-row>
    </mdb-container>
</template>

<script>
export default {
  props: {
    partners: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    items: {
      get() {
        return this.partners
      },

      set(newVal) {
        this.$emit('update:content', newVal)
      },
    },
  },
  methods: {
    add() {
      this.items.push({ image: {}, content: '' })
    },
    remove(index) {
      this.items.splice(index, 1)
    },
  },
}
</script>
