let add = document.querySelector('#addBtn');
let parent = document.querySelector('.bottom');
let searchBtn = document.querySelector('#searchBtn');
var data = [];
const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

class ToDo {
    static counter = 0;
    constructor(text, color){
        this.text = text;
        this.color = color;
        this.id = ToDo.counter;
        ToDo.counter++;
        this.html;
    }
    get toDoHTML(){
        return this.html;
    }
    theHTML(text, color){
        // Creating html elements
        let div = document.createElement("div");  
        let h3 = document.createElement("h3");  
        let span = document.createElement("span"); 
        let i = document.createElement("i"); 
        // creating the text for each html element  
        let h3Txt = document.createTextNode(text);  
        // appending text to each element 
        h3.appendChild(h3Txt); 
        // appending elment to parent element          
        div.appendChild(h3); 
        span.append(i);
        div.append(span);
        // adding ids and classes
        div.classList.add('toDo');   
        div.id = this.id;   
        i.classList.add("trash","fas","fa-trash-alt","fa-lg");      
        // adding css to elements
        div.style.borderLeft = `5px solid ${color}`;  // add color to border-left
        span.style.setProperty('--spanAfterColor', this.color);
        this.html = div;  // assign the element to the html property
    }
}

function color(){
    let hexColor = '#';
    for(let i = 0; i < 6; i++){
       hexColor += hex[getRandomNum()];
    }
    return hexColor;
}

function getRandomNum(){
    return Math.floor(Math.random() * hex.length);
}

add.addEventListener("click",() =>{
    // input text for the toDo
    let text = document.querySelector('#add').value;
    // if input text is empty then return
    if(text === ""){return}
    // setting color
    let myColor = color();
    // add a new ToDo object
    let newToDo = new ToDo(text, myColor);
    // set the html
    newToDo.theHTML(text, myColor);
    // push the new object to the data array
   data.push(newToDo);
   // add the object to the UI
  parent.appendChild(newToDo.toDoHTML);
  addListener(newToDo.html.children[1]);

});

function addListener(item){
    item.addEventListener("click",function(){
        data.splice(this.parentNode,1);
        this.parentNode.remove();
    });
}

function search(){
    let searchInput = document.querySelector('#search').value;
    if(searchInput === ""){return}
    let result = data.filter((obj) => {
        return obj.text === searchInput;
    });

    result.forEach(el => el.html.classList.toggle("pulse"));

}

searchBtn.addEventListener("click", () => {
    search();
});

function checkKey(e){
    if (e.which == 13 && e.target.id === "search"){
        search();
    }else if(e.which == 13 && e.target.id === "add"){
        add.click();
    }
}