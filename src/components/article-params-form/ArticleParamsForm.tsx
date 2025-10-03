import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';

import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import clsx from 'clsx';

import {
	fontColors,
	backgroundColors,
	fontFamilyOptions,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Принимаем параметры и функцию обновления из родителя
interface ArticleParamsFormProps {
	params: typeof defaultArticleState;
	setParams: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
}

export const ArticleParamsForm = ({
	params,
	setParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleArrowButtonClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	const [selectedFamily, setSelectedFamily] = useState(params.fontFamilyOption);
	const [selectedSize, setSelectedSize] = useState(params.fontSizeOption);
	const [newFontColor, setNewFontColor] = useState(params.fontColor);
	const [newBackgroundColor, setNewBackgroundColor] = useState(
		params.backgroundColor
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		params.contentWidth
	);

	// Состояние для примененных параметров текста
	// const [appliedParams, setAppliedParams] = useState(defaultArticleState);

	// Обработчик сброса формы
	const handleReset = () => {
		setSelectedFamily(defaultArticleState.fontFamilyOption);
		setSelectedSize(defaultArticleState.fontSizeOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	// Обработчик отправки формы (кнопка "Применить")
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setParams({
			fontFamilyOption: selectedFamily,
			fontColor: newFontColor,
			backgroundColor: newBackgroundColor,
			contentWidth: selectedContentWidth,
			fontSizeOption: selectedSize,
		});
		setIsOpen(false);
	};
	return (
		<div>
			<ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={(e) => {
						e.preventDefault();
						handleReset();
					}}
					onSubmit={handleSubmit}>
					<h1 className={styles.title}>Задайте параметры</h1>
					<Select
						selected={selectedFamily}
						onChange={setSelectedFamily}
						options={fontFamilyOptions}
						title={'Шрифт'}
					/>
					<RadioGroup
						selected={selectedSize}
						name='radio'
						onChange={setSelectedSize}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={newFontColor}
						onChange={setNewFontColor}
						options={fontColors}
						title={'Цвет шрифта'}
					/>
					<hr className={styles.hr} />
					<Select
						selected={newBackgroundColor}
						onChange={setNewBackgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
					/>
					<Select
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
