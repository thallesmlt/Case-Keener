import styled from 'styled-components';

export const Container = styled.section`
    margin: 0px auto;
    width: 960px;
    max-width: 960px;
`;

export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const BotaoAcao = styled.section`
    margin: 5px;
`;

export const Titulo = styled.h1`
display: flex;
justify-content: space-between;
    font-size: 23px;
    font-family: sans-serif;
    margin: 10px 15px;
    color: #1d1e1e;
`;

export const AnteriorProximo = styled.section`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #c1c1c1;
    padding-top: 15px;
`;

export const ButtomSuccess = styled.button`
    background-color: #007281;
    color: #fff;
    padding: 5px 8px;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;  
`;


export const ButtomPrimary = styled.button`
    background-color: #007281;
    color: #fff;
    padding: 5px 8px;
    border: 1px solid #0d6efd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    :hover{
        background-color: #0d6efd;
        color: #fff;
    }
`;

export const ButtomWarning = styled.button`
    background-color: #fff;
    color: #ffc107;
    padding: 5px 8px;
    border: 1px solid #ffc107;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    :hover{
        background-color: #ffc107;
        color: #fff;
    }
`;

export const ButtomDanger = styled.button`
    background-color: #fff;
    color: #dc3545;
    padding: 5px 8px;
    border: 1px solid #dc3545;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    :hover{
        background-color: #dc3545;
        color: #fff;
    }
`;

export const ButtomInfo = styled.button`
    margin-top: 8px;
    background-color: #007281;
    color: #fff;
    padding: 5px 8px;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`;

export const Table = styled.table`
    margin-top: 15px;
    width: 100%;
    th{
        
        background-color: #007281;
        color: #f1f1f1;
        padding: 10px;
    }
    td{
        
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 8px;
    }
`;

export const TextDanger = styled.span`
    color: #ec2121;
`;

export const TextSuccess = styled.span`
    color: #198754;
`;

export const AlertDanger = styled.p`
    background-color: #f8d7da;
    color: #842029;
    margin: 10px 0;
    border: 1px solid #f5c2c7;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertSuccess = styled.p`
    background-color: #d1e7dd;
    color: #0f5132;
    margin: 10px 0;
    border: 1px solid #badbcc;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertDangerLogin = styled.p`
    color: red;
    background-color: #121214;
    margin: 10px 0;
    border: 1px solid: #121214;;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertSuccessLogin = styled.p`
    color: green;
    background-color: #121214;
    margin: 10px 0;
    border: 1px solid #badbcc;
    border-radius: 4px;
    padding: 7px;
`;


export const Form = styled.form`
    margin: 0px auto;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 16px;
    font-weight: bold;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

export const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

export const BotaoAcoes = styled.button`
    background-color: #007281;
    color: #fff;
    padding: 5px 8px;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 20px;  
`;

export const BotaoAcoesLogin = styled.button`
    background-color: #007281;
    color: #fff;
    padding: 5px 10px;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;  
`;


