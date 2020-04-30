import React from 'react';
import { shallow } from 'enzyme';
import WelcomeKlage from './welcomeKlage';

describe('Welcome klage', () => {
    it('should render welcome klage', () => {
        const wrapper = shallow(<WelcomeKlage />);
    });
});
