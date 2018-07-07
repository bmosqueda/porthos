let CKeditor = {};

window.onload = function() {
  ClassicEditor
    .create(document.querySelector( '#editor' ))
    .then(editor => {
      CKeditor = editor;
    })
    .catch(error => {
      console.error( error );
    });
}

const vm = new Vue({
  el: "#app",
  data: {
    levelSelect: -1,
    areaSelect: -1,
    levels: [],
    tags: '',
    areas: [],
    title: '',
    tags: '',
    files: []
  },
  methods: {
    get(id){
      return document.getElementById(id);
    },
    newFile() {
      let file = this.get('fileInput').files[0];
      if(file.size <= 10485760) {
        if(this.files.length < 11) {
          this.files.push(file);
        }
        else {
          alert('Sólo puedes subir un máximo de 10 archivos');
        }
      }
      else {
        alert('Demasiado grande el archivo');
      }
    },
    discardFile(ev) {
      this.files.splice(ev.target.value, 1);
    },
    saveTask() { 
      if(this.title != '' &&
        this.areaSelect != -1 &&
        this.levelSelect != -1 &&
        CKeditor.getData() != '') {

        let task = {
          tags: this.tags || '',
          idSchoolLevel: this.levelSelect,
          title: this.title,
          idArea: this.areaSelect,
          description: CKeditor.getData() 
        }

        window.axios.post('/api/task', task)
          .then(({data}) => {
            console.log(data);
          })
          .catch(err => console.error(err));
      }
      else {
        alert('Faltan campos requeridos');
      }
    }
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