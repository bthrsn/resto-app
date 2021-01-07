const initialState = {
  menu: [],
  loading: true,
  error: false,
  items: [],
  totalPrice: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false,
      };
    case 'MENU_REQUESTED':
      return {
        ...state,
        menu: state.menu,
      };
    case 'MENU_ERROR':
      return {
        ...state,
        menu: state.menu,
        error: true
      };
    case 'ITEM_ADD_TO_CART':
      const id = action.payload,
            addingItemIndex = state.items.findIndex(item => item.id === id);
      if (addingItemIndex >= 0) {
        const itemInState = state.items.find(item => item.id === id),
              newItem = {
                ...itemInState,
                quantity: ++itemInState.quantity
              }
        return {
          ...state,
          items: [
            ...state.items.slice(0, addingItemIndex),
            newItem,
            ...state.items.slice(addingItemIndex + 1),  
          ],
          totalPrice: state.totalPrice + newItem.price
        }
      }
      // в случае, если этого товара не было раньше в корзине
      const item = state.menu.find(item => item.id === id),
            // формируем новый объект
            newItem = {
              title: item.title,
              price: item.price,
              url: item.url,
              id: item.id,
              quantity: 1
            }
      return {
        ...state,
        items:  [
          ...state.items,
          newItem
        ],
        totalPrice: state.totalPrice + newItem.price
      };
    case 'ITEM_REMOVE_FROM_CART':
      const index = action.payload,
            removingItemIndex = state.items.findIndex(item => item.id === index),
            price = state.items[removingItemIndex]['price'] * state.items[removingItemIndex]['quantity'];
            // формируем новый объект
      return {
        ...state,
        items:  [
          ...state.items.slice(0, removingItemIndex),
          ...state.items.slice(removingItemIndex + 1),
        ],
        totalPrice: state.totalPrice - price
      };
    default:
      return state;
  }
}

export default reducer;