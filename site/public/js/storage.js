window.addEventListener('load', function () {
    let btn = document.getElementById('addToCartBtn');
    console.log(btn);

    btn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(JSON.stringify(event));
        let id = Math.floor(Math.random() * 1000);
        let product = {
            id: id,
            name: 'medias bla',
            price: 150,
        };
        console.log('id', id);

        localStorage.setItem('medias' + id, JSON.stringify(product));
        console.log('storage', localStorage);
        let data = localStorage.getItem('medias' + id);
        console.log(JSON.parse(data));
    });
});
