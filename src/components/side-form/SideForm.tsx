import React, {useEffect, useRef, useState} from "react";
import styles from "components/article-params-form/ArticleParamsForm.module.scss";
import {Select} from "src/ui/select";
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType
} from "src/constants/articleProps";
import {RadioGroup} from "src/ui/radio-group";
import {Separator} from "src/ui/separator";
import {Button} from "src/ui/button";
import {Text} from "src/ui/text";
import clsx from "clsx";
import {defaultStyle} from "components/article-params-form/ArticleParamsForm";


export type SideFormProps = {
	isOpen: boolean;
	style: FormStyleProps;
	onChange?: (items: OptionType) => void;
	onUpdate?: (items: FormStyleProps) => void;
};

export type FormStyleProps = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
}

export const SideForm = ({ isOpen, style, onUpdate }: SideFormProps) => {

	const sepRef = useRef(null);

	const [generalState, setGeneralState] = useState(style);

	const openingFormCondition = clsx({
		[styles.container] : true,
		[styles.container_open] : isOpen
	});

	const [selectedFontStyle, setSelectedFontStyle] = useState(style.fontFamily);
	const [selectedFontSize, setSelectedFontSize] = useState(style.fontSize);
	const [selectedFontColor, setSelectedFontColor] = useState(style.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(style.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState(style.contentWidth);

	let updatedStyle = {
		fontFamily: selectedFontStyle,
		fontSize: selectedFontSize,
		fontColor: selectedFontColor,
		contentWidth: selectedContentWidth,
		backgroundColor: selectedBackgroundColor,
	};

	useEffect(()=> {
		updatedStyle.fontFamily = selectedFontStyle;
		updatedStyle.backgroundColor = selectedBackgroundColor;
		updatedStyle.fontSize = selectedFontSize;
		updatedStyle.contentWidth = selectedContentWidth;
		updatedStyle.fontColor = selectedFontColor;
		setGeneralState(updatedStyle);
	}, [selectedFontStyle, selectedBackgroundColor, selectedFontSize, selectedFontColor, selectedContentWidth]);

	function submitStyle(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		onUpdate?.(generalState);
	}
	function resetStyle(e: React.MouseEvent<Element, MouseEvent>): void {
		e.preventDefault();
		onUpdate?.(defaultStyle);
	}

	function handleOptionClick(option: OptionType, hook: (opt: OptionType) => void) {
		hook(option);
	}

	return (
		<>
			<aside className={openingFormCondition}>
				<form className={styles.form} onSubmit={e => submitStyle(e)}>
					<div className={styles.title}>
						<Text family='open-sans'
							  as='h2'
							  align='left'
							  fontStyle='normal'
							  weight={800}
							  size={31}
							  uppercase={true}>
							Задайте параметры</Text>
					</div>
					<div className='body'>
						<Select title={"Шрифт"}
								selected={ selectedFontStyle }
								options={fontFamilyOptions}
								onChange={(option) =>
									handleOptionClick(option,  setSelectedFontStyle)}
						/>
						<RadioGroup
							name={"fontSize"}
							options={fontSizeOptions}
							selected={ selectedFontSize}
							title={"Размер шрифта"}
							onChange={(option) => handleOptionClick(option, setSelectedFontSize) }
						/>
						<Select title={"Цвет шрифта"}
								selected={ selectedFontColor }
								options={fontColors}
								onChange={(option) => handleOptionClick(option, setSelectedFontColor)}
						/>
						<div ref={sepRef} className={styles.separator}>
							<Separator />
						</div>
						<Select title={"Цвет фона"}
								selected={ selectedBackgroundColor}
								options={backgroundColors}
						onChange={(option) => handleOptionClick(option, setSelectedBackgroundColor) }/>
						<Select title={"Ширина контента"}
								selected={ selectedContentWidth }
								options={contentWidthArr}
								onChange={(option) => handleOptionClick(option, setSelectedContentWidth)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear'
								onClick={resetStyle}
						/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
}
