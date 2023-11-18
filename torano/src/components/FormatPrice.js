function formatPriceWithCurrency(price) {
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedPrice}đ`;
}
export  default formatPriceWithCurrency;