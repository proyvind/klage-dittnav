import React from 'react';
import renderer from 'react-test-renderer';
import KlageFrontPage from './klage-frontpage';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';

describe('Welcome klage', () => {
    const store = configureStore();

    it('Renders correctly when there is no data', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <KlageFrontPage />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
