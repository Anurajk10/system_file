const dresses = [
    {
        name: 'Elegant Red Dress',
        price: '$120',
        image: 'https://via.placeholder.com/300x400.png?text=Red+Dress'
    },
    {
        name: 'Classic Blue Dress',
        price: '$110',
        image: 'https://via.placeholder.com/300x400.png?text=Blue+Dress'
    },
    {
        name: 'Stylish Green Dress',
        price: '$130',
        image: 'https://via.placeholder.com/300x400.png?text=Green+Dress'
    },
    {
        name: 'Chic Black Dress',
        price: '$150',
        image: 'https://via.placeholder.com/300x400.png?text=Black+Dress'
    }
];

const dressContainer = document.querySelector('.dress-container');

dresses.forEach(dress => {
    const dressItem = document.createElement('div');
    dressItem.classList.add('dress-item');

    dressItem.innerHTML = `
        <img src="${dress.image}" alt="${dress.name}">
        <h3>${dress.name}</h3>
        <p>${dress.price}</p>
        <button>Add to Cart</button>
    `;

    dressContainer.appendChild(dressItem);
});