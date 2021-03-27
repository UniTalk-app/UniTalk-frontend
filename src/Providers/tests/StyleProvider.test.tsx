import * as React from 'react';
import { render } from '@testing-library/react';

import StyleProvider from '../StyleProvider';

const mockText = 'This is a testing component';
const MockComponent = () => <div>{mockText}</div>

describe('StyleProvider', () => {
    test('renders children correctly', () => {
        const {getByText} = render(<StyleProvider><MockComponent /></StyleProvider>);

        expect(getByText(mockText)).toBeTruthy();
    });

});