import styled from 'styled-components';

export const Spinner = styled.div`
   width: 150px;
   height: 150px;
   border-radius: 50%;
   margin: 50px auto;
   border: 15px solid var(--bluePrimary);
   border-left-color: var(--pinkPrimary);
   border-right-color: var(--pinkPrimary);
   animation: spinner 1s linear infinite;

   @keyframes spinner {
      from {
         transform: rotate(0deg);
      }
      to {
         transform: rotate(360deg);
      }
   }
`;
