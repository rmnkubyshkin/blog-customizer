import { ArrowButton } from 'src/ui/arrow-button';
import React, {useEffect, useState} from "react";
import {FormStyleProps, SideForm} from "components/side-form/SideForm";

type ArticleParamsFormProps = {
	isOpen: boolean;
	onClick: () => void;
	onChange?: (selected: FormStyleProps) => void;
	onUpdate?: (selected: FormStyleProps) => void;
	items: FormStyleProps;
}

export const ArticleParamsForm = ({isOpen, onClick, onUpdate, items}: ArticleParamsFormProps) => {
	const [style, setStyle] = useState(items);
	const [option, setOption] = useState(style.fontFamily.value);

	useEffect(()=> {
	}, [style, handleOptionClick]);

	function handleOptionClick(option: FormStyleProps, hook: (opt: FormStyleProps) => void) {
		hook(option);
		onUpdate?.(option);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<SideForm isOpen={isOpen} style={style} onUpdate={(option)=> handleOptionClick(option, setStyle)}/>
		</>
	);
};
