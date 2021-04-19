// Necessary variables

let submit = document.getElementById("submitBtn");
let displayPizzas = document.getElementById("displayPizzas");
let pizzaList = [];


// Variables for displaying 

let gettedPizzasArr = sessionStorage.getItem("PizzasArray");
let parsedPizzas = JSON.parse(gettedPizzasArr);

// Form Submition

function submitForm()
{

    let form = document.getElementsByName('pizzaCreating');
    form.submit();
    form.reset();
    
    return false;
}

//Displaying pizzas from sessionStorage

try
{
  
  for(let index = 0; index < sessionStorage.length; index++)
  {
  
    const key = sessionStorage.key(index);
  
    let pizza = sessionStorage.getItem(key);
    let pizzaID = JSON.parse(pizza);

    if( typeof(pizzaID.id) == "number" )
    {

    pizzaList.push(pizzaID);

    displayPizzas.innerHTML += `<div class="pizza ${pizzaID.id}">
    <h4 class="pizzaName">${pizzaID.name}&emsp;<span class="heat" value="${pizzaID.heat}"></span></h4>
    <img src="${pizzaID.photo}" class="pizzaPhoto">
    <b><p>${pizzaID.price}&#36;</p></b>
    <p class="toppings">${pizzaID.topping}</p>
    <button class="deleteBtn" value="${pizzaID.id}">Delete</button>
    </div>`;

    }
    else if(pizzaID.id == "undefined")
    {
      console.log("nothing");
    }
  }
}
catch(err)
{
  console.log(err);
}

// Heat Level with ChilliPapper

let chiliPapper = '<img src="https://freesvg.org/img/1535574219.png" class="papper">';
let heatSpanTag = document.querySelectorAll("span.heat");

heatSpanTag.forEach(function(tag)
{

  let heatValue = tag.getAttribute("value");

  for(let i = 0; i < heatValue; i++)
  {

    tag.innerHTML += chiliPapper;

  }

})


// FORM SUBMITION

submit.addEventListener("click", function()
{
  
  //Getting necessary variables

  let pizzaId;
  let pizzaName =  document.getElementById("pizzaName").value;
  let pizzaPrice = document.getElementById("pizzaPrice").value;
  let pizzaHeat = document.getElementById("pizzaHeat").value;
  let pizzaToppingsChecked = document.querySelectorAll("input[type=checkbox]:checked");
  let pizzaPhoto = document.getElementById("pizzaPhotos");
  let pizzaPhotoURL = pizzaPhoto.options[pizzaPhoto.selectedIndex].value;
  
  let pizzaToppingsArr = [];
  
//Collecting Toppings

  pizzaToppingsChecked.forEach(function(element)
  {

      pizzaToppingsArr.push(element.name);

  })

//Setting ID for Pizza in sessionStorage

  if(sessionStorage.getItem("id") == null)
  {
    sessionStorage.setItem("id", 0);
    pizzaId = 0;

  }
  else if(sessionStorage.getItem("id") != null)
  {

    let gettedId = sessionStorage.getItem("id");
    pizzaId = Number(gettedId) + 1;
    sessionStorage.setItem("id", pizzaId);
    
  }

//Pizza's Object

  let pizza = {

      'id' : pizzaId,
      'name' : pizzaName,
      'price' : pizzaPrice,
      'heat' : pizzaHeat,
      'topping' : pizzaToppingsArr,
      'photo' : pizzaPhotoURL
    
    }

// Data Validation

  if(pizzaToppingsChecked.length >= 2 && pizzaName != "" && pizzaPrice != "")
    {

    let pizzaToppingCheckBoxes = document.querySelectorAll("input[type=checkbox]");
    pizzaToppingCheckBoxes.forEach(function(checkbox){
    checkbox.required = "";
    });

    //Submission      

    sessionStorage.setItem(`pizza_${pizzaId}`, JSON.stringify(pizza));
    sessionStorage.setItem(`PizzaList`, JSON.stringify(pizzaList));
    submitForm();
    location.reload();

  }
  else
  {
    alert("Fill all required fields");  
  }

})
//END OF FORM SUBMITION


//Delete Button

let dltBtn = document.querySelectorAll("button.deleteBtn");

dltBtn.forEach(function(btn)
{
  btn.addEventListener("click",function()
  {
    let btnId = btn.value;
    let popUp = confirm("Are you sure to delete?");
    if(popUp == true)
    {
      sessionStorage.removeItem(`pizza_${btnId}`);
      location.reload();
    }
  })
})
