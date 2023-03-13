var fs = require("fs");
var path = require("path");

function node() {
  this.end = false;
  this.children = {};
}

function Trie() {
  this.root = new node();
}

Trie.prototype.insert = function (word) {
  var temp = this.root;
  for (var i = 0; i < word.length; ++i) {
    if (temp.children[word[i]]) temp = temp.children[word[i]];
    else {
      temp.children[word[i]] = new node();
      temp = temp.children[word[i]];
    }
  }
  temp.end = true;
};

Trie.prototype.check = function word(word) {
  if (this.root == null) return false;
  var temp = this.root;
  for (var i = 0; i < word.length; ++i) {
    if (!temp.children[word[i]]) return false;
    temp = temp.children[word[i]];
  }
  return temp.end === true;
};

module.exports = function words(language) {
  const possibleLanguages = [
    "american-english",
    "brazilian",
    "british-english",
    "french",
    "italian",
    "ngerman",
    "ogerman",
    "portuguese",
    "spanish",
    "swiss",
  ];

  language = language || "american-english";
  if (possibleLanguages.indexOf(language) === -1)
    throw new Error(language + " is not vaid language");

  var trie = new Trie();
  var filePath = path.resolve(path.join(__dirname, `./dictionary/${language}`));

  var text = fs.readFileSync(filePath, "utf-8");
  text = text.split("\n");
  text.forEach((word) => {
    trie.insert(word);
  });

  return trie;
};

// My code for output. Use < node index.js > command in 'is-word' folder.

var isWord = require("is-word");
var spanishWords = isWord("spanish");

// Enter input data below

const originalString =
  "Marca de camisetas creada en 1999. Su estilo combina la estética retro y surf. Los rosquillas caseras favoritas de Boston. Variedad de sabores. Captura tus recuerdos. Fotografías profesionales familiares y de eventos. Recientemente me he grauado de la Universidad de Londres. Cuento con un amplio portafolio de arte visual 3D y animaciones. Proyecto del 9º grado por Samuel. Tribus apaches, vestimenta y costumbres cuidado de la piel, bienestar. Tratamientos dermatológicos de eficacia comprobada con personal altamente calificado. Los servicios incluyen peeling y terapia de luz LED. Dirigido por Daniela Burgos. Coaching personal y profesional Capacitada y certificada en yoga Hatha y Ashtanga. Siete años de experiencia, ofreciendo sesiones grupales y clases privadas y personalizadas. Flexibilidad, fuerza, bienestar. Olivia Moda es la tienda de ropa infantil favorita de todos. Seleccionamos cuidadosamente nuestros artículos para que encuentres exactamente lo que buscas. Trabajamos con tejidos naturales de alta calidad y contamos con varios diseñadores y marcas. Opciones ideales para regalar. Para niñas y niños. La satisfacción del cliente es primordial. Tecnología a tu alcance. Ciberseguridad Nuestra conferencia es el mejor lugar para que los líderes y las voces más innovadoras se reúnan para compartir, inspirar y generar nuevos contactos e ideas. Estamos orgullosos de albergar algunos de los exponentes más conocidos e influyentes en el campo. El calendario de este año está lleno de charlas excepcionales, sesiones grupales y actividades prácticas. Las inscripciones ya están abiertas. Dos habitaciones disponibles. Bed and breakfast situado en el hermoso Valle Nevado del Aconcagua. Acogedor, cómodo y conveniente. Desayuno gourmet. Cercano a todas las atracciones principales de la zona. Creo que la sinceridad y la autenticidad son las dos cualidades más importantes en un bloguero. Tengo 24 años, soy estudiante, una persona amistosa y creyente. Únanse a mí blog para que puedan seguir mi viaje de conexión con el mundo espiritual y compartir mis pensamientos y experiencias.";

const cleanString = originalString.replace(/[.,¡!¿?;:"]/g, "");
const arrFromcleanString = cleanString.split(" ");
const realSpanishWords = [];
const notSpanishWords = [];
const elseWords = [];

for (let i = 0; i < arrFromcleanString.length; i++) {
  if (
    spanishWords.check(arrFromcleanString[i].toLocaleLowerCase()) === true ||
    (arrFromcleanString[i].toLocaleLowerCase().slice(-1) === "s" &&
      spanishWords.check(
        arrFromcleanString[i].toLocaleLowerCase().slice(0, -1)
      ) === true) ||
    (arrFromcleanString[i].toLocaleLowerCase().slice(-2) === "es" &&
      spanishWords.check(
        arrFromcleanString[i].toLocaleLowerCase().slice(0, -2)
      ) === true)
  ) {
    realSpanishWords.push(arrFromcleanString[i]);
  } else if (
    spanishWords.check(arrFromcleanString[i].toLocaleLowerCase()) === false
  ) {
    notSpanishWords.push(arrFromcleanString[i]);
  } else {
    elseWords.push(arrFromcleanString[i]);
  }
}

console.log("REAL: ", realSpanishWords);
console.log("NOT REAL: ", notSpanishWords);
console.log("ELSE: ", elseWords);

let a = "paraes";
console.log(a.slice(-2));
