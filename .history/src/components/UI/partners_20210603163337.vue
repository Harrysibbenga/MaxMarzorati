<template>
    <mdb-container fluid class="my-10">
      <h3>Quotes</h3>
      <mdb-row v-for="(item, index) in items" :key="index">
        <mdb-col cols="10">
          <mdb-col cols="6">
            <v-text-field v-model.trim="item.name" label="Name"></v-text-field>
          </mdb-col>
          <mdb-col cols="12">
            <UiEditor :content.sync="item.content" />
          </mdb-col>
        </mdb-col>
        <mdb-col cols="2" class="my-auto text-center">
          <v-icon color="green" @click.native="add()">mdi-plus</v-icon>
          <v-icon v-if="index != 0" color="error" @click.native="remove(index)"
            >mdi-minus</v-icon
          >
        </mdb-col>
      </mdb-row>
    </mdb-container>
</template>