class CustomSelect extends HTMLSelectElement {
    constructor(){
        self = super();
        const opts = Array.from(this.querySelectorAll('option'));
        console.log(opts);
        opts.forEach(option => {
            option.style.display = 'none';
          });
       
    }
}

customElements.define('custom-select', CustomSelect, {extends: 'select'})