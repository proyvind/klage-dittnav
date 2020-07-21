import React from 'react';
import renderer from 'react-test-renderer';
import './tests/matchMedia.mock';
import App from './App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
    }))
});

describe('Welcome klage', () => {
    const store = configureStore();

    it('Renders correctly when there is no data', () => {
        const tree = renderer
            .create(
                <Provider store={store}>
                    <App />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
