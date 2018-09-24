import styled from 'styled-components';

// export const Wrapper = styled.div`
//     grid-area: navbar;
//     input[type=text] {
//         width: 130px;
//         -webkit-transition: width 0.4s ease-in-out;
//         transition: width 0.4s ease-in-out;
//     }
//     input[type=text]:focus {
//         width: 100%;
//     }
// `;
export const CustomInput = styled.input`
    font-size: 1em;
    text-align: left;
    height: 50px;
    border-radius: ${props => (props.focused ? 15 : 15)}px;
    padding: 0.5em;
    margin-right: 50px;
    opacity: ${props => (props.focused ? 1 : 0)};
    visibility: ${props => (props.focused ? `visible` : `hidden`)};
    display: block;
    width: ${props => (props.focused ? `100%` : `40px`)};
    transition: opacity 250ms 500ms, visibility 250ms 500ms;
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
    background: white;
    border-radius: ${props => (props.focused ? 15 : 50)}px;
    width: ${props => (props.focused ? 360 : 50)}px;
    transition-duration: 0.5s;
`;
export const SearchBarIconWrapper = styled.div`
    position: absolute;
    border-radius: 50px;
    display: grid;
    background: ${props => (props.focused ? `purple` : `white`)};
    align-items: center;
    width: ${props => (props.focused ? 40 : 50)}px;
    height: 40px;
    align-self: center;
    margin-left: ${props => (props.focused ? 315 : 0)}px;
    transition-duration: 0.5s;
`;

export const PrimaryColumn = styled.div`
    flex: 2;
    width: 100%;
    display: flex;
    border-radius: 50px;
    background: white;
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
