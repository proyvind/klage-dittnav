import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from './pageTitle';

describe('Page title', () => {
    it('should render page title', () => {
        const wrapper = shallow(<PageTitle />);
    });
});
