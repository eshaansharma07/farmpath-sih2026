export type Language = 'en' | 'hi' | 'pa';

export interface AppTranslations {
  // Hero
  tagline: string;
  sihHeader: string;
  category: string;
  problemCode: string;
  heroDesc: string;
  startLiveDemo: string;
  startDemoSub: string;
  selectedLot: string;
  freshnessWindow: string;
  fuelBenchmark: string;

  // Decision comparison
  whereToSellTitle: string;
  whereToSellDesc: string;
  calculatedBadge: string;

  // Option A (Mandi)
  optionATitle: string;
  optionASubtitle: string;
  takeHomeLabel: string;
  totalForLotPrefix: string;
  whereCropGoes: string;
  whyFarmerLoses: string;
  mandiCutText: string;
  mandiSpoilageText: string;
  mandiUncertaintyText: string;
  mandiFooter: string;

  // Option B (FARMPATH)
  optionBTitle: string;
  optionBSubtitle: string;
  whyFarmerEarnsMore: string;
  zeroMiddlemenText: string;
  coldCoolingText: string;
  guaranteedPayoutText: string;
  extraCashLabel: string;

  // Lab
  simLabTitle: string;
  simLabDesc: string;
  saveToDbBtn: string;
  resetBtn: string;
  quickCropPresets: string;
  chooseCrop: string;
  chooseQty: string;
  chooseFarm: string;
  dieselSliderTitle: string;
  fuelNormal: string;
  fuelSpike: string;
  solverOutputTitle: string;
  solverOutputText: string;
  totalTakeHome: string;
}

export const TRANSLATIONS: Record<Language, AppTranslations> = {
  en: {
    tagline: "Find the route that earns the farmer more",
    sihHeader: "SMART INDIA HACKATHON 2026",
    category: "Software Category",
    problemCode: "Problem Statement: SIH26033",
    heroDesc: "Multiple intermediaries reduce farmers earnings and increase consumer prices. FARMPATH calculates the smartest, highest-earning trade route for Indian farmers by connecting them directly to food processors and bulk buyers with zero commission.",
    startLiveDemo: "START LIVE DEMO ▶",
    startDemoSub: "Click to watch the step-by-step interactive walkthrough for evaluators",
    selectedLot: "Selected Harvest Lot:",
    freshnessWindow: "Freshness Window:",
    fuelBenchmark: "Fuel Benchmark:",

    whereToSellTitle: "Where should the farmer sell his harvest?",
    whereToSellDesc: "See the exact financial difference between selling at the traditional mandi vs taking the FARMPATH recommended direct route.",
    calculatedBadge: "100% Calculated Decision",

    optionATitle: "Option A: What Happens Today",
    optionASubtitle: "Conventional APMC Mandi",
    takeHomeLabel: "Farmer Takes Home in Hand:",
    totalForLotPrefix: "Total for",
    whereCropGoes: "Where the crop goes:",
    whyFarmerLoses: "Why the Farmer Earns Less Here:",
    mandiCutText: "Middleman Commission: Arhatiyas take an 8.5% cut from your sale.",
    mandiSpoilageText: "Sun & Spoilage: Produce sits in open queue; produce rots before auction.",
    mandiUncertaintyText: "Open Market Uncertainty: Prices fluctuate wildly with zero advance contracts.",
    mandiFooter: "The farmer does all the work, while commission agents take guaranteed profits.",

    optionBTitle: "Option B: The FARMPATH Route",
    optionBSubtitle: "Direct Value-Add Contract",
    whyFarmerEarnsMore: "Why the Farmer Earns More:",
    zeroMiddlemenText: "Zero Middlemen: Direct contract with ₹0 commission fee deducted.",
    coldCoolingText: "Cold Pre-Cooling: Crop is chilled early; spoilage drops significantly.",
    guaranteedPayoutText: "Guaranteed Payout: Buyer agrees to a fixed purchase price in advance.",
    extraCashLabel: "Extra Cash in Farmer's Pocket:",

    simLabTitle: "Interactive What-If Simulation Lab: Customize Variables Live",
    simLabDesc: "Pick crops, change harvest load, or adjust diesel prices to see the solver calculate the most profitable path in real time.",
    saveToDbBtn: "Save to DB",
    resetBtn: "Reset",
    quickCropPresets: "Quick Crop Presets (Click to Test Different Crops):",
    chooseCrop: "1. Choose Crop:",
    chooseQty: "2. Choose Harvest Quantity:",
    chooseFarm: "3. Choose Farm Location:",
    dieselSliderTitle: "Simulate Diesel Fuel Price Impact:",
    fuelNormal: "₹90/L (Normal)",
    fuelSpike: "₹125/L (Fuel Spike)",
    solverOutputTitle: "FARMPATH Recommended:",
    solverOutputText: "By cutting out APMC commission agents and delivering directly with cold pre-cooling, the farmer nets higher earnings with zero commission.",
    totalTakeHome: "Total Take-Home:",
  },

  hi: {
    tagline: "किसान की कमाई, सही रास्ते से",
    sihHeader: "स्मार्ट इंडिया हैकाथॉन 2026",
    category: "सॉफ्टवेयर श्रेणी",
    problemCode: "समस्या विवरण: SIH26033",
    heroDesc: "बिचौलियों के कारण किसान की कमाई घटती है और उपभोक्ता के लिए दाम बढ़ते हैं। FARMPATH भारतीय किसानों के लिए सबसे मुनाफ़ेदार व्यापारिक रास्ता खोजता है—सीधे फ़ूड फ़ैक्ट्री और थोक खरीदारों से जोड़कर 0% कमीशन पर।",
    startLiveDemo: "सजीव डेमो शुरू करें ▶",
    startDemoSub: "मूल्यांकनकर्ताओं के लिए 13 चरणों का इंटरैक्टिव प्रदर्शन देखने के लिए क्लिक करें",
    selectedLot: "चुनी गई फसल खेप:",
    freshnessWindow: "ताज़गी अवधि:",
    fuelBenchmark: "डीज़ल मानक:",

    whereToSellTitle: "किसान को अपनी फसल कहाँ बेचनी चाहिए?",
    whereToSellDesc: "पारंपरिक APMC मंडी और FARMPATH द्वारा सुझाई गई सीधी सड़क के बीच मुनाफ़े का सीधा अंतर देखें।",
    calculatedBadge: "100% गणितीय निर्णय",

    optionATitle: "विकल्प A: आज का पारंपरिक तरीका",
    optionASubtitle: "पारंपरिक APMC मंडी",
    takeHomeLabel: "किसान के हाथ में शुद्ध कमाई:",
    totalForLotPrefix: "कुल फसल हेतु:",
    whereCropGoes: "फसल कहाँ जाती है:",
    whyFarmerLoses: "यहाँ किसान का नुकसान क्यों होता है:",
    mandiCutText: "आढ़तिया कमीशन: बिचौलिए कुल बिक्री पर 8.5% कमीशन काट लेते हैं।",
    mandiSpoilageText: "धूप और सड़न: मंडी की लाइन में खुली धूप में खड़ा रहने से फसल सड़ जाती है।",
    mandiUncertaintyText: "अस्थिर बाज़ार: बिना किसी पूर्व समझौते के भाव अचानक गिर जाते हैं।",
    mandiFooter: "मेहनत किसान करता है, जबकि आढ़तिये पक्का मुनाफ़ा कमाते हैं।",

    optionBTitle: "विकल्प B: FARMPATH समझदार मार्ग",
    optionBSubtitle: "सीधा मूल्य-संवर्धन अनुबंध",
    whyFarmerEarnsMore: "किसान को ज़्यादा बचत क्यों होती है:",
    zeroMiddlemenText: "शून्य बिचौलिए: सीधे खरीदार से अनुबंध, ₹0 कमीशन कटता है।",
    coldCoolingText: "कोल्ड प्री-कूलिंग: फसल को तुरंत ठंडा किया जाता है, जिससे सड़न रुकती है।",
    guaranteedPayoutText: "तयशुदा भुगतान: खरीदार पहले से तय दर पर ख़रीदने का लिखित वादा करता है।",
    extraCashLabel: "किसान की जेब में अतिरिक्त मुनाफ़ा:",

    simLabTitle: "सजीव सिमुलेशन लैब: अपनी फसल और परिस्थितियों के अनुसार बदलें",
    simLabDesc: "फसल चुनें, वज़न बदलें या डीज़ल की दर बदलकर देखें कि इंजन तुरंत सबसे मुनाफ़ेदार रास्ता कैसे निकालता है।",
    saveToDbBtn: "डेटाबेस में सहेजें",
    resetBtn: "रीसेट करें",
    quickCropPresets: "त्वरित फसल विकल्प (परीक्षण हेतु क्लिक करें):",
    chooseCrop: "1. फसल चुनें:",
    chooseQty: "2. फसल की मात्रा चुनें:",
    chooseFarm: "3. खेत का स्थान चुनें:",
    dieselSliderTitle: "डीज़ल मूल्य बदलाव का सीधा प्रभाव देखें:",
    fuelNormal: "₹90/ली (सामान्य)",
    fuelSpike: "₹125/ली (मूल्य वृद्धि)",
    solverOutputTitle: "FARMPATH अनुशंसित मार्ग:",
    solverOutputText: "मंडी के आढ़तियों को हटाकर और कोल्ड प्री-कूलिंग के साथ सीधी डिलीवरी करके, किसान को अधिकतम शुद्ध कमाई मिलती है।",
    totalTakeHome: "कुल शुद्ध आय:",
  },

  pa: {
    tagline: "ਕਿਸਾਨ ਦੀ ਕਮਾਈ, ਸਹੀ ਰਸਤੇ ਤੋਂ",
    sihHeader: "ਸਮਾਰਟ ਇੰਡੀਆ ਹੈਕਾਥਾਨ 2026",
    category: "ਸਾਫਟਵੇਅਰ ਸ਼੍ਰੇਣੀ",
    problemCode: "ਸਮੱਸਿਆ ਕੋਡ: SIH26033",
    heroDesc: "ਵਿਚੋਲਿਆਂ ਕਰਕੇ ਕਿਸਾਨ ਦੀ ਕਮਾਈ ਘੱਟਦੀ ਹੈ ਅਤੇ ਗਾਹਕ ਲਈ ਭਾਅ ਵੱਧਦੇ ਹਨ। FARMPATH ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ਸਭ ਤੋਂ ਵੱਧ ਮੁਨਾਫ਼ੇ ਵਾਲਾ ਰਸਤਾ ਲੱਭਦਾ ਹੈ—ਸਿੱਧਾ ਪ੍ਰੋਸੈਸਿੰਗ ਪਲਾਂਟਾਂ ਅਤੇ ਥੋਕ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜ ਕੇ ਬਿਨਾਂ ਕਿਸੇ ਆੜ੍ਹਤ ਦੇ।",
    startLiveDemo: "ਲਾਈਵ ਡੈਮੋ ਸ਼ੁਰੂ ਕਰੋ ▶",
    startDemoSub: "ਜੱਜਾਂ ਲਈ 13 ਕਦਮਾਂ ਦਾ ਇੰਟਰਐਕਟਿਵ ਵਾਕਥਰੂ ਦੇਖਣ ਲਈ ਕਲਿੱਕ ਕਰੋ",
    selectedLot: "ਚੁਣੀ ਗਈ ਫਸਲ:",
    freshnessWindow: "ਤਾਜ਼ਗੀ ਸਮਾਂ:",
    fuelBenchmark: "ਡੀਜ਼ਲ ਰੇਟ:",

    whereToSellTitle: "ਕਿਸਾਨ ਨੂੰ ਆਪਣੀ ਫਸਲ ਕਿੱਥੇ ਵੇਚਣੀ ਚਾਹੀਦੀ ਹੈ?",
    whereToSellDesc: "ਰਵਾਇਤੀ ਦਾਣਾ ਮੰਡੀ ਅਤੇ FARMPATH ਦੇ ਸਹੀ ਰਸਤੇ ਵਿਚਕਾਰ ਕਮਾਈ ਦਾ ਅਸਲ ਫ਼ਰਕ ਦੇਖੋ।",
    calculatedBadge: "100% ਸਹੀ ਹਿਸਾਬ",

    optionATitle: "ਵਿਕਲਪ A: ਅੱਜ ਦਾ ਰਵਾਇਤੀ ਤਰੀਕਾ",
    optionASubtitle: "ਰਵਾਇਤੀ APMC ਦਾਣਾ ਮੰਡੀ",
    takeHomeLabel: "ਕਿਸਾਨ ਦੇ ਹੱਥ ਵਿੱਚ ਸ਼ੁੱਧ ਕਮਾਈ:",
    totalForLotPrefix: "ਕੁੱਲ ਫਸਲ ਲਈ:",
    whereCropGoes: "ਟਰੱਕ ਕਿੱਥੇ ਜਾਂਦਾ ਹੈ:",
    whyFarmerLoses: "ਇੱਥੇ ਕਿਸਾਨ ਦਾ ਨੁਕਸਾਨ ਕਿਉਂ ਹੁੰਦਾ ਹੈ:",
    mandiCutText: "ਆੜ੍ਹਤ ਕਮਿਸ਼ਨ: ਆੜ੍ਹਤੀਏ ਕੁੱਲ ਵਿਕਰੀ ਵਿੱਚੋਂ 8.5% ਕਮਿਸ਼ਨ ਕੱਟ ਲੈਂਦੇ ਹਨ।",
    mandiSpoilageText: "ਧੁੱਪ ਅਤੇ ਖਰਾਬੀ: ਮੰਡੀ ਦੀ ਲੰਬੀ ਲਾਈਨ ਵਿੱਚ ਖੜ੍ਹੇ ਰਹਿਣ ਕਾਰਨ ਫਸਲ ਗਲ ਜਾਂਦੀ ਹੈ।",
    mandiUncertaintyText: "ਮੰਡੀ ਦੀ ਬੇਯਕੀਨੀ: ਬਿਨਾਂ ਪੇਸ਼ਗੀ ਸਮਝੌਤੇ ਦੇ ਭਾਅ ਅਚਾਨਕ ਡਿੱਗ ਜਾਂਦੇ ਹਨ।",
    mandiFooter: "ਮਿਹਨਤ ਕਿਸਾਨ ਕਰਦਾ ਹੈ, ਪਰ ਪੱਕੀ ਕਮਾਈ ਵਿਚੋਲੇ ਖਾਂਦੇ ਹਨ।",

    optionBTitle: "ਵਿਕਲਪ B: FARMPATH ਸਮਝਦਾਰ ਰਸਤਾ",
    optionBSubtitle: "ਸਿੱਧਾ ਫੈਕਟਰੀ ਸਮਝੌਤਾ",
    whyFarmerEarnsMore: "ਕਿਸਾਨ ਨੂੰ ਵੱਧ ਮੁਨਾਫ਼ਾ ਕਿਉਂ ਹੁੰਦਾ ਹੈ:",
    zeroMiddlemenText: "ਜ਼ੀਰੋ ਵਿਚੋਲੇ: ਸਿੱਧਾ ਕੰਪਨੀ ਨਾਲ ਸਮਝੌਤਾ, ₹0 ਆੜ੍ਹਤ ਕੱਟੀ ਜਾਂਦੀ ਹੈ।",
    coldCoolingText: "ਕੋਲਡ ਪ੍ਰੀ-ਕੂਲਿੰਗ: ਫਸਲ ਨੂੰ ਤੁਰੰਤ ਠੰਢਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਖਰਾਬੀ ਰੁਕਦੀ ਹੈ।",
    guaranteedPayoutText: "ਪੱਕਾ ਭਾਅ: ਖਰੀਦਦਾਰ ਪਹਿਲਾਂ ਹੀ ਤੈਅ ਰੇਟ 'ਤੇ ਖਰੀਦਣ ਦੀ ਗਾਰੰਟੀ ਦਿੰਦਾ ਹੈ।",
    extraCashLabel: "ਕਿਸਾਨ ਦੀ ਜੇਬ ਵਿੱਚ ਵਾਧੂ ਮੁਨਾਫ਼ਾ:",

    simLabTitle: "ਲਾਈਵ ਸਿਮੂਲੇਸ਼ਨ ਲੈਬ: ਆਪਣੀ ਫਸਲ ਅਤੇ ਹਾਲਾਤ ਅਨੁਸਾਰ ਬਦਲੋ",
    simLabDesc: "ਫਸਲ ਚੁਣੋ, ਭਾਰ ਬਦਲੋ ਜਾਂ ਡੀਜ਼ਲ ਦਾ ਭਾਅ ਬਦਲ ਕੇ ਦੇਖੋ ਕਿ ਇੰਜਣ ਤੁਰੰਤ ਸਭ ਤੋਂ ਵੱਧ ਕਮਾਈ ਵਾਲਾ ਰਸਤਾ ਕਿਵੇਂ ਲੱਭਦਾ ਹੈ।",
    saveToDbBtn: "ਡਾਟਾਬੇਸ ਵਿੱਚ ਸੇਵ ਕਰੋ",
    resetBtn: "ਰੀਸੈੱਟ",
    quickCropPresets: "ਫਟਾਫਟ ਫਸਲ ਚੁਣੋ (ਟੈਸਟ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ):",
    chooseCrop: "1. ਫਸਲ ਚੁਣੋ:",
    chooseQty: "2. ਫਸਲ ਦੀ ਮਾਤਰਾ ਚੁਣੋ:",
    chooseFarm: "3. ਖੇਤ ਦੀ ਥਾਂ ਚੁਣੋ:",
    dieselSliderTitle: "ਡੀਜ਼ਲ ਰੇਟ ਦਾ ਅਸਰ ਦੇਖੋ:",
    fuelNormal: "₹90/ਲੀ (ਆਮ)",
    fuelSpike: "₹125/ਲੀ (ਵੱਧ ਰੇਟ)",
    solverOutputTitle: "FARMPATH ਦਾ ਸਹੀ ਰਸਤਾ:",
    solverOutputText: "ਮੰਡੀ ਦੇ ਵਿਚੋਲਿਆਂ ਨੂੰ ਹਟਾ ਕੇ ਅਤੇ ਕੋਲਡ ਪ੍ਰੀ-ਕੂਲਿੰਗ ਨਾਲ ਸਿੱਧੀ ਡਿਲੀਵਰੀ ਕਰਕੇ, ਕਿਸਾਨ ਨੂੰ ਵੱਧ ਮੁਨਾਫ਼ਾ ਮਿਲਦਾ ਹੈ।",
    totalTakeHome: "ਕੁੱਲ ਸ਼ੁੱਧ ਕਮਾਈ:",
  },
};
