import styled from 'styled-components';

export const Container = styled.div`
  padding: 64px 0 0 0;

  > div {
    display: flex;
    align-items: center;
    padding-left: 32px;

    h1 {
      text-align: center;
      color: #7159c1;
      font-weight: bold;
      line-height: 8px;
      margin: 0 auto;
    }

    button {
      border: 0;
      background: none;
      align-self: flex-start;
    }
  }

  form {
    padding: 32px;

    button {
      float: right;
      padding: 16px 32px;
      border: 2px solid #7159c1;
      color: #7159c1;
      font-weight: bold;
      font-size: 16px;
      background: #fff;
      transition: all 0.5s;

      :hover {
        background: #7159c1;
        color: #fff;
      }
    }
  }
`;
