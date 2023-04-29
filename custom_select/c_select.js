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

class NWSelect extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const stylebase = document.createElement("style");

        stylebase.textContent = 
        `
        :host {
            
            width: inherit;
            min-width: 120px;
            height:inherit;
            min-height: 28px;
            position:relative;
            display:block;
           
        }
        
        :host .nw-select-base-input {
            width: inherit;
            display: block;
            position: relative;
            border: 1px solid gray;
            border-radius: 4px;
            height: inherit;
            min-height: 28px;
            background-color:white;
        }
        :host .nw-select-base-options {
            position: absolute;
            top: 30px;
            height: fit-content;
            border: 1px solid gray;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: auto;
            width: 100%;
            border-radius: 4px;
            background-color: white;
            max-height: 220px;

        }
        :host .nw-select-base-options .nw-select-option {
            display: flex;
flex-direction: row;
align-items: center;
border-bottom: 1px solid lightgray;
padding: 4px;
margin: 2px 8px;
        }
        `;
        shadow.appendChild(stylebase);
        const base_input = document.createElement('div');
        base_input.setAttribute('class', 'nw-select-base-input');
        shadow.appendChild(base_input);

        const base_options = document.createElement('div');
        base_options.setAttribute('class', 'nw-select-base-options');
        shadow.appendChild(base_options)

        const opts = this.querySelectorAll('option');

        opts.forEach(option => {
            console.log(option);
            const inner_label = option.label || option.text || option.textContent;
            option.innerHTML = '';
            option.setAttribute('class', 'nw-select-option');
            if(this.multiple){
                //crear nodo check
                const node_check = document.createElement('div');
                node_check.setAttribute('class', 'nw-option-check');
                option.appendChild(node_check);
            } 
            //crear nodo label
            const node_label = document.createElement('div');
            node_label.label = inner_label;
            node_label.textContent = inner_label;
            node_label.text = inner_label;
            node_label.setAttribute('class', 'nw-option-label')
            option.appendChild(node_label);
            base_options.appendChild(option);
            
        });
       
    }

    static get observedAttributes() {
        return ['disabled', 'multiple', 'nw-mode'];
      }

      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      get multiple(){
        return this.hasAttribute('multiple');
      }
    
      set disabled(val) {
    
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
    
      }
      // Only called for the disabled and open attributes due to observedAttributes
      attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
          this.setAttribute('tabindex', '-1');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', 'false');
        }
    
        // TODO: also react to the open attribute changing.
      }
}

customElements.define('nw-select', NWSelect);