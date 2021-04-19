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
        sessionStorage.setItem(`pizza_${pizzaId}`, JSON.stringify(pizza));
        
        
        //console.log(pizzaList);
        
        //displayPizzas.innerHTML += pizzaDiv;
        
        
          
        let gettedPizzasArr = sessionStorage.getItem("PizzasArray");
        console.log(gettedPizzasArr[0].id);

        for(pizza in gettedPizzasArr){
          displayPizzas.innerHTML += `<div class="pizza ${gettedPizzasArr[pizza].id}">
          <h3 class="name">${gettedPizzasArr[pizza].name}<span class="heat">*</span></h3>
          <p>${gettedPizzasArr[pizza].price}</p>
          <img src="${gettedPizzasArr[pizza].photo}" class="pizzaPhoto">
          <p class="toppings">${gettedPizzasArr[pizza].topping}</p>
          </div>`;
        }
         
        
         
    
        
        submitForm();
        

      // 
        
          
  }
else
  {
    alert("Fill all required fields");  
  }

})

//[{"id":14,"name":"ada","price":"1","heat":"1","topping":["basil","garlic"],"photo":"https://pizza-la-strada.de/wp-content/uploads/2017/01/Pizza_Salami.jpg"}]






