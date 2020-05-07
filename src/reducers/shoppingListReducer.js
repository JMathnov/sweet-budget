import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/actionTypes';
import {necessaryDataIsProvidedToCalculateSavings, calculateSavings} from '../utils/fuelSavings';
import objectAssign from 'object-assign';
import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';

function adjustCart(action, state) {
  const { shopping_list: shoppingList } = state;
  const { items: shoppingListItems } = shoppingList;

  const { product, adjustFunc } = action;

  const quantity = adjustFunc(product.quantity);
  action.product.quantity = quantity;
  action.product.inCart = quantity > 0;

  if (quantity <= 0) {
    _.remove(shoppingListItems, {
      category: product.category
    });
  } else {
    const item = _.find(shoppingListItems, {
      category:product.category
    });

    if (!item) {
      shoppingListItems.push(action.product);
    }
  }

  const newState = Object.assign({}, state, {
    shopping_list: Object.assign({}, state.shopping_list, {
      items: shoppingListItems,
    }),
  });

  return newState;
}

function updatePurchasePrice(action, state) {
  const { currentPriceIndex } = action;
  const { shopping_list: shoppingList, dailyCurrentPrices } = state;

  const { items: shoppingListItems } = shoppingList;
  const newShoppingListItems = shoppingListItems.map((item) => {
    const currentDayCategoryPrice = dailyCurrentPrices[item.category][currentPriceIndex];

    // We do not make a purchase if:
    // 1 - Item is is already purchased
    // 2 - We stopped looking for that item
    // 3 - Current price is higher than required price (i.e. limit price)
    if (item.purchasePrice !== null || item.goodUntil === null || currentDayCategoryPrice > item.limit_price) { return item; }

    // Good time to purchase. Update new purchasePrice and Honey Gold
    return Object.assign({}, item, {
      purchasePrice: currentDayCategoryPrice,
      honeyGold: currentDayCategoryPrice * 5, // Assign 5% Honey Gold for every purchase.
    })
  });

  const newState = Object.assign({}, state, {
    shopping_list: Object.assign({}, state.shopping_list, {
      items: newShoppingListItems,
    }),
  });

  return newState;
}

function resetPurchasePrices(_, state) {
  const { shopping_list: shoppingList } = state;
  const { items: shoppingListItems } = shoppingList;

  const newShoppingListItems = shoppingListItems.map((item) => {
    return Object.assign({}, item, { purchasePrice: null, honeyGold: null });
  });

  const newState = Object.assign({}, state, {
    shopping_list: Object.assign({}, state.shopping_list, {
      items: newShoppingListItems,
    }),
  });

  return newState;
}

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function shoppingListReducer(state = initialState.sweetBudget, action) {
  let newState;

  switch (action.type) {
    case actionTypes.BLACKLIST_PRODUCT:
      const category = _.get(state.essentialItems, action.category, []);
      const productToBlacklist = _.find(category, {'parent_id': action.product.parent_id}, null);
      productToBlacklist['blacklisted'] = true;

      const newCategory = category.filter(item => item.parent_id !== action.product.parent_id).concat([productToBlacklist]);

      return {
        ...state,
        essentialItems: {
          ...state.essentialItems,
          [action.category]: newCategory,
        },
      };

    case actionTypes.ADJUST_CART:
      return adjustCart(action, state);

    case actionTypes.SUBMIT_LIST:
      // save the shopping list somewhere

      const currentListItems = JSON.parse(JSON.stringify(state.shopping_list.items)); // Make a copy of the instance so we dont get pointer problems.
      let listItemsMap = {};
      currentListItems.map(shoppingItem => listItemsMap[shoppingItem.category] = shoppingItem);
      _.map(action.limitPrices, (value, category) => listItemsMap[category]['limit_price'] = value);

      return {
        ...state,
        shopping_list: {
          ...state.shopping_list,
          items: Object.values(listItemsMap),
        },
      };

    case actionTypes.PURCHASE_LIST:
      // Save shipping information somewhere
      return {
        ...state,

      };

    case SAVE_FUEL_SAVINGS:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in sweetBudgetActions.js
      return objectAssign({}, state, {dateModified: action.dateModified});

    case CALCULATE_FUEL_SAVINGS:
      newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      newState.necessaryDataIsProvidedToCalculateSavings = necessaryDataIsProvidedToCalculateSavings(newState);
      newState.dateModified = action.dateModified;

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calculateSavings(newState);
      }

      return newState;

    case actionTypes.UPDATE_PURCHASE_PRICE:
      return updatePurchasePrice(action, state);

    case actionTypes.RESET_PURCHASE_PRICE:
      return resetPurchasePrices(action, state);

    case actionTypes.ORDER_COMPLETED:
      return {
        ...state,
        order: {
          totalSaved: action.totalSaved,
          bonusGold: action.bonusGold
        }
      };

    default:
      return state;
  }
}
