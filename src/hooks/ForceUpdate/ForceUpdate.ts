import * as React from "react";

// eslint-disable-next-line
const useForceUpdate = () => {
    const [, setValue] = React.useState(0); // integer state
    return () => setValue(value => value + 1);
};

export default useForceUpdate;