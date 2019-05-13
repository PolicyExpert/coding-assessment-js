import reducers from './reducers';

describe('Reducer', () => {
    describe('FETCH_IMAGES_COMPLETED', () => {
        it('appends response cards to state', () => {
            expect(
                reducers({ cards: ['foo'], pageIndex: 0, pageSize: 2 }, { type: 'FETCH_IMAGES_COMPLETED', response: ['bar'] }),
            ).toEqual({
                cards: ['foo', 'bar'],
                pageIndex: 1,
                pageSize: 2,
                loading: false,
            });
        });
    });

    describe('DISPLAY_IMAGE', () => {
        it('sets the displayImageId which displayes the full image', () => {
            expect(reducers({ displayImageId: null }, { type: 'DISPLAY_IMAGE', id: 123 })).toEqual({
                displayImageId: 123,
            });
        });

        it('clears the displayImageId if the same id is passed in order to return the displayed image to a thumbnail', () => {
            expect(reducers({ displayImageId: 123 }, { type: 'DISPLAY_IMAGE', id: 123 })).toEqual({
                displayImageId: null,
            });
        });
    });
});
