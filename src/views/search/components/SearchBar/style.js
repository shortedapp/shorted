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
    position: absolute;
    z-index: 20;
    padding: 0.5em;
    padding-right: 45px;
    padding-left: 55px;
    display: block;
    width: ${props => (props.focused ? `100%` : `100%`)};
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
    background: ${props =>
        props.focused
            ? props.searchBarBackgroundFocused
            : props.searchBarBackgroundUnfocused};
    border: 2px solid
        ${props =>
            props.focused
                ? props.searchBarBorderFocused
                : props.searchBarBorderUnfocused};
    border-radius: ${props => (props.focused ? 15 : 50)}px;
    width: 100%;
    transition-duration: 0.5s;
    top: 30px;
    z-index: 20;
`;

export const SearchBarIconWrapper = styled.div`
    position: absolute;
    border-radius: 50px;
    display: grid;
    background: ${props =>
        props.focused
            ? props.searchIconBackgroundFocused
            : props.searchIconBackgroundUnfocused};
    align-items: center;
    width: ${props => (props.focused ? 40 : 45)}px;
    height: ${props => (props.focused ? 40 : 45)}px;
    align-self: center;
    margin-left: 10px;
    transition-duration: 150ms;
    z-index: 22;
`;
export const SearchBarClearIconWrapper = styled.div`
    border-radius: 50px;
    display: grid;
    background: ${props =>
        props.focused
            ? props.searchClearIconBackgroundFocused
            : props.searchClearIconBackgroundUnfocused};
    align-items: center;
    align-self: center;
    margin-left: 96%;
    transition-duration: 150ms;
    z-index: 22;
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
