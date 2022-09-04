import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root{
        --white:#fff;
        --bluePrimary:#2196f3;
        --blueSecondary : #1769aa;
        --pinkPrimary: #f50057;
        --pinkSecondary:#f73378;
        --yellowPrimary:#ffeb3b;
        --redPrimary : #f44336;
        --greenPrimary:#4caf50;
        --grey:#f3f3f3;
        --font-size-XL:2rem;
        --font-size-L:1.5rem;
        --font-size-M:1.2rem;
        --font-size-S:1rem;
        --font-size-XS:0.8rem;
    }
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family :'Raleway' , sans-serif;
    }
    h1,h2,h3{
        text-align:center;
    }
    button{
        cursor:pointer;
    }
    button:disabled{
        opacity : 0.5;
        cursor:not-allowed;
    }
   
    body{
     /* a {
        text-decoration:none;
        color:#000;
     } */
    }
    .not-found{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        a{
            width:300px;
        }
    }

    .errMsg {
      padding: 10px;
      border: 2px solid red;
      background-color: pink;
      color: red;
   }
   .hidden {
      display: none;
   }

   .instructions{
    padding:5px 10px;
    background-color:var(--yellowPrimary);
    font-size:14px;
   }

   .valid,
   .invalid{
    margin-left:5px;
   }

   .valid{
    color : var(--greenPrimary);
   }

   .invalid{
    color:var(--redPrimary);
   }
   .submit-btn{
     display:block;
     margin:20px auto;
     padding : 10px 60px;
     font-size:20px;
     background-color:var(--pinkPrimary);
     border:none;
     color:var(--white);
     letter-spacing:2px;
   }
`;
