let submit = document.getElementById("submitBtn");
let displayPizzas = document.getElementById("displayPizzas");
let pizzaList = [];
// Form Submition
function submitForm(){

    let form = document.getElementsByName('pizzaCreating')[0];
    form.submit();
    form.reset();
    alert('submited and reseted');
    return false;
}



submit.addEventListener("click", function(){
  
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

  pizzaToppingsChecked.forEach(function(element){
      pizzaToppingsArr.push(element.name);
  })

//Setting ID for Pizza in sessionStorage

  if(sessionStorage.getItem("id") == null){
    sessionStorage.setItem("id", 0);
    pizzaId = 0;
  }else if(sessionStorage.getItem("id") != null){
    let gettedId = sessionStorage.getItem("id");
    pizzaId = Number(gettedId) + 1;
    sessionStorage.setItem("id", pizzaId);
    sessionStorage.setItem("PizzasArray", pizzaList);
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


//

let pizzaDiv = `<div class="pizza ${pizzaId}">
<h3 class="name">${pizzaName}<span class="heat">*</span></h3>
<p>${pizzaPrice}</p>
<img src="${pizzaPhotoURL}" class="pizzaPhoto">
<p class="toppings">${pizzaToppingsArr}</p>
</div>`


// Data Validation

if(pizzaToppingsChecked.length >= 2 && pizzaName != "" && pizzaPrice != "")
    {
        let pizzaToppingCheckBoxes = document.querySelectorAll("input[type=checkbox]");
        pizzaToppingCheckBoxes.forEach(function(checkbox){
            checkbox.required = "";
        });

        

        //Submission
        pizzaList.push(pizza);
        sessionStorage.setItem("PizzasArray",pizzaList);
        sessionStorage.setItem(`pizza_${pizzaId}`, JSON.stringify(pizza));
        displayPizzas.innerHTML += pizzaDiv;
        submitForm();
        
          
  }
else
  {
    alert("Fill all required fields");  
  }

})





