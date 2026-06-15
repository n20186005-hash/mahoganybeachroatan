const fs = require('fs');
const path = require('path');

const zhPath = path.join(__dirname, 'src/messages/zh.json');
const enPath = path.join(__dirname, 'src/messages/en.json');
const esPath = path.join(__dirname, 'src/messages/es.json');

const zh = JSON.parse(fs.readFileSync(zhPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Utility function to replace all occurrences of a string
const replaceInObject = (obj, search, replace) => {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].split(search).join(replace);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      replaceInObject(obj[key], search, replace);
    }
  }
};

// --- ZH ---
replaceInObject(zh, '考克斯霍尔', '迪克森湾 (Dixon Cove)');
zh.basicInfo.cityValue = '迪克森湾 (Dixon Cove), 罗阿坦 (Roatán)';
zh.basicInfo.addressValue = '8GG3+W27, Dixon Cove, Roatán, 洪都拉斯';
zh.basicInfo.plusCodeValue = '8GG3+W27 迪克森湾 (Dixon Cove), 洪都拉斯罗阿坦 (Roatán)';

zh.intro.alsoKnownAs.items.push("嘉年华集团专属：由嘉年华集团投资建设并管理的私人专属码头，主要停靠其旗下品牌邮轮。");
zh.intro.alsoKnownAs.items.push("神奇飞行沙滩椅 (Magical Flying Beach Chair)：独一无二的空中缆车，直接将乘客从购物区运送到专属的桃花心木海滩。");
zh.route.steps.splice(1, 0, "乘坐神奇飞行沙滩椅 (Magical Flying Beach Chair) 缆车前往专属的桃花心木海滩，享受加勒比海的阳光。");
zh.historyTimeline.items[3].description += " 嘉年华集团宣布了品牌升级计划，将更名为 'Isla Tropicale'，并新增游泳池、海滩俱乐部和水上酒吧等设施。";
zh.officialManagement.text = "Mahogany Bay 邮轮码头是洪都拉斯罗阿坦迪克森湾的现代化邮轮设施，由嘉年华集团拥有和管理，作为通往美丽加勒比海海岸和罗阿坦岛的私人专属门户。";

// Fix language mixing in zh if any (Checked previously, looks okay, but ensure no English words where Chinese is expected)
zh.cookieSettings.analytics.items[0].description = "它会收集访客如何使用我们网站的匿名信息。";
zh.cookieSettings.marketing.items[0].description = "它可以根据你的兴趣为你展示相关的广告。";
zh.cookieSettings.marketing.items[0].status = "未激活"; // translate 'Inactive'

// --- EN ---
replaceInObject(en, 'Coxen Hole', 'Dixon Cove');
replaceInObject(en, 'Bay Islands', 'Roatán'); // Bay Islands is broader, Roatan is specific. Let's just fix city.
en.basicInfo.cityValue = 'Dixon Cove, Roatán';
en.basicInfo.addressValue = '8GG3+W27, Dixon Cove, Roatán, Honduras';
en.basicInfo.plusCodeValue = '8GG3+W27 Dixon Cove, Roatán, Honduras';

en.intro.alsoKnownAs.items.push("Carnival Corporation Exclusive: A private, exclusive port built and managed by Carnival Corporation, primarily serving its cruise brands.");
en.intro.alsoKnownAs.items.push("Magical Flying Beach Chair: A unique chairlift that transports passengers directly from the shopping area to the exclusive Mahogany Beach.");
en.route.steps.splice(1, 0, "Take the Magical Flying Beach Chair to the exclusive Mahogany Beach and enjoy the Caribbean sun.");
en.historyTimeline.items[3].description += " Carnival Corporation has announced a brand upgrade to 'Isla Tropicale', adding swimming pools, beach clubs, and swim-up bars.";
en.officialManagement.text = "Mahogany Bay Cruise Terminal is a modern cruise facility in Dixon Cove, Roatán, Honduras, owned and managed by Carnival Corporation, serving as a private exclusive gateway to the beautiful Caribbean coast and Roatán Island.";

// --- ES ---
replaceInObject(es, 'Coxen Hole', 'Dixon Cove');
es.basicInfo.cityValue = 'Dixon Cove, Roatán';
es.basicInfo.addressValue = '8GG3+W27, Dixon Cove, Roatán, Honduras';
es.basicInfo.plusCodeValue = '8GG3+W27 Dixon Cove, Roatán, Honduras';

es.intro.alsoKnownAs.items.push("Exclusivo de Carnival Corporation: Un puerto privado y exclusivo construido y administrado por Carnival Corporation, que sirve principalmente a sus marcas de cruceros.");
es.intro.alsoKnownAs.items.push("Magical Flying Beach Chair (Telesilla): Un telesilla único que transporta a los pasajeros directamente desde la zona de compras hasta la exclusiva Mahogany Beach.");
es.route.steps.splice(1, 0, "Tome el Magical Flying Beach Chair (telesilla) hasta la exclusiva Mahogany Beach y disfrute del sol caribeño.");
es.historyTimeline.items[3].description += " Carnival Corporation ha anunciado una actualización de marca a 'Isla Tropicale', agregando piscinas, clubes de playa y bares en la piscina.";
es.officialManagement.text = "Mahogany Bay Cruise Terminal es una instalación de cruceros moderna en Dixon Cove, Roatán, Honduras, propiedad y administrada por Carnival Corporation, que sirve como puerta de acceso privada y exclusiva a la hermosa costa caribeña y la isla de Roatán.";

// Fix language mixing in es
replaceInObject(es, 'Resenas', 'Reseñas');
es.header.reviews = "Reseñas";
es.reviews.title = "Reseñas de Visitantes";
es.reviews.declaration = "La información de las reseñas se puede ver a través de Google Maps (enlace externo).";
es.reviews.moreReviews = "Ver Más Reseñas en Google Maps";
es.cookieSettings.marketing.items[0].status = "Inactivo";

fs.writeFileSync(zhPath, JSON.stringify(zh, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(esPath, JSON.stringify(es, null, 2));

console.log("i18n files updated successfully.");
