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

//Displaying pizzas from sessionStorage

let gettedPizzasArr = sessionStorage.getItem("PizzasArray");

let parsedPizzas = JSON.parse(gettedPizzasArr);


  for(pizza in parsedPizzas)
  {
    displayPizzas.innerHTML += `<div class="pizza ${parsedPizzas[pizza].id}">
    <h3 class="name">${parsedPizzas[pizza].name}<span class="heat">*</span></h3>
    <p>${parsedPizzas[pizza].price}</p>
    <img src="${parsedPizzas[pizza].photo}" class="pizzaPhoto">
    <p class="toppings">${parsedPizzas[pizza].topping}</p>
    </div>`;
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

        if(sessionStorage.getItem("PizzasArray") == null){
          pizzaList.push(pizza);
          sessionStorage.setItem("PizzasArray", JSON.stringify(pizzaList));//
          
        }else if(sessionStorage.getItem("PizzasArray") != null){
          let gettedPizzaArr = sessionStorage.getItem("PizzasArray");
          pizzaList.push(pizza);
          sessionStorage.setItem("PizzasArray", JSON.stringify(pizzaList));//

        }
        //Submission      
        sessionStorage.setItem(`pizza_${pizzaId}`, pizza);
        
        
        //console.log(pizzaList);
        
        //displayPizzas.innerHTML += pizzaDiv;
        
        
          
        
         
        
         
        
        
        submitForm();
        

      // 
        
          
  }
else
  {
    alert("Fill all required fields");  
  }

})





