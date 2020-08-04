import styled from 'styled-components';

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    background: ${props => props.profileGraphWidgetBackground};
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
