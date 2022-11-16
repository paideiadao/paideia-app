import React from "react";
import { Typography, List, ListItem, useTheme, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "@components/Link";
import Blockquote from "@components/Blockquote";
import Code from "@components/Code";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import rangeParser from "parse-numeric-range";
import oneDark from "@theme/oneDark";
import oneLight from "@theme/oneLight";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

const MarkdownRender = (props: { description: string }) => {
  const theme = useTheme();
  const syntaxTheme = theme.palette.mode === "dark" ? oneDark : oneLight;
  // const themeContext = useContext(ThemeContext);
  // const theme = themeContext.theme;
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <Typography
            id={props.children[0].toString().split(" ").join("-")}
            variant="h1"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => <Typography variant="h2" {...props} />,
        h3: ({ node, ...props }) => <Typography variant="h3" {...props} />,
        h4: ({ node, ...props }) => <Typography variant="h4" {...props} />,
        h5: ({ node, ...props }) => <Typography variant="h5" {...props} />,
        h6: ({ node, ...props }) => <Typography variant="h6" {...props} />,
        p: ({ node, ...props }) => <Typography variant="body2" {...props} />,
        ul: ({ node, ...props }) =>
          props.depth === 0 ? (
            <List
              dense
              disablePadding
              sx={{
                pl: "40px",
                pb: "32px",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                letterSpacing: "0.0225em",
                listStyleType: "disc",
                "& li": {
                  display: "list-item",
                  pl: 0,
                },
              }}
              {...props}
            />
          ) : (
            <List
              dense
              disablePadding
              sx={{
                pl: "40px",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                letterSpacing: "0.0225em",
                listStyleType: "circle",
                "& li": {
                  display: "list-item",
                  pl: 0,
                },
                "& li:first-child": {
                  pt: "8px",
                },
                "& li:last-child": {
                  pb: 0,
                },
              }}
              {...props}
            />
          ),
        li: ({ node, ...props }) => <ListItem {...props} />,
        ol: ({ node, ...props }) =>
          props.depth === 0 ? (
            <List
              component="ol"
              dense
              disablePadding
              sx={{
                pl: "40px",
                mb: "32px",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                letterSpacing: "0.0225em",
                listStyleType: "decimal",
                "& li": {
                  display: "list-item",
                  pl: 0,
                },
              }}
              {...props}
            />
          ) : (
            <List
              component="ol"
              dense
              disablePadding
              sx={{
                pl: "40px",
                fontSize: "0.9rem",
                lineHeight: 1.5,
                letterSpacing: "0.0225em",
                listStyleType: "upper-alpha",
                "& li": {
                  display: "list-item",
                  pl: 0,
                },
                "& li:first-child": {
                  pt: "8px",
                },
                "& li:last-child": {
                  pb: 0,
                },
              }}
              {...props}
            />
          ),
        a: ({ node, ...props }) => (
          <Link sx={{ wordBreak: "break-all" }} href={props.href} {...props} />
        ),
        blockquote: ({ node, ...props }) => <Box component="blockquote" sx={{ borderLeft: '3px solid', pl: '12px', mb: '24px' }} {...props} />,
        code({ node, inline, className, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const hasMeta = node?.data?.meta;

          const applyHighlights: object = (applyHighlights: number) => {
            if (hasMeta) {
              const RE = /{([\d,-]+)}/;
              // @ts-ignore
              const metadata = node.data.meta?.replace(/\s/g, "");
              const strlineNumbers = RE?.test(metadata)
                ? RE?.exec(metadata)[1]
                : "0";
              const highlightLines = rangeParser(strlineNumbers);
              const highlight = highlightLines;
              const data: string = highlight.includes(applyHighlights)
                ? "highlight"
                : null;
              return { data };
            } else {
              return {};
            }
          };

          return match ? (
            <SyntaxHighlighter
              // @ts-ignore
              style={syntaxTheme}
              language={match[1]}
              PreTag="div"
              className="codeStyle"
              showLineNumbers={false}
              wrapLines={true}
              useInlineStyles={true}
              lineProps={applyHighlights}
              {...props}
            />
          ) : (
            <Code {...props} />
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
    >
      {props.description}
    </ReactMarkdown>
  );
};

export default MarkdownRender;
