window.addEventListener('load', () => {  
  let form = document.getElementById('addToCartForm');
  form.addEventListener('submit', function(e){ 
      
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('variantId', e.target[0].value);
    data.append('variantId', e.target[1].value);
    data.append('prodId', e.target[2].value);

    axios.post('http://localhost:3000/api/products/stock', data)
      .then(function (response) {
        localStorage.setItem('productsAdded', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  });
});