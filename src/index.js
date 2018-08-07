import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routing from './Routes';
import {Provider} from 'react-redux';
import {store} from './store/index';
import Loading from './container/Loader';

ReactDOM.render(<Provider store={store}><div><Loading/><Routing /></div></Provider>, document.getElementById('root'));
registerServiceWorker();
