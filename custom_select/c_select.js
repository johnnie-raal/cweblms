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

    toggleoptions(state){
      if(state){
        this.render();
      }
    }

    updateoptions(){
        const opts = Array.from(this.querySelectorAll('option'));
        
        opts.forEach(option => {
            option.selected = this.options.includes(option.value) ?  true : false;
        })
        this.render();
    }

    render(){
      const opts = Array.from(this.querySelectorAll('option'));
    }
}

customElements.define('custom-select', CustomSelect, {extends: 'select'})

class NWSelect extends HTMLElement {
    
    constructor(){
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const stylebase = document.createElement("style");
        shadow.optionsCollection = [];
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
          display: flex;
          position: relative;
          border: 1px solid gray;
          border-radius: 4px;
          height: inherit;
          min-height: 28px;
          background-color: white;
        }
        :host .nw-select-base-input::after {
          background-image: url('./img/chevron-down.png');
          background-repeat: no-repeat;
          width: 14px;
          height: 12px;
          background-size: contain;
          clear: both;
          display: table;
          content: '';
          margin-left: auto;
          margin-top: 10px;
          margin-right: 8px;
      
      }

        :host .nw-select-base-input-text{
          flex: 1;
          margin: 2px 8px;
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

        :host .nw-option-check {
          width: 12px;
          height: 12px;
          position: relative;
          margin-right: 4px;
          
          background-color: white;
          border-radius: 3px;
          border: 2px solid gray;
        }
        :host .nw-option-checked{
          width: 16px;
height: 16px;

background-image: url('./img/check.png');
background-size: 12px;
background-repeat: no-repeat;
background-position: center;
background-color: darkblue;
border:none;
        }
        `;
        shadow.appendChild(stylebase);
        const base_input = document.createElement('div');
        base_input.setAttribute('class', 'nw-select-base-input');

        

        const text_input = document.createElement('div');
        text_input.setAttribute('class', 'nw-select-base-input-text');
        base_input.appendChild(text_input);
        
        shadow.appendChild(base_input);

        const base_options = document.createElement('div');
        base_options.setAttribute('class', 'nw-select-base-options');
        shadow.appendChild(base_options)

        const opts = this.querySelectorAll('option');

        opts.forEach(option => {
          const optionsCollection = this.shadowRoot.optionsCollection;
          optionsCollection.push(option);
            console.log(option);
            option.style.display = 'none';
            const inner_label = option.label || option.text || option.textContent;
            option.innerHTML = '';
            option.setAttribute('class', 'nw-select-option');
             //crear nodo check
             const node_check = document.createElement('div');
             node_check.setAttribute('class', 'nw-option-check');
            if(this.multiple){
        
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
            option.addEventListener('click', (event) => {
              console.log(event.target.selected);
              if(event.target.tagName == 'OPTION'){
                if(this.multiple){

                } else {

                }
                if(option.selected){
                  if(this.multiple){
                    node_check.removeAttribute('class', 'nw-option-checked');
                  }
                } else {
                  if(this.multiple){
                    node_check.setAttribute('class', 'nw-option-checked');
                  }
                }
               
              }
            })
        });
       
    }

    updateoptionsmultiple(){

    }
    updateoptionssingle(){

    }

    render(){

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
    
        if(this.multiple){

        } else {

        }
        // TODO: also react to the open attribute changing.
      }
}

customElements.define('nw-select', NWSelect);