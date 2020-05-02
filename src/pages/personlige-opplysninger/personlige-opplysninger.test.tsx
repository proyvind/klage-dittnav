import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from '../../store/configureStore';
import PersonligeOpplysningerPage from './personlige-opplysninger-page';

describe('Welcome klage', () => {
    const store = configureStore();

    it('Renders correctly when there is no data', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <PersonligeOpplysningerPage />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
