import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';

import Background from './food-bg.jpg';

const App = () => {
    
    return (
    <Router>
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <Route path='/' exact component={MainPage} />
            <Route path='/cart' component={CartPage} />
            {/* <Route path='/:id' component={ItemPage} /> */}
        </div>
    </Router>
    )
}

export default App;