import "@emotion/react";

import { Theme as MaterialUITheme } from "@mui/material/styles";

// This allows Typescript autocompletion to work with the theme object when using Emotion styled components.
declare module "@emotion/react" {
  export interface Theme extends MaterialUITheme {}
}
