import React from 'react';
import styled, {keyframes, css} from "styled-components";

const spin = keyframes`
to {
    transform: rotate(360deg);
}`;

const container = styled.div({
    width: '80px',
    margin: '0 auto'
});

const LoadingSpinner = styled.div({
    display: 'block',
    width: '50px',
    height: '50px',
    border: '7px solid #75bf7f',
    borderRadius: '50%',
    borderTopColor: '#69a170',
    animation: css`${spin} 1s linear infinite`
});

const Spinner = () => {

    return(
     <LoadingSpinner className='spinner'/>
    );
}
export default Spinner;