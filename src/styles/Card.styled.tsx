import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;

    @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const CardTitle = styled.h3`
  color: #333;
  font-size: 20px;
  margin: 0;
`;

export const CardContent = styled.p`
  color: #666;
  font-size: 16px;
`;