export const getTotals = cart => {
  let totalItems = 0;
  let totalCost = 0;

  for (const item of cart.values()) {
    const { amount, price } = item;

    totalItems += amount;
    totalCost += amount * price;
  }

  return [totalItems, totalCost.toFixed(2)];
};
