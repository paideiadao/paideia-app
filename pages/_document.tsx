import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { Box } from "@mui/material";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Space+Grotesk&family=Viga&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <script
            src="https://cdn.tiny.cloud/1/zqjhfpipuc4o31w9futmmrkk1h580wp0khen82rp6wphf1u1/tinymce/6/tinymce.min.js"
            referrerPolicy="origin"
            defer
          ></script>
        </Head>
        <body>
          <Box sx={{ position: "relative" }}>
            <Main />
            <NextScript />
          </Box>
        </body>
      </Html>
    );
  }
}
