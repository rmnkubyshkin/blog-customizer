import { ArrowButton } from 'src/ui/arrow-button';
import React, {useRef, useState} from "react";
import {FormStyleProps, SideForm} from "components/side-form/SideForm";
import {defaultArticleState} from "src/constants/articleProps";
import {useOutsideClickClose} from "src/ui/select/hooks/useOutsideClickClose";

export const defaultStyle = {
	"fontFamily": defaultArticleState.fontFamilyOption,
	"fontSize": defaultArticleState.fontSizeOption,
	"fontColor": defaultArticleState.fontColor,
	"contentWidth": defaultArticleState.contentWidth,
	"backgroundColor": defaultArticleState.backgroundColor,
};

type ArticleParamsFormProps = {
	isOpen: boolean;
	onClick: () => void;
	onChange?: (selected: FormStyleProps) => void;
	onUpdate?: (style: FormStyleProps) => void;
}

export const ArticleParamsForm = ({isOpen, onClick, onUpdate}: ArticleParamsFormProps) => {
	const [style, setStyle] = useState(defaultStyle);

	function handleOptionClick(option: FormStyleProps, hook: (opt: FormStyleProps) => void) {
		hook(option);
		onUpdate?.(option);
		onClick?.();
	}
	const formRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onChange: () => {
			onClick?.()
		},
	});
	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<SideForm
				isOpen={isOpen}
				style={style}
				onUpdate={(option) => handleOptionClick(option, setStyle)}
			/>
		</div>
	);
};
