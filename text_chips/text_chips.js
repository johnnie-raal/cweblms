class ChipsKeywords extends HTMLElement {
    allchips = [];
    constructor() {
      self = super();
      const shadow = this.attachShadow({ mode: "open" });
      const stylebase = document.createElement("style");
  
      stylebase.textContent = `
      :host {
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
    :host(:host:focus-within) {
      border-radius: 1px solid #1754c2;
      outline: 1px solid #1754c2;
    }
    :host .c-input{
    cursor:default;
     border-radius: 4px;
      min-width: 120px;
      border:none;
      flex: 1;
      padding: 0.5rem 0;
      display: block;
      position: relative;
      margin: 0 0.5rem;
    }
    :host .c-input:focus{
     border: none;
      outline: none;
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
        c_input.focus();
      });
      c_input.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          event.preventDefault();
          event.stopPropagation();
          console.log(event.target.value);
          this.generatechip(event.target.value);
        }
      });
    }
  
    generatechip(text) {
      const chipstyle = document.createElement("style");
      chipstyle.textContent = `
    
  .chip {
    
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
  .chip img {
    filter: invert(0.8) sepia(1) saturate(5) hue-rotate(185deg);
    
  }
    .chip span:last-child {
        font-size: 1em;
        line-height: 12px;
        margin-left: 0.5rem;
        padding: 1px 4px 4px 4px;
        border-radius: 8px 8px;
        background-color: #12439b;
        cursor: pointer;
        margin-top: 2px;
    }
  
    .chip span:first-child {
      font-size: 0.8em;
      user-select: none;
      pointer-events: none;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  
  `;
  
  this.allchips.push(text);
  
      const shadow = this.shadowRoot;
      shadow.appendChild(chipstyle);
      const c_input = shadow.getElementById("c-input");
      const nd = document.createElement("div");
      nd.setAttribute("class", "chip");
  
      const stext = document.createElement("span");
      stext.innerText = text;
      const iremove = document.createElement("span");
      iremove.innerHTML = "&times;";
      //iremove.classList += "fa-solid fa-xmark";
      iremove.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const nw = this.allchips.filter((x) => x != text);
        this.allchips = nw.map((x) => x);
        this.update(text);
      });
      nd.appendChild(stext);
      nd.appendChild(iremove);
      shadow.insertBefore(nd, c_input);
      c_input.value = "";
    }
    get chips() {
      return this.allchips;
    }
    update(text) {
      const shadow = this.shadowRoot;
      const c_input = shadow.getElementById("c-input");
      for (let i = 0; i < shadow.children.length; i++) {
        if (shadow.children[i].innerHTML.includes(text)) {
          shadow.removeChild(shadow.children[i]);
          c_input.focus();
          return;
        }
      }
    }
  }
  customElements.define("input-chip", ChipsKeywords);
  