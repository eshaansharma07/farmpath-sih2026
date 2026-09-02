export type Language = 'en' | 'hi' | 'pa';

export const TRANSLATIONS: Record<Language, {
  tagline: string;
  subTagline: string;
  meetFarmer: string;
  farmerStory: string;
  liveScenario: string;
  harvestText: string;
  windowText: string;
  decisionTitle: string;
  decisionDesc: string;
  optionATitle: string;
  optionBTitle: string;
  farmerTakesHome: string;
  totalForLot: string;
  whereTruckGoes: string;
  whyLosesMoney: string;
  whyEarnsMore: string;
  extraCash: string;
  judgeTestTitle: string;
  judgeTestDesc: string;
  dieselLabel: string;
  resetSlider: string;
}> = {
  en: {
    tagline: "Find the route that earns the farmer more",
    subTagline: "Farm-to-Market Supply-Chain Optimization Platform",
    meetFarmer: "Meet Gurmail. He has 5,000 kg of fresh tomatoes.",
    farmerStory: "He worked 4 months to grow them on his farm in Punjab. Now he has just 48 hours to sell them before they rot. Which road should his truck take?",
    liveScenario: "Live Demonstration Scenario:",
    harvestText: "Harvest: Tomorrow Dawn",
    windowText: "Freshness Window: 48 Hours Max",
    decisionTitle: "The Real-World Choice: Where should Gurmail sell his harvest?",
    decisionDesc: "Comparing the conventional APMC Mandi route against the FARMPATH recommended route.",
    optionATitle: "Option A: What He Does Today",
    optionBTitle: "Option B: The Intelligent Route",
    farmerTakesHome: "Cash Gurmail Takes Home in Hand:",
    totalForLot: "Total for 5,000 kg lot:",
    whereTruckGoes: "Where the truck goes:",
    whyLosesMoney: "Where Gurmail Loses Money:",
    whyEarnsMore: "Why Gurmail Earns Much More:",
    extraCash: "Extra Cash in Gurmail's Pocket:",
    judgeTestTitle: "Interactive Judge Demonstration: Real-Time What-If Sensitivity",
    judgeTestDesc: "Demonstrate to the evaluators that this is a calculating optimization engine, not a static mockup.",
    dieselLabel: "Simulate Diesel Price Surge:",
    resetSlider: "Reset Slider",
  },
  hi: {
    tagline: "किसान की कमाई, सही रास्ते से",
    subTagline: "खेत से बाज़ार तक आपूर्ति-श्रृंखला अनुकूलन प्रणाली",
    meetFarmer: "गुरमेल सिंह से मिलिए। उनके पास 5,000 किलो ताज़ा टमाटर हैं।",
    farmerStory: "उन्होंने पंजाब में अपने खेत पर 4 महीने कड़ी मेहनत की। अब टमाटर सड़ने से पहले बेचने के लिए केवल 48 घंटे हैं। उनका ट्रक किस रास्ते जाना चाहिए?",
    liveScenario: "सजीव प्रदर्शन परिदृश्य:",
    harvestText: "कटाई: कल सुबह तड़के",
    windowText: "ताज़गी अवधि: अधिकतम 48 घंटे",
    decisionTitle: "जमीनी हकीकत: गुरमेल को अपनी फसल कहाँ बेचनी चाहिए?",
    decisionDesc: "पारंपरिक APMC मंडी और FARMPATH द्वारा सुझाई गई सीधी सड़क की वास्तविक तुलना।",
    optionATitle: "विकल्प A: आज का पारंपरिक तरीका",
    optionBTitle: "विकल्प B: FARMPATH समझदार मार्ग",
    farmerTakesHome: "गुरमेल के हाथ में शुद्ध कमाई:",
    totalForLot: "5,000 किलो फसल की कुल आय:",
    whereTruckGoes: "ट्रक कहाँ जाता है:",
    whyLosesMoney: "गुरमेल का नुकसान कहाँ होता है:",
    whyEarnsMore: "इस रास्ते से ज़्यादा बचत क्यों होती है:",
    extraCash: "गुरमेल की जेब में अतिरिक्त मुनाफ़ा:",
    judgeTestTitle: "सजीव जज परीक्षण: वास्तविक परिस्थितियों में तात्कालिक बदलाव",
    judgeTestDesc: "मूल्यांकनकर्ताओं को दिखाएँ कि यह एक वास्तविक गणना करने वाला इंजन है, स्थिर प्रोटोटाइप नहीं।",
    dieselLabel: "डीज़ल मूल्य वृद्धि का परीक्षण करें:",
    resetSlider: "रीसेट करें",
  },
  pa: {
    tagline: "ਕਿਸਾਨ ਦੀ ਕਮਾਈ, ਸਹੀ ਰਸਤੇ ਤੋਂ",
    subTagline: "ਖੇਤ ਤੋਂ ਮੰਡੀ ਤੱਕ ਸਪਲਾਈ ਚੇਨ ਸੁਧਾਰ ਪਲੇਟਫਾਰਮ",
    meetFarmer: "ਗੁਰਮੇਲ ਸਿੰਘ ਨਾਲ ਮਿਲੋ। ਉਨ੍ਹਾਂ ਕੋਲ 5,000 ਕਿਲੋ ਤਾਜ਼ੇ ਟਮਾਟਰ ਹਨ।",
    farmerStory: "ਉਨ੍ਹਾਂ ਨੇ ਪੰਜਾਬ ਵਿੱਚ ਆਪਣੇ ਖੇਤ ਵਿੱਚ 4 ਮਹੀਨੇ ਮਿਹਨਤ ਕੀਤੀ। ਹੁਣ ਖਰਾਬ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਵੇਚਣ ਲਈ ਸਿਰਫ 48 ਘੰਟੇ ਹਨ। ਉਨ੍ਹਾਂ ਦਾ ਟਰੱਕ ਕਿਹੜੇ ਰਸਤੇ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ?",
    liveScenario: "ਲਾਈਵ ਪ੍ਰਦਰਸ਼ਨ ਦ੍ਰਿਸ਼:",
    harvestText: "ਵਾਢੀ: ਕੱਲ੍ਹ ਸਵੇਰੇ",
    windowText: "ਤਾਜ਼ਗੀ ਸਮਾਂ: ਵੱਧ ਤੋਂ ਵੱਧ 48 ਘੰਟੇ",
    decisionTitle: "ਜ਼ਮੀਨੀ ਹਕੀਕਤ: ਗੁਰਮੇਲ ਨੂੰ ਆਪਣੀ ਫਸਲ ਕਿੱਥੇ ਵੇਚਣੀ ਚਾਹੀਦੀ ਹੈ?",
    decisionDesc: "ਰਵਾਇਤੀ ਮੰਡੀ ਅਤੇ FARMPATH ਦੇ ਸਹੀ ਰਸਤੇ ਦੀ ਤੁਲਨਾ।",
    optionATitle: "ਵਿਕਲਪ A: ਅੱਜ ਦਾ ਰਵਾਇਤੀ ਤਰੀਕਾ",
    optionBTitle: "ਵਿਕਲਪ B: ਸਮਝਦਾਰ ਰਸਤਾ",
    farmerTakesHome: "ਗੁਰਮੇਲ ਦੇ ਹੱਥ ਵਿੱਚ ਸ਼ੁੱਧ ਕਮਾਈ:",
    totalForLot: "5,000 ਕਿਲੋ ਫਸਲ ਦੀ ਕੁੱਲ ਆਮਦਨ:",
    whereTruckGoes: "ਟਰੱਕ ਕਿੱਥੇ ਜਾਂਦਾ ਹੈ:",
    whyLosesMoney: "ਗੁਰਮੇਲ ਦਾ ਨੁਕਸਾਨ ਕਿੱਥੇ ਹੁੰਦਾ ਹੈ:",
    whyEarnsMore: "ਇਸ ਰਸਤੇ ਤੋਂ ਵੱਧ ਮੁਨਾਫ਼ਾ ਕਿਉਂ ਹੁੰਦਾ ਹੈ:",
    extraCash: "ਗੁਰਮੇਲ ਦੀ ਜੇਬ ਵਿੱਚ ਵਾਧੂ ਮੁਨਾਫ਼ਾ:",
    judgeTestTitle: "ਲਾਈਵ ਜੱਜ ਟੈਸਟ: ਮੌਸਮ ਜਾਂ ਡੀਜ਼ਲ ਬਦਲਣ ਤੇ ਲਾਈਵ ਹਿਸਾਬ",
    judgeTestDesc: "ਜੱਜਾਂ ਨੂੰ ਦਿਖਾਓ ਕਿ ਇਹ ਇੱਕ ਅਸਲੀ ਹਿਸਾਬ ਲਗਾਉਣ ਵਾਲਾ ਇੰਜਣ ਹੈ।",
    dieselLabel: "ਡੀਜ਼ਲ ਦੀ ਕੀਮਤ ਵਧਾ ਕੇ ਦੇਖੋ:",
    resetSlider: "ਰੀਸੈੱਟ ਕਰੋ",
  },
};
