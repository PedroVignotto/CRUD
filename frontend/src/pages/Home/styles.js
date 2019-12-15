import styled from 'styled-components';

export const Title = styled.h1`
  text-align: center;
  color: #7159c1;
  font-weight: bold;
  line-height: 8px;
  padding: 64px 0 0 0;
`;

export const Content = styled.section`
  display: flex;
  align-items: center;
  padding: 32px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    input {
      background-color: transparent;
      color: #444;
      padding: 6px 10px;
      width: 200px;
      border: none;
      font-weight: bold;
      border-bottom: #999 solid 3px;
      transition: all 0.2s;

      :focus {
        border-bottom: #7159c1 solid 3px;
      }

      ::placeholder {
        color: #999;
      }
    }
  }

  button {
    border: 0;
    background: 0;
  }
`;

export const List = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;

  th,
  td {
    text-align: center;
    color: #444;
    border: 1px solid #444;
    padding: 24px;

    :last-of-type {
      text-align: center;
    }
  }

  th {
    font-weight: 700;
    text-transform: uppercase;
  }

  td:nth-last-child(2) {
    text-align: left;
  }

  button {
    font-size: 15px;
    color: #7159c1;
    font-weight: 700;
    background: none;
    border: 0;

    + button {
      color: #de3b3b;
      margin-left: 24px;
    }
  }

  strong {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: #7159c1;
  }
`;
