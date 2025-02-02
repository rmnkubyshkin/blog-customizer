import React, {CSSProperties, useState} from "react";
import {FormStyleProps} from "components/side-form/SideForm";
import styles from "src/styles/index.module.scss";
import {ArticleParamsForm} from "components/article-params-form";
import {Article} from "components/article";
import {defaultStyle} from "components/article-params-form/ArticleParamsForm";

export const App = () => {
	const [styleArticle, setStyleArticle] = useState(defaultStyle);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': styleArticle.fontFamily.value,
				'--font-size': styleArticle.fontSize.value,
				'--font-color': styleArticle.fontColor.value,
				'--container-width': styleArticle.contentWidth.value,
				'--bg-color': styleArticle.backgroundColor.value,
			} as CSSProperties}
		>
	<ArticleParamsForm
		isOpen={isMenuOpen}
		onClick={() => setIsMenuOpen(!isMenuOpen)}
		onUpdate={(style: FormStyleProps) => setStyleArticle(style)}
	/>
	<Article />
	</main>
);
};
