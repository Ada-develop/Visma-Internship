let submit = document.getElementById("submitBtn");
let pizzaList = [];

submit.addEventListener("click", function(){

  let pizzaName =  document.getElementById("pizzaName").value;
  let pizzaPrice = document.getElementById("pizzaPrice").value;
  let pizzaHeat = document.getElementById("pizzaHeat").value;
  let pizzaToppingsChecked = document.querySelectorAll("input[type=checkbox]:checked");
  let pizzaPhoto = document.getElementById("pizzaPhotos");
  
  let pizzaPhotoURL = pizzaPhoto.options[pizzaPhoto.selectedIndex].value;

  let pizzaToppingsArr = [];
  
  pizzaToppingsChecked.forEach(function(element){
      pizzaToppingsArr.push(element.name);
  })

  let pizza = {
      'name' : pizzaName,
      'price' : pizzaPrice,
      'heat' : pizzaHeat,
      'topping' : pizzaToppingsArr,
      'photo' : pizzaPhotoURL
  }

})

function submitForm(){

    let form = document.getElementsByName('pizzaCreating')[0];
    form.submit();
    form.reset();
    alert('submited and reseted');
    return false;
}