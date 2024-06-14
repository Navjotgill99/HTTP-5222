//Private array to store items
var items = ["Apples", "Mangoes", "Oranges", "Cherries"];
var add = document.getElementById("add");
var length = document.getElementById("length");

//function to add a new item
export function additems(){
    items.push("Bananas");
    add.innerHTML = items.join(', ');
}

//function to return the number of items
export function total(){
    var itemsLength = items.length;
    length.innerHTML = itemsLength;
}
