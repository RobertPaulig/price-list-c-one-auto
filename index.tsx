/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// Экспортируем переменные и функции для использования в chinese.tsx
export const rawPriceData = `прайс-лист компании ООО "C-ONE AUTO" (C-ONE 001 Карго)										
Обратите внимание, что в прайсах указаны цены в /кг 										
для большинства категорий плотности, но для категории "Менее100кг/м3" цена указана в /м³,										
Единая таблица прайс-листов ООО "C-ONE AUTO" (C-ONE 001 Карго)										
											
Оборудование/освещение/мебель/посуда/строит, материалы	1	400 и выше	1,10	1,40	10-12	0,90	1,20	5-7		
		2	350-400	1,20	1,50	10-12	1,00	1,30	5-7		
		3	300-350	1,30	1,60	10-12	1,10	1,40	5-7		
		4	250-300	1,40	1,70	10-12	1,20	1,50	5-7		
		5	200-250	1,50	1,80	10-12	1,30	1,60	5-7		
		6	190-200	1,60	1,90	10-12	1,40	1,70	5-7		
		7	180-190	1,70	2,00	10-12	1,50	1,80	5-7		
		8	170-180	1,90	2,20	10-12	1,60	1,90	5-7		
		9	160-170	1,90	2,20	10-12	1,70	2,00	5-7		
		10	150-160	2,00	2,30	10-12	1,80	2,10	5-7		
		11	140-150	2,10	2,40	10-12	1,90	2,20	5-7		
		12	130-140	2,20	2,50	10-12	2,00	2,30	5-7		
		13	120-130	2,30	2,60	10-12	2,10	2,40	5-7		
		14	110-120	2,40	2,70	10-12	2,20	2,50	5-7		
		15	100-110	2,50	2,80	10-12	2,30	2,60	5-7		
		16	Менее 100	-	-	10-12	-	-	5-7	Москва: 260 $/м³; Алматы: 230 $/м³	Москва: 284 $/м³; Алматы: 254 $/м³
Автозапчасти (Экспресс-линия "Северный Синьцзян")	1	400 и выше	1,20	1,50	10-12	0,9	1,2	5-7		
		2	350-400	1,30	1,60	10-12	1	1,3	5-7		
		3	300-350	1,40	1,70	10-12	1,1	1,4	5-7		
		4	250-300	1,50	1,80	10-12	1,2	1,5	5-7		
		5	200-250	1,60	1,90	10-12	1,3	1,6	5-7		
		6	190-200	1,70	2,00	10-12	1,4	1,7	5-7		
		7	180-190	1,80	2,10	10-12	1,5	1,8	5-7		
		8	170-180	1,90	2,20	10-12	1,6	1,9	5-7		
		9	160-170	2,00	2,30	10-12	1,7	2	5-7		
		10	150-160	2,10	2,40	10-12	1,8	2,1	5-7		
		11	140-150	2,20	2,50	10-12	1,9	2,2	5-7		
		12	130-140	2,30	2,60	10-12	2	2,3	5-7		
		13	120-130	2,40	2,70	10-12	2,1	2,4	5-7		
		14	110-120	2,50	2,80	10-12	2,2	2,5	5-7		
		15	100-110	2,60	2,90	10-12	2,3	2,6	5-7		
		16	Менее 100	-	-	10-12	-	-	5-7	Москва: 270 $/м³; Алматы: 240 $/м³	Москва: 294 $/м³; Алматы: 264 $/м³
Единичные категории (Экспресс-линия "Северный Синьцзян" (для единичных категорий грузов))	1	400 и выше	1,20	1,50	10-12	0,9	1,2	5-7		
		2	300-400	1,30	1,60	10-12	1	1,3	5-7		
		3	250-300	1,40	1,70	10-12	1,1	1,4	5-7		
		4	200-250	1,50	1,80	10-12	1,2	1,5	5-7		
		5	190-200	1,60	1,90	10-12	1,3	1,6	5-7		
		6	180-190	1,70	2,00	10-12	1,4	1,7	5-7		
		7	170-180	1,80	2,10	10-12	1,5	1,8	5-7		
		8	160-170	1,90	2,20	10-12	1,6	1,9	5-7		
		9	150-160	2,00	2,30	10-12	1,7	2	5-7		
		10	140-150	2,10	2,40	10-12	1,8	2,1	5-7		
		11	130-140	2,20	2,50	10-12	1,9	2,2	5-7		
		12	120-130	2,30	2,60	10-12	2	2,3	5-7		
		13	110-120	2,40	2,70	10-12	2,1	2,4	5-7		
		14	100-110	2,50	2,80	10-12	2,2	2,5	5-7		
		15	Менее 100	-	-	10-12	-	-	5-7	Москва: 260 $/м³; Алматы: 230 $/м³	Москва: 284 $/м³; Алматы: 254 $/м³
Багаж/косметика/аксессуары для моб,тел (Шляпы спец, линия)	1	400 и выше	1,20	1,50	10-12	0,9	1,2	5-7		
		2	350-400	1,30	1,60	10-12	1	1,3	5-7		
		3	300-350	1,40	1,70	10-12	1,1	1,4	5-7		
		4	250-300	1,50	1,80	10-12	1,2	1,5	5-7		
		5	200-250	1,60	1,90	10-12	1,3	1,6	5-7		
		6	190-200	1,70	2,00	10-12	1,4	1,7	5-7		
		7	180-190	1,80	2,10	10-12	1,5	1,8	5-7		
		8	170-180	1,90	2,20	10-12	1,6	1,9	5-7		
		9	160-170	2,00	2,30	10-12	1,7	2	5-7		
		10	150-160	2,10	2,40	10-12	1,8	2,1	5-7		
		11	140-150	2,20	2,50	10-12	1,9	2,2	5-7		
		12	130-140	2,30	2,60	10-12	2	2,3	5-7		
		13	120-130	2,40	2,70	10-12	2,1	2,4	5-7		
		14	110-120	2,50	2,80	10-12	2,2	2,5	5-7		
		15	100-110	2,60	2,90	10-12	2,3	2,6	5-7		
		16	Менее 100	-	-	10-12	-	-	5-7	Москва: 270 $/м³; Алматы: 240 $/м³	Москва: 294 $/м³; Алматы: 264 $/м³
Малая бытовая техника (Экспресс-линия "Северный Синьцзян" (для малой бытовой техники))	1	400 и выше	1,40	1,70	10-12	1,1	1,4	5-7		
		2	350-400	1,50	1,80	10-12	1,2	1,5	5-7		
		3	300-350	1,60	1,90	10-12	1,3	1,6	5-7		
		4	250-300	1,70	2,00	10-12	1,4	1,7	5-7		
		5	200-250	1,80	2,10	10-12	1,5	1,8	5-7		
		6	190-200	1,90	2,20	10-12	1,6	1,9	5-7		
		7	180-190	2,00	2,30	10-12	1,7	2	5-7		
		8	170-180	2,10	2,40	10-12	1,8	2,1	5-7		
		9	160-170	2,20	2,50	10-12	1,9	2,2	5-7		
		10	150-160	2,30	2,60	10-12	2	2,3	5-7		
		11	140-150	2,40	2,70	10-12	2,1	2,4	5-7		
		12	130-140	2,50	2,80	10-12	2,2	2,5	5-7		
		13	120-130	2,60	2,90	10-12	2,3	2,6	5-7		
		14	110-120	2,70	3,00	10-12	2,4	2,7	5-7		
		15	100-110	2,80	3,10	10-12	2,5	2,8	5-7		
		16	Менее 100	-	-	10-12	-	-	5-7	Москва: 290 $/м³; Алматы: 260 $/м³	Москва: 314 $/м³; Алматы: 284 $/м³
Северная специальная линия инструментов	1	400 и выше	0,95	1,25	10-12	0,9	1,2	5-7		
		2	350-400	1,00	1,30	10-12	0,9	1,2	5-7		
		3	300-350	1,10	1,40	10-12	1	1,3	5-7		
		4	250-300	1,20	1,50	10-12	1,2	1,5	5-7		
		5	200-250	1,30	1,60	10-12	1,3	1,6	5-7		
		6	190-200	1,40	1,70	10-12	1,4	1,7	5-7		
		7	180-190	1,50	1,80	10-12	1,5	1,8	5-7		
		8	170-180	1,60	1,90	10-12	1,5	1,8	5-7		
		9	160-170	1,70	2,00	10-12	1,7	2	5-7		
		10	150-160	1,80	2,10	10-12	1,8	2,1	5-7		
		11	140-150	1,90	2,20	10-12	1,9	2,2	5-7		
		12	130-140	2,00	2,30	10-12	2	2,3	5-7		
		13	120-130	2,10	2,40	10-12	2,1	2,4	5-7		
		14	110-120	2,20	2,50	10-12	2,2	2,5	5-7		
		15	100-110	2,30	2,60	10-12	2,3	2,6	5-7		
		16	Менее 100	-	-	10-12	-	-	5-7	Москва: 240 $/м³; Алматы: 210 $/м³	Москва: 264 $/м³; Алматы: 234 $/м³
											
Основные условия 											
											
· Упаковка: Товары не должны смешиваться, каждая упаковка должна быть отдельной и содержать отдельный продукт,											
	Требуется предоставить подробную упаковку и фотографии, без знака +0,2$, Для "Автозапчастей" и "Единичных										
	категорий" - упаковочную ведомость,										
· Страхование: Обязательное, Ставка: 5 $/кг, Условия по стоимости груза:											
   ≤30 $/кг: страховой взнос 1%;											
   30-50 $/кг: страховой взнос 2%;											
   50-100 $/кг: страховой взнос 3%;											
  100 $/кг: отказ в приеме,											
· Компенсация за задержку: В настоящее время компенсация за задержку или потерю времени не предусмотрена, 											
  Возможны задержки из-за гос, праздников, COVID-19, военных действий и форс-мажоров,											
· Требуемая информация: Вес груза, наименование, количество упаковок, объем, мужские/женские модели, бренд,											
  материал, назначение и фото груза, Запрещено скрывать или искажать стоимость груза,											
· Запрещенные товары: БПЛА и комплектующие, электронные сигареты и комплектующие, военные товары (шлемы/											
  бронежилеты/подсумки/тактические жилеты), камуфляжная и зеленая одежда/рюкзаки/перчатки и т,д,											
· Штраф: За нарушение (ввоз запрещенных товаров) – штраф в размере 100 000 $, конфискация груза, все расходы и											
  последствия несет клиент,											
· Право на толкование: Компания оставляет за собой право окончательного толкования прайс-листа,											
`;

interface PriceItem {
  id: string;
  density: string; // Keep original Russian for logic
  priceMoscow1: string;
  priceMoscow2: string;
  deliveryMoscow: string;
  priceAlmaty1: string;
  priceAlmaty2: string;
  deliveryAlmaty: string;
  // New fields for parsed <100 prices
  priceMoscowLessThan100_Type1: string;
  priceAlmatyLessThan100_Type1: string;
  priceMoscowLessThan100_Type2: string;
  priceAlmatyLessThan100_Type2: string;
}

interface PriceCategory {
  name: string; // Keep original Russian for logic
  items: PriceItem[];
}

interface ParsedData {
  mainTitle: string;
  priceNote: string;
  effectiveDateTitle: string;
  categories: PriceCategory[];
  conditionsTitle: string;
  conditions: string[];
}

type Language = 'ru' | 'zh';
type Translations = Record<string, string>;

async function translateTextGemini(text: string, targetLang: Language): Promise<string> {
    // Просто возвращаем исходный текст, без попыток перевода
    return text;
}

// Экспортируем функцию для использования в chinese.tsx
export function parseLessThan100Prices(info: string): { moscow: string, almaty: string } {
    const moscowMatch = info.match(/Москва:\s*([0-9.,]+)/);
    const almatyMatch = info.match(/Алматы:\s*([0-9.,]+)/);
    return {
        moscow: moscowMatch ? moscowMatch[1].replace(',', '.') : '-',
        almaty: almatyMatch ? almatyMatch[1].replace(',', '.') : '-',
    };
}

export const parsePriceData = (text: string): ParsedData => {
    const lines = text.split('\n').map(line => line.trimEnd()).filter(line => line.trim().length > 0);

    const mainTitle = lines[0] || "Прайс-лист";
    const priceNote = lines[1] || "";
    // Combine lines 2 and 3 for effectiveDateTitle, handling cases where one might be empty
    const effectiveDateL1 = lines[2] || "";
    const effectiveDateL2 = lines[3] || "";
    const effectiveDateTitle = (effectiveDateL1 + (effectiveDateL1 && effectiveDateL2 ? "\n" : "") + effectiveDateL2).trim();


    const categories: PriceCategory[] = [];
    let currentCategory: PriceCategory | null = null;
    const conditions: string[] = [];
    let conditionsTitleLocal = "";
    let parsingConditions = false;

    let dataStartIndex = 4; 

    for (let i = dataStartIndex; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith("Основные условия")) {
            parsingConditions = true;
            conditionsTitleLocal = line;
            currentCategory = null;
            continue;
        }

        if (parsingConditions) {
            if (line.startsWith('·')) {
                conditions.push(line.substring(1).trim());
            } else if (line.trim()) { 
                conditions.push(line.trim());
            }
            continue;
        }

        const rawParts = line.split('\t');
        const trimmedParts = rawParts.map(p => p.trim());
        
        const firstCellContent = trimmedParts[0];

        if (firstCellContent && isNaN(parseInt(firstCellContent, 10))) {
            currentCategory = { name: firstCellContent, items: [] };
            categories.push(currentCategory);

            if (trimmedParts.length > 1 && !isNaN(parseInt(trimmedParts[1], 10))) {
                 const prices100_1 = parseLessThan100Prices(trimmedParts[9] || '');
                 const prices100_2 = parseLessThan100Prices(trimmedParts[10] || '');
                currentCategory.items.push({
                    id: trimmedParts[1],
                    density: trimmedParts[2] || '',
                    priceMoscow1: trimmedParts[3] || '',
                    priceMoscow2: trimmedParts[4] || '',
                    deliveryMoscow: trimmedParts[5] || '',
                    priceAlmaty1: trimmedParts[6] || '',
                    priceAlmaty2: trimmedParts[7] || '',
                    deliveryAlmaty: trimmedParts[8] || '',
                    priceMoscowLessThan100_Type1: prices100_1.moscow,
                    priceAlmatyLessThan100_Type1: prices100_1.almaty,
                    priceMoscowLessThan100_Type2: prices100_2.moscow,
                    priceAlmatyLessThan100_Type2: prices100_2.almaty,
                });
            }
        } else if (currentCategory) {
            let idPartIndex = -1;
            let idValue = "";
            for (let k = 0; k < trimmedParts.length; k++) {
                if (trimmedParts[k] !== "" && !isNaN(parseInt(trimmedParts[k], 10))) {
                    idValue = trimmedParts[k];
                    idPartIndex = k;
                    break;
                }
            }

            if (idPartIndex !== -1) {
                 const prices100_1 = parseLessThan100Prices(trimmedParts[idPartIndex + 8] || '');
                 const prices100_2 = parseLessThan100Prices(trimmedParts[idPartIndex + 9] || '');
                currentCategory.items.push({
                    id: idValue,
                    density: trimmedParts[idPartIndex + 1] || '',
                    priceMoscow1: trimmedParts[idPartIndex + 2] || '',
                    priceMoscow2: trimmedParts[idPartIndex + 3] || '',
                    deliveryMoscow: trimmedParts[idPartIndex + 4] || '',
                    priceAlmaty1: trimmedParts[idPartIndex + 5] || '',
                    priceAlmaty2: trimmedParts[idPartIndex + 6] || '',
                    deliveryAlmaty: trimmedParts[idPartIndex + 7] || '',
                    priceMoscowLessThan100_Type1: prices100_1.moscow,
                    priceAlmatyLessThan100_Type1: prices100_1.almaty,
                    priceMoscowLessThan100_Type2: prices100_2.moscow,
                    priceAlmatyLessThan100_Type2: prices100_2.almaty,
                });
            }
        }
    }
    return { mainTitle, priceNote, effectiveDateTitle, categories, conditionsTitle: conditionsTitleLocal, conditions };
};

type City = "Москва" | "Алматы"; // These specific strings need translation for display
type PriceOption = "Цена 1" | "Цена 2"; // These specific strings need translation for display

interface DensityRange {
    min: number;
    max: number;
}

function parseDensityString(densityStr: string): DensityRange | null {
    densityStr = densityStr.trim();
    if (densityStr.includes("и выше") || densityStr.includes("and above")) { 
        const min = parseFloat(densityStr.replace(/[^0-9.]/g, ''));
        return isNaN(min) ? null : { min, max: Infinity };
    }
    const parts = densityStr.split('-');
    if (parts.length === 2) {
        const min = parseFloat(parts[0]);
        const max = parseFloat(parts[1]);
        if (!isNaN(min) && !isNaN(max)) {
            return { min, max };
        }
    }
    return null;
}

function getSpecialPricePerM3(item: PriceItem, city: City, priceType: PriceOption): number | null {
    let priceStr: string;
    if (city === "Москва") {
        priceStr = priceType === "Цена 1" ? item.priceMoscowLessThan100_Type1 : item.priceMoscowLessThan100_Type2;
    } else { // Almaty
        priceStr = priceType === "Цена 1" ? item.priceAlmatyLessThan100_Type1 : item.priceAlmatyLessThan100_Type2;
    }
    const price = parseFloat(priceStr);
    return isNaN(price) ? null : price;
}


const Calculator: React.FC<{ 
    categories: PriceCategory[], 
    t: (text: string) => string,
    language: Language 
}> = ({ categories, t, language }) => {
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(categories[0]?.name || "");
    const [selectedCityKey, setSelectedCityKey] = useState<City>("Москва"); 
    const [selectedPriceTypeKey, setSelectedPriceTypeKey] = useState<PriceOption>("Цена 1"); 
    const [weight, setWeight] = useState<string>("1"); // Предустановленное значение 1 кг
    const [volume, setVolume] = useState<string>("0.01"); // Предустановленное значение 0.01 м³
    const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
    const [calculatedDensity, setCalculatedDensity] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const cityOptions = [{key: "Москва", label: t("Москва")}, {key: "Алматы", label: t("Алматы")}];
    const priceTypeOptions = [{key: "Цена 1", label: t("Цена 1")}, {key: "Цена 2", label: t("Цена 2")}];

    // Автоматически вычисляем при загрузке
    useEffect(() => {
        // Вызываем handleCalculate при монтировании компонента
        handleCalculate();
    }, []);

    const handleCalculate = () => {
        setError(null);
        setCalculatedCost(null);
        setCalculatedDensity(null);

        const numWeight = parseFloat(weight);
        const numVolume = parseFloat(volume);

        if (isNaN(numWeight) || numWeight <= 0) {
            setError(t("Пожалуйста, введите корректный вес (больше 0)."));
            return;
        }
        
        const category = categories.find(c => c.name === selectedCategoryName);
        if (!category) {
            setError(t("Категория не найдена."));
            return;
        }

        const lessThan100ItemForCheck = category.items.find(item => item.density.includes("Менее 100")); 
        const needsVolumeForM3 = lessThan100ItemForCheck && 
                                 (getSpecialPricePerM3(lessThan100ItemForCheck, selectedCityKey, selectedPriceTypeKey) !== null);
        const needsVolumeForDensity = category.items.some(item => !item.density.includes("Менее 100"));

        if ((needsVolumeForM3 || needsVolumeForDensity) && (isNaN(numVolume) || numVolume <= 0)) {
             setError(t("Пожалуйста, введите корректный объем (больше 0) для расчета."));
             return;
        }


        let cost: number | null = null;
        let density: number | null = null;

        if (numVolume > 0) { 
            density = numWeight / numVolume;
            setCalculatedDensity(parseFloat(density.toFixed(2)));
        }


        if (density !== null && density < 100 && numVolume > 0) { 
            const lessThan100Item = category.items.find(item => item.density.includes("Менее 100")); 
            if (lessThan100Item) {
                const pricePerM3 = getSpecialPricePerM3(lessThan100Item, selectedCityKey, selectedPriceTypeKey);
                if (pricePerM3 !== null) {
                    cost = pricePerM3 * numVolume;
                } else {
                    setError(`${t("Цена за м³ для")} "${t(selectedCityKey)}" (${t(selectedPriceTypeKey)}) ${t("не найдена в категории")} "${t("Менее 100")}".`);
                    return;
                }
            } else {
                setError(`${t("Тариф для плотности менее 100 кг/м³ не найден в выбранной категории.")}`);
                return;
            }
        } else if (density !== null || (!needsVolumeForDensity && !needsVolumeForM3)) { 
            let foundTier = false;
            for (const item of category.items) {
                if (item.density.includes("Менее 100")) continue; 

                const range = parseDensityString(item.density); 
                if (range && density !== null && density >= range.min && density < range.max) { 
                    foundTier = true;
                    let pricePerKgStr: string;
                    if (selectedCityKey === "Москва") {
                        pricePerKgStr = selectedPriceTypeKey === "Цена 1" ? item.priceMoscow1 : item.priceMoscow2;
                    } else { 
                        pricePerKgStr = selectedPriceTypeKey === "Цена 1" ? item.priceAlmaty1 : item.priceAlmaty2;
                    }
                    
                    const pricePerKg = parseFloat(pricePerKgStr.replace(',', '.'));
                    if (!isNaN(pricePerKg) && pricePerKgStr.trim() !== '-') {
                        cost = pricePerKg * numWeight;
                    } else {
                         setError(`${t("Цена за кг для плотности")} ${t(item.density)} (${t(selectedCityKey)}, ${t(selectedPriceTypeKey)}) ${t("недействительна.")}`);
                        return;
                    }
                    break;
                }
            }
            if (!foundTier && (density !== null)) { 
                 setError(`${t("Не удалось найти подходящий тариф. Проверьте плотность груза")} (${density?.toFixed(2)} ${t("кг/м³")}) ${t("или введенные данные.")}`);
                 return;
            } else if (!foundTier && (needsVolumeForDensity || needsVolumeForM3)) {
                setError(t("Не удалось определить тариф. Пожалуйста, проверьте введенные данные."));
                return;
            }
        } else if (needsVolumeForDensity || needsVolumeForM3) { 
             setError(t("Не удалось рассчитать плотность. Введите корректный объем."));
             return;
        }


        if (cost !== null) {
            setCalculatedCost(parseFloat(cost.toFixed(2)));
        } else if (!error) { 
             setError(t("Не удалось рассчитать стоимость. Проверьте введенные данные и выбранные опции."));
        }
    };
    
    useEffect(() => {
        if (categories.length > 0 && !categories.find(cat => cat.name === selectedCategoryName)) {
            setSelectedCategoryName(categories[0]?.name || "");
        }
        setCalculatedCost(null);
        setCalculatedDensity(null);
        setError(null);
        setWeight("1");
        setVolume("0.01");
    }, [categories, selectedCategoryName]); 

    useEffect(() => { 
        setCalculatedCost(null);
        setCalculatedDensity(null);
        setError(null);
    }, [selectedCategoryName, selectedCityKey, selectedPriceTypeKey, language]);


    return (
        <section className="calculator-section" aria-labelledby="calculator-title">
            <h2 id="calculator-title">{t("Калькулятор стоимости")}</h2>
            <div className="calculator-form">
                <div>
                    <label htmlFor="category-select">{t("Категория товара:")}</label>
                    <select id="category-select" value={selectedCategoryName} onChange={e => setSelectedCategoryName(e.target.value)}>
                        {categories.map(cat => <option key={cat.name} value={cat.name}>{t(cat.name)}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="city-select">{t("Город назначения:")}</label>
                    <select id="city-select" value={selectedCityKey} onChange={e => setSelectedCityKey(e.target.value as City)}>
                        {cityOptions.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="price-type-select">{t("Тип цены:")}</label>
                    <select id="price-type-select" value={selectedPriceTypeKey} onChange={e => setSelectedPriceTypeKey(e.target.value as PriceOption)}>
                         {priceTypeOptions.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="weight-input">{t("Вес (кг):")}</label>
                    <input id="weight-input" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder={t("например, 100")} min="0.01" step="0.01" />
                </div>
                <div>
                    <label htmlFor="volume-input">{t("Объем (м³):")}</label>
                    <input id="volume-input" type="number" value={volume} onChange={e => setVolume(e.target.value)} placeholder={t("например, 0.5")} min="0.001" step="0.001" />
                </div>
                 <button type="button" onClick={handleCalculate}>{t("Рассчитать")}</button>
            </div>

            {error && <div className="calculator-result error-message"><p>{error}</p></div>}
            {(calculatedCost !== null || calculatedDensity !== null) && !error && (
                <div className="calculator-result">
                    {calculatedDensity !== null && <p>{t("Расчетная плотность:")} <strong>{calculatedDensity} {t("кг/м³")}</strong></p>}
                    {calculatedCost !== null && <p>{t("Ориентировочная стоимость:")} <strong>{calculatedCost} $</strong></p>}
                </div>
            )}
        </section>
    );
};

function PriceTable({ category, t }: { category: PriceCategory, t: (text: string) => string }) {
    const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
    
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>{t('№')}</th>
                        <th>{t('Плотность, кг/м³')}</th>
                        <th>{t('Цена 1 Москва ($)')}</th>
                        <th>{t('Цена 2 Москва ($)')}</th>
                        <th>{t('Сроки доставки Москва (дни)')}</th>
                        <th>{t('Цена 1 Алматы ($)')}</th>
                        <th>{t('Цена 2 Алматы ($)')}</th>
                        <th>{t('Сроки доставки Алматы (дни)')}</th>
                        <th>{t('Специальные цены')}</th>
                    </tr>
                </thead>
                <tbody>
                    {category.items.map((item, index) => {
                        // Проверяем, содержит ли строка "Менее 100"
                        const isLessThan100 = item.density.toLowerCase().includes('менее 100');
                        // Определяем специальные цены для показа
                        const specialPrices = isLessThan100 
                            ? `${t('Москва')}: ${item.priceMoscowLessThan100_Type1 || '-'} $/м³; ${t('Алматы')}: ${item.priceAlmatyLessThan100_Type1 || '-'} $/м³`
                            : '';
                        
                        // Определяем специальные цены для показа (Тип 2)
                        const specialPricesType2 = isLessThan100 && item.priceMoscowLessThan100_Type2 
                            ? `${t('Москва')}: ${item.priceMoscowLessThan100_Type2 || '-'} $/м³; ${t('Алматы')}: ${item.priceAlmatyLessThan100_Type2 || '-'} $/м³`
                            : '';
                            
                        return (
                            <tr 
                                key={item.id}
                                className={highlightedRow === index ? 'highlighted' : ''}
                                onMouseEnter={() => setHighlightedRow(index)}
                                onMouseLeave={() => setHighlightedRow(null)}
                            >
                                <td>{item.id}</td>
                                <td>{item.density}</td>
                                <td className="numeric">{item.priceMoscow1}</td>
                                <td className="numeric">{item.priceMoscow2}</td>
                                <td className="numeric">{item.deliveryMoscow}</td>
                                <td className="numeric">{item.priceAlmaty1}</td>
                                <td className="numeric">{item.priceAlmaty2}</td>
                                <td className="numeric">{item.deliveryAlmaty}</td>
                                <td>
                                    {specialPrices}
                                    {specialPricesType2 && <br />}
                                    {specialPricesType2}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// Статические переводы для китайского языка
const chineseTranslations: Record<string, string> = {
  "прайс-лист компании ООО \"C-ONE AUTO\" (C-ONE 001 Карго)": "C-ONE AUTO公司价目表 (C-ONE 001 货运)",
  "Обратите внимание, что в прайсах указаны цены в /кг": "请注意，价格表中的价格以/公斤为单位",
  "для большинства категорий плотности, но для категории \"Менее100кг/м3\" цена указана в /м³,": "对于大多数密度类别，但对于\"小于100公斤/立方米\"类别，价格以/立方米为单位",
  "Единая таблица прайс-листов ООО \"C-ONE AUTO\" (C-ONE 001 Карго)": "C-ONE AUTO有限责任公司统一价目表（C-ONE 001 货运）",
  "Оборудование/освещение/мебель/посуда/строит, материалы": "设备/照明/家具/餐具/建筑材料",
  "Автозапчасти (Экспресс-линия \"Северный Синьцзян\")": "汽车零部件（\"北疆快线\"）",
  "Единичные категории (Экспресс-линия \"Северный Синьцзян\" (для единичных категорий грузов))": "单一类别（\"北疆快线\"（适用于单一货物类别））",
  "Багаж/косметика/аксессуары для моб,тел (Шляпы спец, линия)": "行李/化妆品/手机配件（帽子专线）",
  "Малая бытовая техника (Экспресс-линия \"Северный Синьцзян\" (для малой бытовой техники))": "小家电（\"北疆快线\"（适用于小家电））",
  "Северная специальная линия инструментов": "北方工具专线",
  "Основные условия": "基本条件",
  "Калькулятор стоимости": "成本计算器",
  "Категория товара:": "商品类别：",
  "Город назначения:": "目的地城市：",
  "Тип цены:": "价格类型：",
  "Вес (кг):": "重量（公斤）：",
  "Объем (м³):": "体积（立方米）：",
  "Рассчитать": "计算",
  "Расчетная плотность:": "计算密度：",
  "Ориентировочная стоимость:": "估计成本：",
  "кг/м³": "公斤/立方米",
  "Москва": "莫斯科",
  "Алматы": "阿拉木图",
  "Цена 1": "价格 1",
  "Цена 2": "价格 2",
  "№": "编号",
  "Плотность, кг/м³": "密度（公斤/立方米）",
  "Цена 1 Москва ($)": "莫斯科价格 1（$）",
  "Цена 2 Москва ($)": "莫斯科价格 2（$）",
  "Сроки доставки Москва (дни)": "莫斯科交货期（天）",
  "Цена 1 Алматы ($)": "阿拉木图价格 1（$）",
  "Цена 2 Алматы ($)": "阿拉木图价格 2（$）",
  "Сроки доставки Алматы (дни)": "阿拉木图交货期（天）",
  "Специальные цены": "特殊价格",
  "Менее 100": "低于 100",
  "400 и выше": "400及以上",
  "Загрузка данных...": "加载数据...",
  "Русский": "俄语",
  "中文": "中文",
  "Пожалуйста, введите корректный вес (больше 0).": "请输入有效的重量（大于0）。",
  "Категория не найдена.": "未找到类别。",
  "Пожалуйста, введите корректный объем (больше 0) для расчета.": "请输入有效的体积（大于0）进行计算。",
  "Цена за м³ для": "每立方米价格",
  "не найдена в категории": "在类别中未找到",
  "Тариф для плотности менее 100 кг/м³ не найден в выбранной категории.": "所选类别中未找到密度低于100公斤/立方米的费率。",
  "Цена за кг для плотности": "密度的每公斤价格",
  "недействительна.": "无效。",
  "Не удалось найти подходящий тариф. Проверьте плотность груза": "无法找到合适的费率。请检查货物密度",
  "или введенные данные.": "或输入的数据。",
  "Не удалось определить тариф. Пожалуйста, проверьте введенные данные.": "无法确定费率。请检查输入的数据。",
  "Не удалось рассчитать плотность. Введите корректный объем.": "无法计算密度。请输入有效的体积。",
  "Не удалось рассчитать стоимость. Проверьте введенные данные и выбранные опции.": "无法计算成本。请检查输入的数据和选择的选项。",
  "например, 100": "例如，100",
  "например, 0.5": "例如，0.5",
  
  // Новые переводы для улучшенного интерфейса
  "Стандартный вид": "标准视图",
  "Расширенный калькулятор": "高级计算器",
  "Показать все таблицы": "显示所有表格",
  "Скрыть все таблицы": "隐藏所有表格"
};

interface AppProps {
  defaultLanguage?: Language;
}

export const App: React.FC<AppProps> = ({ defaultLanguage }) => {
    const [language, setLanguage] = useState<Language>(defaultLanguage || 'ru');
    const [translatedData, setTranslatedData] = useState<Record<string, string>>(chineseTranslations);
    const [parsedData, setParsedData] = useState<ParsedData | null>(null);
    const [translating, setTranslating] = useState<boolean>(false);
    
    // Новые состояния для улучшенного интерфейса
    const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({});
    const [allTablesVisible, setAllTablesVisible] = useState<boolean>(false);

    useEffect(() => {
        setParsedData(parsePriceData(rawPriceData));
    }, []);

    // Инициализируем состояние видимости категорий при загрузке данных
    useEffect(() => {
        if (parsedData) {
            const initialVisibility: Record<string, boolean> = {};
            parsedData.categories.forEach(cat => {
                initialVisibility[cat.name] = false; // По умолчанию все скрыты
            });
            setVisibleCategories(initialVisibility);
        }
    }, [parsedData]);

    // Функция переключения видимости категории
    const toggleCategoryVisibility = (categoryName: string) => {
        setVisibleCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    // Функция для показа всех таблиц
    const showAllTables = () => {
        if (parsedData) {
            const allVisible: Record<string, boolean> = {};
            parsedData.categories.forEach(cat => {
                allVisible[cat.name] = true;
            });
            setVisibleCategories(allVisible);
            setAllTablesVisible(true);
        }
    };

    // Функция для скрытия всех таблиц
    const hideAllTables = () => {
        if (parsedData) {
            const allHidden: Record<string, boolean> = {};
            parsedData.categories.forEach(cat => {
                allHidden[cat.name] = false;
            });
            setVisibleCategories(allHidden);
            setAllTablesVisible(false);
        }
    };

    const t = useCallback((text: string): string => {
        if (language === 'ru' || !text || typeof text !== 'string' || text.trim() === '-' || !isNaN(parseFloat(text.replace(',', '.')))) {
            return text;
        }
        return translatedData[text] || text; 
    }, [language, translatedData]);

    const collectTranslatableTexts = useCallback((data: ParsedData): string[] => {
        const texts = new Set<string>();
        
        texts.add(data.mainTitle);
        texts.add(data.priceNote);
        data.effectiveDateTitle.split('\n').forEach(line => texts.add(line));
        texts.add(data.conditionsTitle);
        data.conditions.forEach(c => texts.add(c));
        data.categories.forEach(cat => {
            texts.add(cat.name);
            cat.items.forEach(item => {
                texts.add(item.density); 
            });
        });

        texts.add("Калькулятор стоимости");
        texts.add("Категория товара:");
        texts.add("Город назначения:");
        texts.add("Тип цены:");
        texts.add("Вес (кг):");
        texts.add("Объем (м³):");
        texts.add("Рассчитать");
        texts.add("Расчетная плотность:");
        texts.add("Ориентировочная стоимость:");
        texts.add("кг/м³"); 
        texts.add("Пожалуйста, введите корректный вес (больше 0).");
        texts.add("Категория не найдена.");
        texts.add("Пожалуйста, введите корректный объем (больше 0) для расчета.");
        texts.add("Цена за м³ для");
        texts.add("не найдена в категории");
        texts.add("Менее 100"); 
        texts.add("Тариф для плотности менее 100 кг/м³ не найден в выбранной категории.");
        texts.add("Цена за кг для плотности");
        texts.add("недействительна.");
        texts.add("Не удалось найти подходящий тариф. Проверьте плотность груза");
        texts.add("или введенные данные.");
        texts.add("Не удалось определить тариф. Пожалуйста, проверьте введенные данные.");
        texts.add("Не удалось рассчитать плотность. Введите корректный объем.");
        texts.add("Не удалось рассчитать стоимость. Проверьте введенные данные и выбранные опции.");
        texts.add("например, 100");
        texts.add("например, 0.5");

        texts.add("№");
        texts.add("Плотность (кг/м³)");
        texts.add("Цена Москва 1 ($/кг)");
        texts.add("Цена Москва 2 ($/кг)");
        texts.add("Срок доставки Москва (дни)");
        texts.add("Цена Алматы 1 ($/кг)");
        texts.add("Цена Алматы 2 ($/кг)");
        texts.add("Срок доставки Алматы (дни)");
        texts.add("Москва Цена 1 (<100 $/м³)");
        texts.add("Алматы Цена 1 (<100 $/м³)");
        texts.add("Москва Цена 2 (<100 $/м³)");
        texts.add("Алматы Цена 2 (<100 $/м³)");
        
        texts.add("Основные условия");
        texts.add("Загрузка данных..."); // Used for loading states
        texts.add("Москва"); 
        texts.add("Алматы"); 
        texts.add("Цена 1"); 
        texts.add("Цена 2"); 

        return Array.from(texts).filter(text => text && typeof text === 'string' && text.trim() !== '' && text.trim() !== '-' && isNaN(parseFloat(text.replace(',', '.'))));
    }, []);

    const changeLanguage = async (targetLang: Language) => {
        if (targetLang === language || translating) return;

        if (targetLang === 'ru') {
            setLanguage('ru');
            return;
        }

        // Switching to Chinese ('zh')
        setTranslating(true);
        if (!parsedData) {
            setTranslating(false);
            return;
        }

        const allTextsToTranslate = collectTranslatableTexts(parsedData);
        const textsNotInCacheForZh = allTextsToTranslate.filter(text => !translatedData[text]);

        if (textsNotInCacheForZh.length > 0) {
            try {
                const newTranslationsPromises = textsNotInCacheForZh.map(text =>
                    translateTextGemini(text, 'zh').then(translatedText => ({ [text]: translatedText }))
                );
                const resolvedTranslationsArray = await Promise.all(newTranslationsPromises);
                const newTranslationsObject = resolvedTranslationsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                
                setTranslatedData(prev => ({ ...prev, ...newTranslationsObject }));
            } catch (error) {
                console.error("Error fetching translations for Chinese:", error);
                alert(t("Ошибка при загрузке переводов.")); // Use t()
                setTranslating(false);
                return; 
            }
        }
        setLanguage('zh');
        setTranslating(false);
    };

    // Set the HTML lang attribute for proper font rendering
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    if (!parsedData) {
        return <div className="loading-message">{t("Загрузка данных...")}</div>;
    }
    
    const { mainTitle, priceNote, effectiveDateTitle, categories, conditionsTitle, conditions } = parsedData;

    return (
        <>
            <header>
                <img src="/logo.jpg" alt="C-ONE AUTO Logo" className="logo-img"/>
                <div>
                    <h1>{mainTitle.split('\n').map((line, i) => <React.Fragment key={i}>{t(line)}<br/></React.Fragment>)}</h1>
                    {priceNote && <p className="price-note">{t(priceNote)}</p>}
                    {effectiveDateTitle && <p className="effective-date">{effectiveDateTitle.split('\n').map((line, i) => <React.Fragment key={i}>{t(line)}<br/></React.Fragment>)}</p>}
                </div>
                <div className="language-selector">
                    <button 
                        className={language === 'ru' ? 'language-link active' : 'language-link'}
                        onClick={() => changeLanguage('ru')}
                    >
                        Русский
                    </button>
                    <button 
                        className={language === 'zh' ? 'language-link active' : 'language-link'}
                        onClick={() => changeLanguage('zh')}
                    >
                        中文
                    </button>
                </div>
            </header>

            <main>
                <div className="calculator-container">
                    {categories.length > 0 && <Calculator categories={categories} t={t} language={language} />}
                </div>

                <div className="tables-controls">
                    <button className="table-control-btn" onClick={showAllTables}>
                        {t("Показать все таблицы")}
                    </button>
                    <button className="table-control-btn" onClick={hideAllTables}>
                        {t("Скрыть все таблицы")}
                    </button>
                </div>

                <div className="tables-container">
                    {categories.map((category, index) => (
                        <section key={index} className="category-section" aria-labelledby={`category-title-${index}`}>
                            <div 
                                className="category-header" 
                                onClick={() => toggleCategoryVisibility(category.name)}
                            >
                                <h2 id={`category-title-${index}`}>{t(category.name)}</h2>
                                <span className={`toggle-icon ${visibleCategories[category.name] ? 'open' : ''}`}>
                                    {visibleCategories[category.name] ? '▼' : '►'}
                                </span>
                            </div>
                            
                            {visibleCategories[category.name] && (
                                <PriceTable category={category} t={t} />
                            )}
                        </section>
                    ))}
                </div>

                {conditions.length > 0 && (
                    <section className="conditions-section" aria-labelledby="conditions-title">
                        <h2 id="conditions-title">{t(conditionsTitle)}</h2>
                        <ul>
                            {conditions.map((condition, idx) => (
                                <li key={idx}>{t(condition)}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
            {translating && <div className="global-loading-overlay">{t("Загрузка данных...")}</div>}
        </>
    );
};

// Добавляем глобальную декларацию для window.defaultLanguage
declare global {
  interface Window {
    defaultLanguage?: string;
  }
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    // Проверяем, установлен ли язык по умолчанию через window
    const defaultLang = (window.defaultLanguage === 'zh') ? 'zh' : 'ru';
    root.render(<App defaultLanguage={defaultLang as Language} />);
}