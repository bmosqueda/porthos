let CKeditor = {};

const vm = new Vue({
  el: "#app",
  data: {
    task: {},
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
            let promiseFiles = [];
            for(let i = this.files.length - 1; i >= 0; i--) {
              let formData = new FormData();
              formData.append('file', this.files[i])

              promiseFiles.push(window.axios.post(
                `/api/task/file/${data.id}`, 
                formData, 
                { headers: { 'content-type': 'multipart/form-data' } }
              ));
            }

            Promise.all(promiseFiles)
              .then(values => {
                console.table(values);
                alert('Se guardó correctamente');
                window.location = '/';
              })  
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      }
      else {
        alert('Faltan campos requeridos');
      }
    }
  },
  created: function() {
    window.axios.get(`/api/task/${idTask}`)
      .then(({data}) => {
        this.task = data;
        this.title = data.title;
        this.tags = data.tags;

        ClassicEditor
          .create(document.querySelector( '#editor' ))
          .then(editor => {
            CKeditor = editor;
            CKeditor.setData(data.description);
          })
          .catch(error => {
            console.error( error );
          });

        window.axios.get('/api/catalog/areas')
          .then(res => {
            this.areas = res.data;
            setTimeout(() => {
              this.areaSelect = Number(this.task.idArea);
            }, 1000);
          })
          .catch(err => console.error(err));

        window.axios.get('/api/catalog/levels')
          .then(res => {
            this.levels = res.data;
            setTimeout(() => {
              this.levelSelect = Number(this.task.idSchoolLevel);
            }, 1000);
          })
          .catch(err => console.error(err));

        window.axios.get(`/api/task/file/${idTask}`)
          .then(res => {
            this.files = res.data;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.error(err));
  }
});