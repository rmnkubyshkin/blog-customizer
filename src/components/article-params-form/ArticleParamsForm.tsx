import { ArrowButton } from 'src/ui/arrow-button';
import React, {useRef, useState} from "react";
import {FormStyleProps, SideForm} from "components/side-form/SideForm";
import {defaultArticleState} from "src/constants/articleProps";
import {useOutsideClickClose} from "src/ui/select/hooks/useOutsideClickClose";
import {useClose} from "components/article-params-form/hooks/useClose";

export const defaultStyle = {
	"fontFamily": defaultArticleState.fontFamilyOption,
	"fontSize": defaultArticleState.fontSizeOption,
	"fontColor": defaultArticleState.fontColor,
	"contentWidth": defaultArticleState.contentWidth,
	"backgroundColor": defaultArticleState.backgroundColor,
};

type ArticleParamsFormProps = {
	onUpdate?: (style: FormStyleProps) => void;
}

export const ArticleParamsForm = ({onUpdate}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [style, setStyle] = useState(defaultStyle);

	function handleOptionClick(option: FormStyleProps, hook: (opt: FormStyleProps) => void) {
		hook(option);
		onUpdate?.(option);
		setIsMenuOpen(!isMenuOpen);
	}
	const formRef= useRef<HTMLDivElement>(null);
	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(!isMenuOpen),
		rootRef: formRef,
	});
	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<SideForm
				isOpen={isMenuOpen}
				style={style}
				onUpdate={(option) => handleOptionClick(option, setStyle)}
			/>
		</div>
	);
};
