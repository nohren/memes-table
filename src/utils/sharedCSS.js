import styled from 'styled-components';

export const TextContainer = styled.div`
  max-width: 1100px;
  margin: clamp(12px, 2vw, 20px) auto;
  padding: clamp(14px, 2.2vw, 22px);
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  line-height: 1.85;
  color: var(--fg);
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  backdrop-filter: blur(8px) saturate(130%);
  -webkit-backdrop-filter: blur(8px) saturate(130%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
`;

export const ClickableElement = styled.div`
  cursor: pointer;
  color: var(--fg);
  opacity: 0.9;
  transition: color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    color: var(--accent);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 227, 255, 0.35);
    border-radius: 10px;
  }
`;
