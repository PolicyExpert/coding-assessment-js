import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import App, { Card, Thumbnail } from './App';

describe('App', () => {
    it('renders cards on state', () => {
        const { wrapper } = renderConnectedApp();
        expect(wrapper.find(Card)).toHaveLength(2);
    });

    it('first render displays all cards with a different picsum thumbnails', () => {
        const { wrapper } = renderConnectedApp();
        wrapper.find(Card).forEach(card =>
            expect(
                card
                    .find(Thumbnail)
                    .find('img')
                    .prop('src'),
            ).toBe('https://picsum.photos/150/150?grayscale&' + card.prop('card').id),
        );
    });

    it('clicking a Card displays the full image', () => {
        const { wrapper, firstCard } = renderConnectedApp();

        expect(firstCard().is('.displayed')).toBe(false);
        firstCard().simulate('click');
        expect(firstCard().is('.displayed')).toBe(true);
    });

    it('clicking a displayed Card hides the image goes back to displaying the thumbnail', () => {
        const { wrapper, firstCard } = renderConnectedApp();

        firstCard().simulate('click');
        expect(firstCard().is('.displayed')).toBe(true);

        firstCard().simulate('click');
        expect(firstCard().is('.displayed')).toBe(false);

        expect(wrapper.find('.displayed')).toHaveLength(0);
    });
});

const renderConnectedApp = () => {
    const store = require('./redux/store').default();

    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>,
    );

    const firstCard = () => wrapper.find('.card').first();

    store.dispatch({ type: 'FETCH_IMAGES_COMPLETED', response: [{ id: 1 }, { id: 2 }] });
    wrapper.update();

    return { wrapper, store, firstCard };
};
