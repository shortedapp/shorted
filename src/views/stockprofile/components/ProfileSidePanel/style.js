import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 40px;
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
