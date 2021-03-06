import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History, createBrowserHistory } from 'history';
import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import rootReducer from './root-reducer';

const initialState = {};

export const history: History = createBrowserHistory();
export const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

export function configureStore(): Store<typeof initialState> {
	const historyMiddleware = routerMiddleware(history);
	const store: Store<typeof initialState> = createStore(
		rootReducer(history),
		initialState,
		composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware))
	);

	if (module.hot) {
		module.hot.accept();

		// eslint-disable-next-line
		store.replaceReducer(require('./root-reducer').default(history));
	}

	return store;
}
