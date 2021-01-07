import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {removeFromCart} from '../../actions';
import WithRestoService from '../hoc';

const CartTable = ({items, removeFromCart, RestoService}) => {
  return (
      <> 
          <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
              {
                items.map( item => {
                  const {title, price, url, id, quantity} = item;
                    return (
                      <div key={id} className="cart__item">
                        <img src={url} className="cart__item-img" alt={title}></img>
                        <div className="cart__item-title">{title}</div>
                        <div className="cart__item-price">{price}$ x{quantity}</div>
                        <div onClick={() => removeFromCart(id)} className="cart__close">&times;</div>
                      </div>
                    )  
                  })
              }
          </div>
          <button onClick={() => RestoService.setOrder(generateOrder(items))}
          className="order">
            Оформить заказ
          </button>
      </>
  )
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            quantity: item.quantity
        }
    })
    return newOrder;
}

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    removeFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));