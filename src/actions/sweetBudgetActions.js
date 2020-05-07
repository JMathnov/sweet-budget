import * as types from '../constants/actionTypes';

import {getFormattedDateTime} from '../utils/dates';

export function submitList(limitPrices) {
  return {
    type: types.SUBMIT_LIST,
    limitPrices
  }
}

export function addProductToSoppingList(product) {
  return {
    type: types.ADD_PRODUCT_TO_SHOPPING_LIST,
    product
  };
}

// export function adjustProductQuantity(product) {
//   return {
//     type: types.ADJUST_QAUNTITY,
//     product
//   }
// }

export function blacklistProduct(product, category) {
  return {
    type: types.BLACKLIST_PRODUCT,
    category,
    product
  }
}

export function updatePurchasePricesForDay({ day }) {
  return {
    type: types.UPDATE_PURCHASE_PRICE,
    currentPriceIndex: day,
  }
}


export function resetPurchasePrices() {
  return {
    type: types.RESET_PURCHASE_PRICE
  }
}
