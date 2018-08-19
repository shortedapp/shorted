import styled from 'styled-components'

export const DashboardWrapper = styled.div`
    display: grid;
    background: ${props => props.background};
    .content {
        display: grid;

        @media (min-width: 1024px) {
            grid-gap: 5px;
            grid-template-columns: 22vw 22vw 1fr;
            grid-template-rows: 22vw 22vw 1fr 1fr;
            grid-template-areas:
                'top-graph top-graph top-graph top-graph top-right'
                'top-graph top-graph top-graph top-graph top-right'
                'top-alerts top-alerts top-movers top-movers'
                'top-alerts top-alerts top-movers top-movers';
        }
        @media (min-width: 1280px) {
            grid-gap: 13px;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 15vw 15vw 1fr 1fr;
            grid-template-areas:
                'top-list top-graph top-graph top-right'
                'top-list top-graph top-graph todo'
                'top-list top-alerts top-alerts top-movers'
                'top-list top-alerts top-alerts top-movers';
        }
    }
    .top-right {
        grid-area: top-right;
        display: grid;
        grid-gap: 10px;
        grid-template-rows: repeat(3, 85px);
        grid-template-columns: 1fr;
        grid-template-areas:
            'legend'
            'legend'
            'legend'
            'legend';
    }
`

export const duration = 300

export const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exited: { opacity: 0 }
}

export const themes = [
  {
    name: 'dark',
    textColor: '#ffffff',
    backgroundColor: '#000000'
  },
  {
    name: 'light',
    textColor: '#000000',
    backgroundColor: '#ffffff'
  }
]
