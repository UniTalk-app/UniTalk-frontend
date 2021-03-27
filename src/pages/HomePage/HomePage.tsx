import * as React from 'react';

import Button from '../../components/Button';

const HomePage: React.FC = () => {
    const [ s, uS] = React.useState(0);

    return (
        <Button onClick={() => uS(p => p+1)} label={`You clicked ${s} times`} />
    )
}

export default HomePage;
