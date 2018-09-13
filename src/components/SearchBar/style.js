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
    border: 1px solid #EFEFEF;
    padding: 0.5em;
    width: 100%;
    border-radius: 10px;
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    align-items: stretch;
    width: 280px;
`

export const PrimaryColumn = styled.div`
    flex: 2;
`
export const SecondaryColumn = styled.div`
    flex: 1;
`
export const Button = styled.button`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    margin: 5px;
    border-radius: 2px;
    outline: 0;
    font-size: 12px;
    font-family: 'Avenir Next,Segoe UI', Helvetica, Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: bold;
`
