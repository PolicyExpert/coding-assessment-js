import { ajax } from 'rxjs/ajax';

import * as epics from './epics';
import createStore from '../store';

describe('Epics', () => {
    describe('fetchImages', () => {
        it('fetches images from api', () => {
            const spy = jest.spyOn(ajax, 'getJSON');
            createStore();

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/photos');
        });
    });

    describe.only('fetchImagesOnScroll', () => {
        it('fetches images from api', () => {
            epics.fetchImagesOnScroll(null, { value: { cards: [] } }).subscribe(val => console.log(val));
        });
    });
});
