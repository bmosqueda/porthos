(ClassicEditor
  .create(document.querySelector( '#editor' ))
  .then(editor => {
      console.log( editor );
  })
  .catch(error => {
    console.error( error );
  }))();

const vm = new Vue({
  el: "#app",
  data: {
    levelSelect: -1,
    areaSelect: -1,
    levels: [],
    areas: []
  },
  created: function() {
    window.axios.get('/api/catalog/areas')
      .then(({data}) => {
        this.areas = data;
      })
      .catch(err => console.error(err));

    window.axios.get('/api/catalog/levels')
      .then(({data}) => {
        this.levels = data;
      })
      .catch(err => console.error(err));
  }
});