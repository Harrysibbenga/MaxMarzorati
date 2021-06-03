<template>
  <div>
    <ckeditor
      :editor="editor"
      :config="editorConfig"
      :value="content"
      @input="(content) => $emit('update:content', content)"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import HeadingPlugin from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import BlockToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar";
import Link from "@ckeditor/ckeditor5-link/src/link";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Font from "@ckeditor/ckeditor5-font/src/font";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  model: {
    prop: "content",
    value: "input",
  },
  data() {
    return {
      mainContent: "",
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          Base64UploadAdapter,
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          EasyImage,
          ParagraphPlugin,
          HeadingPlugin,
          Image,
          ImageToolbar,
          ImageCaption,
          ImageStyle,
          ImageResize,
          Strikethrough,
          Underline,
          Indent,
          BlockToolbar,
          Link,
          AutoLink,
          Table,
          TableToolbar,
          TableProperties,
          TableCellProperties,
          Alignment,
          Font,
          FontFamily,
          Autoformat,
        ],
        fontFamily: {
          options: [
            "default",
            "Ubuntu, Arial, sans-serif",
            "Ubuntu Mono, Courier New, Courier, monospace",
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [9, 11, 13, "default", 17, 19, 21],
        },
        fontColor: {
          colors: [
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "#010e5c",
              label: "Blue",
            },
            {
              color: "#cba052",
              label: "Yellow",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
            {
              color: "hsl(0, 0%, 100%)",
              label: "White",
              hasBorder: true,
            },
          ],
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
          ],
        },
        link: {
          // Automatically add target="_blank" and rel="noopener noreferrer" to all external links.
          addTargetToExternalLinks: true,

          // Let the users control the "download" attribute of each link.
          decorators: [
            {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "download",
              },
            },
          ],
        },
        toolbar: [
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "imageUpload",
          "insertTable",
          "|",
          "alignment",
          "outdent",
          "indent",
          "|",
          "link",
          "undo",
          "redo",
        ],
        language: "en",
        image: {
          toolbar: [
            "imageTextAlternative",
            "|",
            "imageStyle:full",
            "imageStyle:side",
            "|",
            "imageStyle:alignLeft",
            "imageStyle:alignRight",
            "imageStyle:alignCenter",
          ],
          styles: ["full", "alignLeft", "alignRight", "side", "alignCenter"],
        },
        alignment: {
          options: ["left", "right"],
        },
        tableProperties: {
          borderColors: [
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "#010e5c",
              label: "Blue",
            },
            {
              color: "#cba052",
              label: "Yellow",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
            {
              color: "hsl(0, 0%, 100%)",
              label: "White",
            },
          ],
          backgroundColors: [
            {
              color: "hsl(0, 0%, 0%)",
              label: "Black",
            },
            {
              color: "#010e5c",
              label: "Blue",
            },
            {
              color: "#cba052",
              label: "Yellow",
            },
            {
              color: "hsl(0, 0%, 30%)",
              label: "Dim grey",
            },
            {
              color: "hsl(0, 0%, 60%)",
              label: "Grey",
            },
            {
              color: "hsl(0, 0%, 90%)",
              label: "Light grey",
            },
            {
              color: "hsl(0, 0%, 100%)",
              label: "White",
            },
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  },
};
</script>
