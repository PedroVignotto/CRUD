import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  margin-bottom: 16px;

  > span:first-child {
    color: #de3b3b;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    width: 100%;
    margin: 8px 0 4px;
    border-radius: 4px;
    transform: none;
    animation: fadeIn 350ms ease-in-out 1;

    @keyframes fadeIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }

  div.css-1pahdxg-control {
    box-shadow: none;
    outline: none;
    border-color: #444;
  }

  div.css-yk16xz-control {
    border: 1px solid #444;
    border-radius: 4px;
    height: 40px;
    color: #444;
    background: none;
    transition: 180ms ease-in-out;
    box-shadow: none;

    :focus {
      box-shadow: none;
    }

    svg {
      color: #444 !important;
    }
  }

  strong {
    color: #444;
    font-weight: 500;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
`;
