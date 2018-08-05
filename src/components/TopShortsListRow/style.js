import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
    "code name name name percentage";
    margin: 2px;
    margin-left: 4px;
    margin-right: 4px;
    height: 51px;
    background: #dadada;
    border-radius: 0 30px 30px 0;
    padding-top: 4px;
    padding-bottom: 4px

`

export const Name = styled.div`
    grid-area: name;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
`

export const Code = styled.div`
grid-area: code;
display: flex;
flex-direction: column;
justify-content: center;
vertical-align: middle;
.code {
        background-color: gray;
        width: 60px;
        height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        margin-left: 5px;
    }
`

export const Percent = styled.div`
grid-area: percentage;
float: right;
margin-left: auto;
padding-right: 5px;
display: flex;
flex-direction: column;
justify-content: center;
vertical-align: middle;

.circle {
    background: #f98080;
    height: 51px;
    width: 51px;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    text-align: center;
    font-size: 15px;
}
`