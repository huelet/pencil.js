/* eslint-disable no-unused-vars */
/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/react";
import {
	Anchor,
	Bold,
	BulletList,
	ChevronUp,
	Close,
	Italic,
	OpenInNew,
	Strikethrough
} from "@fdn-ui/icons-react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "./styles/globals.css";

export interface EditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disableMarkdown?: boolean
  forcePreviewDisabled?: boolean
}

export const Editor = ({
	value,
	onChange,
	placeholder,
	disableMarkdown,
	forcePreviewDisabled
}: EditorProps) => {
	marked.setOptions({
		renderer: new marked.Renderer(),
		highlight: function (code, lang) {
			const language = hljs.getLanguage(lang) ? lang : "plaintext";
			return hljs.highlight(code, { language }).value;
		},
		langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
		pedantic: false,
		gfm: true,
		breaks: true,
		smartLists: true,
		smartypants: true,
		xhtml: true
	});
	const [preview, togglePreview] = React.useState(false);
	const [charCount, setCharCount] = React.useState(0);
	const text = React.useRef<any>(null);
	return (
		<div
			className='editor'
			css={css`
        background-color: rgb(27, 27, 27);
        padding: 0.75rem;
      `}
		>
			<div
				css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        `}
			>
				<div
					css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 15%;
          `}
				>
					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => onChange(`${value} **`)}
					>
						<Bold fill='white' />
					</div>
					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => onChange(`${value} *`)}
					>
						<Italic fill='white' />
					</div>
					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => onChange(`${value} ~~`)}
					>
						<Strikethrough fill='white' />
					</div>
					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
              color: rgb(255, 255, 255);
              font-weight: 900;
            `}
						onClick={() => onChange(`${value} \``)}
					>
            &lt;/&gt;
					</div>
				</div>
				<div
					css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 7%;
          `}
				>
					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => onChange(`${value} \n\t- `)}
					>
						<BulletList fill='white' />
					</div>

					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => {
							// TODO: Use a popup, rather than window.prompt()
							const embedLink = window.prompt(
								"Enter a link to embed",
								"https://"
							);
							onChange(`${value}\n~(${embedLink})~`);
						}}
					>
						<Anchor fill='white' />
					</div>

					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              cursor: pointer;
            `}
						onClick={() => {
							// TODO: Use a popup, rather than window.prompt()
							const embedLink = window.prompt("Enter a link", "https://");
							onChange(`${value} [${embedLink}](${embedLink})`);
						}}
					>
						<ChevronUp
							fill='white'
							css={css`
                transform: rotate(45deg);
              `}
						/>
					</div>
				</div>
				<div
					css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 7%;
          `}
				>
					<div
						css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => {
							onChange("");
						}}
					>
						<Close fill='white' />
					</div>

					<div
						css={css`
              display: ${forcePreviewDisabled ? "hidden" : "flex"};
              flex-direction: row;
              align-items: center;
              padding: 0.25rem;
              cursor: pointer;
            `}
						onClick={() => {
							togglePreview(!preview);
						}}
					>
						<OpenInNew fill='white' />
					</div>
				</div>
			</div>
			<textarea
				placeholder={placeholder ? placeholder : "You can use Markdown here!"}
				spellCheck={false}
				value={value}
				ref={text}
				onChange={(e: any) => {
					e.preventDefault();
					onChange(e.target.value);
					setCharCount(value.length);
          text?.current?.focus();
				}}
				css={css`
          display: ${preview ? "none" : "flex"};
          background-color: rgb(27, 27, 27);
          padding: 0.5rem;
          border: 1px solid rgb(118, 0, 255);
          color: rgb(255, 255, 255);
          width: 98.5%;
          resize: none;

          &:focus {
            outline: none;
            border: 1px solid rgb(118, 0, 255);
          }
        `}
			></textarea>
			<span
				css={css({
					color: "white"
				})}
			>
				{charCount}
			</span>
			<div
				css={css`
          display: ${preview ? "flex" : "none"};
          background-color: rgb(27, 27, 27);
          padding: 0.5rem;
          border: 1px solid rgb(118, 0, 255);
          color: rgb(255, 255, 255);
          width: 98.5%;
          resize: none;
          overflow-y: scroll;
          overflow-x: hidden;
          &:focus {
            outline: none;
            border: 1px solid rgb(118, 0, 255);
          }
        `}
			>
				<div
					dangerouslySetInnerHTML={{
						__html: disableMarkdown ? value : marked.parse(value)
					}}
				></div>
			</div>
		</div>
	);
};
