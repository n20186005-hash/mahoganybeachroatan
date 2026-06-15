const fs = require('fs');

const zhPath = 'src/messages/zh.json';
const enPath = 'src/messages/en.json';
const esPath = 'src/messages/es.json';

const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Update meta
zh.meta.title = "Los Dos Templos | 两座百年教堂";
zh.meta.description = "探索墨西哥哈利斯科州瓜达拉哈拉的 Los Dos Templos（两座百年教堂）。了解圣方济各教堂与阿兰萨苏圣母教堂的宏伟建筑与历史。";

// Update hero
zh.hero.hours = "历史建筑";

// Update intro
zh.intro.description = "Los Dos Templos（两座百年教堂）位于墨西哥哈利斯科州瓜达拉哈拉。这是两座保存极其完好、至今仍在使用的17、18世纪绝美宏伟建筑。它们曾经属于一个巨大的修道院建筑群，如今被美丽宁静的圣方济各花园（Jardín de San Francisco）隔开，是体验墨西哥巴洛克建筑艺术的绝佳场所。";
zh.intro.visitGuide.items = [
  "教堂全天开放，建议白天前往",
  "欣赏18世纪丘里格拉风格镀金祭坛",
  "在圣方济各花园广场休憩",
  "参观附近的瓜达拉哈拉历史中心"
];
zh.intro.alsoKnownAs.items = [
  "圣方济各教堂 (Templo de San Francisco de Asís)：瓜达拉哈拉最古老的教堂之一，外观古朴庄重。",
  "阿兰萨苏圣母教堂 (Templo de Nuestra Señora de Aránzazu)：保留了三座完整的18世纪丘里格拉风格（超巴洛克风格）镀金木制祭坛。",
  "圣方济各花园：两座教堂之间美丽宁静的小广场，非常适合游客休憩。",
  "优越位置：位于哈利斯科州瓜达拉哈拉历史中心，交通便利。"
];

// Update route
zh.route.overview = "探索 Los Dos Templos 的理想路线，感受巴洛克建筑艺术与墨西哥历史的精髓。";
zh.route.steps = [
  "上午抵达圣方济各教堂，欣赏其古朴庄重的外观与悠久历史。",
  "穿过美丽宁静的圣方济各花园，在广场上稍作休憩。",
  "重点参观阿兰萨苏圣母教堂，欣赏其绝美的18世纪丘里格拉风格镀金木制祭坛。",
  "游览结束后，可步行前往瓜达拉哈拉历史中心参观其他景点或品尝美食。"
];
zh.route.supplements = [
  "请准备一些现金，以便在附近购买纪念品或小吃。",
  "教堂内请保持安静，尊重当地宗教习俗。",
  "拍摄镀金祭坛时请注意不要使用闪光灯以免影响他人。"
];

// Update knowledge
zh.knowledge.sections[0].content = "Los Dos Templos 是瓜达拉哈拉历史和文化的重要地标。这两座教堂曾经属于一个巨大的修道院建筑群，见证了城市的百年变迁，是了解墨西哥宗教与历史的重要场所。";
zh.knowledge.sections[1].content = "阿兰萨苏圣母教堂是该市唯一一座保留了三座完整的18世纪丘里格拉风格（超巴洛克风格）镀金木制祭坛的教堂，其视觉震撼力令人叹为观止。";
zh.knowledge.sections[2].content = "在两座教堂之间的圣方济各花园漫步，感受宁静的氛围。这是一次难忘的建筑艺术与文化体验，让您近距离感受墨西哥历史的厚重与魅力。";

// Update basicInfo
zh.basicInfo.typeValue = "历史建筑/教堂";

// Update hours
zh.hours.outdoor = "教堂区域";
zh.tickets.outdoor = "教堂参观";

// Update transport
zh.transport.busDesc = "可乘坐瓜达拉哈拉轻轨（Tren Ligero）3号线（Línea 3）至 Guadalajara Centro 站，距离两座教堂非常近，步行即可到达。";
zh.transport.tipsDesc = "Los Dos Templos 是体验墨西哥巴洛克建筑艺术的绝佳场所，建议白天前往。";

// Update officialManagement
zh.officialManagement.text = "Los Dos Templos 是瓜达拉哈拉的著名历史建筑，由圣方济各教堂与阿兰萨苏圣母教堂组成，承载着丰富的建筑艺术与文化价值。";

// Update historyTimeline
zh.historyTimeline.items[0].title = "殖民时期：教堂奠基";
zh.historyTimeline.items[0].plaque = "历史古迹（修道院建筑群）";
zh.historyTimeline.items[0].description = "Los Dos Templos 始建于墨西哥殖民时期，最初属于一个巨大的修道院建筑群。圣方济各教堂是瓜达拉哈拉最古老的教堂之一，外观古朴庄重。";

zh.historyTimeline.items[1].title = "18 世纪：巴洛克巅峰";
zh.historyTimeline.items[1].plaque = "建筑艺术（镀金祭坛）";
zh.historyTimeline.items[1].description = "阿兰萨苏圣母教堂在这一时期大放异彩，内部建成了三座完整的丘里格拉风格（超巴洛克风格）镀金木制祭坛，成为了墨西哥建筑艺术的瑰宝。";

zh.historyTimeline.items[2].title = "20 世纪：城市规划与保护";
zh.historyTimeline.items[2].plaque = "城市地标（圣方济各花园）";
zh.historyTimeline.items[2].description = "随着瓜达拉哈拉的城市发展，原有的修道院建筑群发生变迁。如今两座教堂被美丽宁静的圣方济各花园（Jardín de San Francisco）隔开，成为了市民与游客休憩的广场。";

zh.historyTimeline.items[3].title = "21 世纪：文化旅游胜地";
zh.historyTimeline.items[3].plaque = "旅游标识（文化旅游地标）";
zh.historyTimeline.items[3].description = "进入21世纪，Los Dos Templos 凭借其保存完好的百年教堂建筑和绝美的镀金祭坛，吸引了越来越多的游客，成为体验墨西哥历史与艺术的重要窗口。";

zh.historyTimeline.guideContent = "游客在参观时，可以先从**圣方济各教堂**开始，感受其古朴庄重；随后在**圣方济各花园**稍作休憩；接着重点参观**阿兰萨苏圣母教堂**，欣赏令人震撼的丘里格拉风格镀金祭坛；最后漫步于历史中心，深入理解这些古迹在墨西哥历史中的重要地位。";

// Replace all remaining occurrences of "遗址" -> "古迹/历史建筑" and "神庙" -> "教堂" in zh object recursively
function replaceTerms(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/神庙/g, '教堂').replace(/遗址/g, '古迹');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceTerms(obj[key]);
    }
  }
}
replaceTerms(zh);


// EN translations
en.meta.title = "Los Dos Templos | Historic Churches";
en.meta.description = "Explore Los Dos Templos (The Two Historic Churches) in Guadalajara, Jalisco, Mexico. Discover the magnificent architecture of San Francisco de Asís and Nuestra Señora de Aránzazu.";
en.hero.hours = "Historic Churches";
en.intro.description = "Los Dos Templos is located in Guadalajara, Jalisco, Mexico. It consists of two exceptionally well-preserved 17th and 18th-century magnificent churches that are still in use today. They once belonged to a vast convent complex and are now separated by the beautiful and peaceful Jardín de San Francisco, making it a perfect place to experience Mexican Baroque architectural art.";
en.intro.visitGuide.items = [
  "Churches open all day, daytime visits recommended",
  "Admire the 18th-century Churrigueresque gilded altars",
  "Relax at the Jardín de San Francisco square",
  "Visit the nearby Guadalajara historic center"
];
en.intro.alsoKnownAs.items = [
  "Templo de San Francisco de Asís: One of the oldest churches in Guadalajara with a solemn and classic exterior.",
  "Templo de Nuestra Señora de Aránzazu: Highly recommended! The only church in the city retaining three complete 18th-century Churrigueresque (Ultra-Baroque) gilded wooden altars.",
  "Jardín de San Francisco: A beautiful and tranquil square separating the two churches, perfect for visitors to rest.",
  "Prime Location: Located in the historic center of Guadalajara, Jalisco, easily accessible."
];
en.route.overview = "Discover the ideal route to explore Los Dos Templos and experience the essence of Baroque architectural art and Mexican history.";
en.route.steps = [
  "Arrive at Templo de San Francisco de Asís in the morning to admire its solemn exterior and long history.",
  "Walk through the beautiful and peaceful Jardín de San Francisco and take a short break in the square.",
  "Focus your visit on Templo de Nuestra Señora de Aránzazu to admire its stunning 18th-century Churrigueresque gilded wooden altars.",
  "After the visit, walk to the Guadalajara historic center to explore other attractions or enjoy local cuisine."
];
en.route.supplements = [
  "Please prepare some cash for buying souvenirs or snacks nearby.",
  "Please keep quiet inside the churches and respect local religious customs.",
  "When photographing the gilded altars, please avoid using flash so as not to disturb others."
];
en.knowledge.sections[0].content = "Los Dos Templos is an important historical and cultural landmark in Guadalajara. These two churches once belonged to a massive convent complex, witnessing centuries of urban evolution, and serve as an important place to understand Mexican religion and history.";
en.knowledge.sections[1].content = "Templo de Nuestra Señora de Aránzazu is the only church in the city that retains three complete 18th-century Churrigueresque (Ultra-Baroque) gilded wooden altars. Its visual impact is truly breathtaking.";
en.knowledge.sections[2].content = "Stroll through the Jardín de San Francisco between the two churches and feel the peaceful atmosphere. It is an unforgettable architectural and cultural experience, allowing you to closely feel the depth and charm of Mexican history.";
en.basicInfo.typeValue = "Historic Churches";
en.hours.outdoor = "Church Area";
en.tickets.outdoor = "Church Visit";
en.transport.busDesc = "You can take Line 3 (Línea 3) of the Guadalajara Light Rail (Tren Ligero) to the Guadalajara Centro station, which is very close to the churches and within walking distance.";
en.transport.tipsDesc = "Los Dos Templos is an excellent place to experience Mexican Baroque architectural art, daytime visits recommended.";
en.officialManagement.text = "Los Dos Templos are famous historic churches in Guadalajara, consisting of Templo de San Francisco de Asís and Templo de Nuestra Señora de Aránzazu, carrying rich architectural and cultural value.";
en.historyTimeline.items[0].title = "Colonial Period: Foundation";
en.historyTimeline.items[0].plaque = "Historic Monument (Convent Complex)";
en.historyTimeline.items[0].description = "Los Dos Templos was built during the Mexican colonial period and originally belonged to a massive convent complex. Templo de San Francisco de Asís is one of the oldest churches in Guadalajara, featuring a solemn exterior.";
en.historyTimeline.items[1].title = "18th Century: Baroque Pinnacle";
en.historyTimeline.items[1].plaque = "Architectural Art (Gilded Altars)";
en.historyTimeline.items[1].description = "Templo de Nuestra Señora de Aránzazu shone brightly during this period, with three complete Churrigueresque (Ultra-Baroque) gilded wooden altars built inside, becoming a gem of Mexican architectural art.";
en.historyTimeline.items[2].title = "20th Century: Urban Evolution";
en.historyTimeline.items[2].plaque = "City Landmark (Jardín de San Francisco)";
en.historyTimeline.items[2].description = "With the urban development of Guadalajara, the original convent complex underwent changes. Today, the two churches are separated by the beautiful and peaceful Jardín de San Francisco, serving as a resting square for citizens and tourists.";
en.historyTimeline.items[3].title = "21st Century: Cultural Tourism Destination";
en.historyTimeline.items[3].plaque = "Tourism Landmark (Cultural Destination)";
en.historyTimeline.items[3].description = "In the 21st century, Los Dos Templos attracts more and more visitors with its well-preserved centuries-old church architecture and stunning gilded altars, becoming an important window to experience Mexican history and art.";
en.historyTimeline.guideContent = "When visiting, you can start with **Templo de San Francisco de Asís** to feel its solemnity; then take a break at **Jardín de San Francisco**; next, focus on visiting **Templo de Nuestra Señora de Aránzazu** to admire the breathtaking Churrigueresque gilded altars; finally, stroll through the historic center to deeply understand the important position of these monuments in Mexican history.";

// Helper to replace ruin/temple words in EN
function replaceTermsEn(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/temple buildings/gi, 'church buildings')
                         .replace(/ruins/gi, 'historic monuments')
                         .replace(/site/gi, 'monument')
                         .replace(/ruin/gi, 'monument');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceTermsEn(obj[key]);
    }
  }
}
replaceTermsEn(en);

// ES translations
es.meta.title = "Los Dos Templos | Iglesias Históricas";
es.meta.description = "Explora Los Dos Templos en Guadalajara, Jalisco, México. Descubre la magnífica arquitectura de San Francisco de Asís y Nuestra Señora de Aránzazu.";
es.hero.hours = "Iglesias Históricas";
es.intro.description = "Los Dos Templos se encuentran en Guadalajara, Jalisco, México. Consisten en dos magníficas iglesias de los siglos XVII y XVIII, excepcionalmente bien conservadas y aún en uso. Antiguamente formaban parte de un vasto complejo conventual y hoy están separadas por el hermoso y tranquilo Jardín de San Francisco, siendo un lugar perfecto para experimentar el arte arquitectónico barroco mexicano.";
es.intro.visitGuide.items = [
  "Las iglesias están abiertas todo el día, se recomienda visitar de día",
  "Admira los retablos dorados de estilo churrigueresco del siglo XVIII",
  "Relájate en la plaza del Jardín de San Francisco",
  "Visita el cercano centro histórico de Guadalajara"
];
es.intro.alsoKnownAs.items = [
  "Templo de San Francisco de Asís: Una de las iglesias más antiguas de Guadalajara con un exterior solemne.",
  "Templo de Nuestra Señora de Aránzazu: ¡Muy recomendado! La única iglesia en la ciudad que conserva tres retablos de madera dorada de estilo churrigueresco (ultrabarroco) del siglo XVIII completos.",
  "Jardín de San Francisco: Una hermosa y tranquila plaza que separa las dos iglesias, perfecta para el descanso de los visitantes.",
  "Ubicación privilegiada: Situado en el centro histórico de Guadalajara, de fácil acceso."
];
es.route.overview = "Descubre la ruta ideal para explorar Los Dos Templos y experimentar la esencia del arte arquitectónico barroco y la historia mexicana.";
es.route.steps = [
  "Llega al Templo de San Francisco de Asís por la mañana para admirar su exterior solemne y su larga historia.",
  "Camina por el hermoso y tranquilo Jardín de San Francisco y toma un breve descanso en la plaza.",
  "Centra tu visita en el Templo de Nuestra Señora de Aránzazu para admirar sus impresionantes retablos de madera dorada de estilo churrigueresco del siglo XVIII.",
  "Después de la visita, camina hacia el centro histórico de Guadalajara para explorar otras atracciones o disfrutar de la gastronomía local."
];
es.route.supplements = [
  "Prepara algo de efectivo para comprar recuerdos o bocadillos cerca.",
  "Por favor, mantén silencio dentro de las iglesias y respeta las costumbres religiosas locales.",
  "Al fotografiar los retablos dorados, evita usar flash para no molestar a los demás."
];
es.knowledge.sections[0].content = "Los Dos Templos son un importante punto de referencia histórico y cultural en Guadalajara. Estas dos iglesias pertenecieron a un enorme complejo conventual, presenciando siglos de evolución urbana, y sirven como un lugar importante para entender la religión y la historia de México.";
es.knowledge.sections[1].content = "El Templo de Nuestra Señora de Aránzazu es la única iglesia en la ciudad que conserva tres retablos de madera dorada de estilo churrigueresco (ultrabarroco) del siglo XVIII completos. Su impacto visual es verdaderamente impresionante.";
es.knowledge.sections[2].content = "Pasea por el Jardín de San Francisco entre las dos iglesias y siente el ambiente pacífico. Es una experiencia arquitectónica y cultural inolvidable, que te permite sentir de cerca la profundidad y el encanto de la historia mexicana.";
es.basicInfo.typeValue = "Iglesias Históricas";
es.hours.outdoor = "Área de la Iglesia";
es.tickets.outdoor = "Visita a la Iglesia";
es.transport.busDesc = "Puedes tomar la Línea 3 del Tren Ligero hasta la estación Guadalajara Centro, que está muy cerca de las iglesias y a poca distancia a pie.";
es.transport.tipsDesc = "Los Dos Templos son un excelente lugar para experimentar el arte arquitectónico barroco mexicano, se recomiendan las visitas diurnas.";
es.officialManagement.text = "Los Dos Templos son iglesias históricas famosas en Guadalajara, formadas por el Templo de San Francisco de Asís y el Templo de Nuestra Señora de Aránzazu, que poseen un rico valor arquitectónico y cultural.";
es.historyTimeline.items[0].title = "Época Colonial: Fundación";
es.historyTimeline.items[0].plaque = "Monumento Histórico (Complejo Conventual)";
es.historyTimeline.items[0].description = "Los Dos Templos fueron construidos durante la época colonial mexicana y originalmente pertenecían a un enorme complejo conventual. El Templo de San Francisco de Asís es una de las iglesias más antiguas de Guadalajara, con un exterior solemne.";
es.historyTimeline.items[1].title = "Siglo XVIII: Apogeo Barroco";
es.historyTimeline.items[1].plaque = "Arte Arquitectónico (Retablos Dorados)";
es.historyTimeline.items[1].description = "El Templo de Nuestra Señora de Aránzazu brilló intensamente durante este período, con tres retablos completos de madera dorada de estilo churrigueresco (ultrabarroco) construidos en su interior, convirtiéndose en una joya del arte arquitectónico mexicano.";
es.historyTimeline.items[2].title = "Siglo XX: Evolución Urbana";
es.historyTimeline.items[2].plaque = "Hito de la Ciudad (Jardín de San Francisco)";
es.historyTimeline.items[2].description = "Con el desarrollo urbano de Guadalajara, el complejo conventual original experimentó cambios. Hoy en día, las dos iglesias están separadas por el hermoso y tranquilo Jardín de San Francisco, que sirve como plaza de descanso para ciudadanos y turistas.";
es.historyTimeline.items[3].title = "Siglo XXI: Destino de Turismo Cultural";
es.historyTimeline.items[3].plaque = "Hito Turístico (Destino Cultural)";
es.historyTimeline.items[3].description = "En el siglo XXI, Los Dos Templos atraen a más y más visitantes con su arquitectura centenaria bien conservada y sus impresionantes retablos dorados, convirtiéndose en una ventana importante para experimentar la historia y el arte de México.";
es.historyTimeline.guideContent = "Al visitar, puedes comenzar con el **Templo de San Francisco de Asís** para sentir su solemnidad; luego toma un descanso en el **Jardín de San Francisco**; a continuación, concéntrate en visitar el **Templo de Nuestra Señora de Aránzazu** para admirar los impresionantes retablos dorados churriguerescos; finalmente, pasea por el centro histórico para comprender profundamente la importante posición de estos monumentos en la historia de México.";

// Helper to replace ruin/temple words in ES
function replaceTermsEs(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/ruinas/gi, 'monumentos históricos')
                         .replace(/ruina/gi, 'monumento histórico')
                         .replace(/sitio/gi, 'monumento')
                         .replace(/santuario/gi, 'iglesia');
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceTermsEs(obj[key]);
    }
  }
}
replaceTermsEs(es);

fs.writeFileSync(zhPath, JSON.stringify(zh, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
console.log('Done');
