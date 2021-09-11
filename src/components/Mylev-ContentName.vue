<template>
    <div class="externalDivBorder sizeDiv">
        <v-card class="verticalCenterContent" :color="color" width="300" height="250" rounded="lg" flat>
            <v-card-title class="textCenter sizeText">{{ title }}</v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
  name: "Mylev-ContentName",
  props: {
      title: String,
      color: String,
  }
};
</script>

<style scoped>
.externalDivBorder {
    border-width: 4px;
    border-style: solid;
    border-radius: 10px;
    border-color: white;
}

.sizeDiv {
    width: 300px;
    height: 258px;
}

.verticalCenterContent {
    display: table-cell;
    vertical-align: middle;
}

.textCenter {
    justify-content: center;
}

.sizeText {
    font-size: 35px;
}
</style>
