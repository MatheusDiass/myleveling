<template>
  <div class="externalDivBorder">
    <v-card class="paddingCard" color="#499fc6" flat>
      <v-form>
        <label>Titulo:</label>
        <v-text-field  background-color="white" outlined></v-text-field>
        <label>Matéria:</label>
        <v-select  background-color="white" outlined></v-select>
        <label>Conteudo:</label>
        <v-textarea background-color="white" outlined></v-textarea>
        <label>Video da aula:</label>
        <v-checkbox label="Clique para desbloquar a opção"></v-checkbox>
        <v-file-input background-color="white" outlined></v-file-input>
        <label>Matériais</label>
        <v-checkbox label="Clique para desbloquar a opção"></v-checkbox>
        <v-file-input  background-color="white" outlined></v-file-input>



        <div class="contentCenter">
          <v-btn color="#3898ec">Salvar</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
    name:'MylevSubContent',
}
</script>