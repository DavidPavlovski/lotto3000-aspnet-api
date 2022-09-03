import styled from 'styled-components';

export const Form = styled.form`
   width: 50%;
   display: flex;
   gap: 10px;
   flex-direction: column;
   margin: 0 auto;
   padding: 20px;
   border: 1px solid black;

   button {
      height: 40px;
      width: 50%;
      margin: 0 auto;
      background-color: var(--bluePrimary);
      color: var(--white);
      border: none;
      font-size: 18px;
      letter-spacing: 1px;
      font-weight: 500;
   }
`;

export const FormInput = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 5px;
   width: 100%;
   height: 100%;
   input {
      width: 100%;
      height: 40px;
      text-indent: 10px;
      flex-grow: 1;
      font-size: 16px;
   }
   label {
      margin-left: 15px;
   }
`;

export const Success = styled.section`
   margin: 50px auto;
   width: 50%;
   border: 2px solid black;
`;
