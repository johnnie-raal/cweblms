class CustomSelect extends HTMLSelectElement {
    options = [];
    constructor(){
        self = super();
        //obtenemos las opciones que añadieron en el select
        const opts = Array.from(this.querySelectorAll('option'));
          this.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                if(event.target.tagName == 'OPTION') {
                    console.log(event.target.value);
                    if(this.options.includes(event.target.value)){
                        const newops = this.options.filter((x) => x != event.target.value);
                        this.options = newops.map ((x) => x);
                    } else {
                        this.options.push(event.target.value);
                    }
                    this.updateoptions()
                }
            });
        //console.log(opts);
        opts.forEach(option => {
            option.selected = false;
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
             this.addEventListener('checked', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                if(event.target.tagName == 'OPTION') {
                    //console.log(event.target.value);
                    if(this.options.includes(event.target.value)){
                        const newops = this.options.filter((x) => x != event.target.value);
                        this.options = newops.map ((x) => x);
                        option.selected = false;
                    } else {
                        this.options.push(event.target.value);
                         this.updateoptions();
                    }
                   
                    
                }
            });
          });
       
    }

    updateoptions(){
        const opts = Array.from(this.querySelectorAll('option'));
        
        opts.forEach(option => {
            option.selected = this.options.includes(option.value) ?  true : false;
        })
    }
}

customElements.define('custom-select', CustomSelect, {extends: 'select'})