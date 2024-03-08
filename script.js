document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const sortSelect = document.getElementById('sortSelect');
    const filterSelect = document.getElementById('filterSelect');

    
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            populateFilterOptions(data);


            searchButton.addEventListener('click', () => {
                displayProducts(filterProducts(data));
            });

            sortSelect.addEventListener('change', () => {
                displayProducts(sortProducts(data));
            });

            filterSelect.addEventListener('change', () => {
                displayProducts(filterProducts(data));
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Function to display products on DOM
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <p>Price: $${product.price}</p>
                 <button>Buy</button>

            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Function to populate filter options
    function populateFilterOptions(products) {
        const categories = [...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterSelect.appendChild(option);
        });
    }

    // Function to filter products based on search input and category filter
    function filterProducts(products) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        return products.filter(product =>
            (product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)) &&
            (selectedCategory === 'all' || product.category === selectedCategory)
        );
    }

    // Function to sort products based on select option
    function sortProducts(products) {
        const sortBy = sortSelect.value;
        if (sortBy === 'price-asc') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            return products.sort((a, b) => b.price - a.price);
        } else {
            return products;
        }
    }
});