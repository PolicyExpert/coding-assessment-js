import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import rootReducer from './reducers';
import epics from './epics';

function createStoreInstance() {
    const rootEpic = combineEpics(...Object.values(epics));
    const epicMiddleware = createEpicMiddleware();

    const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

    epicMiddleware.run(rootEpic);

    store.dispatch({ type: 'FETCH_IMAGES' });

    return store;
}

export default createStoreInstance;
