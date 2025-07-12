import styled, { keyframes } from 'styled-components';

const ldsDefault = keyframes`
  0%, 20%, 80%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
`;

export const Dot = styled.span<{ $delay: string }>`
  width: 0.25rem;
  height: 0.25rem;
  background-color: #8b5cf6;
  border-radius: 9999px;
  display: inline-block;
  animation: ${ldsDefault} 1.2s linear infinite;
  animation-delay: ${props => props.$delay};
`;