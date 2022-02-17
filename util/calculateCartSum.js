export default function getTotalPrice(cookie, obj) {
  let singleItemPrice;
  const priceList = cookie.map((singleItem) => {
    // Get price of each item
    for (const element of obj) {
      if (singleItem.id === element.id) {
        singleItemPrice = element.price;
      }
    }
    // Total price per item
    return singleItemPrice * singleItem.quantity;
  });

  return priceList.reduce((previous, current) => previous + current, 0);
}
