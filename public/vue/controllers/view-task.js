const tableConfig = {
  skin: 'table is-striped is-fullwidth is-hoverable',
  headings: {
    type: 'Tipo',
    name: 'Nombre',
    options: 'Opciones'
  },
  filterable: ['name'],
  perPage: 10,
  perPageValues: [10,25],
  pagination: { nav: 'fixed', edge: true }
}

Vue.use(VueTables.ClientTable, theme = 'bulma');
const vm = new Vue({
  el: '#app',
  data: {
    documents: files,
    columns: ['type', 'name', 'options'],
    options: tableConfig,
    files: {
      text: /(odt|ott|odm|tml|oth|ods|ots|odg|otg|odp|otp|odf|odb|oxt|doc|docm|docx)$/,
      slides: /(pptx|pptm|ppt|xps|potx|potm|pot|thmx|ppsx|ppsm|pps|ppam|ppa)$/,
      sheets: /(xlsx|xls|xml|xml|xlam)$/,
      images: /(bmp|gif|jpg|jpge|png|psd|ai|cdr|dwg|svg|raw|nef)$/,
      audio: /(mp3|mid|midi|wav|wma|cda|ogg|ogm|aac|ac3|flac|aym)$/,
      video: /(asf|lsf|asx|bik|smk|div|divx|dvd|wob|ivf|m1v|mp2v|mp4|mpa|mpe|mpeg|mpg|mpv2|mov|qt|qtl|rpm|wm|wmv|avi)$/,
      pdf: /pdf$/
    },
    user: user,
    comment: '',
  },
  methods: {
    postComment () {
      if (this.user.id != '') {
        window.axios.post(`/api/task/comment/user/${this.user.id}/task/${task}`, {comment: this.comment})
          .then(() => window.location.reload())
          .catch(err => {
            console.log(err.message);
            alert('No se pudo enviar el comentario')
          })
        console.log(this.comment);
      }
      else
        navbar.activeModal = true;
    }
  },
  mounted () {
    document.getElementsByClassName('form-control')[0].classList = 'input column is-one-third';
  }
})
// /files/