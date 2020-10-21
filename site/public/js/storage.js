window.addEventListener('load', () => {  

  function addToCart(item) {
    let items = JSON.parse(localStorage.getItem('items'));
    if(!items) {
      items = []
    }
    items.push(item);
    localStorage.setItem('items',JSON.stringify(items));
  }


  let form = document.getElementById('addToCartForm');
  form.addEventListener('submit', function(e){ 
      
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('variantId', e.target[0].value);
    data.append('variantId', e.target[1].value);
    data.append('prodId', e.target[2].value);

    axios.post('http://localhost:3000/api/products/stock', data)
      .then(function (response) {
        addToCart(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  });
});