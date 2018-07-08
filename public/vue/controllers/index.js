const vm = new Vue({
  el: '#app',
  data: {
    levels: [],
    areas: [],
    searchText: '',
  },
  methods: {
    search() {
      console.log('search');
    },
    get(id) {return document.getElementById(id);},
    createRadioLevel(level) {
      return `<input type="radio" name="radioLevel" value="${level.id}"></input>
            <label class="subtitle is-6">${level.name}</label><br>`;
    },
    createCheckArea(area) {
      return `<input type="checkbox" value="${area.id}"></input>
            <label class="subtitle is-6">${area.name}</label><br>`;
    }
  },
  created: function() {
    window.axios.get(`/api/catalog/levels`)
      .then(({data}) => { 
        this.levels = data;
        let level = this.get('level');
        let level2 = this.get('level2');
        for(let i = data.length - 1; i >= 0; i--) { 
          if(i % 2)
            level.innerHTML += this.createRadioLevel(data[i]);
          else
            level2.innerHTML += this.createRadioLevel(data[i]);
        }
      })
      .catch(err => console.log(err));

    window.axios.get(`/api/catalog/areas`)
      .then(({data}) => { 
        this.areas = data;
        let area = this.get('area');
        let area2 = this.get('area2');
        for(let i = data.length - 1; i >= 0; i--) { 
          if(i % 2)
            area.innerHTML += this.createCheckArea(data[i]);
          else
            area2.innerHTML += this.createCheckArea(data[i]);
        }
      })
      .catch(err => console.log(err));
  }
});