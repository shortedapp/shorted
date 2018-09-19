import styled from 'styled-components';

export const duration = 100;

export const transitionStyles = {
    entering: {opacity: 0, width: 0},
    entered: {opacity: 1, width: 310},
    exited: {opacity: 0, width: 0},
};

export const CustomInput = styled.input`
    font-size: 1em;
    text-align: left;
    height: 50px;
    border-radius: ${props => (props.focused ? 15 : 15)}px;
    background: transparent;
    padding: 0.5em;
    margin-right: 0px;
    margin-left: 55px;
    display: block;
    width: ${props => (props.focused ? `100%` : `50px`)};
    transition: ${props => `${props.duration}ms ease-in`};
    transition-property: width, opacity, transform;
    /* transition: opacity 250ms 500ms, visibility 250ms 500ms; */
    outline: none;
    border: none;
    &:focus {
        outline: none;
    }
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    height: 50px;
    align-items: stretch;
    border: 2px solid ${props => (props.focused ? `#1890ff` : `gray`)};
    background: ${props => (props.focused ? `white` : `white`)};
    border-radius: ${props => (props.focused ? 15 : 50)}px;
    width: ${props => (props.focused ? 400 : 50)}px;
    transition-duration: 250ms;
`;
export const SearchBarIconWrapper = styled.div`
    position: absolute;
    border-radius: 50px;
    display: grid;
    background: ${props => (props.focused ? `#e6e6e6` : `#e6e6e6`)};
    align-items: center;
    width: ${props => (props.focused ? 40 : 50)}px;
    height: ${props => (props.focused ? 40 : 50)}px;
    align-self: center;
    margin-left: ${props => (props.focused ? 10 : 0)}px;
    transition-duration: 150ms;
`;

export const PrimaryColumn = styled.div`
    flex: 2;
    width: 100%;
    display: flex;
    border-radius: 50px;
    background: transparent;
`;
export const SecondaryColumn = styled.div`
    flex: 1;
`;
export const Button = styled.button`
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    outline: 0;
    height: 100%;
`;
