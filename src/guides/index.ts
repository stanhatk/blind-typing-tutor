import type { InterfaceLanguage } from "../translations";
import type { KeyboardLayoutId } from "../types/keyboard";

/**
 * Long-form "how to learn touch typing" guides for interface languages whose
 * searches favour guides over tools. Served at /{interfaceLang}/{slug}.
 */
export interface Guide {
  interfaceLang: InterfaceLanguage;
  slug: string;
  layoutId: KeyboardLayoutId; // Finger table is built from this layout
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: GuideSection[];
  fingerTable: {
    afterSection: number; // Index of the section the table follows
    finger: string; // Column header
    keys: string; // Column header
    fingerNames: [string, string, string, string, string, string, string, string];
  };
  practice: {
    heading: string;
    words: string;
    phrases: string;
    custom: string;
  };
}

interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export const GUIDES: Guide[] = [
  {
    interfaceLang: "de",
    slug: "10-finger-schreiben-lernen",
    layoutId: "de-de",
    title: "10-Finger-Schreiben lernen: Anleitung und Übungen | Tipptrainer",
    description:
      "So lernst du das 10-Finger-System: Grundstellung ASDF JKLÖ, welcher Finger welche Taste drückt, ein 4-Wochen-Plan und kostenlose Übungen mit deutschen Wörtern.",
    h1: "10-Finger-Schreiben lernen",
    intro:
      "Beim 10-Finger-Schreiben tippst du mit allen zehn Fingern, ohne auf die Tastatur zu schauen. Wer das System beherrscht, schreibt schneller, macht weniger Fehler und achtet beim Tippen auf den Bildschirm statt auf die Hände. Diese Anleitung erklärt die Grundstellung auf der deutschen QWERTZ-Tastatur, die Zuordnung der Finger und einen einfachen Übungsplan.",
    sections: [
      {
        heading: "Die Grundstellung",
        paragraphs: [
          "Lege die Finger der linken Hand auf A, S, D und F, die der rechten auf J, K, L und Ö. Die Daumen ruhen über der Leertaste. Auf F und J fühlst du kleine Erhebungen: Daran finden die Zeigefinger die Grundstellung, ohne dass du hinsiehst. Nach jedem Anschlag kehrt der Finger in diese Position zurück.",
        ],
      },
      {
        heading: "Welcher Finger drückt welche Taste?",
        paragraphs: [
          "Jeder Finger ist für eine schräg verlaufende Spalte von Tasten zuständig. Die Zeigefinger übernehmen je zwei Spalten, weil sie am beweglichsten sind. Großbuchstaben tippst du, indem du die Umschalttaste mit dem kleinen Finger der anderen Hand drückst.",
        ],
      },
      {
        heading: "Übungsplan für vier Wochen",
        list: [
          "Woche 1: nur die Grundreihe. Tippe einzelne Buchstaben und kurze Wörter aus A, S, D, F, J, K, L und Ö, langsam und ohne Hinsehen.",
          "Woche 2: die obere Reihe von Q bis Ü dazu. Übe kurze, häufige Wörter wie „die“, „der“ und „und“.",
          "Woche 3: die untere Reihe von Y bis M sowie Komma und Punkt. Wechsle zu langen Wörtern.",
          "Woche 4: ganze Sätze mit Großschreibung und Satzzeichen. Achte auf einen gleichmäßigen Rhythmus.",
        ],
        paragraphs: [
          "Übe täglich 10 bis 15 Minuten. Kurze, regelmäßige Einheiten festigen das Fingergedächtnis besser als eine lange Sitzung pro Woche.",
        ],
      },
      {
        heading: "Umlaute und ß",
        paragraphs: [
          "Ö liegt rechts neben L, Ä rechts neben Ö, Ü rechts neben P und ß rechts neben der Null. Alle vier tippt der rechte kleine Finger, der dadurch mehr zu tun hat als auf einer englischen Tastatur. Plane deshalb eigene Übungen mit Umlauten ein.",
        ],
      },
      {
        heading: "Typische Fehler",
        list: [
          "Auf die Tastatur schauen: Decke die Hände notfalls ab und nutze die Bildschirmtastatur als Hilfe.",
          "Zu schnell anfangen: Genauigkeit zuerst, das Tempo kommt von allein.",
          "Finger nicht zur Grundstellung zurückführen: Dann landen die nächsten Anschläge daneben.",
          "Die kleinen Finger schonen: Gerade sie brauchen Training, für Umlaute, ß und die Umschalttaste.",
        ],
      },
    ],
    fingerTable: {
      afterSection: 1,
      finger: "Finger",
      keys: "Tasten",
      fingerNames: [
        "Linker kleiner Finger",
        "Linker Ringfinger",
        "Linker Mittelfinger",
        "Linker Zeigefinger",
        "Rechter Zeigefinger",
        "Rechter Mittelfinger",
        "Rechter Ringfinger",
        "Rechter kleiner Finger",
      ],
    },
    practice: {
      heading: "Jetzt üben",
      words: "Mit deutschen Wörtern üben",
      phrases: "Mit deutschen Sätzen üben",
      custom: "Mit eigenem Text üben",
    },
  },
  {
    interfaceLang: "ru",
    slug: "slepaya-pechat",
    layoutId: "ru-ru",
    title: "Слепая печать: как научиться печатать вслепую | Тренажёр",
    description:
      "Как освоить слепую десятипальцевую печать: исходная позиция ФЫВА ОЛДЖ, какой палец нажимает какую клавишу, план на четыре недели и бесплатные упражнения на русском.",
    h1: "Как научиться слепой печати",
    intro:
      "Слепая печать — это набор текста всеми десятью пальцами, не глядя на клавиатуру. Освоив её, вы печатаете быстрее, ошибаетесь реже и смотрите на текст, а не на руки. Здесь описаны исходная позиция на русской раскладке ЙЦУКЕН, распределение клавиш по пальцам и простой план занятий.",
    sections: [
      {
        heading: "Исходная позиция",
        paragraphs: [
          "Пальцы левой руки лежат на клавишах Ф, Ы, В и А, правой — на О, Л, Д и Ж. Большие пальцы — над пробелом. На клавишах А и О есть небольшие выступы: по ним указательные пальцы находят исходную позицию на ощупь. После каждого нажатия палец возвращается на своё место.",
        ],
      },
      {
        heading: "Какой палец нажимает какую клавишу",
        paragraphs: [
          "Каждый палец отвечает за наклонный столбец клавиш. Указательные пальцы берут по два столбца, потому что они самые подвижные. Заглавные буквы набирайте, нажимая Shift мизинцем другой руки.",
        ],
      },
      {
        heading: "План на четыре недели",
        list: [
          "Неделя 1: только основной ряд. Печатайте отдельные буквы и короткие слова из Ф, Ы, В, А, О, Л, Д и Ж — медленно и не глядя.",
          "Неделя 2: добавьте верхний ряд от Й до Ъ. Тренируйте частые короткие слова: «не», «на», «что».",
          "Неделя 3: нижний ряд от Я до Ю, точка и запятая. Переходите к длинным словам.",
          "Неделя 4: целые предложения с заглавными буквами и знаками препинания. Следите за ровным ритмом.",
        ],
        paragraphs: [
          "Занимайтесь по 10–15 минут каждый день. Короткие регулярные занятия закрепляют мышечную память лучше, чем одно долгое занятие в неделю.",
        ],
      },
      {
        heading: "Буква Ё и знаки препинания",
        paragraphs: [
          "Ё находится слева от единицы, её нажимает левый мизинец. Точка и запятая в русской раскладке стоят на одной клавише в нижнем ряду, рядом с правым Shift: точка — без Shift, запятая — с Shift. Обе нажимает правый мизинец.",
        ],
      },
      {
        heading: "Частые ошибки",
        list: [
          "Подглядывать на клавиатуру: при необходимости прикройте руки и ориентируйтесь на экранную клавиатуру.",
          "Гнаться за скоростью: сначала точность, скорость придёт сама.",
          "Не возвращать пальцы в исходную позицию: тогда следующие нажатия промахиваются.",
          "Беречь мизинцы: им достаются Й, Ё, Я, З, Х, Ъ, Ж, Э и Shift, поэтому их нужно тренировать отдельно.",
        ],
      },
    ],
    fingerTable: {
      afterSection: 1,
      finger: "Палец",
      keys: "Клавиши",
      fingerNames: [
        "Левый мизинец",
        "Левый безымянный",
        "Левый средний",
        "Левый указательный",
        "Правый указательный",
        "Правый средний",
        "Правый безымянный",
        "Правый мизинец",
      ],
    },
    practice: {
      heading: "Начните тренировку",
      words: "Тренировка на русских словах",
      phrases: "Тренировка на русских фразах",
      custom: "Тренировка на своём тексте",
    },
  },
];

export function getGuide(interfaceLang: string, slug: string): Guide | undefined {
  return GUIDES.find((g) => g.interfaceLang === interfaceLang && g.slug === slug);
}

export function getGuideForLanguage(interfaceLang: string): Guide | undefined {
  return GUIDES.find((g) => g.interfaceLang === interfaceLang);
}
