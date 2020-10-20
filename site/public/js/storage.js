window.addEventListener('load', () => {  
  let form = document.getElementById('addToCartForm');
  form.addEventListener('submit', function(e){ 
      
    e.preventDefault();
    let variantId = [e.target[0].value, e.target[1].value];
    let productId = e.target[2].value;    

    axios.get('http://localhost:3000/api/products/stock', { variantId, productId })
      .then(function (response) {
        if(response.status==200) {
          localStorage.setItem('prodcutsInCart', JSON.stringify(response.data));
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });

})