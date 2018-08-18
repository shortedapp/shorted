import styled from 'styled-components';
export const duration = 500;
export const transitionStyles = {
  entering: { opacity: 0, Ypos: 500},
  entered: { opacity: 1, Ypos: 0},
  exited: { opacity: 0}
};

export const Wrapper = styled.div`
    grid-area: top-graph;
    display: grid;
    grid-template-rows: 60px 850px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "none picker options"
      "chart chart chart";
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    max-width: 1200px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #eee;
`
export const ChartWrapper = styled.div`
  grid-area: chart;
`
export const PickerWrapper = styled.div`
  grid-area: picker;
  display: flex;
  vertical-align: middle;
  justify-content: center;
`
export const OptionsWrapper = styled.div`
  grid-area: options;
  display: flex;
  justify-content: flex-end;
`
export const intervals = {
  d: 2,  
  w: 7,
  m: 40,
  y: 100

  
}
export const colors700 = [
  "#D32F2F",
  "#303F9F",
  "#00796B",
  "#388E3C",
  "#388E3C",
  "#F57C00",
  "#455A64",
  "#5D4037",
  "#C2185B",
  "#7B1FA2",
  "#00796B",
  "#7B1FA2",
  "#C2185B"
]
export const colors300 = [
  "#E57373",
  "#F06292",
  "#7986CB",
  "#9575CD",
  "#7986CB",
  "#64B5F6",
  "#F06292",
  "#E57373",
  "#FFB74D",
  "#BCAAA4",
  "#FFF176"
]