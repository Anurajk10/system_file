const products = [
    {
        name: 'Baby Onesie',
        price: '$15.99',
        image: 'https://via.placeholder.com/150'
    },
    {
        name: 'Plush Toy',
        price: '$12.99',
        image: 'https://via.placeholder.com/150'
    },
    {
        name: 'Diaper Bag',
        price: '$34.99',
        image: 'https://via.placeholder.com/150'
    },
    {
        name: 'Baby Blanket',
        price: '$24.99',
        image: 'https://via.placeholder.com/150'
    },
    {
        name: 'Pacifier',
        price: '$5.99',
        image: 'https://via.placeholder.com/150'
    },
    {
        name: 'Baby Hat',
        price: '$9.99',
        image: 'https://via.placeholder.com/150'
    }
];

const productGrid = document.getElementById('product-grid');

function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

renderProducts();
