import React from 'react';
import { shallow } from 'enzyme';
import KlageForm from './klage-form';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

describe('Klageform', () => {
    const store = configureStore();

    it('should render klageform', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <KlageForm />
            </Provider>
        );
    });
});
