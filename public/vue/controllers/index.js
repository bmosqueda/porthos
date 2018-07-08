const vm = new Vue({
  el: '#app',
  data: {
    levels: [],
    areas: [],
    areaSelected: 0,
    searchText: '',
    selectedLevel: 4  //Universidad
  },
  methods: {
    search() {
      if(this.searchText)
        window.location = `/task/search/text/${this.searchText}`;
      else
        alert('Ingresa un título para la búsqueda');
    },
    get(id) {return document.getElementById(id);},
    createRadioArea(area) {
      return `<input type="radio" name="areaRadio" v-model="areaSelected" value="${area.id}"></input>
            <label class="subtitle is-6">${area.name}</label><br>`;
    },
    searchByLevel(){
      let areas = document.getElementsByName('areaRadio');
      let idArea = false;
      for (var i = areas.length - 1; i >= 0; i--) 
        if(areas[i].checked)
          idArea = areas[i].value;

      if(idArea)
        window.location = `/task/search/level/${this.selectedLevel}/area/${idArea}`;
      else
        alert('Selecciona un área');
    }
  },
  created: function() {
    window.axios.get(`/api/catalog/levels`)
      .then(({data}) => { 
        this.levels = data;
      })
      .catch(err => console.log(err));

    window.axios.get(`/api/catalog/areas/level/4`)//University areas
      .then(({data}) => { 
        this.areas = data;
        let area = this.get('area');
        let area2 = this.get('area2');
        for(let i = data.length - 1; i >= 0; i--) { 
          if(i % 2)
            area.innerHTML += this.createRadioArea(data[i]);
          else
            area2.innerHTML += this.createRadioArea(data[i]);
        }
      })
      .catch(err => console.log(err));
  },
  watch: {
    selectedLevel: function() {
      window.axios.get(`/api/catalog/areas/level/${this.selectedLevel}`)
        .then(({data}) => { 
          this.areas = data;
          let area = this.get('area');
          let area2 = this.get('area2');

          while(area.hasChildNodes()) 
            area.removeChild(area.firstChild)

          while(area2.hasChildNodes()) 
            area2.removeChild(area2.firstChild)

          for(let i = data.length - 1; i >= 0; i--) { 
            if(i % 2)
              area.innerHTML += this.createRadioArea(data[i]);
            else
              area2.innerHTML += this.createRadioArea(data[i]);
          }
        })
        .catch(err => console.log(err));
    }
  }
});