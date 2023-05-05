/*
Importante:
Aunque el codigo se ejecuta con normalidad aun queda pendiente la parte cuando agregas valores nuevos y estos no se actualizan en el input
Busca un event listener que este checando los valores para que si se modifican o agregan nuevos estos se puedan visualizar en el input
*/

class ChipsKeywords extends HTMLElement {
  
  constructor() {
    self = super();
    
    const shadow = this.attachShadow({ mode: "open" });
    const stylebase = document.createElement("style");
    shadow.keywords = [];
    stylebase.textContent = `
      :host {
        background-color:white;
      margin-left: 1rem;
    border: 1px solid gray;
    min-width: 200px;
    min-height: 38px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
      }
         :host(:host[disabled]) {
      border: 1px solid lightgray;
      background-color:#dedede;
      cursor: not-allowed;
         }
     
    
    
    :host(:host:not([disabled]):focus-within) {
      border: 1px solid #1754c2;
      outline: 1px solid #1754c2;
      
    }
    :host .c-input{
    cursor:default;
     border-radius: 4px;
      min-width: 120px;
      border:none;
      flex: 1;
      padding: 0.5rem 0;
      display: none;
      position: relative;
      margin: 0 0.5rem;
    }

    :host .input-active {
      display:block;
    }
    :host .c-input:focus{
     border: none;
      outline: none;
    }
    

     :host(:host[disabled]) .c-input{
        cursor: not-allowed;
        pointer-events: none;
        background-color:#dedede;
      }

       :host .chip {
    
    margin: 0.25rem 0.25rem;
    padding: 0.25rem 0.75rem;
    background-color: #1754c2;
    width: fit-content;
    color: white;
    border-radius: 1.25rem 1.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 200px;
  }
  :host .chip img {
    background-color: #12439b;
padding: 4px 4px;
border-radius: 50%;
height: 9px;
margin-left: 4px;
cursor:pointer;
  }
  
    
    
  
    :host .chip span {
      max-width: 200px;
      padding-bottom:1px;
      font-size: 0.8em;
      user-select: none;
      pointer-events: none;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    :host (:host[disabled]) .chip{
      background-color:gray;
    }
  :host (:host[disabled]) .chip .img{
      background-color:darkgray;
    }

      `;

    shadow.appendChild(stylebase);
    const c_input = document.createElement("input");
    c_input.setAttribute("class", "c-input");
    c_input.setAttribute("id", "c-input");
    shadow.appendChild(c_input);
    self.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (this.disabled) return;
      c_input.style.display = 'block';
      c_input.value = "";
      c_input.focus();

    });
    c_input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.value == '') return;
        this.addchip(event.target.value);
      }
    });

    c_input.addEventListener('blur', () => {
      c_input.style.display = 'none';
    });


    
  }

  
 
  addchip(value){
    const shadow = this.shadowRoot;
    
    if(shadow.keywords.length == 0){
      shadow.keywords.push(value);
      this.render();
      return;
    } 
    
    if(shadow.keywords.includes(value)) return;
    shadow.keywords.push(value);
    this.render();
  }
  removechip(value){
    const shadow = this.shadowRoot;
    const nw = shadow.keywords.filter((x) => x != value);
    shadow.keywords = nw.map((x) => x);
    this.render();
  }

  render(){
    const shadow = this.shadowRoot;
    let chips = shadow.querySelectorAll('div.chip');

    chips.forEach(chip => {
      shadow.removeChild(chip);
    })
    const c_input = shadow.getElementById("c-input")
    for(let item of shadow.keywords){
       
      const nd = document.createElement("div");
      nd.setAttribute('value', item);
      nd.setAttribute("class", "chip");
  
      const stext = document.createElement("span");
      stext.innerText = item;
      const iremove = document.createElement("img");
      iremove.src = './img/close.png';
      //iremove.classList += "fa-solid fa-xmark";
      iremove.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled) return;
        this.removechip(item);
      });
      nd.appendChild(stext);
      nd.appendChild(iremove);
      shadow.insertBefore(nd, c_input);
      
    }
    c_input.focus();
    c_input.value = "";
  }
  /*
  generatechip(text) {
    

    const shadow = this.shadowRoot;
    shadow.keywords.push(text);
    
  }

  update(text) {
    const shadow = this.shadowRoot;
    const c_input = shadow.getElementById("c-input");
    const nw = shadow.keywords.filter((x) => x != text);
    shadow.keywords = nw.map((x) => x);
    for (let i = 0; i < shadow.children.length; i++) {
      if (shadow.children[i].innerHTML.includes(text)) {
        shadow.removeChild(shadow.children[i]);
        c_input.focus();
        break;
      }
    }
    console.log('exit of loop');
  }
  */

  get getKeywords() {
    const shadow = this.shadowRoot;
    return shadow.keywords;
  }

  setKeywords(value){
    if(!Array.isArray(value)) {
      console.error('Can not get a value, please be aware keywords must be an array');
    }
    for(let item of value){
      //console.log(typeof item);
      if(typeof item == 'string'){
        //console.log(item + ' will be added');
        this.addchip(item);
        continue;
      } 
    }

  }

  static get observedAttributes() {
    return ['disabled'];
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }


  set disabled(val) {

    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }

  }

  get keywords() {
    return this.hasAttribute('keywords');
  }
  // Only called for the disabled and open attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    // When the drawer is disabled, update keyboard/screen reader behavior.
    if (this.disabled) {
      const shadow = this.shadowRoot;
      const c_input = shadow.getElementById("c-input");
      c_input.blur();
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-disabled', 'false');
    }
   
  }

  connectedCallback() {
   
    
  }

}
customElements.define("input-chip", ChipsKeywords);
