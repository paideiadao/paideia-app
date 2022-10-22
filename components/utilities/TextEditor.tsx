import * as React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";

const TextEditor: React.FC<{
  hidePlugins?: boolean;
  hideToolbar?: boolean;
  onChange: Function;
  initial: string;
  height?: string;
  readOnly?: boolean;
}> = (props) => {
  var plugins =
    props.hidePlugins === true
      ? ""
      : "print preview fullpage searchreplace autolink directionality visualblocks \
                visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking \
                anchor toc insertdatetime advlist lists textcolor wordcount imagetools \
                contextmenu colorpicker textpattern";

  var toolbar1 =
    props.hideToolbar == false
      ? ""
      : "sizeselect | fontselect | fontsizeselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright  \
                | numlist bullist outdent indent";

  const themeContext = React.useContext(ThemeContext);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  const [color, setColor] = React.useState<any>(
    themeContext.theme === DarkTheme
      ? {
          skin: "oxide-dark",
          content_css: "dark",
        }
      : {}
  );
  React.useEffect(() => {
    setColor({
      skin: themeContext.theme === DarkTheme ? "oxide-dark" : "",
      // 2. The content CSS should be dark as well or your eyes will burn
      // You can use the default dark, or create your own rules specifying the
      // path to the css file
      // content_css : "https://cdn.mywebsites.com/css/custom_tinymce_rules.css",
      content_css: themeContext.theme === DarkTheme ? "dark" : "",
    });
  }, [themeContext.theme]);

  return (
    <Editor
      apiKey=""
      // initialValue={props.initial}
      init={{
        height: props.height == null ? "50vh" : props.height,
        width: "100%",

        plugins: plugins,
        toolbar1: toolbar1,
        content_style: "body {font-size: 11;}",
        fontsize_formats:
          "8pt 9pt 10pt 10.5pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
        ...color,
      }}
      // value={props.value}
      onEditorChange={(e: any) => {
        console.log(e);
        props.onChange(e);
      }}
      disabled={props.readOnly}
    />
  );
};

export default TextEditor;

// modals and links !!!!!
