// ADD TO THE HTML***
/* <script src="store.js" async></script> */
// ===========================================================

// V=- NEEDS ADJUSTING TO JQUERY -=V //

// GLOBAL VARIABLES
// ===========================================================
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}



// FUNCTIONS
// ===========================================================

function ready() {
    const removeCartItemButtons = $('.remove-button')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        const button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    const quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)

    }

    const addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        const button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Purchased')
    const cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNotes()) {
        cartItems.removeChild(cartitems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    const buttonClicked = event.target
    // V=- NEEDS ADJUSTING BASED OFF THE HTML -=V
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    const button = event.target
    // V=- NEEDS ADJUSTING BASED OFF THE HTML -=V
    const shopItem = button.parentElement.parentElement

    const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemtoCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    const cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    const cartItems = document.getElementsByClassName('cart-items')[0]
    const cartItemNames = cartitems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartitems[i].innerText == title)
            alert('This item is already added to the cart')
        return
    }

    const cartRowContents = `
    // INSERT HTML OF WHAT YOU WANT A ROW TO LOOK LIKE HERE. USE THE TITLE, PRICE AND IMAGE SRC IN THERE
    ${title} ${price} ${imageSrc} 
    `

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('butn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    const cartItemContainer = $(".cart-items")

    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    const total = 0
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]

        const priceElement = cartRow.getElementsByClassName('cart-price')[0]
        const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        const price = parseFloat(priceElement.innerText.replace('$', ''))
        const quantity = quantityElement.value
        total = total + (price * quantity)
    }

    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = `$ + ${total}`
}