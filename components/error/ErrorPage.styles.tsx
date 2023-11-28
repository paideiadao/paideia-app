import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const Wrapper = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Description = styled.p`
  color: ${(
    { theme } // @ts-ignore
  ) => theme.palette.text.secondary};
  text-align: center;
`;

export const StyledButton = styled(Button)`
  margin-left: 20px;
`;
