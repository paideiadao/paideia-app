import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Wrapper, Title, Description, StyledButton } from "./ErrorPage.styles";

interface ErrorPageProps {
  title: string;
  description?: string;

  withRetry?: boolean;
  onRetry?: () => void;

  withGoBack?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const router = useRouter();

  const { title, description, withRetry, onRetry, withGoBack } = props;

  const handleRetry = () => {
    onRetry ? onRetry() : router.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Wrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      <div>
        {withRetry && <Button onClick={handleRetry}>Retry</Button>}
        {withGoBack && (
          <StyledButton onClick={handleGoBack}>Go Back</StyledButton>
        )}
      </div>
    </Wrapper>
  );
};

export default ErrorPage;
