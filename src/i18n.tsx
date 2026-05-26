import React, { createContext, useEffect, useState } from 'react';

export type Language = 'en' | 'fr' | 'es' | 'zh' | 'hi';

type TranslationValues = Record<string, string | number>;

type LanguageContextValue = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  locale: string;
  t: (key: string, values?: TranslationValues) => string;
};

const translations = {
  en: {
    nav: {
      ourRobot: 'Our Robot',
      achievements: 'Achievements',
      revealsAndRecaps: 'Reveals & Recaps',
      events: 'Events',
      pathPlanner: 'PathPlanner',
      language: 'Language',
    },
    hero: {
      titlePrefix: 'Kawaii',
      titleSuffix: 'Kittens',
      descriptionPrefix: 'We are Team 210K, a passionate group of fourth year robotics students from Calgary, Alberta, Canada 🍁 affiliated with ',
      descriptionSuffix: '.',
      cta: 'Meow meow',
    },
    achievements: {
      title: 'Our Achievements',
      loadingError: 'Failed to fetch awards',
    },
    ourRobot: {
      title: 'Our Robot',
      chassisCad: 'Chassis CAD',
      loadingModel: 'Loading 3D Model...',
      initializingViewer: 'Initializing 3D Viewer...',
      controls: 'Drag to rotate • Scroll to zoom • Right-click to pan',
      technicalSpecifications: 'Technical Specifications',
      dimensions: 'Dimensions',
      weight: 'Weight',
      driveSystem: 'Drive System',
      motors: 'Motors',
      faceView: 'Face View',
      backView: 'Back View',
      seasons: {
        pushBack: { name: 'VRC Push Back' },
        highStakes: { name: 'VRC High Stakes' },
      },
      specs: {
        pushBackWeight: 'very fat',
        highStakesWeight: 'heavy enough to bend hs axle after it fell off the table',
      },
    },
    reveals: {
      title: 'Reveals & Recaps',
      openInYoutube: 'Open in YouTube',
    },
    events: {
      title: 'Our Events',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      awardsWon: 'Awards Won:',
      loadingError: 'Failed to fetch events',
    },
    gallery: {
      title: 'Photos',
      sections: {
        pushBack: 'Push Back',
      },
    },
    videos: {
      winterAutonomous: {
        title: 'Winter Autonomous Showcase | VRC Push Back',
        description: 'Filmed at STEMIA LCQ. Edited by Michael.',
      },
      oneWorld: {
        title: 'One World @ UCBerk Recap | VRC Push Back',
        description: 'Judges Award. Edited by Henry 55288A',
      },
      moaSignature: {
        title: 'MoA Signature Event Recap | VRC Push Back',
        description: 'Recap of our participation in the Mall of America Signature Event. Edited by Michael',
      },
      eliminationAuton: {
        title: 'Elimination Auton Showcase | VRC High Stakes',
        description: 'Filmed w/ team 210Z during the 2025 Alberta Provincials.',
      },
    },
    footer: {
      madeWith: 'Made with',
      onGitHub: 'on GitHub',
    },
    stats: {
      globalSkillsRanking: 'Global Skills Ranking',
      regionalSkillsRanking: 'Regional Skills Ranking',
      topPercent: 'Top {percent}%',
      outOf: 'out of {total}',
      withinAlberta: 'Within Alberta',
      awardsThisSeason: 'Awards this Season: {total}',
      cumulativeAwards: 'Cumulative Awards: {total}',
    },
    awards: {
      categories: {
        Excellence: 'Excellence',
        Champion: 'Champion',
        Other: 'Other',
      },
      qualifiesTo: 'Qualifies to:',
      descriptions: {
        Excellence: 'The highest honor in VEX Robotics, recognizing overall excellence in building a high-quality robotics program. This award considers robot performance, engineering documentation, and qualification ranking placements.',
        Champion: 'Awarded to the individual skills champions and winning alliance of a tournament, demonstrating superior robot performance and effective alliance cooperation during elimination matches.',
        Other: 'Various awards recognizing specific achievements in design, sportsmanship, innovation and other aspects deserving specific recognition.',
      },
    },
  },
  fr: {
    nav: {
      ourRobot: 'Notre robot',
      achievements: 'Réussites',
      revealsAndRecaps: 'Révélations et récapitulatifs',
      events: 'Événements',
      pathPlanner: 'PathPlanner',
      language: 'Langue',
    },
    hero: {
      titlePrefix: 'Kawaii',
      titleSuffix: 'Chatons',
      descriptionPrefix: 'Nous sommes l’équipe 210K, un groupe passionné d’étudiants de quatrième année en robotique de Calgary, en Alberta, au Canada 🍁, affilié à ',
      descriptionSuffix: '.',
      cta: 'Miaou miaou',
    },
    achievements: {
      title: 'Nos réussites',
      loadingError: 'Impossible de récupérer les prix',
    },
    ourRobot: {
      title: 'Notre robot',
      chassisCad: 'CAO du châssis',
      loadingModel: 'Chargement du modèle 3D...',
      initializingViewer: 'Initialisation du visualiseur 3D...',
      controls: 'Faire glisser pour pivoter • Faire défiler pour zoomer • Clic droit pour déplacer',
      technicalSpecifications: 'Spécifications techniques',
      dimensions: 'Dimensions',
      weight: 'Poids',
      driveSystem: 'Système de conduite',
      motors: 'Moteurs',
      faceView: 'Vue de face',
      backView: 'Vue arrière',
      seasons: {
        pushBack: { name: 'VRC Push Back' },
        highStakes: { name: 'VRC High Stakes' },
      },
      specs: {
        pushBackWeight: 'très massif',
        highStakesWeight: 'assez lourd pour tordre l’axe HS après qu’il soit tombé de la table',
      },
    },
    reveals: {
      title: 'Révélations et récapitulatifs',
      openInYoutube: 'Ouvrir dans YouTube',
    },
    events: {
      title: 'Nos événements',
      upcoming: 'Événements à venir',
      past: 'Événements passés',
      awardsWon: 'Prix remportés :',
      loadingError: 'Impossible de récupérer les événements',
    },
    gallery: {
      title: 'Photos',
      sections: {
        pushBack: 'Push Back',
      },
    },
    videos: {
      winterAutonomous: {
        title: 'Winter Autonomous Showcase | VRC Push Back',
        description: 'Filmé au STEMIA LCQ. Monté par Michael.',
      },
      oneWorld: {
        title: 'Récapitulatif de One World @ UCBerk | VRC Push Back',
        description: 'Prix des juges. Monté par Henry 55288A',
      },
      moaSignature: {
        title: 'Récapitulatif de l’événement signature MoA | VRC Push Back',
        description: 'Récapitulatif de notre participation à l’événement signature du Mall of America. Monté par Michael',
      },
      eliminationAuton: {
        title: 'Présentation de l’auton d’élimination | VRC High Stakes',
        description: 'Filmé avec l’équipe 210Z pendant les provinciaux 2025 de l’Alberta.',
      },
    },
    footer: {
      madeWith: 'Fait avec',
      onGitHub: 'sur GitHub',
    },
    stats: {
      globalSkillsRanking: 'Classement mondial des Skills',
      regionalSkillsRanking: 'Classement régional des Skills',
      topPercent: 'Top {percent} %',
      outOf: 'sur {total}',
      withinAlberta: 'En Alberta',
      awardsThisSeason: 'Prix cette saison : {total}',
      cumulativeAwards: 'Prix cumulés : {total}',
    },
    awards: {
      categories: {
        Excellence: 'Excellence',
        Champion: 'Champion',
        Other: 'Autres',
      },
      qualifiesTo: 'Qualifie pour :',
      descriptions: {
        Excellence: 'La plus haute distinction en VEX Robotics, qui reconnaît l’excellence globale d’un programme robotique de grande qualité. Ce prix tient compte de la performance du robot, de la documentation technique et du classement de qualification.',
        Champion: 'Attribué aux champions individuels des skills et à l’alliance gagnante d’un tournoi, il démontre une performance supérieure du robot et une excellente coopération pendant les matchs d’élimination.',
        Other: 'Divers prix qui reconnaissent des réalisations précises en conception, esprit sportif, innovation et d’autres aspects dignes de mention.',
      },
    },
  },
  es: {
    nav: {
      ourRobot: 'Nuestro robot',
      achievements: 'Logros',
      revealsAndRecaps: 'Presentaciones y resúmenes',
      events: 'Eventos',
      pathPlanner: 'PathPlanner',
      language: 'Idioma',
    },
    hero: {
      titlePrefix: 'Kawaii',
      titleSuffix: 'Gatitos',
      descriptionPrefix: 'Somos el equipo 210K, un grupo apasionado de estudiantes de robótica de cuarto año de Calgary, Alberta, Canadá 🍁, afiliado a ',
      descriptionSuffix: '.',
      cta: 'Miau miau',
    },
    achievements: {
      title: 'Nuestros logros',
      loadingError: 'No se pudieron obtener los premios',
    },
    ourRobot: {
      title: 'Nuestro robot',
      chassisCad: 'CAD del chasis',
      loadingModel: 'Cargando modelo 3D...',
      initializingViewer: 'Inicializando visor 3D...',
      controls: 'Arrastra para girar • Desplaza para acercar • Clic derecho para mover',
      technicalSpecifications: 'Especificaciones técnicas',
      dimensions: 'Dimensiones',
      weight: 'Peso',
      driveSystem: 'Sistema de transmisión',
      motors: 'Motores',
      faceView: 'Vista frontal',
      backView: 'Vista trasera',
      seasons: {
        pushBack: { name: 'VRC Push Back' },
        highStakes: { name: 'VRC High Stakes' },
      },
      specs: {
        pushBackWeight: 'muy gordito',
        highStakesWeight: 'lo bastante pesado como para doblar el eje hs después de caer de la mesa',
      },
    },
    reveals: {
      title: 'Presentaciones y resúmenes',
      openInYoutube: 'Abrir en YouTube',
    },
    events: {
      title: 'Nuestros eventos',
      upcoming: 'Próximos eventos',
      past: 'Eventos pasados',
      awardsWon: 'Premios obtenidos:',
      loadingError: 'No se pudieron obtener los eventos',
    },
    gallery: {
      title: 'Fotos',
      sections: {
        pushBack: 'Push Back',
      },
    },
    videos: {
      winterAutonomous: {
        title: 'Demostración autónoma de invierno | VRC Push Back',
        description: 'Grabado en STEMIA LCQ. Editado por Michael.',
      },
      oneWorld: {
        title: 'Resumen de One World @ UCBerk | VRC Push Back',
        description: 'Premio de los jueces. Editado por Henry 55288A',
      },
      moaSignature: {
        title: 'Resumen del evento firma de MoA | VRC Push Back',
        description: 'Resumen de nuestra participación en el evento firma del Mall of America. Editado por Michael',
      },
      eliminationAuton: {
        title: 'Demostración auton de eliminatorias | VRC High Stakes',
        description: 'Grabado con el equipo 210Z durante los Provinciales de Alberta 2025.',
      },
    },
    footer: {
      madeWith: 'Hecho con',
      onGitHub: 'en GitHub',
    },
    stats: {
      globalSkillsRanking: 'Clasificación global de Skills',
      regionalSkillsRanking: 'Clasificación regional de Skills',
      topPercent: 'Top {percent}%',
      outOf: 'de {total}',
      withinAlberta: 'En Alberta',
      awardsThisSeason: 'Premios esta temporada: {total}',
      cumulativeAwards: 'Premios acumulados: {total}',
    },
    awards: {
      categories: {
        Excellence: 'Excelencia',
        Champion: 'Campeón',
        Other: 'Otros',
      },
      qualifiesTo: 'Clasifica para:',
      descriptions: {
        Excellence: 'El mayor honor en VEX Robotics, que reconoce la excelencia general en la construcción de un programa robótico de alta calidad. Este premio considera el rendimiento del robot, la documentación de ingeniería y la clasificación en la fase de clasificación.',
        Champion: 'Otorgado a los campeones individuales de skills y a la alianza ganadora de un torneo, demostrando un rendimiento superior del robot y una cooperación eficaz durante las eliminatorias.',
        Other: 'Varios premios que reconocen logros específicos en diseño, deportividad, innovación y otros aspectos dignos de reconocimiento.',
      },
    },
  },
  zh: {
    nav: {
      ourRobot: '我们的机器人',
      achievements: '成就',
      revealsAndRecaps: '发布与回顾',
      events: '赛事',
      pathPlanner: 'PathPlanner',
      language: '语言',
    },
    hero: {
      titlePrefix: '可爱',
      titleSuffix: '小猫',
      descriptionPrefix: '我们是210K团队，一群来自加拿大阿尔伯塔省卡尔加里的四年级机器人学生，隶属于 ',
      descriptionSuffix: '。',
      cta: '喵喵',
    },
    achievements: {
      title: '我们的成就',
      loadingError: '无法获取奖项',
    },
    ourRobot: {
      title: '我们的机器人',
      chassisCad: '底盘 CAD',
      loadingModel: '正在加载 3D 模型...',
      initializingViewer: '正在初始化 3D 视图...',
      controls: '拖动旋转 • 滚动缩放 • 右键平移',
      technicalSpecifications: '技术规格',
      dimensions: '尺寸',
      weight: '重量',
      driveSystem: '驱动系统',
      motors: '电机',
      faceView: '正面图',
      backView: '背面图',
      seasons: {
        pushBack: { name: 'VRC Push Back' },
        highStakes: { name: 'VRC High Stakes' },
      },
      specs: {
        pushBackWeight: '非常胖',
        highStakesWeight: '重到从桌子上掉下来后还能把 hs 轴弄弯',
      },
    },
    reveals: {
      title: '发布与回顾',
      openInYoutube: '在 YouTube 中打开',
    },
    events: {
      title: '我们的赛事',
      upcoming: '即将到来的赛事',
      past: '过往赛事',
      awardsWon: '获奖：',
      loadingError: '无法获取赛事',
    },
    gallery: {
      title: '照片',
      sections: {
        pushBack: 'Push Back',
      },
    },
    videos: {
      winterAutonomous: {
        title: '冬季自主展示 | VRC Push Back',
        description: '在 STEMIA LCQ 录制。由 Michael 剪辑。',
      },
      oneWorld: {
        title: 'One World @ UCBerk 回顾 | VRC Push Back',
        description: '评委奖。由 Henry 55288A 剪辑。',
      },
      moaSignature: {
        title: 'MoA 标志性赛事回顾 | VRC Push Back',
        description: '我们参与 Mall of America 标志性赛事的回顾。由 Michael 剪辑。',
      },
      eliminationAuton: {
        title: '淘汰赛自主程序展示 | VRC High Stakes',
        description: '与 210Z 战队在 2025 阿尔伯塔省锦标赛期间拍摄。',
      },
    },
    footer: {
      madeWith: '由...制作',
      onGitHub: '在 GitHub 上',
    },
    stats: {
      globalSkillsRanking: '全球技能排名',
      regionalSkillsRanking: '地区技能排名',
      topPercent: '前 {percent}%',
      outOf: '共 {total}',
      withinAlberta: '阿尔伯塔省内',
      awardsThisSeason: '本赛季奖项：{total}',
      cumulativeAwards: '累计奖项：{total}',
    },
    awards: {
      categories: {
        Excellence: '卓越奖',
        Champion: '冠军',
        Other: '其他',
      },
      qualifiesTo: '晋级至：',
      descriptions: {
        Excellence: 'VEX Robotics 的最高荣誉，表彰在构建高质量机器人项目方面的整体卓越表现。该奖项会综合考虑机器人表现、工程文档以及资格赛排名。',
        Champion: '授予个人技能冠军和锦标赛获胜联盟，体现机器人在淘汰赛中的出色表现和高效协作。',
        Other: '表彰设计、体育精神、创新以及其他值得特别认可方面的各类奖项。',
      },
    },
  },
  hi: {
    nav: {
      ourRobot: 'हमारा रोबोट',
      achievements: 'उपलब्धियां',
      revealsAndRecaps: 'पर्दापण और पुनरावलोकन',
      events: 'कार्यक्रम',
      pathPlanner: 'PathPlanner',
      language: 'भाषा',
    },
    hero: {
      titlePrefix: 'कवाई',
      titleSuffix: 'बिल्ली के बच्चे',
      descriptionPrefix: 'हम टीम 210K हैं, कैलगरी, अल्बर्टा, कनाडा 🍁 के चौथे वर्ष के रोबोटिक्स छात्रों का एक उत्साही समूह, जो संबद्ध है ',
      descriptionSuffix: ' से।',
      cta: 'म्याऊं म्याऊं',
    },
    achievements: {
      title: 'हमारी उपलब्धियां',
      loadingError: 'पुरस्कार प्राप्त नहीं हो सके',
    },
    ourRobot: {
      title: 'हमारा रोबोट',
      chassisCad: 'चेसिस CAD',
      loadingModel: '3D मॉडल लोड हो रहा है...',
      initializingViewer: '3D व्यूअर शुरू किया जा रहा है...',
      controls: 'घुमाने के लिए खींचें • ज़ूम करने के लिए स्क्रॉल करें • पैन के लिए राइट-क्लिक करें',
      technicalSpecifications: 'तकनीकी विनिर्देश',
      dimensions: 'आयाम',
      weight: 'वजन',
      driveSystem: 'ड्राइव सिस्टम',
      motors: 'मोटर',
      faceView: 'सामने का दृश्य',
      backView: 'पीछे का दृश्य',
      seasons: {
        pushBack: { name: 'VRC Push Back' },
        highStakes: { name: 'VRC High Stakes' },
      },
      specs: {
        pushBackWeight: 'बहुत मोटा',
        highStakesWeight: 'इतना भारी कि टेबल से गिरने के बाद hs axle मुड़ जाए',
      },
    },
    reveals: {
      title: 'पर्दापण और पुनरावलोकन',
      openInYoutube: 'YouTube में खोलें',
    },
    events: {
      title: 'हमारे कार्यक्रम',
      upcoming: 'आगामी कार्यक्रम',
      past: 'पिछले कार्यक्रम',
      awardsWon: 'जीते गए पुरस्कार:',
      loadingError: 'कार्यक्रम प्राप्त नहीं हो सके',
    },
    gallery: {
      title: 'फ़ोटो',
      sections: {
        pushBack: 'Push Back',
      },
    },
    videos: {
      winterAutonomous: {
        title: 'सर्दियों का स्वायत्त प्रदर्शन | VRC Push Back',
        description: 'STEMIA LCQ में फिल्माया गया। Michael द्वारा संपादित।',
      },
      oneWorld: {
        title: 'One World @ UCBerk पुनरावलोकन | VRC Push Back',
        description: 'न्यायाधीश पुरस्कार। Henry 55288A द्वारा संपादित।',
      },
      moaSignature: {
        title: 'MoA सिग्नेचर इवेंट पुनरावलोकन | VRC Push Back',
        description: 'Mall of America सिग्नेचर इवेंट में हमारी भागीदारी का पुनरावलोकन। Michael द्वारा संपादित।',
      },
      eliminationAuton: {
        title: 'एलिमिनेशन ऑटोन प्रदर्शन | VRC High Stakes',
        description: '2025 अल्बर्टा प्रांतीय प्रतियोगिता के दौरान टीम 210Z के साथ फिल्माया गया।',
      },
    },
    footer: {
      madeWith: 'के साथ बनाया गया',
      onGitHub: 'GitHub पर',
    },
    stats: {
      globalSkillsRanking: 'वैश्विक स्किल्स रैंकिंग',
      regionalSkillsRanking: 'क्षेत्रीय स्किल्स रैंकिंग',
      topPercent: 'शीर्ष {percent}%',
      outOf: 'में से {total}',
      withinAlberta: 'अल्बर्टा में',
      awardsThisSeason: 'इस सीज़न के पुरस्कार: {total}',
      cumulativeAwards: 'कुल पुरस्कार: {total}',
    },
    awards: {
      categories: {
        Excellence: 'उत्कृष्टता',
        Champion: 'चैंपियन',
        Other: 'अन्य',
      },
      qualifiesTo: 'के लिए योग्य:',
      descriptions: {
        Excellence: 'VEX Robotics का सर्वोच्च सम्मान, जो उच्च-गुणवत्ता वाले रोबोटिक्स कार्यक्रम के निर्माण में समग्र उत्कृष्टता को मान्यता देता है। यह पुरस्कार रोबोट प्रदर्शन, इंजीनियरिंग दस्तावेज़ीकरण, और क्वालीफिकेशन रैंकिंग को ध्यान में रखता है।',
        Champion: 'व्यक्तिगत स्किल्स चैंपियंस और टूर्नामेंट की विजेता एलायंस को दिया जाता है, जो एलिमिनेशन मैचों में श्रेष्ठ रोबोट प्रदर्शन और प्रभावी सहयोग को दर्शाता है।',
        Other: 'डिज़ाइन, खेल भावना, नवाचार और अन्य विशेष मान्यता योग्य उपलब्धियों के लिए विभिन्न पुरस्कार।',
      },
    },
  },
} as const;

const LANGUAGE_STORAGE_KEY = '210k-website-language';

export const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
  { value: 'zh', label: '中文' },
  { value: 'hi', label: 'हिन्दी' },
];

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getTranslation = (language: Language, key: string): string => {
  const segments = key.split('.');
  let current: unknown = translations[language];

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return key;
    }
  }

  return typeof current === 'string' ? current : key;
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === 'en' || storedLanguage === 'fr' || storedLanguage === 'es' || storedLanguage === 'zh' || storedLanguage === 'hi') {
      return storedLanguage;
    }

    const browserLanguage = window.navigator.language.toLowerCase();

    if (browserLanguage.startsWith('fr')) {
      return 'fr';
    }

    if (browserLanguage.startsWith('es')) {
      return 'es';
    }

    if (browserLanguage.startsWith('zh')) {
      return 'zh';
    }

    if (browserLanguage.startsWith('hi')) {
      return 'hi';
    }

    return 'en';
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = getLocale(language);
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    locale: getLocale(language),
    t: (key, values) => {
      let text = getTranslation(language, key);

      if (values) {
        for (const [placeholder, replacement] of Object.entries(values)) {
          text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), String(replacement));
        }
      }

      return text;
    },
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

export function getAwardDescriptions(language: Language) {
  return translations[language].awards.descriptions;
}

function getLocale(language: Language) {
  switch (language) {
    case 'fr':
      return 'fr-CA';
    case 'es':
      return 'es-ES';
    case 'zh':
      return 'zh-Hans';
    case 'hi':
      return 'hi-IN';
    default:
      return 'en-CA';
  }
}
