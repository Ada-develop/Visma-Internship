let submit = document.getElementById("submitBtn");
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

        //Submission
 
        pizzaList.push(pizza);
        window.sessionStorage.setItem(`pizza_${pizzaId}`, JSON.stringify(pizza));
        submitForm();
          
  }
else
  {
    alert("Fill all required fields");  
  }



  

  
})



