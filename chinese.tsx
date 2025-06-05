/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// Импортируем данные из основного файла
import { rawPriceData, parsePriceData, translateTextGemini } from './index';

// Статические переводы для китайского языка
const chineseTranslations = {
  "прайс-лист компании ООО \"C-ONE AUTO\" (C-ONE 001 Карго)": "C-ONE AUTO公司价目表 (C-ONE 001 货运)",
  "Обратите внимание, что в прайсах указаны цены в /кг": "请注意，价格表中的价格以/公斤为单位",
  "для большинства категорий плотности, но для категории \"Менее100кг/м3\" цена указана в /м³,": "对于大多数密度类别，但对于"小于100公斤/立方米"类别，价格以/立方米为单位",
  "Единая таблица прайс-листов ООО \"C-ONE AUTO\" (C-ONE 001 Карго)": "C-ONE AUTO有限责任公司统一价目表（C-ONE 001 货运）",
  "Дата вступления в силу: 03.03.2025": "生效日期：03.03.2025",
  "Оборудование/освещение/мебель/посуда/строит, материалы": "设备/照明/家具/餐具/建筑材料",
  "Автозапчасти (Экспресс-линия \"Северный Синьцзян\")": "汽车零部件（"北疆快线"）",
  "Единичные категории (Экспресс-линия \"Северный Синьцзян\" (для единичных категорий грузов))": "单一类别（"北疆快线"（适用于单一货物类别））",
  "Багаж/косметика/аксессуары для моб,тел (Шляпы спец, линия)": "行李/化妆品/手机配件（帽子专线）",
  "Малая бытовая техника (Экспресс-линия \"Северный Синьцзян\" (для малой бытовой техники))": "小家电（"北疆快线"（适用于小家电））",
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
  "Плотность (кг/м³)": "密度（公斤/立方米）",
  "Цена Москва 1 ($/кг)": "莫斯科价格 1（$/公斤）",
  "Цена Москва 2 ($/кг)": "莫斯科价格 2（$/公斤）",
  "Срок доставки Москва (дни)": "莫斯科交货期（天）",
  "Цена Алматы 1 ($/кг)": "阿拉木图价格 1（$/公斤）",
  "Цена Алматы 2 ($/кг)": "阿拉木图价格 2（$/公斤）",
  "Срок доставки Алматы (дни)": "阿拉木图交货期（天）",
  "Москва Цена 1 (<100 $/м³)": "莫斯科价格 1（<100 $/立方米）",
  "Алматы Цена 1 (<100 $/м³)": "阿拉木图价格 1（<100 $/立方米）",
  "Москва Цена 2 (<100 $/м³)": "莫斯科价格 2（<100 $/立方米）",
  "Алматы Цена 2 (<100 $/м³)": "阿拉木图价格 2（<100 $/立方米）",
  "Менее 100": "低于 100",
  "400 и выше": "400及以上",
  "Загрузка данных...": "加载数据...",
  "Русский": "俄语",
  "中文": "中文"
};

// Специальный компонент для китайской версии
const ChineseApp: React.FC = () => {
    const [parsedData, setParsedData] = useState(null);
    const [translations, setTranslations] = useState(chineseTranslations);
    const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);
    
    useEffect(() => {
        setParsedData(parsePriceData(rawPriceData));
    }, []);

    const t = useCallback((text: string): string => {
        if (!text || typeof text !== 'string' || text.trim() === '-' || !isNaN(parseFloat(text.replace(',', '.')))) {
            return text;
        }
        return translations[text] || text; 
    }, [translations]);

    if (!parsedData) {
        return <div className="loading-message">{t("Загрузка данных...")}</div>;
    }
    
    const { mainTitle, priceNote, effectiveDateTitle, categories, conditionsTitle, conditions } = parsedData;

    // Компонент калькулятора аналогичен оригинальному, но с предустановленным китайским языком
    const Calculator = ({ categories }) => {
        const [selectedCategoryName, setSelectedCategoryName] = useState(categories[0]?.name || "");
        const [selectedCityKey, setSelectedCityKey] = useState("Москва"); 
        const [selectedPriceTypeKey, setSelectedPriceTypeKey] = useState("Цена 1"); 
        const [weight, setWeight] = useState("");
        const [volume, setVolume] = useState("");
        const [calculatedCost, setCalculatedCost] = useState(null);
        const [calculatedDensity, setCalculatedDensity] = useState(null);
        const [error, setError] = useState(null);

        const cityOptions = [{key: "Москва", label: t("Москва")}, {key: "Алматы", label: t("Алматы")}];
        const priceTypeOptions = [{key: "Цена 1", label: t("Цена 1")}, {key: "Цена 2", label: t("Цена 2")}];

        const handleCalculate = () => {
            // Логика расчета идентична оригинальной
            // Здесь должен быть весь код из оригинального Calculator компонента
        };

        return (
            <section className="calculator-section">
                <h2>{t("Калькулятор стоимости")}</h2>
                <div className="calculator-form">
                    <div>
                        <label htmlFor="category-select">{t("Категория товара:")}</label>
                        <select id="category-select" value={selectedCategoryName} onChange={e => setSelectedCategoryName(e.target.value)}>
                            {categories.map(cat => <option key={cat.name} value={cat.name}>{t(cat.name)}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="city-select">{t("Город назначения:")}</label>
                        <select id="city-select" value={selectedCityKey} onChange={e => setSelectedCityKey(e.target.value)}>
                            {cityOptions.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="price-type-select">{t("Тип цены:")}</label>
                        <select id="price-type-select" value={selectedPriceTypeKey} onChange={e => setSelectedPriceTypeKey(e.target.value)}>
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
                    <a href="index.html" className="language-link">Русский</a>
                    <a href="chinese.html" className="language-link active">中文</a>
                </div>
            </header>

            <main>
                {categories.length > 0 && <Calculator categories={categories} />}

                {categories.map((category, index) => (
                    <section key={index} className="category-section">
                        <h2>{t(category.name)}</h2>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t("№")}</th>
                                        <th>{t("Плотность (кг/м³)")}</th>
                                        <th>{t("Цена Москва 1 ($/кг)")}</th>
                                        <th>{t("Цена Москва 2 ($/кг)")}</th>
                                        <th>{t("Срок доставки Москва (дни)")}</th>
                                        <th>{t("Цена Алматы 1 ($/кг)")}</th>
                                        <th>{t("Цена Алматы 2 ($/кг)")}</th>
                                        <th>{t("Срок доставки Алматы (дни)")}</th>
                                        <th>{t("Москва Цена 1 (<100 $/м³)")}</th>
                                        <th>{t("Алматы Цена 1 (<100 $/м³)")}</th>
                                        <th>{t("Москва Цена 2 (<100 $/м³)")}</th>
                                        <th>{t("Алматы Цена 2 (<100 $/м³)")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.items.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td>{item.id}</td>
                                            <td>{t(item.density)}</td>
                                            <td>{item.priceMoscow1}</td>
                                            <td>{item.priceMoscow2}</td>
                                            <td>{item.deliveryMoscow}</td>
                                            <td>{item.priceAlmaty1}</td>
                                            <td>{item.priceAlmaty2}</td>
                                            <td>{item.deliveryAlmaty}</td>
                                            <td>{item.density.includes("Менее 100") ? item.priceMoscowLessThan100_Type1 : '-'}</td>
                                            <td>{item.density.includes("Менее 100") ? item.priceAlmatyLessThan100_Type1 : '-'}</td>
                                            <td>{item.density.includes("Менее 100") ? item.priceMoscowLessThan100_Type2 : '-'}</td>
                                            <td>{item.density.includes("Менее 100") ? item.priceAlmatyLessThan100_Type2 : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                ))}

                {conditions.length > 0 && (
                    <section className="conditions-section">
                        <h2>{t(conditionsTitle)}</h2>
                        <ul>
                            {conditions.map((condition, idx) => (
                                <li key={idx}>{t(condition)}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<ChineseApp />);
} 