import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;

    display: flex;
    flex-direction: column;
    float: right;
    margin-left: auto;
    background: gray;
    width: 100%;
    height: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-rows: repeat(4, 80px);
    grid-template-columns: 1fr;
    grid-template-areas:
        'themepicker'
        'legend'
        'legend'
        'legend'
        'legend';
`;
