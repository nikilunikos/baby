export type Gender = "boy" | "girl";
export type Popularity = "Very Rare" | "Rare" | "Uncommon" | "Common" | "Very Common";
export type NameEntry = {
  id: string;
  name: string;
  gender: Gender;
  origin: string;
  meaning: string;
  pronunciation: string;
  popularity: Popularity;
  rarity: Popularity;
  international_score: number;
  hiddenGem: boolean;
  sourceKind: "given" | "compound";
};

type Seed = Omit<NameEntry, "id" | "pronunciation" | "rarity" | "hiddenGem" | "sourceKind">;

export const POPULARITIES: Popularity[] = ["Very Rare", "Rare", "Uncommon", "Common", "Very Common"];
export const ORIGINS = ["French", "Italian", "Greek", "Latin", "Spanish", "Portuguese", "Nordic", "Irish", "Scottish", "Welsh", "German", "Arabic", "Japanese", "Hebrew", "Slavic", "Persian", "Basque", "Occitan", "Catalan"] as const;
export const ORIGIN_SYMBOLS: Record<string, string> = { French: "FR", Italian: "IT", Greek: "GR", Latin: "LA", Spanish: "ES", Portuguese: "PT", Nordic: "NO", Irish: "IE", Scottish: "SC", Welsh: "CY", German: "DE", Arabic: "AR", Japanese: "JP", Hebrew: "HE", Slavic: "SL", Persian: "PE", Basque: "BA", Occitan: "OC", Catalan: "CA" };

const BOYS = `Sohan|Persian|beautiful and graceful|Rare|8
Numa|Latin|spirit and divine will|Rare|7
Elio|Italian|sun|Uncommon|9
Naël|French|generous and noble|Rare|7
Malo|French|bright pledge|Uncommon|7
Côme|Greek|order and harmony|Rare|7
Aurel|Latin|golden|Rare|8
Nils|Nordic|victory of the people|Uncommon|8
Soren|Nordic|stern and serene|Rare|8
Lazare|Hebrew|God has helped|Rare|7
Anselme|German|protected by God|Very Rare|6
Alban|Latin|white and luminous|Uncommon|7
Noé|Hebrew|rest and peace|Common|9
Amaury|German|work and power|Rare|7
Basile|Greek|royal|Uncommon|7
Célian|Latin|heavenly|Rare|7
Octave|Latin|eighth born|Rare|7
Silvère|Latin|of the forest|Very Rare|6
Marius|Latin|of the sea|Uncommon|8
Loup|French|wolf|Rare|6
Gabin|Latin|from Gabii|Uncommon|7
Gaspard|Persian|treasurer|Uncommon|8
Marin|Latin|of the sea|Uncommon|8
Cyprien|Greek|from Cyprus|Rare|7
Solal|Hebrew|path and rising way|Rare|7
Arsène|Greek|strong|Rare|6
Florent|Latin|flowering|Uncommon|7
Anatole|Greek|sunrise|Rare|7
Maël|French|chief and prince|Uncommon|8
Titouan|Occitan|little Antonius|Uncommon|7
Élie|Hebrew|my God is the Lord|Uncommon|8
Léandre|Greek|lion man|Rare|8
Aubin|Latin|white and bright|Uncommon|7
Marceau|Latin|little warrior|Uncommon|7
Rémi|Latin|oarsman|Uncommon|8
Sacha|Slavic|defender of humanity|Common|8
Célestin|Latin|heavenly|Rare|7
Isidore|Greek|gift of Isis|Rare|7
Ambroise|Greek|immortal|Rare|7
Joachim|Hebrew|God establishes|Uncommon|7
Abel|Hebrew|breath|Uncommon|8
Armand|German|army man|Uncommon|7
Constantin|Latin|steadfast|Rare|7
Éloi|Latin|chosen|Uncommon|7
Lucien|Latin|light|Uncommon|8
Sylvain|Latin|of the woods|Uncommon|7
Virgile|Latin|flourishing|Rare|7
Alessio|Italian|defender|Uncommon|8
Dario|Persian|possessing goodness|Uncommon|8
Ezio|Italian|eagle|Rare|7
Nino|Italian|little boy|Uncommon|8
Emilio|Italian|eager|Uncommon|8
Orlando|Italian|famous land|Rare|8
Silvio|Italian|of the forest|Rare|8
Giulio|Italian|youthful|Uncommon|8
Leone|Italian|lion|Uncommon|8
Dante|Italian|enduring|Uncommon|9
Aldo|Italian|old and noble|Uncommon|8
Vito|Latin|life|Uncommon|8
Lino|Greek|flax|Rare|8
Rocco|German|rest|Uncommon|8
Enea|Greek|praised|Rare|8
Orion|Greek|rising in the sky|Rare|9
Atlas|Greek|enduring bearer|Uncommon|8
Leander|Greek|lion man|Rare|9
Dorian|Greek|from Doris|Uncommon|9
Cassian|Latin|helmeted|Rare|8
Lucian|Latin|light|Uncommon|9
Evander|Greek|good man|Rare|8
Hector|Greek|steadfast|Uncommon|8
Andreas|Greek|manly|Uncommon|8
Theon|Greek|divine|Rare|8
Damian|Greek|to tame|Uncommon|9
Cyril|Greek|lordly|Uncommon|8
Ulysse|Greek|wanderer|Rare|7
Achille|Greek|heroic strength|Uncommon|7
Galien|Greek|calm|Rare|7
Hélios|Greek|sun|Rare|7
Maxence|Latin|greatest|Uncommon|8
Valère|Latin|strong and healthy|Rare|7
Iago|Spanish|supplanter|Rare|8
Tiago|Portuguese|supplanter|Uncommon|8
Mateo|Spanish|gift of God|Common|9
Diego|Spanish|teacher|Common|9
Íñigo|Basque|fiery|Rare|7
Alonso|German|noble and ready|Uncommon|8
Joaquin|Hebrew|God establishes|Uncommon|8
Rafael|Hebrew|God has healed|Common|9
Vasco|Basque|Basque man|Rare|8
Nuno|Portuguese|noble|Rare|8
Afonso|German|noble and ready|Uncommon|8
Salvador|Spanish|savior|Uncommon|8
Leonel|Spanish|little lion|Uncommon|8
Gaspar|Persian|treasurer|Rare|8
Bento|Latin|blessed|Rare|7
Rodrigo|German|famous ruler|Uncommon|8
Xavi|Basque|new house|Rare|8
Lluc|Catalan|light|Rare|7
Stellan|Nordic|calm one|Rare|8
Leif|Nordic|heir|Rare|8
Einar|Nordic|one warrior|Rare|7
Ivar|Nordic|yew bow warrior|Rare|7
Rune|Nordic|secret sign|Rare|7
Arvid|Nordic|eagle tree|Rare|7
Viggo|Nordic|battle|Rare|8
Anders|Nordic|manly|Uncommon|8
Lars|Nordic|laurel|Uncommon|8
Axel|Hebrew|father of peace|Common|9
Magnus|Latin|great|Uncommon|8
Olav|Nordic|ancestor relic|Rare|7
Aksel|Nordic|father of peace|Uncommon|8
Rasmus|Greek|beloved|Rare|7
Cillian|Irish|little church|Uncommon|8
Ronan|Irish|little seal|Uncommon|8
Ewan|Scottish|born of the yew|Uncommon|8
Owen|Welsh|well-born|Common|9
Aidan|Irish|little fire|Common|9
Kieran|Irish|little dark one|Uncommon|8
Finn|Irish|fair and bright|Common|9
Niall|Irish|champion|Rare|8
Rowan|Irish|rowan tree|Uncommon|9
Callum|Scottish|dove|Uncommon|8
Lachlan|Scottish|from the lakes|Rare|8
Alistair|Scottish|defender|Rare|8
Rhys|Welsh|ardor|Uncommon|8
Idris|Welsh|ardent lord|Rare|8
Gareth|Welsh|gentle|Rare|8
Emrys|Welsh|immortal|Rare|7
Ellis|Welsh|benevolent|Uncommon|9
Dylan|Welsh|great tide|Common|9
Morgan|Welsh|sea-born|Uncommon|9
Tristan|Welsh|tumult|Uncommon|8
Anselm|German|protected by God|Rare|7
Conrad|German|bold counsel|Uncommon|8
Otto|German|wealth|Uncommon|9
Emil|Latin|eager|Uncommon|9
Milo|German|merciful soldier|Common|9
Tobias|Hebrew|God is good|Uncommon|9
Felix|Latin|fortunate|Common|9
Anton|Latin|priceless|Uncommon|9
Florian|Latin|flowering|Uncommon|9
Bruno|German|shield|Uncommon|8
Milan|Slavic|gracious and dear|Uncommon|9
Luka|Slavic|light|Common|9
Lev|Slavic|lion|Rare|8
Nikolai|Greek|victory of the people|Uncommon|8
Ivan|Slavic|God is gracious|Uncommon|8
Casimir|Slavic|proclaims peace|Rare|7
Marek|Slavic|warlike|Uncommon|8
Valentin|Latin|strong and healthy|Uncommon|8
Sami|Arabic|elevated|Uncommon|9
Idriss|Arabic|studious|Uncommon|8
Naïm|Arabic|tranquil and blessed|Rare|8
Adel|Arabic|just and noble|Uncommon|8
Amir|Arabic|prince|Common|9
Zayn|Arabic|beauty and grace|Uncommon|9
Rami|Arabic|archer|Rare|8
Nadir|Arabic|rare and precious|Rare|8
Malik|Arabic|king|Common|8
Nour|Arabic|light|Uncommon|8
Salim|Arabic|safe and whole|Uncommon|8
Azad|Persian|free|Rare|8
Darius|Persian|possessing goodness|Uncommon|9
Cyrus|Persian|sun and throne|Uncommon|9
Kian|Persian|kingly|Uncommon|9
Reza|Persian|contentment|Rare|8
Navid|Persian|good news|Rare|8
Noam|Hebrew|pleasantness|Uncommon|9
Ezra|Hebrew|helper|Uncommon|9
Amos|Hebrew|carried by God|Rare|8
Elior|Hebrew|my God is light|Rare|8
Lior|Hebrew|my light|Rare|8
Ilan|Hebrew|tree|Uncommon|8
Ariel|Hebrew|lion of God|Uncommon|9
Akio|Japanese|bright man|Rare|7
Haru|Japanese|spring and sun|Rare|8
Hiro|Japanese|generous and broad|Rare|8
Kenzo|Japanese|wise and strong|Uncommon|8
Ren|Japanese|lotus|Uncommon|9
Riku|Japanese|land|Rare|8
Sora|Japanese|sky|Rare|8
Kaito|Japanese|ocean flight|Uncommon|8
Aitor|Basque|good father|Rare|7
Eneko|Basque|my little one|Rare|8
Iker|Basque|visitation|Uncommon|8
Unai|Basque|cowherd|Rare|8
Oihan|Basque|forest|Rare|7
Ander|Basque|manly|Rare|8
Guilhem|Occitan|resolute protector|Rare|7
Jaufre|Occitan|pledge of peace|Very Rare|6
Ferran|Catalan|bold traveler|Rare|8
Oriol|Catalan|golden|Uncommon|8
Arnau|Catalan|eagle ruler|Rare|8
Biel|Catalan|God is my strength|Rare|8
Pol|Catalan|small and humble|Rare|8
Nil|Catalan|champion and cloud|Uncommon|8`;

const GIRLS = `Alba|Latin|dawn and white light|Uncommon|9
Zélie|French|solemn and noble|Uncommon|7
Apolline|Greek|of Apollo|Rare|7
Azilis|French|noble pledge|Rare|6
Solveig|Nordic|sun strength|Rare|7
Soline|French|solemn sunlight|Rare|8
Alix|German|noble kind|Uncommon|8
Garance|French|madder flower|Rare|7
Éléa|Greek|sun ray|Uncommon|8
Léonie|Latin|lioness|Uncommon|8
Iris|Greek|rainbow|Common|10
Céleste|Latin|heavenly|Uncommon|9
Ninon|French|grace|Uncommon|7
Faustine|Latin|fortunate|Uncommon|8
Isolde|Welsh|ice ruler|Rare|7
Capucine|French|nasturtium flower|Uncommon|6
Victoire|Latin|victory|Uncommon|7
Violette|Latin|violet flower|Uncommon|8
Lison|French|pledged to God|Rare|7
Adèle|German|noble|Uncommon|9
Anaïs|Hebrew|grace|Uncommon|8
Agathe|Greek|good and kind|Uncommon|8
Aliénor|Occitan|the other Aenor|Rare|7
Amandine|Latin|worthy of love|Uncommon|8
Ambre|Arabic|amber|Common|8
Ariane|Greek|most holy|Uncommon|8
Aurore|Latin|dawn|Uncommon|8
Blanche|German|white and bright|Uncommon|7
Camille|Latin|attendant at ritual|Common|9
Clémence|Latin|merciful|Uncommon|8
Colombe|Latin|dove|Rare|6
Constance|Latin|steadfast|Uncommon|8
Daphné|Greek|laurel|Uncommon|8
Éloïse|German|healthy and wide|Uncommon|8
Élise|Hebrew|pledged to God|Uncommon|9
Estelle|Latin|star|Uncommon|9
Eugénie|Greek|well-born|Rare|7
Fleur|French|flower|Uncommon|8
Héloïse|German|healthy and wide|Uncommon|8
Laure|Latin|laurel|Uncommon|8
Louison|German|famous battle|Rare|7
Lucile|Latin|light|Uncommon|8
Maëlle|French|princess|Uncommon|8
Mélisande|German|strong in work|Rare|6
Noémie|Hebrew|pleasantness|Common|9
Ophélie|Greek|help|Uncommon|8
Philomène|Greek|friend of strength|Rare|6
Romane|Latin|Roman|Common|8
Roxane|Persian|dawn and bright|Uncommon|8
Sidonie|Latin|from Sidon|Rare|7
Thaïs|Greek|beloved|Uncommon|7
Alessia|Italian|defender|Uncommon|9
Allegra|Italian|joyful|Rare|8
Amalia|German|work and effort|Uncommon|8
Bianca|Italian|white|Uncommon|9
Chiara|Italian|clear and bright|Uncommon|9
Cosima|Greek|order and beauty|Rare|8
Delfina|Greek|dolphin|Rare|7
Emilia|Latin|eager|Common|9
Fiorella|Italian|little flower|Rare|7
Flavia|Latin|golden-haired|Rare|8
Gemma|Italian|precious stone|Uncommon|9
Gioia|Italian|joy|Rare|8
Livia|Latin|blue|Uncommon|9
Lucia|Latin|light|Common|9
Marcella|Latin|little warrior|Rare|8
Viola|Latin|violet|Uncommon|9
Vittoria|Latin|victory|Uncommon|8
Serena|Latin|clear and tranquil|Uncommon|9
Althea|Greek|healer|Rare|8
Ariadne|Greek|most holy|Rare|8
Callista|Greek|most beautiful|Rare|8
Cassia|Latin|cinnamon|Rare|9
Cora|Greek|maiden|Uncommon|9
Daphne|Greek|laurel|Common|9
Helena|Greek|shining light|Uncommon|9
Lyra|Greek|lyre|Uncommon|9
Maia|Greek|mother and nurse|Uncommon|9
Selene|Greek|moon|Rare|8
Thalia|Greek|to blossom|Rare|9
Xenia|Greek|hospitality|Rare|8
Aurelia|Latin|golden|Uncommon|9
Clara|Latin|clear and bright|Common|10
Flora|Latin|flower|Uncommon|9
Lilia|Latin|lily|Uncommon|9
Octavia|Latin|eighth born|Rare|8
Valeria|Latin|strong and healthy|Uncommon|9
Alma|Latin|nourishing soul|Uncommon|9
Amaya|Basque|the end|Uncommon|8
Belén|Spanish|Bethlehem|Rare|7
Brisa|Spanish|breeze|Rare|8
Candela|Spanish|candle and light|Rare|8
Carmen|Hebrew|garden|Common|8
Celia|Latin|heavenly|Uncommon|9
Elena|Greek|shining light|Common|9
Elvira|German|truth and guardian|Rare|8
Esperanza|Spanish|hope|Rare|7
Leonor|Greek|shining light|Uncommon|8
Luz|Spanish|light|Rare|8
Marisol|Spanish|sea and sun|Rare|7
Paloma|Spanish|dove|Uncommon|8
Rocío|Spanish|dew|Rare|7
Salomé|Hebrew|peace|Uncommon|8
Sol|Spanish|sun|Rare|8
Vega|Spanish|meadow|Rare|8
Vera|Slavic|faith|Uncommon|9
Beatriz|Latin|she who brings joy|Uncommon|8
Mafalda|German|mighty in battle|Rare|7
Matilde|German|mighty in battle|Common|8
Aina|Catalan|grace|Uncommon|8
Laia|Catalan|well-spoken|Uncommon|8
Núria|Catalan|valley of light|Rare|7
Ona|Catalan|wave|Rare|8
Asta|Nordic|divine beauty|Rare|8
Astrid|Nordic|divine beauty|Uncommon|9
Eira|Welsh|snow|Rare|8
Freya|Nordic|lady|Common|9
Ingrid|Nordic|beautiful and beloved|Uncommon|8
Linnea|Nordic|linden flower|Rare|8
Liv|Nordic|life|Uncommon|9
Maja|Nordic|splendid|Uncommon|9
Saga|Nordic|story and seeress|Rare|8
Signe|Nordic|new victory|Rare|8
Thora|Nordic|thunder goddess|Rare|8
Tuva|Nordic|beautiful|Rare|8
Aisling|Irish|dream and vision|Rare|7
Aoife|Irish|beauty and radiance|Rare|7
Brigid|Irish|exalted one|Rare|8
Ciara|Irish|dark-haired|Uncommon|8
Eileen|Irish|shining light|Uncommon|8
Maeve|Irish|she who intoxicates|Uncommon|9
Moira|Irish|beloved and bitter|Uncommon|8
Niamh|Irish|bright|Rare|7
Orla|Irish|golden princess|Uncommon|8
Saoirse|Irish|freedom|Rare|7
Skye|Scottish|from the Isle of Skye|Uncommon|8
Isla|Scottish|island|Common|9
Ailsa|Scottish|elf victory|Rare|8
Fiona|Scottish|fair and white|Uncommon|9
Iona|Scottish|from the sacred island|Rare|8
Elowen|Welsh|elm tree|Rare|8
Enid|Welsh|soul and life|Rare|8
Gwen|Welsh|white and blessed|Uncommon|8
Rhiannon|Welsh|great queen|Rare|8
Seren|Welsh|star|Rare|8
Carys|Welsh|love|Rare|8
Ada|German|noble|Uncommon|9
Anika|German|grace|Uncommon|9
Annika|German|grace|Uncommon|9
Frieda|German|peaceful|Uncommon|8
Greta|German|pearl|Uncommon|9
Klara|Latin|clear and bright|Uncommon|9
Leni|German|shining light|Uncommon|9
Lotte|German|free woman|Uncommon|8
Romy|Latin|dew of the sea|Uncommon|9
Thea|Greek|goddess|Uncommon|9
Ania|Slavic|grace|Uncommon|8
Danica|Slavic|morning star|Rare|8
Daria|Persian|possessing goodness|Uncommon|9
Irina|Greek|peace|Uncommon|8
Katia|Greek|pure|Uncommon|8
Lada|Slavic|harmony|Rare|7
Larisa|Greek|citadel|Uncommon|8
Lena|Greek|shining light|Common|9
Mila|Slavic|dear and gracious|Common|9
Mira|Slavic|peace and wonder|Uncommon|9
Nadia|Slavic|hope|Uncommon|9
Zora|Slavic|dawn|Rare|8
Amina|Arabic|trustworthy|Uncommon|9
Amira|Arabic|princess|Uncommon|9
Aya|Arabic|sign and miracle|Uncommon|9
Dalia|Hebrew|branch|Uncommon|9
Farah|Arabic|joy|Uncommon|9
Hana|Arabic|happiness and flower|Uncommon|9
Inaya|Arabic|care and protection|Uncommon|8
Kenza|Arabic|treasure|Uncommon|8
Laila|Arabic|night|Uncommon|9
Lina|Arabic|tender palm|Common|9
Malika|Arabic|queen|Uncommon|8
Miriam|Hebrew|beloved child|Uncommon|9
Nora|Arabic|light|Common|10
Rania|Arabic|gazing and queenly|Uncommon|8
Samira|Arabic|evening companion|Uncommon|8
Soraya|Persian|Pleiades star cluster|Rare|8
Yasmin|Persian|jasmine|Uncommon|9
Zahra|Arabic|radiant flower|Uncommon|8
Adina|Hebrew|delicate|Rare|8
Aviva|Hebrew|springtime|Rare|8
Eliana|Hebrew|God has answered|Uncommon|9
Esther|Persian|star|Uncommon|8
Liora|Hebrew|my light|Rare|8
Noa|Hebrew|motion|Common|9
Rina|Hebrew|joyful song|Rare|8
Shira|Hebrew|song|Rare|8
Talia|Hebrew|dew from heaven|Uncommon|9
Tamar|Hebrew|date palm|Uncommon|8
Yael|Hebrew|mountain goat|Rare|8
Ziva|Hebrew|radiance|Rare|8
Anahita|Persian|immaculate goddess|Rare|7
Darya|Persian|sea|Rare|8
Delara|Persian|beloved of the heart|Rare|8
Leila|Persian|night|Uncommon|9
Mina|Persian|azure glass|Uncommon|9
Nila|Persian|sapphire blue|Rare|8
Shirin|Persian|sweet|Rare|8
Tara|Persian|star|Uncommon|9
Aiko|Japanese|beloved child|Rare|8
Akari|Japanese|light|Rare|8
Hikari|Japanese|light|Rare|8
Kiko|Japanese|hope child|Rare|8
Mei|Japanese|bud and brightness|Uncommon|9
Nara|Japanese|oak and country|Rare|8
Rin|Japanese|dignified|Uncommon|9
Sakura|Japanese|cherry blossom|Uncommon|8
Yuna|Japanese|gentle connection|Uncommon|9
Alaia|Basque|joyful|Rare|8
Amaia|Basque|the end|Uncommon|8
Edurne|Basque|snow|Rare|7
Irati|Basque|fern field|Rare|7
Izar|Basque|star|Rare|8
Leire|Basque|from Leyre|Rare|8
Maite|Basque|beloved|Rare|8
Nahia|Basque|desire|Rare|8
Nerea|Basque|mine|Uncommon|8
Oihana|Basque|forest|Rare|7
Mariona|Catalan|little Maria|Rare|8
Aude|Occitan|old and noble|Rare|7
Azalaïs|Occitan|noble kind|Very Rare|6
Mireille|Occitan|to admire|Rare|7
Naïs|Occitan|grace|Rare|7
Oriane|Latin|golden|Rare|8`;

const BOY_PREFIXES = ["Jean", "Pierre", "Paul", "Marc", "Louis", "Charles", "Joseph", "Léon", "Jules", "Henri", "Émile", "Félix", "Gabriel", "Victor"];
const GIRL_PREFIXES = ["Marie", "Anne", "Rose", "Claire", "Jeanne", "Louise", "Élise", "Lise", "Alma", "Alba", "Ève", "Iris", "Céleste"];
const HIDDEN = new Set("Sohan,Numa,Elio,Naël,Malo,Côme,Aurel,Nils,Soren,Lazare,Anselme,Alban,Noé,Amaury,Basile,Célian,Octave,Silvère,Marius,Loup,Alba,Zélie,Apolline,Azilis,Solveig,Soline,Alix,Garance,Éléa,Léonie,Iris,Céleste,Ninon,Faustine,Isolde,Capucine,Victoire,Violette,Lison,Adèle".split(","));
const COMMON = new Set("louis,emma,hugo,gabriel,raphael,leo,arthur,jade,louise,alice,chloe,mia,lina,lucas".split(","));
const PREFIX_INFO: Record<Gender, Record<string, Seed>> = { boy: Object.fromEntries(BOY_PREFIXES.map((name) => [name, { name, gender: "boy", origin: "French", meaning: "classic French compound form", popularity: "Common", international_score: 8 }])) as Record<string, Seed>, girl: Object.fromEntries(GIRL_PREFIXES.map((name) => [name, { name, gender: "girl", origin: "French", meaning: "classic French compound form", popularity: "Common", international_score: 8 }])) as Record<string, Seed> };

function parse(source: string, gender: Gender): Seed[] { return source.split("\n").filter(Boolean).map((line) => { const [name, origin, meaning, popularity, score] = line.split("|"); return { name, gender, origin, meaning, popularity: popularity as Popularity, international_score: Number(score) }; }); }
function slug(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function compact(value: string) { return slug(value).replace(/-/g, ""); }
function pronunciation(name: string) { return "FR guide: " + name.split("-").map((part) => part.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()).join(" - "); }
function hiddenGem(seed: Seed) { return HIDDEN.has(seed.name) || (["Very Rare", "Rare", "Uncommon"].includes(seed.popularity) && seed.international_score >= 7 && !COMMON.has(compact(seed.name))); }
function entry(seed: Seed, sourceKind: NameEntry["sourceKind"]): NameEntry { return { id: seed.gender + "-" + slug(seed.name), name: seed.name, gender: seed.gender, origin: seed.origin, meaning: seed.meaning, pronunciation: pronunciation(seed.name), popularity: seed.popularity, rarity: seed.popularity, international_score: seed.international_score, hiddenGem: hiddenGem(seed), sourceKind }; }
function compoundPopularity(popularity: Popularity): Popularity { return popularity === "Very Rare" || popularity === "Rare" ? "Very Rare" : popularity === "Uncommon" ? "Rare" : "Uncommon"; }
function compounds(gender: Gender, source: string, prefixes: string[]) { const seeds = parse(source, gender); const suffixes = seeds.filter((seed) => !prefixes.includes(seed.name) && seed.name.length <= 10 && seed.international_score >= 6); const prefixSeeds = prefixes.map((name) => PREFIX_INFO[gender][name]); const all = seeds.map((seed) => entry(seed, "given")); for (const prefix of prefixSeeds) for (const suffix of suffixes) if (compact(prefix.name) !== compact(suffix.name)) all.push(entry({ name: prefix.name + "-" + suffix.name, gender, origin: prefix.origin + " / " + suffix.origin, meaning: "Compound of " + prefix.name + " and " + suffix.name + ": " + suffix.meaning + ".", popularity: compoundPopularity(suffix.popularity), international_score: Math.max(5, Math.min(9, Math.round((prefix.international_score + suffix.international_score) / 2))) }, "compound")); return Array.from(new Map(all.map((item) => [item.id, item])).values()).sort((a, b) => a.name.localeCompare(b.name, "fr")); }

export const BOY_NAMES = compounds("boy", BOYS, BOY_PREFIXES);
export const GIRL_NAMES = compounds("girl", GIRLS, GIRL_PREFIXES);
export const NAMES = [...BOY_NAMES, ...GIRL_NAMES];
export const CATALOGUE_COUNTS = { boys: BOY_NAMES.length, girls: GIRL_NAMES.length, total: NAMES.length, given: NAMES.filter((name) => name.sourceKind === "given").length, compounds: NAMES.filter((name) => name.sourceKind === "compound").length };
export function originSymbol(origin: string) { const key = ORIGINS.find((option) => origin.includes(option)); return key ? ORIGIN_SYMBOLS[key] : "--"; }
export function originMatches(origin: string, selectedOrigin: string) { return origin.split(" / ").includes(selectedOrigin) || origin === selectedOrigin; }
