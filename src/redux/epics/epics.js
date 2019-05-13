import { ofType } from 'redux-observable';
import { fromEvent } from 'rxjs';
import { concatMap, map, debounceTime, takeWhile, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

//////////////////////////////////////
//////////// fetch images ////////////

const fetchImagesCompleted = response => ({ type: 'FETCH_IMAGES_COMPLETED', response });

export const fetchImages = action$ =>
    action$.pipe(
        ofType('FETCH_IMAGES'),
        concatMap(() => ajax.getJSON('https://jsonplaceholder.typicode.com/photos').pipe(map(fetchImagesCompleted))),
    );

//////////////////////////////////////
//////////// scroll event ////////////

const scrollEventSource = fromEvent(document, 'scroll');
const fetchImagesAction = () => ({ type: 'FETCH_IMAGES' });

export const fetchImagesOnScroll = (action$, state$) => {
    const stream = scrollEventSource.pipe(
        debounceTime(300),
        takeWhile(() => state$.value.cards.length < 1000),
        filter(() => window.scrollY >= document.documentElement.offsetHeight - window.innerHeight - 300),
        map(fetchImagesAction),
    );

    return stream;
};
