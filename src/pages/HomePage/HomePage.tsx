import * as React from 'react';
import { Box } from '@material-ui/core';
import Categories from '../../components/Categories';
import Button from '../../components/Button';

const HomePage: React.FC = () => {
    const [ s, uS] = React.useState(0);

    return (
        <>
            <Categories/>
        </>

    )
}

export default HomePage;
