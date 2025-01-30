import { createRoot } from 'react-dom/client';
import React, {StrictMode, CSSProperties, useState, useEffect} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {defaultArticleState} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import {FormStyleProps} from "components/side-form/SideForm";

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
export const defaultStyle = {
	"fontFamily": defaultArticleState.fontFamilyOption,
	"fontSize": defaultArticleState.fontSizeOption,
	"fontColor": defaultArticleState.fontColor,
	"contentWidth": defaultArticleState.contentWidth,
	"backgroundColor": defaultArticleState.backgroundColor,
};

const App = () => {
	const [open, setOpen] = useState(false);
	const [option, setOption] = useState(defaultStyle);

	useEffect(() => {
	}, [open,handleOptionClick])

	function handleOptionClick(option: FormStyleProps, hook: (opt: FormStyleProps) => void) {
		hook(option);
		setOpen(!open);
	}

	const [style, setStyle] = useState(defaultStyle);

	useEffect(()=> {
		setStyle(style);
	}, [style, option]);

	return (
		<main
			className={clsx(styles.main)}
			style={{
				'--font-family': option.fontFamily.value,
				'--font-size': option.fontSize.value,
				'--font-color': option.fontColor.value,
				'--container-width': option.contentWidth.value,
				'--bg-color': option.backgroundColor.value,
			} as CSSProperties} >
			<ArticleParamsForm
				isOpen={open}
				onClick={() => setOpen(!open)}
				onUpdate={(option) =>handleOptionClick(option, setOption)}
				items={style}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
