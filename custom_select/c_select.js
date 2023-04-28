class CustomSelect extends HTMLSelectElement {
    options = [];
    constructor(){
        self = super();
        //obtenemos las opciones que añadieron en el select
        const opts = Array.from(this.querySelectorAll('option'));
        
        //console.log(opts);
        opts.forEach(option => {
            const label = option.label;
            option.innerHTML = '';
            //console.log(label);
            const divcont = document.createElement('div');
            divcont.setAttribute('class','option-container');
            const check = document.createElement('div');
            check.setAttribute('class','check-icon');
            const labelv = document.createElement('span');
            labelv.setAttribute('class', 'label');
            labelv.innerText = label;
            divcont.appendChild(check);
            divcont.appendChild(labelv);
            option.appendChild(divcont);
            
            option.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.options.push(option);
                
            });
            
          });
       
    }

    checkoption(target){
        const opts = Array.from(this.querySelectorAll('option')).filter((x) => x.selected);
        console.log(opts);
    }
}

customElements.define('custom-select', CustomSelect, {extends: 'select'})