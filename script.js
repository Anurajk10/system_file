document.addEventListener('DOMContentLoaded', () => {
    const signTextInput = document.getElementById('sign-text');
    const signFontInput = document.getElementById('sign-font');
    const signLogoInput = document.getElementById('sign-logo');
    const logoSizeInput = document.getElementById('logo-size');
    const letterTypeInput = document.getElementById('letter-type');
    const letterMaterialInput = document.getElementById('letter-material');
    const letterHeightInput = document.getElementById('letter-height');
    const floorTypeInput = document.getElementById('floor-type');
    const floorWidthInput = document.getElementById('floor-width');
    const floorHeightInput = document.getElementById('floor-height');
    const priceBreakdownList = document.getElementById('price-breakdown');
    const totalPriceSpan = document.getElementById('total-price');

    const pricing = {
        letter: {
            'Lighted': {
                'Plexiglass': 10,
                'Acrylic': 12,
                'Metal': 15
            },
            'Non-Lighted': {
                'Plexiglass': 5,
                'Acrylic': 7,
                'Metal': 10
            }
        },
        height: {
            '20 cm': 1,
            '30 cm': 1.2,
            '40 cm': 1.5
        },
        logo: {
            '40x40': 50,
            '50x50': 70,
            '60x60': 100
        },
        floor: {
            'Indoor': 20,
            'Outdoor': 30
        }
    };

    function calculatePrice() {
        const signText = signTextInput.value;
        const numberOfChars = signText.length;
        const letterType = letterTypeInput.value;
        const letterMaterial = letterMaterialInput.value;
        const letterHeight = letterHeightInput.value;
        const signLogo = signLogoInput.value;
        const logoSize = logoSizeInput.value;
        const floorType = floorTypeInput.value;
        const floorWidth = parseFloat(floorWidthInput.value);
        const floorHeight = parseFloat(floorHeightInput.value);

        let letterPrice = 0;
        if (numberOfChars > 0) {
            const baseLetterPrice = pricing.letter[letterType][letterMaterial];
            const heightMultiplier = pricing.height[letterHeight];
            letterPrice = numberOfChars * baseLetterPrice * heightMultiplier;
        }

        let logoPrice = 0;
        if (signLogo === 'Yes Logo') {
            logoPrice = pricing.logo[logoSize];
        }

        let floorPrice = 0;
        if (floorType !== 'No Floor') {
            const floorArea = floorWidth * floorHeight;
            floorPrice = floorArea * pricing.floor[floorType];
        }

        const totalPrice = letterPrice + logoPrice + floorPrice;

        priceBreakdownList.innerHTML = `
            <li>Floor: €${floorPrice.toFixed(2)}</li>
            <li>Letter: €${letterPrice.toFixed(2)}</li>
            <li>Logo: €${logoPrice.toFixed(2)}</li>
        `;
        totalPriceSpan.textContent = `${totalPrice.toFixed(2)} €`;
    }

    function toggleInputs() {
        logoSizeInput.disabled = signLogoInput.value === 'No Logo';
        floorWidthInput.disabled = floorTypeInput.value === 'No Floor';
        floorHeightInput.disabled = floorTypeInput.value === 'No Floor';
    }

    [signTextInput, signFontInput, signLogoInput, logoSizeInput, letterTypeInput, letterMaterialInput, letterHeightInput, floorTypeInput, floorWidthInput, floorHeightInput].forEach(input => {
        input.addEventListener('input', calculatePrice);
        input.addEventListener('change', calculatePrice);
    });

    signLogoInput.addEventListener('change', toggleInputs);
    floorTypeInput.addEventListener('change', toggleInputs);

    toggleInputs();
    calculatePrice();
});
