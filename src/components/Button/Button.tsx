import * as React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@material-ui/core';

// Props types definition
type ButtonProps = {
    label: string;
} & MUIButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
    const {
        label,
        ...otherProps
    } = props;
    return (
        <MUIButton {...otherProps}>
            { label }
        </MUIButton>
    )
};

export default Button;
