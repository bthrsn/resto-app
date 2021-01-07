import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';
import './item-page.scss';

class ItemPage extends Component {

    componentDidMount() {
        const {RestoService, menuLoaded, menuError, menuItems, menuRequested} = this.props;
      if(menuItems.length === 0) {
        menuRequested();
        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(error => menuError());
      }
    }

    render() {
    
        const {loading, error, menuItems} = this.props,
             item = menuItems.find(el => +el.id === +this.props.match.params.id),
             {title, category, url, price, id} = item;
        
        if (loading) {
            return (
                <div className="item_page">
                    <Spinner />
               </div>
            )

        }
        
        if (error) {
            return (
                <div className="item_page">
                    <Error />
               </div>
            )
        }
                
        return (
          <div className="item_page">
                  <div className="menu__item item_block">
                      <div>{title}</div>
                      <img className="menu__img" src={url} alt={title}></img>
                      <div className="menu__category">Category: <span>{category}</span></div>
                      <div className="menu__price">Price: <span>{price}$</span></div>
                      <span className={`menu__category_Img ${category}`} ></span>
                      <button onClick={() => addedToCart(id)} className="menu__btn">
                          Add to cart
                      </button>
                  </div>
          </div>
      )
    }
};

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps =  {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
}


export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));