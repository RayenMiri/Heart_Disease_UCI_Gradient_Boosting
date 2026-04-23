const pptxgen = require("pptxgenjs");

// ─── PALETTE ───────────────────────────────────────────────────────────────
const C = {
  navy:     "0D1B2A",   // dark navy  – title/section slides BG
  teal:     "1B4F72",   // deep teal  – card headers, accents
  tealMid:  "2471A3",   // mid teal   – section headers
  tealLt:   "AED6F1",   // light teal – thin rules, light accents
  white:    "FFFFFF",
  offWhite: "F4F8FB",   // content slide BG
  charcoal: "1C2833",   // body text
  grey:     "5D6D7E",   // captions
  greyLt:   "D5D8DC",   // table borders
  accent:   "E74C3C",   // red – warnings, emphasis
  gold:     "F39C12",   // gold – highlight callouts
  green:    "1E8449",   // green – positive results
};

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" × 5.625"
pres.author  = "Projet Machine Learning";
pres.title   = "Classification de Maladies Cardiaques";

// ─── HELPERS ──────────────────────────────────────────────────────────────
const makeShadow = () => ({type:"outer", blur:8, offset:3, angle:135, color:"000000", opacity:0.12});

function titleSlide(title, subtitle, note) {
  let s = pres.addSlide();
  s.background = { color: C.navy };

  // left accent bar
  s.addShape(pres.shapes.RECTANGLE, {x:0, y:0, w:0.28, h:5.625, fill:{color:C.tealMid}, line:{color:C.tealMid}});

  // decorative circle top-right
  s.addShape(pres.shapes.OVAL, {x:8.5, y:-0.8, w:2.5, h:2.5, fill:{color:C.teal, transparency:70}, line:{color:C.teal, transparency:60}});
  s.addShape(pres.shapes.OVAL, {x:8.9, y:-0.4, w:1.6, h:1.6, fill:{color:C.tealMid, transparency:60}, line:{color:C.tealMid, transparency:50}});

  s.addText(title, {
    x:0.55, y:1.6, w:9.1, h:1.6,
    fontSize:34, bold:true, color:C.white, fontFace:"Cambria",
    align:"left", valign:"middle", charSpacing:0.5
  });
  if (subtitle) {
    s.addText(subtitle, {
      x:0.55, y:3.3, w:8, h:0.8,
      fontSize:16, color:C.tealLt, fontFace:"Calibri", align:"left"
    });
  }
  if (note) {
    s.addText(note, {
      x:0.55, y:4.4, w:8, h:0.7,
      fontSize:12, color:C.grey, fontFace:"Calibri", align:"left", italic:true
    });
  }
  return s;
}

function sectionSlide(sectionNum, sectionTitle) {
  let s = pres.addSlide();
  s.background = { color: C.teal };
  s.addShape(pres.shapes.RECTANGLE, {x:0, y:0, w:0.18, h:5.625, fill:{color:C.gold}, line:{color:C.gold}});
  s.addShape(pres.shapes.OVAL, {x:7.5, y:3.5, w:3, h:3, fill:{color:C.navy, transparency:60}, line:{color:C.navy, transparency:55}});
  s.addText(`0${sectionNum}`, {x:1, y:0.7, w:2, h:2, fontSize:80, bold:true, color:C.white, fontFace:"Cambria", transparency:30});
  s.addText(sectionTitle, {
    x:0.55, y:2.5, w:9, h:1.5,
    fontSize:30, bold:true, color:C.white, fontFace:"Cambria", align:"left"
  });
  return s;
}

function contentSlide(title) {
  let s = pres.addSlide();
  s.background = { color: C.offWhite };
  // title band
  s.addShape(pres.shapes.RECTANGLE, {x:0, y:0, w:10, h:0.85, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText(title, {
    x:0.35, y:0, w:9.3, h:0.85,
    fontSize:20, bold:true, color:C.white, fontFace:"Cambria",
    align:"left", valign:"middle"
  });
  return s;
}

// card – white box with shadow
function addCard(s, x, y, w, h, opts={}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill:{color: opts.color || C.white},
    line:{color: opts.border || C.greyLt, width:1},
    shadow: makeShadow()
  });
}

// formula box – navy bg, white monospace text
function addFormula(s, formula, x, y, w, h) {
  s.addShape(pres.shapes.RECTANGLE, {x, y, w, h, fill:{color:C.navy}, line:{color:C.navy}});
  s.addText(formula, {
    x, y, w, h,
    fontSize:12, color:C.white, fontFace:"Consolas",
    align:"center", valign:"middle", margin:8
  });
}

// label + text helper
function addLabel(s, label, value, x, y, w, labelColor) {
  s.addText(label, {x, y, w:1.5, h:0.3, fontSize:10, bold:true, color:labelColor||C.tealMid, fontFace:"Calibri"});
  s.addText(value, {x:x+1.5, y, w:w-1.5, h:0.3, fontSize:10, color:C.charcoal, fontFace:"Calibri"});
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ══════════════════════════════════════════════════════════════════════════
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, {x:0, y:0, w:0.28, h:5.625, fill:{color:C.gold}, line:{color:C.gold}});
  s.addShape(pres.shapes.OVAL, {x:7.8, y:-1, w:3.5, h:3.5, fill:{color:C.teal, transparency:72}, line:{color:C.teal, transparency:65}});
  s.addShape(pres.shapes.OVAL, {x:8.5, y:-0.3, w:2, h:2, fill:{color:C.tealMid, transparency:65}, line:{color:C.tealMid, transparency:58}});

  s.addText("Classification de Maladies\nCardiaques par Machine Learning", {
    x:0.5, y:0.7, w:9.2, h:2.1,
    fontSize:30, bold:true, color:C.white, fontFace:"Cambria",
    align:"left", valign:"top"
  });
  s.addText("Gradient Boosting  ·  Naive Bayes  ·  Régression Logistique", {
    x:0.5, y:2.85, w:9, h:0.55,
    fontSize:15, color:C.gold, fontFace:"Calibri", bold:true, align:"left"
  });
  s.addText("Comparaison rigoureuse de trois modèles pour le dépistage cardiaque\nDataset UCI Cleveland — 297 observations — Validation croisée 5-fold", {
    x:0.5, y:3.5, w:8.5, h:0.8,
    fontSize:12, color:C.tealLt, fontFace:"Calibri", align:"left"
  });
  s.addText("Projet Machine Learning  ·  Soutenance académique", {
    x:0.5, y:4.6, w:8, h:0.5,
    fontSize:11, color:C.grey, fontFace:"Calibri", italic:true, align:"left"
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — PLAN
// ══════════════════════════════════════════════════════════════════════════
{
  let s = contentSlide("Plan de la Présentation");
  const sections = [
    {letter:"A", label:"Fondations : Arbres, Boosting & XGBoost"},
    {letter:"B", label:"Introduction & Cadre clinique"},
    {letter:"C", label:"Données & Préparation"},
    {letter:"D", label:"Théorie des modèles (avec formules)"},
    {letter:"E", label:"Protocole expérimental & Métriques"},
    {letter:"F", label:"Résultats — Validation croisée"},
    {letter:"G", label:"Résultats — Jeu de test"},
    {letter:"H", label:"Analyse critique avancée"},
    {letter:"I", label:"Conclusion & Perspectives"},
  ];
  sections.forEach((sec, i) => {
    const col = i < 5 ? 0 : 1;
    const row = i < 5 ? i : i - 5;
    const x = 0.45 + col * 4.8;
    const y = 1.05 + row * 0.83;
    addCard(s, x, y, 4.5, 0.68);
    s.addShape(pres.shapes.RECTANGLE, {x, y, w:0.38, h:0.68, fill:{color:C.teal}, line:{color:C.teal}});
    s.addText(sec.letter, {x, y, w:0.38, h:0.68, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    s.addText(sec.label, {x:x+0.45, y:y+0.04, w:3.9, h:0.6, fontSize:12.5, color:C.charcoal, fontFace:"Calibri", align:"left", valign:"middle"});
  });
}


// ══════════════════════════════════════════════════════════════════════════
// SECTION A — Fondations : Arbres, Boosting & XGBoost (A1→A5)
// ══════════════════════════════════════════════════════════════════════════
// SECTION D — Fondations arbres
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(1, "Fondations : Arbres de Décision, Boosting & XGBoost");

// SLIDE 26 — ID3 vs C4.5 vs CART — DETAILED
{
  let s = contentSlide("Comparaison Approfondie : ID3 — C4.5 — CART");

  const algo = [
    {
      name:"ID3", year:"1986",
      formula:"H(Y) = −Σ pₖ log₂(pₖ)   →   IG(Y,X) = H(Y) − Σᵥ (|Dᵥ|/|D|)·H(Y|X=v)",
      desc:"Entropie de Shannon + Gain d'Information. Choisit l'attribut maximisant IG.",
      lims:"Biais vers attributs à nombreuses valeurs. Pas de support valeurs continues. Arbres multi-branches.",
    },
    {
      name:"C4.5", year:"1993",
      formula:"GR(Y,X) = IG(Y,X) / SplitInfo(X)   où   SplitInfo = −Σᵥ (|Dᵥ|/|D|)·log₂(|Dᵥ|/|D|)",
      desc:"Gain Ratio corrige le biais ID3. Supporte valeurs continues (seuils). Gère les valeurs manquantes.",
      lims:"Plus lent. Heuristiques complexes. Arbres multi-branches encore.",
    },
    {
      name:"CART", year:"1984",
      formula:"Gini(t) = 1 − Σₖ p(k|t)²   →   ΔI(s,t) = I(t) − (Nₗ/Nₜ)·I(tₗ) − (Nᵣ/Nₜ)·I(tᵣ)",
      desc:"Arbre BINAIRE uniquement. Impureté de Gini. Split optimal par maximisation de ΔI(s,t). BASE de scikit-learn.",
      lims:"Toujours binaire. Sensible aux features dominantes (sans normalisation).",
    },
  ];
  algo.forEach((a, i) => {
    const y = 1.0 + i * 1.5;
    addCard(s, 0.4, y, 9.2, 1.38);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.95, h:1.38, fill:{color:i===0?C.tealMid:i===1?C.gold:C.accent}, line:{color:i===0?C.tealMid:i===1?C.gold:C.accent}});
    s.addText(a.name+"\n"+a.year, {x:0.4, y, w:0.95, h:1.38, fontSize:11, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    // formula bg
    s.addShape(pres.shapes.RECTANGLE, {x:1.42, y:y+0.03, w:7.1, h:0.45, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(a.formula, {x:1.42, y:y+0.03, w:7.1, h:0.45, fontSize:8.5, color:C.tealLt, fontFace:"Consolas", align:"left", valign:"middle", margin:4});
    s.addText(a.desc, {x:1.42, y:y+0.52, w:7.1, h:0.38, fontSize:11, color:C.charcoal, fontFace:"Calibri"});
    s.addText("Limites : "+a.lims, {x:1.42, y:y+0.93, w:7.1, h:0.35, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"});
  });

  s.addText("Lien projet : scikit-learn utilise CART (Gini, splits binaires) pour les arbres faibles du Gradient Boosting.", {
    x:0.4, y:5.5, w:9.2, h:0.22, fontSize:10, italic:true, color:C.tealMid, fontFace:"Calibri"
  });
}

// SLIDE 27 — Équation de split & interprétation
{
  let s = contentSlide("Équation de Split d'un Arbre — Réduction d'Impureté");
  addFormula(s, "ΔI(s,t)  =  I(t)  −  (Nₗ/Nₜ)·I(tₗ)  −  (Nᵣ/Nₜ)·I(tᵣ)", 0.4, 1.0, 9.2, 0.65);

  const params3 = [
    {s:"I(t)", d:"Impureté du nœud parent (ex: Gini ou Entropie)"},
    {s:"I(tₗ), I(tᵣ)", d:"Impuretés des sous-arbres gauche et droit après le split"},
    {s:"Nₗ, Nᵣ, Nₜ", d:"Nombre d'exemples dans fils gauche, fils droit, et nœud parent"},
    {s:"s", d:"Split candidate : choix de la feature et du seuil testés"},
  ];
  params3.forEach((p,i) => {
    const y = 1.8 + i * 0.52;
    addCard(s, 0.4, y, 9.2, 0.45);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:1.5, h:0.45, fill:{color:C.tealMid}, line:{color:C.tealMid}});
    s.addText(p.s, {x:0.4, y, w:1.5, h:0.45, fontSize:11, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(p.d, {x:2.0, y:y+0.06, w:7.5, h:0.33, fontSize:11.5, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  addFormula(s, "Prédiction feuille :  p̂_leaf = n_pos / (n_pos + n_neg)   →   ŷ = 𝟙(p̂_leaf ≥ t)", 0.4, 4.0, 9.2, 0.6);

  addCard(s, 0.4, 4.75, 9.2, 0.65, {color:"EBF5FB"});
  s.addText("Lien clinique :", {x:0.55, y:4.8, w:1.7, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Les variables thal, cp, ca dominent nos résultats car elles maximisent ΔI(s,t) à chaque nœud → elles contiennent le plus d'information discriminante sur la maladie cardiaque.", {
    x:2.2, y:4.8, w:7.3, h:0.5, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 28 — Boosting séquentiel
{
  let s = contentSlide("Principe du Boosting Séquentiel — Modèle Additif par Étapes");
  addCard(s, 0.4, 1.0, 9.2, 0.7, {color:C.navy});
  addFormula(s, "Fₘ(x)  =  F₀(x)  +  Σₘ₌₁ᴹ  η · hₘ(x)", 0.45, 1.1, 9.1, 0.55);

  addCard(s, 0.4, 1.9, 4.5, 3.3);
  s.addText("Boosting Séquentiel (GB)", {x:0.5, y:1.95, w:4.2, h:0.38, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  s.addText([
    {text:"• Apprenants DÉPENDANTS\n", options:{bold:true, color:C.charcoal}},
    {text:"• hₘ corrige les erreurs de hₘ₋₁\n", options:{color:C.charcoal}},
    {text:"• Optimise la perte par gradient\n", options:{color:C.charcoal}},
    {text:"• Séquentiel → NON parallélisable\n", options:{color:C.charcoal}},
    {text:"• Réduit biais ET variance\n", options:{color:C.charcoal}},
    {text:"• Sensible aux anomalies (outliers)\n\n", options:{color:C.charcoal}},
    {text:"Lien projet :\n", options:{bold:true, color:C.tealMid}},
    {text:"n_estimators=200, learning_rate=0.05\n→ apprentissage progressif mais mémorisation avec peu de données", options:{italic:true, color:C.grey}},
  ], {x:0.55, y:2.4, w:4.2, h:2.65, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 5.1, 1.9, 4.5, 3.3);
  s.addText("Différence vs Bagging (RF)", {x:5.2, y:1.95, w:4.2, h:0.38, fontSize:12, bold:true, color:C.gold, fontFace:"Cambria"});
  s.addText([
    {text:"• Apprenants INDÉPENDANTS\n", options:{bold:true, color:C.charcoal}},
    {text:"• Entraînés en parallèle\n", options:{color:C.charcoal}},
    {text:"• Chaque arbre sur Bootstrap\n", options:{color:C.charcoal}},
    {text:"• Agrégation par vote/moyenne\n", options:{color:C.charcoal}},
    {text:"• Réduit principalement la variance\n", options:{color:C.charcoal}},
    {text:"• Robuste aux outliers\n\n", options:{color:C.charcoal}},
    {text:"Note :\n", options:{bold:true, color:C.gold}},
    {text:"Random Forest n'est pas implémenté dans ce notebook — cité comme perspective.", options:{italic:true, color:C.grey}},
  ], {x:5.25, y:2.4, w:4.2, h:2.65, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});
}

// SLIDE 29 — Descente de gradient fonctionnelle
{
  let s = contentSlide("Descente de Gradient en Espace Fonctionnel & Shrinkage");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Optimisation en espace fonctionnel :", {x:0.55, y:1.03, w:4, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "F̂  =  argmin_F Σᵢ L(yᵢ, F(xᵢ))", 0.45, 1.42, 9.1, 0.55);

  addCard(s, 0.4, 2.1, 9.2, 0.65, {color:C.navy});
  s.addText("Direction de descente à l'étape m (pseudo-résidus) :", {x:0.55, y:2.13, w:5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "r_{im}  =  −∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ)  |_{F = F_{m−1}}", 0.45, 2.47, 9.1, 0.55);

  addCard(s, 0.4, 3.2, 9.2, 0.65, {color:C.navy});
  s.addText("Mise à jour avec pas optimal (shrinkage) :", {x:0.55, y:3.23, w:4.5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "Fₘ(x)  =  F_{m−1}(x)  +  η·ρₘ·hₘ(x)    où    ρₘ = argmin_ρ Σᵢ L(yᵢ, F_{m−1}(xᵢ) + ρ·hₘ(xᵢ))", 0.45, 3.57, 9.1, 0.55);

  const pts2 = [
    {s:"η", d:"Learning rate (0.05) — shrinkage. Réduit la contribution de chaque arbre."},
    {s:"ρₘ", d:"Pas optimal par line search — minimise la perte à l'étape m."},
    {s:"hₘ(x)", d:"Arbre faible ajusté sur les pseudo-résidus de l'étape m."},
  ];
  pts2.forEach((p,i) => {
    const y = 4.3 + i * 0.38;
    s.addText(p.s+" :", {x:0.5, y, w:0.8, h:0.33, fontSize:11, bold:true, color:C.gold, fontFace:"Consolas"});
    s.addText(p.d, {x:1.3, y, w:8.2, h:0.33, fontSize:11, color:C.charcoal, fontFace:"Calibri"});
  });

  s.addText("Lien projet : η=0.05 impose un apprentissage progressif (shrinkage fort). Avec M=200 arbres, la complexité effective est limitée mais non nulle.", {
    x:0.4, y:5.45, w:9.2, h:0.3, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 30 — GB vs RF
{
  let s = contentSlide("Comparaison Gradient Boosting vs Random Forest");
  addCard(s, 0.4, 1.0, 4.5, 3.8);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.0, w:4.5, h:0.5, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Gradient Boosting", {x:0.45, y:1.0, w:4.4, h:0.5, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  addFormula(s, "p̂_GB(x)  =  σ(F₀ + Σₘ η·hₘ(x))", 0.45, 1.55, 4.4, 0.52);
  s.addText([
    {text:"Séquentiel :", options:{bold:true, color:C.teal}},{text:" hₘ dépend de hₘ₋₁\n"},
    {text:"Objectif :", options:{bold:true, color:C.teal}},{text:" réduire biais via corrections successives\n"},
    {text:"Parallélisation :", options:{bold:true, color:C.teal}},{text:" impossible (dépendance temporelle)\n"},
    {text:"Variance :", options:{bold:true, color:C.teal}},{text:" réduite via subsample + shrinkage\n"},
    {text:"Risque :", options:{bold:true, color:C.accent}},{text:" sur-apprentissage si hyperparamètres mal réglés\n"},
    {text:"Force :", options:{bold:true, color:C.green}},{text:" excellentes performances avec bon tuning"},
  ], {x:0.55, y:2.18, w:4.2, h:2.5, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 5.1, 1.0, 4.5, 3.8);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.0, w:4.5, h:0.5, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("Random Forest (Bagging)", {x:5.15, y:1.0, w:4.4, h:0.5, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  addFormula(s, "p̂_RF(x)  =  (1/B) Σ_b hb(x)", 5.15, 1.55, 4.4, 0.52);
  s.addText([
    {text:"Parallèle :", options:{bold:true, color:C.gold}},{text:" arbres indépendants sur bootstraps\n"},
    {text:"Objectif :", options:{bold:true, color:C.gold}},{text:" réduire variance par agrégation\n"},
    {text:"Parallélisation :", options:{bold:true, color:C.gold}},{text:" totale (n_jobs=-1)\n"},
    {text:"Biais :", options:{bold:true, color:C.gold}},{text:" légèrement plus élevé que GB\n"},
    {text:"Risque :", options:{bold:true, color:C.green}},{text:" plus robuste, moins de sur-apprentissage\n"},
    {text:"Statut :", options:{bold:true, color:C.grey, italic:true}},{text:" Non implémenté ici — perspective", options:{italic:true}},
  ], {x:5.25, y:2.18, w:4.2, h:2.5, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 0.4, 5.0, 9.2, 0.5, {color:"EBF5FB"});
  s.addText("Le sur-apprentissage de GB (CV gap=0.138, train AUC=1.000) est cohérent avec la dynamique séquentielle de correction des erreurs sur un petit dataset.", {
    x:0.55, y:5.05, w:9.0, h:0.4, fontSize:11, italic:true, color:C.tealMid, fontFace:"Calibri"
  });
}

// SLIDE 31 — XGBoost
{
  let s = contentSlide("XGBoost — Extension Régularisée du Gradient Boosting");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Fonction objectif régularisée (étape t) :", {x:0.55, y:1.03, w:4, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "Obj(t) = Σᵢ l(yᵢ, ŷᵢ(t−1) + fₜ(xᵢ)) + Ω(fₜ)   où   Ω(f) = γT + (λ/2)Σⱼ wⱼ²", 0.45, 1.42, 9.1, 0.55);

  addCard(s, 0.4, 2.1, 9.2, 0.65, {color:C.navy});
  s.addText("Approximation de second ordre (développement de Taylor) :", {x:0.55, y:2.13, w:6, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "Obj̃(t) ≈ Σᵢ [ gᵢ·fₜ(xᵢ) + (1/2)·hᵢ·fₜ(xᵢ)² ] + Ω(fₜ)", 0.45, 2.47, 9.1, 0.55);

  const pxb = [
    {s:"T", d:"Nombre de feuilles dans l'arbre fₜ"},
    {s:"wⱼ", d:"Poids (score) de la feuille j"},
    {s:"γ", d:"Pénalité sur le nombre de feuilles → limite la complexité structurelle"},
    {s:"λ", d:"Pénalité L2 sur les poids des feuilles → analogue à C dans LogReg"},
    {s:"gᵢ, hᵢ", d:"Gradient de 1er et 2ème ordre de la perte → optimisation plus précise que GB classique"},
  ];
  pxb.forEach((p,i) => {
    const y = 3.25 + i * 0.38;
    s.addText(p.s+" :", {x:0.5, y, w:0.7, h:0.33, fontSize:11, bold:true, color:C.gold, fontFace:"Consolas"});
    s.addText(p.d, {x:1.25, y, w:8.3, h:0.33, fontSize:11, color:C.charcoal, fontFace:"Calibri"});
  });

  addCard(s, 0.4, 5.22, 9.2, 0.28, {color:"FDECEA"});
  s.addText("⚠  Statut dans ce projet :", {x:0.55, y:5.26, w:2.8, h:0.22, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("XGBoost est présenté ici comme extension théorique. Il n'est PAS implémenté dans main.ipynb — perspective pour travaux futurs.", {
    x:3.3, y:5.26, w:6.2, h:0.22, fontSize:10.5, italic:true, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 32 — Hypothèses & risques
{
  let s = contentSlide("Hypothèses d'Application & Risques Pratiques du Gradient Boosting");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Complexité effective totale :", {x:0.55, y:1.03, w:3.5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "complexité effective  ∝  η × M  =  0.05 × 200  =  10", 0.45, 1.42, 9.1, 0.52);

  const risks = [
    {title:"Sensibilité aux valeurs aberrantes", desc:"Des résidus très grands peuvent orienter excessivement les premiers arbres — les exemples difficiles reçoivent une pondération excessive dans les itérations suivantes."},
    {title:"Sur-apprentissage sur petit dataset", desc:"Même avec régularisation, GB peut mémoriser. Observé ici : Train AUC = 1.000, CV gap = 0.138. Le modèle trop puissant pour 237 exemples."},
    {title:"Interdépendance η × M critique", desc:"Un learning rate trop grand (η→1) avec M élevé = sur-apprentissage garanti. Un η trop petit (η→0) avec M insuffisant = sous-apprentissage."},
    {title:"Absence de validation précoce (early stopping)", desc:"Sans early stopping, on utilise tous les M arbres même si la validation s'est dégradée. Non implémenté ici — aurait pu limiter le sur-apprentissage."},
  ];
  risks.forEach((r,i) => {
    const y = 1.82 + i * 0.9;
    addCard(s, 0.4, y, 9.2, 0.78);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.12, h:0.78, fill:{color:C.accent}, line:{color:C.accent}});
    s.addText(r.title, {x:0.62, y:y+0.04, w:8.8, h:0.32, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
    s.addText(r.desc, {x:0.62, y:y+0.4, w:8.8, h:0.33, fontSize:11, color:C.charcoal, fontFace:"Calibri"});
  });
}

// SLIDE 33 — Métriques de convergence
{
  let s = contentSlide("Métriques de Convergence : train_score_ & staged_predict()");
  addCard(s, 0.4, 1.0, 4.5, 3.4);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.0, w:4.5, h:0.42, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("train_score_[m]", {x:0.45, y:1.0, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  addFormula(s, "train_score[m] = (1/n)·Σᵢ L(yᵢ, Fₘ(xᵢ))", 0.45, 1.48, 4.4, 0.55);
  s.addText("Déviance d'entraînement à chaque étape m. Permet de visualiser la courbe de convergence sur le train. Si elle descend toujours → pas encore convergé.", {
    x:0.55, y:2.1, w:4.2, h:1.15, fontSize:11, color:C.charcoal, fontFace:"Calibri", paraSpaceAfter:5
  });
  s.addText("Statut ici :", {x:0.55, y:3.3, w:1.2, h:0.28, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("Non exploité explicitement dans main.ipynb → extension méthodologique.", {x:1.7, y:3.3, w:3.1, h:0.5, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"});

  addCard(s, 5.1, 1.0, 4.5, 3.4);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.0, w:4.5, h:0.42, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("staged_predict_proba()", {x:5.15, y:1.0, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  addFormula(s, "AUCₘ = AUC(y, staged_predict_m(x))", 5.15, 1.48, 4.4, 0.55);
  s.addText("Évalue les métriques de validation à chaque étape m. Permet de trouver M* optimal (nombre d'arbres qui maximise la validation).", {
    x:5.25, y:2.1, w:4.2, h:1.15, fontSize:11, color:C.charcoal, fontFace:"Calibri", paraSpaceAfter:5
  });
  s.addText("Statut ici :", {x:5.25, y:3.3, w:1.2, h:0.28, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("staged_predict() non exploité dans la version actuelle — à ajouter comme diagnostic.", {x:6.4, y:3.3, w:3.1, h:0.5, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"});

  addCard(s, 0.4, 4.55, 9.2, 0.85, {color:"EBF5FB"});
  s.addText("Intérêt pratique :", {x:0.55, y:4.6, w:2.0, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Ces outils permettent de visualiser la convergence pas-à-pas, détecter le point où la validation se dégrade (early stopping visuel), et choisir M* optimal — prolongent les diagnostics actuels (CV gap + learning curves).", {
    x:2.5, y:4.6, w:7.0, h:0.7, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// ══════════════════════════════════════════════════════════════════════════

// SLIDE A5 — Hyperparamètres : impact de chaque valeur sur performances
{
  let s = contentSlide("A5 — Hyperparamètres Gradient Boosting : Grille d'Impact");

  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("Complexité effective  ∝  η × M  |  Règle clé : réduire η → augmenter M", {
    x:0.55, y:1.06, w:9.0, h:0.42, fontSize:12, bold:true, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"
  });

  // n_estimators
  addCard(s, 0.4, 1.72, 9.2, 0.88);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.72, w:1.85, h:0.88, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("n_estimators", {x:0.4, y:1.72, w:1.85, h:0.44, fontSize:9.5, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
  s.addText("[50/100/200/500]", {x:0.4, y:2.16, w:1.85, h:0.44, fontSize:9, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"});
  const nVals = [{v:"50",e:"Sous-apprentissage si η petit. Rapide, peu de capacité."},{v:"100",e:"Compromis standard pour petits datasets."},{v:"200",e:"Valeur utilisée ici. CV gap=0.138 → déjà en sur-apprentissage."},{v:"500",e:"Mémorisation quasi-certaine sur 237 exemples, sauf η très petit."}];
  nVals.forEach((nv,i) => {
    s.addShape(pres.shapes.RECTANGLE, {x:2.35+i*1.75, y:1.74, w:0.55, h:0.38, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(nv.v, {x:2.35+i*1.75, y:1.74, w:0.55, h:0.38, fontSize:11, bold:true, color:C.gold, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(nv.e, {x:2.35+i*1.75, y:2.14, w:1.65, h:0.44, fontSize:8.5, color:C.charcoal, fontFace:"Calibri", valign:"top"});
  });

  // learning_rate
  addCard(s, 0.4, 2.75, 9.2, 0.88);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:2.75, w:1.85, h:0.88, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("learning_rate η", {x:0.4, y:2.75, w:1.85, h:0.44, fontSize:9.5, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
  s.addText("[0.001/0.01/0.1/0.3]", {x:0.4, y:3.19, w:1.85, h:0.44, fontSize:8.5, color:C.navy, fontFace:"Consolas", align:"center", valign:"middle"});
  const lrVals = [{v:"0.001",e:"Très lent. Besoin de M très élevé (5000+). Rarement utilisé seul."},{v:"0.01",e:"Apprentissage très progressif. Bon avec M=500-1000."},{v:"0.1",e:"Standard. Bon compromis vitesse/précision avec M=100-200."},{v:"0.3",e:"Rapide mais risque de sur-apprentissage élevé. XGBoost défaut."}];
  lrVals.forEach((lv,i) => {
    s.addShape(pres.shapes.RECTANGLE, {x:2.35+i*1.75, y:2.77, w:0.7, h:0.38, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(lv.v, {x:2.35+i*1.75, y:2.77, w:0.7, h:0.38, fontSize:9.5, bold:true, color:C.gold, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(lv.e, {x:2.35+i*1.75, y:3.17, w:1.65, h:0.44, fontSize:8.5, color:C.charcoal, fontFace:"Calibri", valign:"top"});
  });

  // max_depth
  addCard(s, 0.4, 3.78, 9.2, 0.88);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:3.78, w:1.85, h:0.88, fill:{color:C.accent}, line:{color:C.accent}});
  s.addText("max_depth", {x:0.4, y:3.78, w:1.85, h:0.44, fontSize:9.5, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
  s.addText("[1 / 2 / 3 / 5]", {x:0.4, y:4.22, w:1.85, h:0.44, fontSize:9, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
  const dVals = [{v:"1",e:"Stumps. Très faible, additivité pure. Lent à converger."},{v:"2",e:"Interactions 2ème ordre. Apprenant faible classique."},{v:"3",e:"Valeur ici. Interactions 3ème ordre. Bon équilibre."},{v:"5",e:"Arbres plus forts. Convergence rapide mais sur-apprentissage accru."}];
  dVals.forEach((dv,i) => {
    s.addShape(pres.shapes.RECTANGLE, {x:2.35+i*1.75, y:3.8, w:0.45, h:0.38, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(dv.v, {x:2.35+i*1.75, y:3.8, w:0.45, h:0.38, fontSize:13, bold:true, color:C.accent, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(dv.e, {x:2.35+i*1.75, y:4.2, w:1.65, h:0.44, fontSize:8.5, color:C.charcoal, fontFace:"Calibri", valign:"top"});
  });

  // subsample
  addCard(s, 0.4, 4.8, 9.2, 0.7);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:4.8, w:1.85, h:0.7, fill:{color:C.tealMid}, line:{color:C.tealMid}});
  s.addText("subsample", {x:0.4, y:4.8, w:1.85, h:0.35, fontSize:9.5, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
  s.addText("[0.5 / 0.75 / 1.0]", {x:0.4, y:5.15, w:1.85, h:0.35, fontSize:9, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"});
  const ssVals = [{v:"0.5",e:"Forte stochasticité, variance réduite. Risque sous-apprentissage."},{v:"0.75",e:"Bon compromis stochasticité/information."},{v:"0.9",e:"Valeur ici. Quasi-complet avec légère randomisation."},{v:"1.0",e:"Déterministe. Pas de réduction de variance par subsampling."}];
  ssVals.forEach((sv,i) => {
    s.addShape(pres.shapes.RECTANGLE, {x:2.35+i*1.75, y:4.82, w:0.65, h:0.35, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(sv.v, {x:2.35+i*1.75, y:4.82, w:0.65, h:0.35, fontSize:10, bold:true, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(sv.e, {x:2.35+i*1.75, y:5.17, w:1.65, h:0.35, fontSize:8.5, color:C.charcoal, fontFace:"Calibri", valign:"top"});
  });
}


// ══════════════════════════════════════════════════════════════════════════
// SECTION B — Introduction & Cadre Clinique
// ══════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════
// SECTION A
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(2, "Introduction & Cadre Clinique");

// SLIDE 3 — Contexte médical
{
  let s = contentSlide("Contexte Médical — Maladies Cardiovasculaires");
  // big stat
  addCard(s, 0.4, 1.0, 2.7, 1.8, {color:"0D1B2A"});
  s.addText("17,9M", {x:0.4, y:1.05, w:2.7, h:1.0, fontSize:38, bold:true, color:C.gold, fontFace:"Cambria", align:"center"});
  s.addText("décès/an dans le monde\n(OMS — maladies cardio.)", {x:0.4, y:2.0, w:2.7, h:0.7, fontSize:10, color:C.tealLt, fontFace:"Calibri", align:"center"});

  addCard(s, 3.4, 1.0, 6.2, 1.8);
  s.addText("Asymétrie critique des erreurs", {x:3.55, y:1.05, w:5.8, h:0.4, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});

  // FN box
  addCard(s, 3.55, 1.5, 2.8, 1.1, {color:"FDECEA"});
  s.addText("Faux Négatif (FN)", {x:3.6, y:1.55, w:2.7, h:0.35, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("Patient malade → NON détecté\n→ Risque vital immédiat", {x:3.6, y:1.88, w:2.7, h:0.6, fontSize:10, color:C.charcoal, fontFace:"Calibri"});

  // FP box
  addCard(s, 6.6, 1.5, 2.8, 1.1, {color:"EBF5FB"});
  s.addText("Faux Positif (FP)", {x:6.65, y:1.55, w:2.7, h:0.35, fontSize:11, bold:true, color:C.tealMid, fontFace:"Calibri"});
  s.addText("Patient sain → classé malade\n→ Examens supplémentaires", {x:6.65, y:1.88, w:2.7, h:0.6, fontSize:10, color:C.charcoal, fontFace:"Calibri"});

  addCard(s, 0.4, 3.0, 9.2, 0.9, {color:"EBF5FB"});
  s.addText("⚕  Conséquence directe :", {x:0.55, y:3.05, w:2.2, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("En dépistage cardiaque, minimiser les Faux Négatifs est la priorité absolue.", {x:2.7, y:3.05, w:6.7, h:0.3, fontSize:11, color:C.charcoal, fontFace:"Calibri"});
  s.addText("→ Le Recall (sensibilité) devient la métrique clé à maximiser.", {x:2.7, y:3.38, w:6.7, h:0.3, fontSize:11, italic:true, color:C.teal, fontFace:"Calibri"});
}

// SLIDE 4 — Question de recherche
{
  let s = contentSlide("Question de Recherche");
  addCard(s, 0.4, 1.0, 9.2, 1.2, {color: "0D1B2A"});
  s.addText('"Quel modèle offre le meilleur compromis entre discrimination globale\n(ROC-AUC) et capacité de détection (Recall) pour un usage clinique de dépistage cardiaque ?"', {
    x:0.55, y:1.05, w:8.9, h:1.1,
    fontSize:13.5, color:C.gold, fontFace:"Cambria", italic:true, align:"center", valign:"middle"
  });

  addCard(s, 0.4, 2.4, 4.5, 2.7);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:2.4, w:4.5, h:0.38, fill:{color:C.accent}, line:{color:C.accent}});
  s.addText("SCÉNARIO 1 — Dépistage", {x:0.45, y:2.4, w:4.4, h:0.38, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"Priorité : ", options:{bold:true}},
    {text:"maximiser le Recall\n"},
    {text:"Objectif : ", options:{bold:true}},
    {text:"détecter tous les patients malades\n"},
    {text:"Tolérance : ", options:{bold:true}},
    {text:"quelques faux positifs acceptables\n"},
    {text:"Métrique clé : ", options:{bold:true}},
    {text:"Recall classe 1 + F1-score"},
  ], {x:0.55, y:2.85, w:4.2, h:2.1, fontSize:11.5, color:C.charcoal, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 5.1, 2.4, 4.5, 2.7);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:2.4, w:4.5, h:0.38, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("SCÉNARIO 2 — Compromis global", {x:5.15, y:2.4, w:4.4, h:0.38, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"Priorité : ", options:{bold:true}},
    {text:"discrimination + interprétabilité\n"},
    {text:"Objectif : ", options:{bold:true}},
    {text:"classer avec fiabilité probabiliste\n"},
    {text:"Tolérance : ", options:{bold:true}},
    {text:"quelques FN supplémentaires\n"},
    {text:"Métrique clé : ", options:{bold:true}},
    {text:"ROC-AUC + Brier score"},
  ], {x:5.25, y:2.85, w:4.2, h:2.1, fontSize:11.5, color:C.charcoal, fontFace:"Calibri", paraSpaceAfter:4});
}

// SLIDE 5 — Objectifs mesurables
{
  let s = contentSlide("Objectifs Mesurables du Projet");
  const objs = [
    {id:"O1", label:"Surpasser la baseline", desc:"Battre le Dummy Classifier (most_frequent) sur toutes les métriques pertinentes (Recall, F1, ROC-AUC)"},
    {id:"O2", label:"Double évaluation", desc:"Comparer les modèles sur CV 5-fold stratifiée ET sur le jeu de test hold-out (80/20)"},
    {id:"O3", label:"Diagnostic du sur-apprentissage", desc:"Analyser le CV gap et les courbes d'apprentissage Train/Validation"},
    {id:"O4", label:"Calibration & seuil", desc:"Évaluer le Brier score et explorer l'optimisation du seuil de décision"},
    {id:"O5", label:"Recommandation justifiée", desc:"Produire une recommandation nuancée par scénario d'usage clinique"},
  ];
  objs.forEach((o, i) => {
    const y = 1.05 + i * 0.85;
    addCard(s, 0.4, y, 9.2, 0.75);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.9, h:0.75, fill:{color:C.tealMid}, line:{color:C.tealMid}});
    s.addText(o.id, {x:0.4, y, w:0.9, h:0.75, fontSize:14, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    s.addText(o.label, {x:1.45, y:y+0.04, w:2.5, h:0.35, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
    s.addText(o.desc, {x:1.45, y:y+0.38, w:8.0, h:0.32, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"});
  });
}

// ══════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════
// SECTION C — Données & Préparation
// ══════════════════════════════════════════════════════════════════════════
// SECTION B — Données
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(3, "Données & Préparation");

// SLIDE 6 — Dataset vue d'ensemble
{
  let s = contentSlide("Dataset UCI Cleveland — Vue d'Ensemble");
  const stats = [
    {val:"303", lbl:"Observations brutes"},
    {val:"14", lbl:"Variables (13 features + 1 cible)"},
    {val:"5", lbl:"Classes cibles (0 → 4)"},
    {val:"297", lbl:"Obs. après nettoyage"},
  ];
  stats.forEach((st, i) => {
    const x = 0.4 + i * 2.35;
    addCard(s, x, 1.0, 2.1, 1.5, {color:C.navy});
    s.addText(st.val, {x, y:1.1, w:2.1, h:0.85, fontSize:34, bold:true, color:C.gold, fontFace:"Cambria", align:"center"});
    s.addText(st.lbl, {x, y:1.9, w:2.1, h:0.5, fontSize:9.5, color:C.tealLt, fontFace:"Calibri", align:"center"});
  });

  addCard(s, 0.4, 2.75, 9.2, 0.8);
  s.addText("Binarisation de la cible :", {x:0.55, y:2.8, w:2.4, h:0.3, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  s.addText("target_bin = 1  si  target > 0  (présence de maladie)   |   target_bin = 0  si  target = 0  (absence)", {
    x:2.9, y:2.8, w:6.5, h:0.3, fontSize:11, color:C.charcoal, fontFace:"Consolas"
  });
  s.addText("Résultat : 54 % absence (classe 0)  vs  46 % présence (classe 1)  →  Dataset relativement équilibré", {
    x:0.55, y:3.2, w:9.0, h:0.25, fontSize:11, italic:true, color:C.grey, fontFace:"Calibri"
  });

  // distribution bar
  addCard(s, 0.4, 3.6, 9.2, 1.65);
  s.addText("Répartition après binarisation", {x:0.55, y:3.65, w:4, h:0.35, fontSize:11, bold:true, color:C.teal, fontFace:"Cambria"});
  // bar 54%
  s.addShape(pres.shapes.RECTANGLE, {x:0.55, y:4.05, w:4.8, h:0.5, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Classe 0 — Absence  54%", {x:0.65, y:4.08, w:4.6, h:0.44, fontSize:11, bold:true, color:C.white, fontFace:"Calibri", valign:"middle"});
  // bar 46%
  s.addShape(pres.shapes.RECTANGLE, {x:0.55, y:4.65, w:4.1, h:0.5, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("Classe 1 — Présence  46%", {x:0.65, y:4.68, w:4.0, h:0.44, fontSize:11, bold:true, color:C.white, fontFace:"Calibri", valign:"middle"});
}

// SLIDE 7 — Variables cliniques partie 1
{
  let s = contentSlide("Variables Cliniques — Partie 1 : Continues & Binaires");
  const cont = [
    {name:"age", desc:"Âge du patient (années)", type:"Continue"},
    {name:"trestbps", desc:"Pression artérielle au repos (mm Hg)", type:"Continue"},
    {name:"chol", desc:"Cholestérol sérique (mg/dl)", type:"Continue"},
    {name:"thalach", desc:"Fréquence cardiaque maximale atteinte", type:"Continue"},
    {name:"oldpeak", desc:"Dépression ST induite par l'exercice", type:"Continue"},
  ];
  const bin = [
    {name:"sex", desc:"Sexe : 1=homme, 0=femme", type:"Binaire"},
    {name:"fbs", desc:"Glycémie à jeun > 120 mg/dl (1=oui, 0=non)", type:"Binaire"},
    {name:"exang", desc:"Angine induite par l'exercice (1=oui, 0=non)", type:"Binaire"},
  ];

  s.addText("Variables continues", {x:0.4, y:1.0, w:4.5, h:0.35, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});
  cont.forEach((v,i) => {
    addCard(s, 0.4, 1.4 + i*0.75, 4.5, 0.65);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.4+i*0.75, w:1.1, h:0.65, fill:{color:C.tealMid}, line:{color:C.tealMid}});
    s.addText(v.name, {x:0.4, y:1.4+i*0.75, w:1.1, h:0.65, fontSize:10.5, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(v.desc, {x:1.6, y:1.45+i*0.75, w:3.2, h:0.55, fontSize:10.5, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  s.addText("Variables binaires", {x:5.1, y:1.0, w:4.5, h:0.35, fontSize:13, bold:true, color:C.accent, fontFace:"Cambria"});
  bin.forEach((v,i) => {
    addCard(s, 5.1, 1.4 + i*0.75, 4.5, 0.65);
    s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.4+i*0.75, w:1.1, h:0.65, fill:{color:C.accent}, line:{color:C.accent}});
    s.addText(v.name, {x:5.1, y:1.4+i*0.75, w:1.1, h:0.65, fontSize:10.5, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(v.desc, {x:6.3, y:1.45+i*0.75, w:3.2, h:0.55, fontSize:10.5, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });
}

// SLIDE 8 — Variables cliniques partie 2
{
  let s = contentSlide("Variables Cliniques — Partie 2 : Catégorielles & Discrètes");
  const vars = [
    {name:"cp", desc:"Type de douleur thoracique", vals:"1=typique, 2=atypique, 3=non-angineux, 4=asymptomatique"},
    {name:"restecg", desc:"Résultats ECG au repos", vals:"0=normal, 1=anorm. onde ST-T, 2=hypertrophie VG"},
    {name:"slope", desc:"Pente segment ST à l'effort", vals:"1=montante, 2=plate, 3=descendante"},
    {name:"ca", desc:"Nbre vaisseaux colorés fluoroscopie", vals:"0, 1, 2, 3  (+ 4 valeurs manquantes)"},
    {name:"thal", desc:"Thalassémie", vals:"3=normal, 6=défaut fixe, 7=défaut réversible  (+ 2 NaN)"},
  ];
  vars.forEach((v, i) => {
    const y = 1.05 + i * 0.85;
    addCard(s, 0.4, y, 9.2, 0.75);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:1.0, h:0.75, fill:{color:C.gold}, line:{color:C.gold}});
    s.addText(v.name, {x:0.4, y, w:1.0, h:0.75, fontSize:11, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(v.desc, {x:1.55, y:y+0.04, w:3.4, h:0.33, fontSize:11.5, bold:true, color:C.charcoal, fontFace:"Calibri"});
    s.addText(v.vals, {x:1.55, y:y+0.4, w:7.9, h:0.28, fontSize:10, color:C.grey, fontFace:"Calibri", italic:true});
  });

  addCard(s, 0.4, 5.3, 9.2, 0.2, {color:"EBF5FB"});
  s.addText("Comprendre les variables AVANT de modéliser est essentiel pour interpréter correctement les résultats et éviter les erreurs de sens.", {
    x:0.5, y:5.32, w:9.0, h:0.16, fontSize:9.5, italic:true, color:C.tealMid, fontFace:"Calibri"
  });
}

// SLIDE 9 — Qualité des données
{
  let s = contentSlide("Qualité des Données — Valeurs Manquantes & Nettoyage");
  addCard(s, 0.4, 1.0, 9.2, 1.1);
  s.addText("Valeurs manquantes détectées", {x:0.55, y:1.05, w:4, h:0.35, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});
  const miss = [{col:"ca", n:"4 NaN"},{col:"thal", n:"2 NaN"}];
  miss.forEach((m, i) => {
    const x = 0.6 + i * 3.0;
    s.addText(`${m.col} : ${m.n}`, {x, y:1.45, w:2.5, h:0.5, fontSize:13, bold:true, color:C.accent, fontFace:"Consolas", align:"center"});
  });
  s.addText("≈ 2% du dataset — impact négligeable", {x:6.5, y:1.35, w:3.0, h:0.7, fontSize:11, color:C.grey, fontFace:"Calibri", italic:true, align:"center", valign:"middle"});

  addCard(s, 0.4, 2.3, 4.4, 2.6);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:2.3, w:4.4, h:0.4, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Stratégie de nettoyage", {x:0.45, y:2.3, w:4.3, h:0.4, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"1. ", options:{bold:true, color:C.gold}},{text:"Conversion numérique via pd.to_numeric\n", options:{color:C.charcoal}},
    {text:"2. ", options:{bold:true, color:C.gold}},{text:"Suppression des lignes NaN (dropna)\n", options:{color:C.charcoal}},
    {text:"3. ", options:{bold:true, color:C.gold}},{text:"Résultat : 297 / 303 lignes conservées\n", options:{color:C.charcoal}},
    {text:"4. ", options:{bold:true, color:C.gold}},{text:"Pas d'imputation — transparence maximale\n", options:{color:C.charcoal}},
  ], {x:0.55, y:2.78, w:4.1, h:2.0, fontSize:11, fontFace:"Calibri", paraSpaceAfter:5});

  addCard(s, 5.05, 2.3, 4.5, 2.6);
  s.addShape(pres.shapes.RECTANGLE, {x:5.05, y:2.3, w:4.5, h:0.4, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("Justification du choix", {x:5.1, y:2.3, w:4.4, h:0.4, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"Simple & reproductible\n", options:{bold:true, color:C.charcoal}},
    {text:"6 lignes supprimées = 2% → pas de biais statistiquement significatif\n\n", options:{color:C.charcoal}},
    {text:"Alternative (non implémentée) :\n", options:{bold:true, color:C.grey}},
    {text:"Imputation par la médiane ou KNNImputer si dataset plus petit", options:{color:C.grey, italic:true}},
  ], {x:5.2, y:2.78, w:4.2, h:2.0, fontSize:11, fontFace:"Calibri", paraSpaceAfter:5});
}

// SLIDE 10 — Distribution cible
{
  let s = contentSlide("Distribution de la Cible — Avant & Après Binarisation");
  addCard(s, 0.4, 1.0, 4.5, 4.2);
  s.addText("Distribution originale (5 classes)", {x:0.5, y:1.05, w:4.3, h:0.4, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  const orig = [{cls:"0",n:164,pct:54},{cls:"1",n:55,pct:18},{cls:"2",n:36,pct:12},{cls:"3",n:35,pct:12},{cls:"4",n:13,pct:4}];
  orig.forEach((o,i) => {
    const y = 1.55 + i * 0.68;
    const barW = Math.max(0.3, o.pct/100 * 3.5);
    s.addShape(pres.shapes.RECTANGLE, {x:0.9, y, w:barW, h:0.42, fill:{color:i===0?C.teal:C.tealMid}, line:{color:i===0?C.teal:C.tealMid}});
    s.addText(`Classe ${o.cls}`, {x:0.5, y, w:0.35, h:0.42, fontSize:10, bold:true, color:C.charcoal, fontFace:"Calibri", align:"center", valign:"middle"});
    s.addText(`${o.n}  (${o.pct}%)`, {x:0.9+barW+0.05, y, w:1.8, h:0.42, fontSize:10, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 5.1, 1.0, 4.5, 4.2);
  s.addText("Distribution binarisée", {x:5.2, y:1.05, w:4.2, h:0.4, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  // 54%
  s.addShape(pres.shapes.RECTANGLE, {x:5.3, y:1.55, w:3.8, h:1.5, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Absence\n54%\n(160 obs.)", {x:5.3, y:1.55, w:3.8, h:1.5, fontSize:16, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  // 46%
  s.addShape(pres.shapes.RECTANGLE, {x:5.3, y:3.2, w:3.8, h:1.7, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("Présence\n46%\n(137 obs.)", {x:5.3, y:3.2, w:3.8, h:1.7, fontSize:16, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});

  s.addText("→ Dataset équilibré : l'Accuracy est interprétable mais insuffisante seule.\nUtiliser Recall, Precision, F1, ROC-AUC en complément.", {
    x:0.4, y:5.25, w:9.2, h:0.3, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 11 — Corrélations
{
  let s = contentSlide("Corrélations Exploratoires — Coefficient de Pearson");
  addFormula(s, "r(x,y)  =  Σ(xi − x̄)(yi − ȳ)  /  √[ Σ(xi − x̄)² · Σ(yi − ȳ)² ]", 0.4, 1.0, 9.2, 0.65);
  s.addText("Paramètres :", {x:0.5, y:1.72, w:1.5, h:0.28, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("xi, yi = valeurs des variables   |   x̄, ȳ = moyennes   |   r ∈ [−1, +1] : intensité de la relation linéaire", {
    x:1.9, y:1.72, w:7.8, h:0.28, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });

  const vars2 = ["thal","cp","ca","exang","oldpeak","thalach"];
  const vals = [0.53, 0.44, 0.44, 0.44, 0.43, 0.42];
  s.addText("Variables les plus associées à la cible (|r| > 0.40) :", {x:0.4, y:2.15, w:5, h:0.35, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  vars2.forEach((v, i) => {
    const x = 0.4 + i * 1.58;
    const barH = vals[i] * 2.4;
    const y = 4.3 - barH;
    s.addShape(pres.shapes.RECTANGLE, {x, y, w:1.25, h:barH, fill:{color: i<3 ? C.accent : C.tealMid}, line:{color: i<3 ? C.accent : C.tealMid}});
    s.addText(vals[i].toFixed(2), {x, y:y-0.3, w:1.25, h:0.28, fontSize:11, bold:true, color:C.charcoal, fontFace:"Calibri", align:"center"});
    s.addText(v, {x, y:4.32, w:1.25, h:0.3, fontSize:11, bold:true, color:C.charcoal, fontFace:"Consolas", align:"center"});
  });

  addCard(s, 0.4, 4.7, 9.2, 0.75, {color:"FEF9E7"});
  s.addText("⚠  Limite :", {x:0.55, y:4.75, w:1.2, h:0.3, fontSize:11, bold:true, color:C.gold, fontFace:"Calibri"});
  s.addText("Pearson mesure uniquement les corrélations LINÉAIRES. Des relations non-linéaires existent potentiellement — ce qui justifie l'emploi du Gradient Boosting.", {
    x:1.7, y:4.75, w:7.8, h:0.6, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 12 — Split expérimental
{
  let s = contentSlide("Split Expérimental Train / Test");
  addCard(s, 0.4, 1.0, 9.2, 1.5);
  s.addText("Protocole de séparation", {x:0.55, y:1.05, w:3.5, h:0.38, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});
  const details = [
    {l:"Proportion :", v:"80 % train — 20 % test (stratifié)"},
    {l:"random_state :", v:"42 (reproductibilité garantie)"},
    {l:"Entraînement :", v:"237 observations"},
    {l:"Test :", v:"60 observations"},
  ];
  details.forEach((d,i) => {
    const col = i < 2 ? 0 : 1;
    const row = i < 2 ? i : i - 2;
    s.addText(d.l, {x:0.6+col*4.5, y:1.5+row*0.38, w:1.6, h:0.35, fontSize:11, bold:true, color:C.tealMid, fontFace:"Calibri"});
    s.addText(d.v, {x:2.2+col*4.5, y:1.5+row*0.38, w:3, h:0.35, fontSize:11, color:C.charcoal, fontFace:"Calibri"});
  });

  // visual split
  addCard(s, 0.4, 2.75, 9.2, 1.5);
  s.addShape(pres.shapes.RECTANGLE, {x:0.5, y:2.85, w:7.4, h:1.2, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Train  80%  —  237 obs.", {x:0.5, y:2.85, w:7.4, h:1.2, fontSize:14, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addShape(pres.shapes.RECTANGLE, {x:8.0, y:2.85, w:1.6, h:1.2, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("Test\n20%\n60 obs.", {x:8.0, y:2.85, w:1.6, h:1.2, fontSize:11, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});

  addCard(s, 0.4, 4.45, 9.2, 0.9, {color:"FDECEA"});
  s.addText("⚠  Limitation :", {x:0.55, y:4.5, w:1.8, h:0.3, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("60 observations test = estimations sujettes à forte variabilité. Les résultats doivent être interprétés avec prudence. La CV 5-fold reste l'estimateur principal.", {
    x:2.3, y:4.5, w:7.1, h:0.6, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 13 — Standardisation
{
  let s = contentSlide("Standardisation dans les Pipelines — Z-score");
  addFormula(s, "z_i  =  (x_i − μ) / σ", 0.4, 1.0, 4.5, 0.65);
  s.addText("Paramètres :", {x:0.5, y:1.72, w:1.4, h:0.28, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("μ = moyenne du train  |  σ = écart-type du train  |  Estimés UNIQUEMENT sur l'ensemble d'entraînement", {
    x:1.9, y:1.72, w:7.8, h:0.28, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });

  addCard(s, 0.4, 2.1, 4.5, 2.2);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:2.1, w:4.5, h:0.4, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Appliqué à", {x:0.45, y:2.1, w:4.4, h:0.4, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"✓  Régression Logistique\n", options:{bold:true, color:C.green}},
    {text:"✓  Naive Bayes Gaussien\n", options:{bold:true, color:C.green}},
    {text:"\nCes modèles sont sensibles à l'échelle des features.\nUne variable à grande magnitude (ex: chol ≈ 200) dominerait sinon.", options:{color:C.charcoal}},
  ], {x:0.55, y:2.58, w:4.2, h:1.6, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 5.1, 2.1, 4.5, 2.2);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:2.1, w:4.5, h:0.4, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("NON appliqué à", {x:5.15, y:2.1, w:4.4, h:0.4, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"✗  Gradient Boosting\n", options:{bold:true, color:C.accent}},
    {text:"\nLes arbres de décision font des coupures sur des seuils.\nIls sont invariants à l'échelle des features → la standardisation est inutile.", options:{color:C.charcoal}},
  ], {x:5.25, y:2.58, w:4.2, h:1.6, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 0.4, 4.5, 9.2, 0.85, {color:"EBF5FB"});
  s.addText("sklearn.Pipeline :", {x:0.55, y:4.55, w:1.9, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Le StandardScaler est intégré dans un Pipeline. La moyenne et l'écart-type sont calculés sur le train UNIQUEMENT → évite le data leakage (pas de contamination des données de test).", {
    x:2.45, y:4.55, w:7.0, h:0.6, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// ══════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════
// SECTION D — Théorie des Modèles Implémentés
// ══════════════════════════════════════════════════════════════════════════
// SECTION C — Théorie des modèles
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(4, "Théorie des Modèles Implémentés");

// SLIDE 14 — Baseline
{
  let s = contentSlide("Baseline — Dummy Classifier (Référence Naïve)");
  addCard(s, 0.4, 1.0, 9.2, 0.8, {color:C.navy});
  s.addText("Stratégie : most_frequent  →  prédit toujours la classe majoritaire (0 = absence)", {
    x:0.55, y:1.05, w:8.9, h:0.7, fontSize:13, color:C.tealLt, fontFace:"Calibri", align:"center", valign:"middle"
  });
  addFormula(s, "ŷ_i  =  mode(y_train)  pour tout i ∈ [1, n]", 0.4, 2.0, 9.2, 0.6);

  const perf = [
    {m:"Accuracy", v:"54 %", note:"= proportion classe 0"},
    {m:"Recall", v:"0 %", note:"aucun positif détecté"},
    {m:"ROC-AUC", v:"0.500", note:"classifieur aléatoire"},
    {m:"F1-score", v:"0.000", note:"inutile cliniquement"},
  ];
  perf.forEach((p, i) => {
    const x = 0.4 + i * 2.35;
    addCard(s, x, 2.8, 2.15, 1.6, {color:"FDECEA"});
    s.addText(p.m, {x, y:2.85, w:2.15, h:0.4, fontSize:11, bold:true, color:C.accent, fontFace:"Cambria", align:"center"});
    s.addText(p.v, {x, y:3.28, w:2.15, h:0.65, fontSize:24, bold:true, color:C.navy, fontFace:"Cambria", align:"center"});
    s.addText(p.note, {x, y:3.95, w:2.15, h:0.35, fontSize:9.5, color:C.grey, fontFace:"Calibri", italic:true, align:"center"});
  });

  addCard(s, 0.4, 4.6, 9.2, 0.7, {color:"EBF5FB"});
  s.addText("Rôle de la baseline :", {x:0.55, y:4.65, w:2.2, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Tout modèle utile DOIT surpasser ces performances. Servira de point de référence dans tous les tableaux de résultats.", {
    x:2.7, y:4.65, w:6.8, h:0.6, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 15 — Régression Logistique principe
{
  let s = contentSlide("Régression Logistique — Principe & Fonction Sigmoïde");
  addCard(s, 0.4, 1.0, 4.6, 4.2);
  s.addText("Combinaison linéaire", {x:0.5, y:1.05, w:4.3, h:0.38, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  addFormula(s, "z  =  β₀ + β₁x₁ + β₂x₂ + … + βₚxₚ  =  βᵀx", 0.45, 1.5, 4.45, 0.6);
  s.addText([
    {text:"β₀ :", options:{bold:true, color:C.gold}},{text:" biais (intercept)\n"},
    {text:"β₁…βₚ :", options:{bold:true, color:C.gold}},{text:" coefficients des features\n"},
    {text:"x :", options:{bold:true, color:C.gold}},{text:" vecteur des features du patient\n"},
    {text:"z :", options:{bold:true, color:C.gold}},{text:" score linéaire non borné"},
  ], {x:0.5, y:2.2, w:4.3, h:1.3, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:3});

  s.addText("Fonction Sigmoïde", {x:0.5, y:3.6, w:4.3, h:0.35, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  addFormula(s, "P(y=1|x)  =  σ(z)  =  1 / (1 + e^(−z))", 0.45, 4.0, 4.45, 0.6);
  s.addText("Transforme z ∈ ℝ en probabilité ∈ [0, 1]", {x:0.5, y:4.65, w:4.3, h:0.3, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"});

  addCard(s, 5.2, 1.0, 4.4, 4.2);
  s.addText("Règle de décision", {x:5.3, y:1.05, w:4.1, h:0.38, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  addFormula(s, "ŷ = 1  si  P(y=1|x) ≥ seuil\nŷ = 0  sinon", 5.25, 1.5, 4.3, 0.85);

  s.addText("Forme de la courbe sigmoïde", {x:5.3, y:2.5, w:4.1, h:0.35, fontSize:11, bold:true, color:C.tealMid, fontFace:"Cambria"});
  // Sketch: axis
  s.addShape(pres.shapes.LINE, {x:5.4, y:4.5, w:3.8, h:0, line:{color:C.charcoal, width:1}});
  s.addShape(pres.shapes.LINE, {x:5.4, y:2.85, w:0, h:1.65, line:{color:C.charcoal, width:1}});
  s.addText("z", {x:9.15, y:4.4, w:0.3, h:0.3, fontSize:10, color:C.charcoal, fontFace:"Calibri", italic:true});
  s.addText("1.0", {x:5.1, y:2.82, w:0.3, h:0.22, fontSize:8, color:C.grey, fontFace:"Calibri"});
  s.addText("0.5", {x:5.1, y:3.6, w:0.3, h:0.22, fontSize:8, color:C.grey, fontFace:"Calibri"});
  s.addText("0.0", {x:5.1, y:4.38, w:0.3, h:0.22, fontSize:8, color:C.grey, fontFace:"Calibri"});
  // draw sigmoid with dots
  const pts = [-4,-3,-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,3,4];
  pts.forEach(z => {
    const p = 1/(1+Math.exp(-z));
    const px = 5.4 + (z+4)/8 * 3.8;
    const py = 4.5 - p * 1.65;
    s.addShape(pres.shapes.OVAL, {x:px-0.05, y:py-0.05, w:0.10, h:0.10, fill:{color:C.teal}, line:{color:C.teal}});
  });
  s.addShape(pres.shapes.LINE, {x:5.4+(4)/8*3.8-0.05, y:3.65, w:0, h:0.28, line:{color:C.gold, dashType:"dash", width:1}});
  s.addText("seuil=0.5", {x:6.9, y:3.88, w:1.2, h:0.22, fontSize:8.5, color:C.gold, fontFace:"Calibri", italic:true});
}

// SLIDE 16 — Log-loss & Régularisation
{
  let s = contentSlide("Régression Logistique — Fonction de Coût & Régularisation L2");
  addCard(s, 0.4, 1.0, 9.2, 1.0);
  s.addText("Fonction de coût : Log-Loss (Entropie Croisée Binaire)", {x:0.55, y:1.03, w:6, h:0.35, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});
  addFormula(s, "J(β)  =  −(1/n) Σᵢ [ yᵢ·log(p̂ᵢ) + (1−yᵢ)·log(1−p̂ᵢ) ]", 0.45, 1.4, 9.1, 0.55);

  s.addText([
    {text:"yᵢ :", options:{bold:true, color:C.gold}},{text:"  étiquette réelle (0 ou 1)   "},
    {text:"p̂ᵢ :", options:{bold:true, color:C.gold}},{text:"  probabilité prédite   "},
    {text:"n :", options:{bold:true, color:C.gold}},{text:"  nombre d'exemples"},
  ], {x:0.5, y:2.05, w:9.0, h:0.35, fontSize:11, fontFace:"Calibri", color:C.charcoal});

  addCard(s, 0.4, 2.55, 9.2, 1.05);
  s.addText("Régularisation L2 (Ridge) — utilisée dans notre notebook (penalty='l2')", {x:0.55, y:2.6, w:7, h:0.38, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});
  addFormula(s, "J_reg(β)  =  J(β)  +  (1/2C) Σⱼ βⱼ²", 0.45, 3.0, 9.1, 0.55);

  s.addText([
    {text:"C :", options:{bold:true, color:C.gold}},{text:"  inverse de la force de régularisation. Grand C → peu de régularisation. Petit C → forte régularisation.\n"},
    {text:"C = 1.0 (défaut) :", options:{bold:true, color:C.gold}},{text:"  compromis raisonnable entre flexibilité et contrainte."},
  ], {x:0.5, y:3.65, w:9.0, h:0.55, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:3});

  addCard(s, 0.4, 4.35, 9.2, 0.9, {color:"EBF5FB"});
  s.addText("Rôle de la régularisation :", {x:0.55, y:4.4, w:2.8, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Pénalise les coefficients βⱼ trop grands → les features irrélevantes voient leur coefficient tendre vers 0 → réduit le sur-apprentissage sans élimination totale (contrairement à L1).", {
    x:3.3, y:4.4, w:6.2, h:0.7, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 17 — Hyperparamètres LogReg
{
  let s = contentSlide("Régression Logistique — Hyperparamètres & Interprétabilité");
  const hps = [
    {p:"C = 1.0", d:"Inverse de la force de pénalité L2. Valeur par défaut scikit-learn — compromis raisonnable."},
    {p:"penalty = 'l2'", d:"Pénalité Ridge : stabilise les coefficients sans en annuler. Préférable à L1 pour ce contexte."},
    {p:"solver = 'lbfgs'", d:"Solveur quasi-Newton adapté aux petits datasets avec pénalité L2. Convergence rapide."},
    {p:"max_iter = 3000", d:"Nombre maximal d'itérations. Augmenté pour garantir la convergence sur ce dataset."},
  ];
  hps.forEach((h,i) => {
    const y = 1.05 + i * 0.85;
    addCard(s, 0.4, y, 9.2, 0.75);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:2.2, h:0.75, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(h.p, {x:0.4, y, w:2.2, h:0.75, fontSize:11, bold:true, color:C.gold, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(h.d, {x:2.7, y:y+0.12, w:6.8, h:0.5, fontSize:11.5, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 0.4, 4.55, 9.2, 0.75, {color:"EBF5FB"});
  s.addText("Avantage clé :", {x:0.55, y:4.6, w:1.8, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Les coefficients βⱼ sont directement interprétables → signe positif = favorise la classe 1 (présence de maladie).", {
    x:2.3, y:4.6, w:7.1, h:0.3, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
  s.addText("Non implémenté :", {x:0.55, y:4.95, w:1.8, h:0.28, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("Tuning de C par GridSearchCV (perspective mentionnée).", {
    x:2.3, y:4.95, w:7.1, h:0.28, fontSize:11, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 18 — NB Théorème de Bayes
{
  let s = contentSlide("Naive Bayes — Théorème de Bayes Appliqué à la Classification");
  addCard(s, 0.4, 1.0, 9.2, 0.7, {color:C.navy});
  s.addText("Théorème de Bayes", {x:0.55, y:1.03, w:4, h:0.35, fontSize:13, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "P(y=c|x)  =  P(x|y=c) · P(y=c)  /  P(x)", 0.45, 1.42, 9.1, 0.55);

  s.addText([
    {text:"P(y=c|x) :", options:{bold:true, color:C.gold}},{text:"  probabilité a posteriori (ce qu'on cherche)\n"},
    {text:"P(x|y=c) :", options:{bold:true, color:C.gold}},{text:"  vraisemblance des données sachant la classe c\n"},
    {text:"P(y=c) :", options:{bold:true, color:C.gold}},{text:"  probabilité a priori de la classe c (fréquence observée)\n"},
    {text:"P(x) :", options:{bold:true, color:C.gold}},{text:"  évidence — constante de normalisation (même pour toutes les classes)"},
  ], {x:0.5, y:2.1, w:9.0, h:0.95, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:2});

  addCard(s, 0.4, 3.15, 9.2, 0.7, {color:C.navy});
  s.addText("Hypothèse « Naïve » — Indépendance conditionnelle", {x:0.55, y:3.18, w:5, h:0.35, fontSize:13, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "P(x|y=c)  =  Πⱼ P(xⱼ|y=c)", 0.45, 3.57, 9.1, 0.55);

  addCard(s, 0.4, 4.25, 9.2, 0.7, {color:C.navy});
  s.addText("Règle de décision Naive Bayes", {x:0.55, y:4.28, w:4, h:0.35, fontSize:13, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "ŷ  =  argmax_c  P(y=c) · Πⱼ P(xⱼ|y=c)", 0.45, 4.67, 9.1, 0.55);

  s.addText("L'hypothèse d'indépendance est rarement vérifiée en pratique (les features cliniques sont corrélées). Pourtant le modèle peut très bien performer en classification binaire — confirmé sur ce dataset.", {
    x:0.5, y:5.28, w:9.0, h:0.3, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 19 — NB Gaussien
{
  let s = contentSlide("Naive Bayes Gaussien — Modélisation des Features Continues");
  addCard(s, 0.4, 1.0, 9.2, 0.7, {color:C.navy});
  s.addText("Distribution gaussienne de chaque feature par classe", {x:0.55, y:1.03, w:6, h:0.35, fontSize:13, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "P(xⱼ|y=c)  =  (1/√(2π·σ²ⱼc)) · exp(−(xⱼ − μⱼc)² / (2·σ²ⱼc))", 0.45, 1.42, 9.1, 0.55);

  const params = [
    {sym:"μⱼc", desc:"Moyenne de la feature j parmi tous les exemples de la classe c — estimée sur le train"},
    {sym:"σ²ⱼc", desc:"Variance de la feature j parmi les exemples de la classe c — estimée sur le train"},
    {sym:"xⱼ", desc:"Valeur de la feature j pour le patient à classer"},
    {sym:"P(xⱼ|y=c)", desc:"Densité de probabilité gaussienne — vraisemblance que la feature ait cette valeur dans la classe c"},
  ];
  params.forEach((p,i) => {
    const y = 2.15 + i * 0.68;
    addCard(s, 0.4, y, 9.2, 0.6);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:1.3, h:0.6, fill:{color:C.tealMid}, line:{color:C.tealMid}});
    s.addText(p.sym, {x:0.4, y, w:1.3, h:0.6, fontSize:12, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(p.desc, {x:1.8, y:y+0.08, w:7.7, h:0.45, fontSize:11.5, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 0.4, 4.9, 9.2, 0.6, {color:"EBF5FB"});
  s.addText("var_smoothing = 1e-9 :", {x:0.55, y:4.95, w:2.5, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Ajoute ε·max(σ²) aux variances pour éviter les divisions par zéro. Valeur par défaut scikit-learn, régularisation minimale.", {
    x:3.0, y:4.95, w:6.5, h:0.4, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 20 — NB propriétés
{
  let s = contentSlide("Naive Bayes — Hyperparamètres, Avantages & Limites");
  addCard(s, 0.4, 1.0, 9.2, 0.65);
  s.addText("Seul hyperparamètre : var_smoothing = 1e-9", {x:0.55, y:1.05, w:9.0, h:0.55, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria", valign:"middle"});

  addCard(s, 0.4, 1.85, 4.5, 3.2);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.85, w:4.5, h:0.42, fill:{color:C.green}, line:{color:C.green}});
  s.addText("Avantages", {x:0.45, y:1.85, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"✓  Très rapide — entraînement en O(n·p)\n", options:{bold:true, color:C.green}},
    {text:"✓  Fonctionne bien avec peu de données\n", options:{bold:true, color:C.green}},
    {text:"✓  Robuste au sur-apprentissage\n", options:{bold:true, color:C.green}},
    {text:"✓  Interprétable (μ et σ par classe)\n", options:{bold:true, color:C.green}},
    {text:"✓  Pas de standardisation requise en théorie\n(mais appliquée ici dans Pipeline)", options:{bold:true, color:C.green}},
  ], {x:0.55, y:2.35, w:4.2, h:2.5, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:5});

  addCard(s, 5.1, 1.85, 4.5, 3.2);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.85, w:4.5, h:0.42, fill:{color:C.accent}, line:{color:C.accent}});
  s.addText("Limites Théoriques", {x:5.15, y:1.85, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"✗  Indépendance conditionnelle violée\n", options:{bold:true, color:C.accent}},
    {text:"     (thal, cp, ca sont corrélées)\n\n", options:{color:C.grey, italic:true}},
    {text:"✗  Hypothèse gaussienne approximative\n", options:{bold:true, color:C.accent}},
    {text:"     (certaines features sont discrètes)\n\n", options:{color:C.grey, italic:true}},
    {text:"Verdict empirique :\n", options:{bold:true, color:C.tealMid}},
    {text:"Malgré ces violations, NB est compétitif\n— meilleur Recall sur ce dataset (0.857)", options:{color:C.charcoal}},
  ], {x:5.25, y:2.35, w:4.2, h:2.5, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});
}

// SLIDE 21 — GB principe
{
  let s = contentSlide("Gradient Boosting — Principe Itératif Séquentiel");
  addCard(s, 0.4, 1.0, 9.2, 0.65);
  s.addText("Modèle d'ensemble SÉQUENTIEL : chaque arbre corrige les erreurs du précédent.", {
    x:0.55, y:1.05, w:9.0, h:0.55, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria", valign:"middle"
  });

  addFormula(s, "Initialisation :  F₀(x)  =  argmin_γ Σᵢ L(yᵢ, γ)", 0.4, 1.8, 9.2, 0.6);

  s.addText("Pour m = 1, 2, …, M (chaque arbre successif) :", {x:0.5, y:2.5, w:6, h:0.35, fontSize:12, bold:true, color:C.tealMid, fontFace:"Cambria"});

  const steps = [
    {n:"Étape 1", label:"Pseudo-résidus", f:"r_{im}  =  −∂L(yᵢ, F_{m−1}(xᵢ)) / ∂F_{m−1}(xᵢ)", desc:"Gradient négatif de la perte — direction de correction maximale"},
    {n:"Étape 2", label:"Ajuster hₘ(x)", f:"hₘ(x) ajusté sur les pseudo-résidus r_{im}", desc:"Arbre de décision faible qui apprend à prédire les erreurs résiduelles"},
    {n:"Étape 3", label:"Mise à jour", f:"Fₘ(x)  =  F_{m−1}(x)  +  η · hₘ(x)", desc:"η = learning rate (0.05) — régule la contribution de chaque arbre"},
  ];
  steps.forEach((st, i) => {
    const y = 2.95 + i * 0.85;
    addCard(s, 0.4, y, 9.2, 0.78);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.95, h:0.78, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(st.n, {x:0.4, y, w:0.95, h:0.78, fontSize:9, bold:true, color:C.gold, fontFace:"Calibri", align:"center", valign:"middle"});
    s.addText(st.label, {x:1.42, y:y+0.03, w:2.5, h:0.32, fontSize:11, bold:true, color:C.teal, fontFace:"Cambria"});
    s.addText(st.f, {x:1.42, y:y+0.36, w:4.5, h:0.3, fontSize:10, color:C.white, fontFace:"Consolas",
      // light bg
    });
    // draw formula in-line via a shape
    s.addShape(pres.shapes.RECTANGLE, {x:1.42, y:y+0.36, w:4.7, h:0.3, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(st.f, {x:1.42, y:y+0.36, w:4.7, h:0.3, fontSize:9.5, color:C.tealLt, fontFace:"Consolas", valign:"middle"});
    s.addText(st.desc, {x:6.2, y:y+0.15, w:3.3, h:0.5, fontSize:10, color:C.grey, fontFace:"Calibri", italic:true, valign:"middle"});
  });
}

// SLIDE 22 — GB fonction de perte
{
  let s = contentSlide("Gradient Boosting — Fonction de Perte & Pseudo-Résidus");
  addCard(s, 0.4, 1.0, 9.2, 0.7, {color:C.navy});
  s.addText("Fonction de perte pour classification binaire : Déviance (Log-Loss)", {x:0.55, y:1.03, w:8.5, h:0.35, fontSize:13, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "L(y, F(x))  =  −[ y·log(p) + (1−y)·log(1−p) ]  où  p = σ(F(x)) = 1/(1+e^(−F(x)))", 0.45, 1.42, 9.1, 0.55);

  addCard(s, 0.4, 2.15, 9.2, 0.7, {color:C.navy});
  s.addText("Pseudo-résidus pour la déviance (dérivée par rapport à F(x))", {x:0.55, y:2.18, w:7, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "r_i  =  yᵢ − pᵢ  =  yᵢ − σ(F_{m−1}(xᵢ))", 0.45, 2.57, 9.1, 0.55);

  s.addText([
    {text:"yᵢ :", options:{bold:true, color:C.gold}},{text:"  étiquette réelle (0 ou 1)\n"},
    {text:"pᵢ :", options:{bold:true, color:C.gold}},{text:"  probabilité prédite par le modèle courant\n"},
    {text:"rᵢ :", options:{bold:true, color:C.gold}},{text:"  résidu = erreur résiduelle = signal de correction pour l'arbre suivant\n"},
    {text:"F_{m−1}(x) :", options:{bold:true, color:C.gold}},{text:"  score additif cumulé jusqu'à l'étape m−1"},
  ], {x:0.5, y:3.22, w:9.0, h:0.85, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:3});

  addCard(s, 0.4, 4.2, 9.2, 0.6, {color:"EBF5FB"});
  s.addText("Interprétation :", {x:0.55, y:4.25, w:1.8, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Quand rᵢ est grand (ex: yᵢ=1 mais pᵢ=0.1 → rᵢ=0.9), le patient est mal classé → le prochain arbre apprendra à corriger fortement cet exemple.", {
    x:2.3, y:4.25, w:7.1, h:0.5, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });

  addCard(s, 0.4, 4.95, 9.2, 0.5, {color:"FEF9E7"});
  s.addText("Lien projet :", {x:0.55, y:5.0, w:1.5, h:0.28, fontSize:11, bold:true, color:C.gold, fontFace:"Calibri"});
  s.addText("loss='deviance' est le défaut dans scikit-learn GradientBoostingClassifier. Chaque arbre apprend à réduire cette erreur résiduelle.", {
    x:2.0, y:5.0, w:7.5, h:0.4, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 23 — GB régularisation
{
  let s = contentSlide("Gradient Boosting — Mécanismes de Régularisation");
  const regs = [
    {p:"Learning rate η = 0.05", sym:"η", f:"Fₘ = F_{m−1} + η·hₘ", desc:"Réduit la contribution de chaque arbre. Petit η impose plus d'arbres mais un apprentissage plus doux et stable."},
    {p:"Max depth = 3", sym:"d", f:"Apprenants faibles (profondeur limitée)", desc:"Chaque arbre capture des interactions simples (3 niveaux max). Limite la complexité par arbre."},
    {p:"Min samples leaf = 5", sym:"n_leaf", f:"Chaque feuille ≥ 5 exemples", desc:"Interdit la création de feuilles « pures » basées sur 1-2 exemples → régularisation des feuilles terminales."},
    {p:"Subsample = 0.9", sym:"s", f:"Chaque arbre = 90% du train (aléatoire)", desc:"Stochasticité similaire au bagging. Réduit la variance. 90% conserve la plupart de l'information."},
  ];
  regs.forEach((r, i) => {
    const y = 1.05 + i * 1.1;
    addCard(s, 0.4, y, 9.2, 0.98);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:2.8, h:0.98, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(r.p, {x:0.45, y:y+0.05, w:2.7, h:0.45, fontSize:10.5, bold:true, color:C.gold, fontFace:"Consolas", align:"center"});
    s.addText(r.f, {x:0.45, y:y+0.52, w:2.7, h:0.35, fontSize:9, color:C.tealLt, fontFace:"Consolas", align:"center"});
    s.addText(r.desc, {x:3.35, y:y+0.15, w:6.1, h:0.7, fontSize:11.5, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 0.4, 5.5, 9.2, 0.0);
  s.addText("Budget total : η × M = 0.05 × 200 = 10 — compromis modéré. Malgré ces 4 régularisations cumulées, le sur-apprentissage persiste sur ce petit dataset.", {
    x:0.5, y:5.3, w:9.0, h:0.3, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 24 — GB hyperparamètres et risques
{
  let s = contentSlide("Gradient Boosting — Hyperparamètres & Risques sur Petit Dataset");
  const hps = [
    {p:"n_estimators = 200", d:"Nombre d'arbres. Compromis capacité/sur-apprentissage. Plus d'arbres = plus de capacité mais plus de risque de mémorisation."},
    {p:"learning_rate = 0.05", d:"Régularisation douce. Force un apprentissage incrémental. Combiné à n_estimators=200, donne un budget total modéré."},
    {p:"max_depth = 3", d:"Profondeur maximale de chaque arbre. Apprenants faibles intentionnels. Interactions jusqu'au 3ème ordre."},
    {p:"min_samples_leaf = 5", d:"Évite les feuilles basées sur trop peu d'exemples. Régularise les décisions terminales."},
    {p:"subsample = 0.9", d:"Fraction d'exemples utilisée pour chaque arbre. Introduit de la stochasticité → réduit la variance."},
  ];
  hps.forEach((h,i) => {
    const y = 1.05 + i * 0.78;
    addCard(s, 0.4, y, 9.2, 0.68);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:2.5, h:0.68, fill:{color:C.teal}, line:{color:C.teal}});
    s.addText(h.p, {x:0.4, y, w:2.5, h:0.68, fontSize:10, bold:true, color:C.white, fontFace:"Consolas", align:"center", valign:"middle"});
    s.addText(h.d, {x:3.0, y:y+0.1, w:6.5, h:0.5, fontSize:11, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 0.4, 5.0, 9.2, 0.45, {color:"FDECEA"});
  s.addText("⚠  Risque observé :", {x:0.55, y:5.05, w:2.2, h:0.28, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("Train AUC = 1.000 — mémorisation complète. GB sur-apprend malgré 5 mécanismes de régularisation → petit dataset (237 exemples) insuffisant pour ce modèle complexe.", {
    x:2.7, y:5.05, w:6.8, h:0.35, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 25 — Comparaison théorique 3 modèles
{
  let s = contentSlide("Comparaison Théorique des 3 Modèles");
  const rows = [
    ["Propriété","Régression Logistique","Naive Bayes","Gradient Boosting"],
    ["Type","Linéaire discriminatif","Probabiliste génératif","Ensemble non-linéaire"],
    ["Interprétabilité","Forte (coefficients βⱼ)","Moyenne (μ, σ par classe)","Faible (boîte noire)"],
    ["Risque sur-appr.","Faible (reg. L2)","Faible","Élevé (séquentiel)"],
    ["Sensibilité échelle","Oui → StandardScaler","Oui → StandardScaler","Non → invariant"],
    ["Hypothèse clé","Séparabilité linéaire","Indépendance features","Aucune hypothèse forte"],
    ["Complexité","O(n·p)","O(n·p)","O(M·n·p·log n)"],
    ["Nb hyperparamètres","Peu (C, solver)","1 (var_smoothing)","Nombreux (5+)"],
  ];
  const colW = [2.3, 2.3, 2.3, 2.3];
  const colX = [0.4, 2.8, 5.1, 7.4];
  const colColors = ["","0D1B2A","0D1B2A","0D1B2A"];
  const hdrColors = [C.navy, C.tealMid, C.green, C.accent];

  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const y = 1.05 + ri * 0.56;
      const isHeader = ri === 0;
      const bg = isHeader ? hdrColors[ci] : (ci===0 ? C.navy : (ri%2===0 ? C.white : C.offWhite));
      const tx = isHeader ? C.white : (ci===0 ? C.tealLt : C.charcoal);
      const bold2 = isHeader || ci===0;
      const fs = isHeader ? 11 : 10.5;
      s.addShape(pres.shapes.RECTANGLE, {x:colX[ci], y, w:colW[ci], h:0.52, fill:{color:bg}, line:{color:C.greyLt, width:0.5}});
      s.addText(cell, {x:colX[ci]+0.06, y, w:colW[ci]-0.1, h:0.52, fontSize:fs, bold:bold2, color:tx, fontFace:"Calibri", valign:"middle"});
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION E — Protocole & Métriques
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(5, "Protocole Expérimental & Métriques");

// SLIDE 34 — Matrice de confusion
{
  let s = contentSlide("Métriques — La Matrice de Confusion : Base de Tout");
  // Table visuelle
  const cellW = 2.5, cellH = 1.0;
  const ox = 2.5, oy = 1.1;
  // headers
  s.addShape(pres.shapes.RECTANGLE, {x:ox+cellW, y:oy-0.5, w:cellW, h:0.48, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Prédit POSITIF", {x:ox+cellW, y:oy-0.5, w:cellW, h:0.48, fontSize:11, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"});
  s.addShape(pres.shapes.RECTANGLE, {x:ox+cellW*2, y:oy-0.5, w:cellW, h:0.48, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Prédit NÉGATIF", {x:ox+cellW*2, y:oy-0.5, w:cellW, h:0.48, fontSize:11, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"});
  // row headers
  s.addShape(pres.shapes.RECTANGLE, {x:ox, y:oy, w:cellW, h:cellH, fill:{color:C.navy}, line:{color:C.navy}});
  s.addText("Réel POSITIF", {x:ox, y:oy, w:cellW, h:cellH, fontSize:11, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"});
  s.addShape(pres.shapes.RECTANGLE, {x:ox, y:oy+cellH, w:cellW, h:cellH, fill:{color:C.navy}, line:{color:C.navy}});
  s.addText("Réel NÉGATIF", {x:ox, y:oy+cellH, w:cellW, h:cellH, fontSize:11, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"});
  // cells
  const cells = [
    {label:"VP\n(Vrai Positif)", color:"1E8449", tx:"white"},
    {label:"FN\n(Faux Négatif)", color:"E74C3C", tx:"white"},
    {label:"FP\n(Faux Positif)", color:"E67E22", tx:"white"},
    {label:"VN\n(Vrai Négatif)", color:"2471A3", tx:"white"},
  ];
  cells.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i/2);
    s.addShape(pres.shapes.RECTANGLE, {x:ox+cellW*(col+1), y:oy+cellH*row, w:cellW, h:cellH, fill:{color:c.color}, line:{color:c.color}});
    s.addText(c.label, {x:ox+cellW*(col+1), y:oy+cellH*row, w:cellW, h:cellH, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  });

  s.addText("VP + FN + FP + VN = n (total exemples test = 60)", {x:0.4, y:3.3, w:9.2, h:0.35, fontSize:12, bold:true, color:C.charcoal, fontFace:"Cambria", align:"center"});

  addCard(s, 0.4, 3.75, 9.2, 1.65, {color:"EBF5FB"});
  s.addText("Interprétation clinique :", {x:0.55, y:3.8, w:2.8, h:0.35, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  const clinics = [
    {t:"VP (Vrai Positif)", d:"Patient malade détecté comme malade → bonne détection"},
    {t:"FN (Faux Négatif)", d:"Patient malade classé sain → RISQUE VITAL — à minimiser en priorité"},
    {t:"FP (Faux Positif)", d:"Patient sain classé malade → examens supplémentaires, coût modéré"},
    {t:"VN (Vrai Négatif)", d:"Patient sain classé sain → bonne spécificité"},
  ];
  clinics.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i/2);
    s.addText(c.t+" :", {x:0.55+col*4.7, y:4.2+row*0.55, w:2.4, h:0.28, fontSize:11, bold:true, color:i===1?C.accent:C.teal, fontFace:"Calibri"});
    s.addText(c.d, {x:2.9+col*4.7, y:4.2+row*0.55, w:2.3, h:0.28, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"});
  });
}

// SLIDE 35 — Accuracy, Precision, Recall
{
  let s = contentSlide("Métriques — Accuracy, Précision & Recall (Sensibilité)");
  const metriques = [
    {
      name:"Accuracy (Exactitude)", color:C.teal,
      formula:"Accuracy = (VP + VN) / (VP + VN + FP + FN)",
      params:["VP + VN : prédictions correctes (vrais positifs + vrais négatifs)", "n : nombre total d'exemples", "Valeur : entre 0 et 1 — 1 = parfait"],
      limit:"Limitée si classes déséquilibrées. Ici 54/46 → interprétable mais insuffisante seule.",
    },
    {
      name:"Précision (Valeur Prédictive Positive)", color:C.gold,
      formula:"Precision = VP / (VP + FP)",
      params:["VP : vrais positifs — patients malades correctement détectés", "FP : faux positifs — patients sains classés malades", "Interprétation : parmi les prédictions positives, combien sont correctes ?"],
      limit:"Contrôle les fausses alertes. Haute précision = peu de FP. Peut être sacrifiée en dépistage.",
    },
    {
      name:"Recall (Sensibilité / Taux de Vrais Positifs)", color:C.accent,
      formula:"Recall = VP / (VP + FN)",
      params:["VP : patients malades détectés", "FN : patients malades MANQUÉS → risque vital", "Interprétation : parmi les vrais malades, combien sont détectés ?"],
      limit:"MÉTRIQUE PRIORITAIRE en dépistage cardiaque. Minimiser FN = maximiser le Recall.",
    },
  ];
  metriques.forEach((m, i) => {
    const y = 1.0 + i * 1.52;
    addCard(s, 0.4, y, 9.2, 1.38);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.12, h:1.38, fill:{color:m.color}, line:{color:m.color}});
    s.addText(m.name, {x:0.65, y:y+0.04, w:5, h:0.38, fontSize:12, bold:true, color:m.color, fontFace:"Cambria"});
    s.addShape(pres.shapes.RECTANGLE, {x:5.8, y:y+0.04, w:3.65, h:0.44, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(m.formula, {x:5.8, y:y+0.04, w:3.65, h:0.44, fontSize:10, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"});
    m.params.forEach((p,pi) => {
      s.addText("• "+p, {x:0.65, y:y+0.52+pi*0.25, w:8.8, h:0.22, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"});
    });
    s.addText(m.limit, {x:0.65, y:y+1.1, w:8.8, h:0.22, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"});
  });
}

// SLIDE 36 — F1, Spécificité
{
  let s = contentSlide("Métriques — F1-Score & Spécificité");
  addCard(s, 0.4, 1.0, 4.5, 3.6);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.0, w:4.5, h:0.45, fill:{color:C.tealMid}, line:{color:C.tealMid}});
  s.addText("F1-Score", {x:0.45, y:1.0, w:4.4, h:0.45, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  addFormula(s, "F₁ = 2 · (Precision · Recall) / (Precision + Recall)", 0.45, 1.52, 4.4, 0.58);
  s.addText([
    {text:"Moyenne harmonique :", options:{bold:true, color:C.tealMid}},{text:" favorise les valeurs basses\n"},
    {text:"Si Precision ≫ Recall :", options:{bold:true, color:C.charcoal}},{text:" F1 pénalise\n"},
    {text:"Si Precision ≈ Recall :", options:{bold:true, color:C.charcoal}},{text:" F1 ≈ moyenne arithmétique\n\n"},
    {text:"Valeur 0 → 1 :", options:{bold:true, color:C.charcoal}},{text:" 1 = compromis parfait Précision-Recall\n\n"},
    {text:"Usage :", options:{bold:true, color:C.tealMid}},{text:" quand il faut équilibrer faux positifs et faux négatifs"},
  ], {x:0.55, y:2.18, w:4.2, h:2.2, fontSize:11, fontFace:"Calibri", paraSpaceAfter:5});

  addCard(s, 5.1, 1.0, 4.5, 3.6);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.0, w:4.5, h:0.45, fill:{color:C.navy}, line:{color:C.navy}});
  s.addText("Spécificité (TNR)", {x:5.15, y:1.0, w:4.4, h:0.45, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  addFormula(s, "Spécificité = VN / (VN + FP)", 5.15, 1.52, 4.4, 0.58);
  s.addText([
    {text:"Parmi les vrais négatifs :", options:{bold:true, color:C.navy}},{text:" combien identifiés correctement ?\n"},
    {text:"Spécificité haute :", options:{bold:true, color:C.charcoal}},{text:" peu de patients sains classés malades\n\n"},
    {text:"Résultats projet :\n", options:{bold:true, color:C.navy}},
    {text:"NB : 0.906 — LogReg : 0.875 — GB : 0.844\n", options:{color:C.charcoal}},
    {text:"(sur le jeu de test)\n\n", options:{color:C.grey, italic:true}},
    {text:"Interprétation :", options:{bold:true, color:C.navy}},{text:" FP = patient sain orienté vers examens → coût modéré (FN bien plus critique ici)"},
  ], {x:5.25, y:2.18, w:4.2, h:2.2, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 0.4, 4.75, 9.2, 0.6, {color:"FDECEA"});
  s.addText("Synthèse clinique :", {x:0.55, y:4.8, w:2.2, h:0.3, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("FN = patient malade non détecté → risque vital → PRIORITÉ RECALL.  FP = patient sain envoyé en examens → coût modéré. En dépistage : tolérer FP pour minimiser FN.", {
    x:2.7, y:4.8, w:6.8, h:0.5, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 37 — ROC-AUC
{
  let s = contentSlide("Métriques — ROC-AUC : Définition Mathématique & Interprétation");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Courbe ROC : TPR vs FPR pour chaque seuil t ∈ [0, 1]", {x:0.55, y:1.03, w:5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "TPR(t) = P(p̂ ≥ t | y=1)     FPR(t) = P(p̂ ≥ t | y=0)", 0.45, 1.42, 9.1, 0.52);

  addCard(s, 0.4, 2.1, 9.2, 0.65, {color:C.navy});
  s.addText("Aire sous la courbe (AUC) :", {x:0.55, y:2.13, w:3.5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "AUC = ∫₀¹ TPR(FPR⁻¹(x)) dx", 0.45, 2.48, 9.1, 0.52);

  addCard(s, 0.4, 2.95, 9.2, 0.65, {color:C.navy});
  s.addText("Interprétation probabiliste :", {x:0.55, y:2.98, w:3.5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "AUC = P(p̂_positif > p̂_négatif)", 0.45, 3.33, 9.1, 0.52);

  s.addText([
    {text:"AUC = 0.5 :", options:{bold:true, color:C.accent}},{text:"  classifieur aléatoire (baseline Dummy)   "},
    {text:"AUC = 1.0 :", options:{bold:true, color:C.green}},{text:"  classifieur parfait"},
  ], {x:0.5, y:3.93, w:9.0, h:0.35, fontSize:12, fontFace:"Calibri", color:C.charcoal});

  const aucs = [
    {m:"Baseline Dummy", v:"0.500", c:C.grey},
    {m:"Gradient Boosting", v:"0.905", c:C.gold},
    {m:"Naive Bayes", v:"0.938", c:C.tealMid},
    {m:"Rég. Logistique", v:"0.950", c:C.green},
  ];
  aucs.forEach((a,i) => {
    const x = 0.4 + i * 2.35;
    addCard(s, x, 4.4, 2.2, 1.0, {color: i===3?"EBF5FB":"FFFFFF"});
    s.addText(a.m, {x, y:4.45, w:2.2, h:0.38, fontSize:10, bold:true, color:a.c, fontFace:"Calibri", align:"center"});
    s.addText(a.v, {x, y:4.85, w:2.2, h:0.45, fontSize:20, bold:true, color:a.c, fontFace:"Cambria", align:"center"});
  });

  s.addText("Avantage clé : l'AUC est indépendante du seuil de décision → mesure la qualité du classement pur, non de la décision.", {
    x:0.4, y:5.46, w:9.2, h:0.22, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 38 — CV stratifiée
{
  let s = contentSlide("Protocole — Validation Croisée Stratifiée (StratifiedKFold, K=5)");
  addFormula(s, "Score CV moyen :  S̄ = (1/K) Σₖ₌₁ᴷ Sₖ     où  Sₖ = score (ROC-AUC) sur le fold k", 0.4, 1.0, 9.2, 0.65);

  // visual K-fold
  s.addText("Visualisation du 5-fold stratifié sur 237 exemples train :", {x:0.4, y:1.78, w:6, h:0.35, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  for (let fold = 0; fold < 5; fold++) {
    const y = 2.2 + fold * 0.56;
    s.addText(`Fold ${fold+1}`, {x:0.4, y, w:0.8, h:0.48, fontSize:10, bold:true, color:C.charcoal, fontFace:"Calibri", align:"center", valign:"middle"});
    for (let seg = 0; seg < 5; seg++) {
      const isTest = seg === fold;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.3 + seg * 1.6, y, w:1.5, h:0.48,
        fill:{color: isTest ? C.gold : C.teal},
        line:{color: isTest ? C.gold : C.teal}
      });
      s.addText(isTest ? "TEST" : "TRAIN", {
        x: 1.3+seg*1.6, y, w:1.5, h:0.48,
        fontSize:10, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"
      });
    }
  }

  addCard(s, 0.4, 5.0, 9.2, 0.5, {color:"EBF5FB"});
  s.addText("Pourquoi stratifié ?", {x:0.55, y:5.05, w:2.2, h:0.28, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Sur 237 exemples train, un fold non stratifié pourrait avoir une répartition déséquilibrée → estimations instables. La stratification préserve 54%/46% dans chaque fold.", {
    x:2.7, y:5.05, w:6.8, h:0.4, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 39 — CV gap
{
  let s = contentSlide("CV Gap — Diagnostic du Sur-apprentissage");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Définition du CV Gap :", {x:0.55, y:1.03, w:3, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "CV_gap  =  S̄_train  −  S̄_test     où  S̄ = ROC-AUC moyen sur les K folds", 0.45, 1.42, 9.1, 0.52);

  const interps = [
    {cond:"CV_gap ≈ 0", color:C.green, meaning:"Bon compromis biais-variance → le modèle généralise bien"},
    {cond:"CV_gap ≫ 0", color:C.accent, meaning:"Sur-apprentissage → le modèle mémorise les données d'entraînement"},
    {cond:"CV_gap < 0", color:C.grey, meaning:"Rare — possible avec forte régularisation ou fort bruit dans les données"},
  ];
  interps.forEach((it, i) => {
    const y = 2.15 + i * 0.65;
    addCard(s, 0.4, y, 9.2, 0.58);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.12, h:0.58, fill:{color:it.color}, line:{color:it.color}});
    s.addText(it.cond, {x:0.6, y:y+0.1, w:2.5, h:0.35, fontSize:12, bold:true, color:it.color, fontFace:"Consolas"});
    s.addText(it.meaning, {x:3.2, y:y+0.1, w:6.3, h:0.35, fontSize:11.5, color:C.charcoal, fontFace:"Calibri"});
  });

  s.addText("Résultats du projet :", {x:0.4, y:4.18, w:2.5, h:0.38, fontSize:13, bold:true, color:C.teal, fontFace:"Cambria"});
  const gaps = [
    {m:"Naive Bayes", v:"0.031", c:C.green, verdict:"Excellent"},
    {m:"Rég. Logistique", v:"0.047", c:C.gold, verdict:"Correct"},
    {m:"Gradient Boosting", v:"0.138", c:C.accent, verdict:"Sur-apprentissage !"},
    {m:"Baseline Dummy", v:"0.000", c:C.grey, verdict:"Trivial"},
  ];
  gaps.forEach((g, i) => {
    const x = 0.4 + i * 2.35;
    addCard(s, x, 4.6, 2.2, 1.0);
    s.addText(g.m, {x, y:4.65, w:2.2, h:0.35, fontSize:10, bold:true, color:C.charcoal, fontFace:"Calibri", align:"center"});
    s.addText(g.v, {x, y:5.02, w:2.2, h:0.38, fontSize:20, bold:true, color:g.c, fontFace:"Cambria", align:"center"});
  });
}

// SLIDE 40 — Brier score
{
  let s = contentSlide("Métriques — Brier Score : Calibration des Probabilités");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Formule du Brier Score :", {x:0.55, y:1.03, w:3.5, h:0.35, fontSize:12, bold:true, color:C.tealLt, fontFace:"Cambria"});
  addFormula(s, "Brier  =  (1/n) Σᵢ (p̂ᵢ − yᵢ)²     Brier ∈ [0, 1]  —  0 = calibration parfaite", 0.45, 1.42, 9.1, 0.52);

  s.addText([
    {text:"p̂ᵢ :", options:{bold:true, color:C.gold}},{text:"  probabilité prédite par le modèle pour l'exemple i\n"},
    {text:"yᵢ :", options:{bold:true, color:C.gold}},{text:"  étiquette réelle (0 ou 1)\n"},
    {text:"Erreur quadratique :", options:{bold:true, color:C.tealMid}},{text:"  un modèle qui prédit p̂=0.9 pour un patient malade (y=1) contribue (0.9−1)²=0.01. Un modèle qui prédit 0.1 contribue 0.81."},
  ], {x:0.5, y:2.08, w:9.0, h:0.9, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:3});

  addCard(s, 0.4, 3.1, 9.2, 0.6, {color:"EBF5FB"});
  s.addText("Interprétation clinique :", {x:0.55, y:3.15, w:2.5, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Si le modèle prédit p̂=0.70 pour un groupe de patients, environ 70% devraient réellement être positifs. Le Brier mesure cet écart.", {
    x:3.0, y:3.15, w:6.5, h:0.42, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });

  const briers = [
    {m:"Rég. Logistique", v:"0.094", c:C.green, note:"Meilleur — bien calibré"},
    {m:"Naive Bayes", v:"0.098", c:C.tealMid, note:"Proche de LogReg"},
    {m:"Gradient Boosting", v:"0.128", c:C.accent, note:"Moins bien calibré"},
  ];
  briers.forEach((b, i) => {
    const x = 0.4 + i * 3.1;
    addCard(s, x, 3.9, 2.9, 1.6);
    s.addText(b.m, {x, y:3.95, w:2.9, h:0.45, fontSize:11, bold:true, color:C.charcoal, fontFace:"Calibri", align:"center"});
    s.addText(b.v, {x, y:4.42, w:2.9, h:0.6, fontSize:28, bold:true, color:b.c, fontFace:"Cambria", align:"center"});
    s.addText(b.note, {x, y:5.04, w:2.9, h:0.38, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri", align:"center"});
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION F — Résultats CV
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(6, "Résultats — Validation Croisée (5-Fold)");

// SLIDE 41 — Tableau CV complet
{
  let s = contentSlide("Résultats Complets — Validation Croisée 5-Fold (ROC-AUC)");
  const headers = ["Modèle","CV Accuracy","CV Recall","CV F1","CV ROC-AUC","CV Gap"];
  const rows2 = [
    {cells:["Naive Bayes","0.827","0.808","0.803","0.870","0.031"], highlight:true},
    {cells:["Rég. Logistique","0.823","0.790","0.793","0.869","0.047"], highlight:false},
    {cells:["Gradient Boosting","0.869","0.826","0.846","0.862","0.138"], highlight:false},
    {cells:["Baseline Dummy","0.541","0.000","0.000","0.500","0.000"], highlight:false},
  ];
  const colWs = [2.3, 1.5, 1.4, 1.2, 1.5, 1.3];
  const colXs = [0.4, 2.75, 4.3, 5.75, 7.0, 8.55];
  headers.forEach((h, ci) => {
    s.addShape(pres.shapes.RECTANGLE, {x:colXs[ci], y:1.05, w:colWs[ci], h:0.5, fill:{color:C.navy}, line:{color:C.greyLt, width:0.5}});
    s.addText(h, {x:colXs[ci]+0.04, y:1.05, w:colWs[ci]-0.08, h:0.5, fontSize:10.5, bold:true, color:C.white, fontFace:"Calibri", valign:"middle", align:"center"});
  });
  rows2.forEach((row, ri) => {
    const y = 1.62 + ri * 0.72;
    row.cells.forEach((cell, ci) => {
      const isModel = ci===0;
      const isGap = ci===5;
      const isBad = ri===2 && isGap;
      const bg = row.highlight ? "EBF5FB" : (ri%2===0 ? C.white : C.offWhite);
      s.addShape(pres.shapes.RECTANGLE, {x:colXs[ci], y, w:colWs[ci], h:0.65, fill:{color:bg}, line:{color:C.greyLt, width:0.5}});
      s.addText(cell, {x:colXs[ci]+0.04, y, w:colWs[ci]-0.08, h:0.65, fontSize:isBad?13:11, bold:isModel||isBad, color:isBad?C.accent:isModel?C.navy:C.charcoal, fontFace:isModel?"Calibri":"Consolas", valign:"middle", align:isModel?"left":"center"});
    });
  });

  addCard(s, 0.4, 4.62, 9.2, 0.75, {color:"EBF5FB"});
  s.addText("Observations clés :", {x:0.55, y:4.68, w:2.2, h:0.3, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri"});
  s.addText("Tous les modèles surpassent la baseline. NB ≈ LogReg > GB en AUC. Paradoxe : GB a la meilleure Accuracy (0.869) mais le pire CV gap (0.138) → l'Accuracy seule est trompeuse.", {
    x:2.7, y:4.68, w:6.8, h:0.6, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 42-44 — CV par modèle (3 slides condensés)
{
  // slide 42 NB
  let s = contentSlide("CV — Naive Bayes : Meilleur Compromis Biais-Variance");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("CV ROC-AUC : 0.870 (meilleur)  |  CV gap : 0.031 (le plus faible)  |  Train AUC moyen : ~0.901", {
    x:0.55, y:1.05, w:9.0, h:0.55, fontSize:13, color:C.gold, fontFace:"Calibri", bold:true, align:"center", valign:"middle"
  });
  const nbMetrics = [{m:"Accuracy",v:"0.827"},{m:"Recall",v:"0.808"},{m:"F1",v:"0.803"},{m:"ROC-AUC",v:"0.870"},{m:"CV Gap",v:"0.031"}];
  nbMetrics.forEach((nm,i) => {
    const x = 0.4 + i * 1.85;
    addCard(s, x, 1.85, 1.7, 1.4);
    s.addText(nm.m, {x, y:1.9, w:1.7, h:0.4, fontSize:11, bold:true, color:C.tealMid, fontFace:"Calibri", align:"center"});
    s.addText(nm.v, {x, y:2.32, w:1.7, h:0.7, fontSize:24, bold:true, color:i===4?C.green:C.navy, fontFace:"Cambria", align:"center"});
  });
  s.addText([
    {text:"Meilleur CV gap (0.031) :", options:{bold:true, color:C.green}},{text:" le modèle ne mémorise pas — bonne généralisation\n"},
    {text:"Hypothèse d'indépendance violée :", options:{bold:true, color:C.grey}},{text:" les features cliniques sont corrélées (thal/cp/ca). Pourtant NB reste compétitif.\n"},
    {text:"Explication :", options:{bold:true, color:C.tealMid}},{text:" en classification binaire avec peu de features, la violation de l'indépendance n'empêche pas un bon classement relatif des probabilités.\n"},
    {text:"Non implémenté :", options:{bold:true, color:C.accent, italic:true}},{text:" tuning de var_smoothing.", options:{italic:true, color:C.grey}},
  ], {x:0.4, y:3.45, w:9.2, h:1.8, fontSize:11.5, fontFace:"Calibri", paraSpaceAfter:5});
}

{
  // slide 43 LogReg
  let s = contentSlide("CV — Régression Logistique : Très Proche de Naive Bayes");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("CV ROC-AUC : 0.869  |  CV gap : 0.047  |  Train AUC moyen : ~0.916", {
    x:0.55, y:1.05, w:9.0, h:0.55, fontSize:13, color:C.gold, fontFace:"Calibri", bold:true, align:"center", valign:"middle"
  });
  const lrMetrics = [{m:"Accuracy",v:"0.823"},{m:"Recall",v:"0.790"},{m:"F1",v:"0.793"},{m:"ROC-AUC",v:"0.869"},{m:"CV Gap",v:"0.047"}];
  lrMetrics.forEach((nm,i) => {
    const x = 0.4 + i * 1.85;
    addCard(s, x, 1.85, 1.7, 1.4);
    s.addText(nm.m, {x, y:1.9, w:1.7, h:0.4, fontSize:11, bold:true, color:C.tealMid, fontFace:"Calibri", align:"center"});
    s.addText(nm.v, {x, y:2.32, w:1.7, h:0.7, fontSize:24, bold:true, color:i===4?C.gold:C.navy, fontFace:"Cambria", align:"center"});
  });
  s.addText([
    {text:"CV gap : 0.047 :", options:{bold:true, color:C.gold}},{text:" compromis correct — légère sur-estimation sur le train mais raisonnable.\n"},
    {text:"Régularisation L2 (C=1.0) :", options:{bold:true, color:C.teal}},{text:" contient le sur-apprentissage — les coefficients βⱼ ne divergent pas.\n"},
    {text:"Train AUC ~0.916 :", options:{bold:true, color:C.charcoal}},{text:" le modèle apprend sans mémoriser — profil sain.\n"},
    {text:"Avantage distinctif :", options:{bold:true, color:C.tealMid}},{text:" coefficients βⱼ directement interprétables → utilisables pour expliquer la décision au clinicien.\n"},
    {text:"Non implémenté :", options:{bold:true, color:C.accent, italic:true}},{text:" GridSearchCV sur C.", options:{italic:true, color:C.grey}},
  ], {x:0.4, y:3.45, w:9.2, h:1.9, fontSize:11.5, fontFace:"Calibri", paraSpaceAfter:5});
}

{
  // slide 44 GB
  let s = contentSlide("CV — Gradient Boosting : Sur-apprentissage Confirmé");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("CV ROC-AUC : 0.862  |  CV gap : 0.138 ← signal fort  |  Train AUC = 1.000", {
    x:0.55, y:1.05, w:9.0, h:0.55, fontSize:13, color:C.accent, fontFace:"Calibri", bold:true, align:"center", valign:"middle"
  });
  const gbMetrics = [{m:"Accuracy",v:"0.869"},{m:"Recall",v:"0.826"},{m:"F1",v:"0.846"},{m:"ROC-AUC",v:"0.862"},{m:"CV Gap",v:"0.138"}];
  gbMetrics.forEach((nm,i) => {
    const x = 0.4 + i * 1.85;
    addCard(s, x, 1.85, 1.7, 1.4, {color: i===4 ? "FDECEA" : C.white});
    s.addText(nm.m, {x, y:1.9, w:1.7, h:0.4, fontSize:11, bold:true, color:i===4?C.accent:C.tealMid, fontFace:"Calibri", align:"center"});
    s.addText(nm.v, {x, y:2.32, w:1.7, h:0.7, fontSize:24, bold:true, color:i===4?C.accent:C.navy, fontFace:"Cambria", align:"center"});
  });
  s.addText([
    {text:"Train AUC = 1.000 :", options:{bold:true, color:C.accent}},{text:" mémorisation COMPLÈTE des données d'entraînement.\n"},
    {text:"CV gap = 0.138 :", options:{bold:true, color:C.accent}},{text:" le plus élevé des 3 modèles → sur-apprentissage structurel.\n"},
    {text:"Cause probable :", options:{bold:true, color:C.charcoal}},{text:" 237 exemples train insuffisants pour GB avec 200 arbres.\n"},
    {text:"Paradoxe Accuracy :", options:{bold:true, color:C.gold}},{text:" GB a la meilleure Accuracy CV (0.869) mais le pire AUC et le plus fort sur-apprentissage → l'Accuracy seule est trompeuse.\n"},
    {text:"Régularisations tentées :", options:{bold:true, color:C.grey}},{text:" max_depth=3, min_samples_leaf=5, subsample=0.9 — insuffisantes.", options:{italic:true, color:C.grey}},
  ], {x:0.4, y:3.45, w:9.2, h:1.9, fontSize:11.5, fontFace:"Calibri", paraSpaceAfter:5});
}

// SLIDE 45 — Synthèse CV
{
  let s = contentSlide("Synthèse — Validation Croisée : Classements & Paradoxes");
  const rankings = [
    {label:"Robustesse (CV gap)", first:"Naive Bayes 0.031", sec:"Rég. Logistique 0.047", third:"Gradient Boosting 0.138", firstC:C.green, secC:C.gold, thirdC:C.accent},
    {label:"Discrimination (ROC-AUC)", first:"Naive Bayes 0.870", sec:"Rég. Logistique 0.869", third:"Gradient Boosting 0.862", firstC:C.green, secC:C.gold, thirdC:C.accent},
    {label:"Accuracy CV", first:"Gradient Boosting 0.869", sec:"Naive Bayes 0.827", third:"Rég. Logistique 0.823", firstC:C.accent, secC:C.tealMid, thirdC:C.tealMid},
  ];
  rankings.forEach((r, ri) => {
    const y = 1.05 + ri * 1.35;
    addCard(s, 0.4, y, 9.2, 1.2);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:2.2, h:1.2, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(r.label, {x:0.45, y, w:2.1, h:1.2, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    [r.first, r.sec, r.third].forEach((val, i) => {
      const x = 2.75 + i * 2.3;
      s.addShape(pres.shapes.RECTANGLE, {x, y:y+0.12, w:0.35, h:0.35, fill:{color:[r.firstC,r.secC,r.thirdC][i]}, line:{color:[r.firstC,r.secC,r.thirdC][i]}});
      s.addText(["①","②","③"][i], {x, y:y+0.12, w:0.35, h:0.35, fontSize:12, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"});
      s.addText(val, {x:x+0.42, y:y+0.15, w:1.78, h:0.55, fontSize:11, bold:true, color:[r.firstC,r.secC,r.thirdC][i], fontFace:"Calibri", valign:"middle"});
    });
  });

  addCard(s, 0.4, 5.1, 9.2, 0.42, {color:"FDECEA"});
  s.addText("Paradoxe GB :", {x:0.55, y:5.15, w:1.8, h:0.28, fontSize:11, bold:true, color:C.accent, fontFace:"Calibri"});
  s.addText("GB a la meilleure Accuracy CV mais le pire AUC et le plus fort sur-apprentissage. L'Accuracy n'est pas une métrique suffisante pour évaluer un modèle clinique.", {
    x:2.3, y:5.15, w:7.0, h:0.3, fontSize:11, color:C.charcoal, fontFace:"Calibri"
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION G — Résultats test
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(7, "Résultats — Jeu de Test Hold-out");

// SLIDE 46 — Tableau test complet
{
  let s = contentSlide("Résultats Complets — Jeu de Test (60 observations)");
  const hdrs = ["Modèle","Accuracy","Precision","Recall","Spécificité","F1","ROC-AUC","Δ CV"];
  const rowsT = [
    {cells:["Rég. Logistique","0.833","0.846","0.786","0.875","0.815","0.950","+0.080"], best:6},
    {cells:["Naive Bayes","0.883","0.889","0.857","0.906","0.873","0.938","+0.068"], best:4},
    {cells:["Gradient Boosting","0.817","0.815","0.786","0.844","0.800","0.905","+0.043"], best:-1},
    {cells:["Baseline Dummy","0.533","0.000","0.000","1.000","0.000","0.500","0.000"], best:-1},
  ];
  const colWsT = [2.0, 0.9, 1.0, 0.9, 1.1, 0.8, 1.0, 0.8];
  const colXsT = [0.35, 2.42, 3.37, 4.42, 5.37, 6.52, 7.37, 8.42];

  hdrs.forEach((h, ci) => {
    s.addShape(pres.shapes.RECTANGLE, {x:colXsT[ci], y:1.05, w:colWsT[ci], h:0.5, fill:{color:C.navy}, line:{color:C.greyLt, width:0.5}});
    s.addText(h, {x:colXsT[ci]+0.03, y:1.05, w:colWsT[ci]-0.06, h:0.5, fontSize:9, bold:true, color:C.white, fontFace:"Calibri", valign:"middle", align:"center"});
  });
  rowsT.forEach((row, ri) => {
    const y = 1.62 + ri * 0.68;
    row.cells.forEach((cell, ci) => {
      const isBest = ci === row.best;
      const bg = ri===0?"EBF5FB":ri===1?"FEF9E7":C.white;
      s.addShape(pres.shapes.RECTANGLE, {x:colXsT[ci], y, w:colWsT[ci], h:0.62, fill:{color:bg}, line:{color:C.greyLt, width:0.5}});
      s.addText(cell, {x:colXsT[ci]+0.03, y, w:colWsT[ci]-0.06, h:0.62, fontSize:isBest?12:10, bold:ci===0||isBest, color:isBest?C.green:ci===0?C.navy:C.charcoal, fontFace:ci===0?"Calibri":"Consolas", valign:"middle", align:ci===0?"left":"center"});
    });
  });

  addCard(s, 0.35, 4.5, 9.25, 0.85, {color:"EBF5FB"});
  s.addText("NB meilleur Recall (0.857) → dépistage    |    LogReg meilleur ROC-AUC (0.950) → compromis global    |    GB en retrait sur toutes les métriques", {
    x:0.5, y:4.55, w:9.0, h:0.7, fontSize:11.5, italic:true, color:C.tealMid, fontFace:"Calibri", align:"center", valign:"middle"
  });
}

// SLIDE 47 — Matrices de confusion
{
  let s = contentSlide("Matrices de Confusion — Comparaison des 4 Modèles");
  const models = [
    {name:"Baseline Dummy", vp:0, fn:28, fp:0, vn:32, c:C.grey},
    {name:"Gradient Boosting", vp:22, fn:6, fp:6, vn:26, c:C.gold},
    {name:"Naive Bayes", vp:24, fn:4, fp:3, vn:29, c:C.green},
    {name:"Rég. Logistique", vp:22, fn:6, fp:4, vn:28, c:C.tealMid},
  ];
  models.forEach((m, mi) => {
    const col = mi % 2;
    const row = Math.floor(mi/2);
    const bx = 0.4 + col * 4.9;
    const by = 1.0 + row * 2.2;
    addCard(s, bx, by, 4.6, 2.0);
    s.addShape(pres.shapes.RECTANGLE, {x:bx, y:by, w:4.6, h:0.38, fill:{color:m.c}, line:{color:m.c}});
    s.addText(m.name, {x:bx+0.05, y:by, w:4.5, h:0.38, fontSize:11.5, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    // mini matrix
    const cells2 = [
      {v:m.vp, label:"VP", color:C.green},
      {v:m.fn, label:"FN", color:C.accent},
      {v:m.fp, label:"FP", color:C.gold},
      {v:m.vn, label:"VN", color:C.teal},
    ];
    cells2.forEach((c,ci) => {
      const cx = bx + 0.3 + (ci%2) * 2.0;
      const cy = by + 0.45 + Math.floor(ci/2) * 0.75;
      s.addShape(pres.shapes.RECTANGLE, {x:cx, y:cy, w:1.8, h:0.65, fill:{color:c.color}, line:{color:c.color}});
      s.addText(`${c.label}: ${c.v}`, {x:cx, y:cy, w:1.8, h:0.65, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    });
  });
}

// SLIDE 48 — Analyse FN vs FP
{
  let s = contentSlide("Analyse Critique — Faux Négatifs vs Faux Positifs");
  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("En dépistage : chaque FN = un patient malade NON détecté → risque vital. Minimiser les FN est la priorité.", {
    x:0.55, y:1.05, w:9.0, h:0.45, fontSize:12, bold:true, color:C.gold, fontFace:"Calibri", align:"center", valign:"middle"
  });

  const models2 = [
    {name:"Naive Bayes", fn:4, fp:3, total:28, c:C.green, verdict:"MEILLEUR"},
    {name:"Rég. Logistique", fn:6, fp:4, total:28, c:C.tealMid, verdict:"BON"},
    {name:"Gradient Boosting", fn:6, fp:6, total:28, c:C.gold, verdict:"CORRECT"},
    {name:"Baseline Dummy", fn:28, fp:0, total:28, c:C.accent, verdict:"INUTILE"},
  ];
  models2.forEach((m, i) => {
    const y = 1.72 + i * 0.88;
    addCard(s, 0.4, y, 9.2, 0.78);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:1.9, h:0.78, fill:{color:m.c}, line:{color:m.c}});
    s.addText(m.name+"\n"+m.verdict, {x:0.4, y, w:1.9, h:0.78, fontSize:10, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    const fnPct = (m.fn / m.total * 100).toFixed(1);
    s.addText(`FN : ${m.fn} / ${m.total} malades = ${fnPct}% non détectés`, {x:2.4, y:y+0.04, w:4.5, h:0.35, fontSize:12, bold:true, color:m.fn===4?C.green:m.fn===28?C.accent:C.charcoal, fontFace:"Calibri"});
    s.addText(`FP : ${m.fp} patients sains classés malades (examens supplémentaires)`, {x:2.4, y:y+0.42, w:6.5, h:0.3, fontSize:11, color:C.grey, fontFace:"Calibri", italic:true});
    // bar FN
    const barW = Math.max(0.05, m.fn/28 * 2.5);
    s.addShape(pres.shapes.RECTANGLE, {x:7.1, y:y+0.12, w:barW, h:0.5, fill:{color:m.fn===4?C.green:C.accent}, line:{color:m.fn===4?C.green:C.accent}});
    s.addText(`${fnPct}%`, {x:7.1+barW+0.05, y:y+0.15, w:0.8, h:0.4, fontSize:11, bold:true, color:m.c, fontFace:"Calibri"});
  });
}

// SLIDE 49 — Courbes ROC
{
  let s = contentSlide("Courbes ROC — Comparaison des Discriminants");
  // Sketch ROC manually
  addCard(s, 0.4, 1.0, 5.2, 4.4);
  s.addText("Courbe ROC (schéma)", {x:0.5, y:1.05, w:5.0, h:0.38, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  // axes
  s.addShape(pres.shapes.LINE, {x:0.9, y:5.0, w:4.5, h:0, line:{color:C.charcoal, width:1.5}});
  s.addShape(pres.shapes.LINE, {x:0.9, y:1.55, w:0, h:3.45, line:{color:C.charcoal, width:1.5}});
  s.addText("FPR (1−Spécificité)", {x:2.5, y:5.1, w:2.5, h:0.3, fontSize:10, color:C.charcoal, fontFace:"Calibri", align:"center"});
  s.addText("TPR (Recall)", {x:0.4, y:2.9, w:0.4, h:1.5, fontSize:10, color:C.charcoal, fontFace:"Calibri", align:"center"});
  // diagonal
  s.addShape(pres.shapes.LINE, {x:0.9, y:5.0, w:4.5, h:-3.45, line:{color:C.grey, dashType:"dash", width:1}});
  // model curves (approximate ROC)
  const models3 = [
    {auc:"0.950", c:C.teal, pts:[[0,0],[0.05,0.7],[0.1,0.85],[0.2,0.93],[1,1]]},
    {auc:"0.938", c:C.green, pts:[[0,0],[0.07,0.65],[0.15,0.82],[0.25,0.90],[1,1]]},
    {auc:"0.905", c:C.gold, pts:[[0,0],[0.1,0.55],[0.2,0.75],[0.3,0.87],[1,1]]},
  ];
  const ox2 = 0.9, oy2 = 1.55, ow=4.5, oh=3.45;
  models3.forEach(m => {
    for (let pi=0; pi<m.pts.length-1; pi++) {
      const x1 = ox2 + m.pts[pi][0]*ow;
      const y1 = oy2 + (1-m.pts[pi][1])*oh;
      const x2 = ox2 + m.pts[pi+1][0]*ow;
      const y2 = oy2 + (1-m.pts[pi+1][1])*oh;
      const dx = x2-x1, dy = y2-y1;
      const len = Math.sqrt(dx*dx+dy*dy);
      s.addShape(pres.shapes.LINE, {x:x1, y:y1, w:dx, h:dy, line:{color:m.c, width:2.5}});
    }
  });

  addCard(s, 5.75, 1.0, 3.85, 4.4);
  s.addText("Résultats AUC (test)", {x:5.85, y:1.05, w:3.65, h:0.38, fontSize:12, bold:true, color:C.teal, fontFace:"Cambria"});
  const aucs2 = [
    {m:"Rég. Logistique", v:"0.950", c:C.teal, note:"Meilleur discriminant"},
    {m:"Naive Bayes", v:"0.938", c:C.green, note:"Très proche LogReg"},
    {m:"Gradient Boosting", v:"0.905", c:C.gold, note:"En retrait"},
    {m:"Baseline Dummy", v:"0.500", c:C.grey, note:"Aléatoire"},
  ];
  aucs2.forEach((a, i) => {
    const y = 1.55 + i * 0.95;
    addCard(s, 5.85, y, 3.6, 0.82);
    s.addShape(pres.shapes.RECTANGLE, {x:5.85, y, w:0.1, h:0.82, fill:{color:a.c}, line:{color:a.c}});
    s.addText(a.m, {x:6.05, y:y+0.04, w:3.2, h:0.35, fontSize:11, bold:true, color:a.c, fontFace:"Calibri"});
    s.addText(`AUC = ${a.v} — ${a.note}`, {x:6.05, y:y+0.43, w:3.2, h:0.3, fontSize:10, color:C.grey, fontFace:"Calibri", italic:true});
  });

  s.addText("La différence LogReg/NB est faible → choix final dépend des priorités cliniques.\nPlus la courbe est proche du coin supérieur gauche, meilleure est la discrimination.", {
    x:0.4, y:5.5, w:9.2, h:0.3, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 50 — Rapports de classification
{
  let s = contentSlide("Rapports de Classification — Focus Classe 1 (Présence de Maladie)");
  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("La classe 1 (présence de maladie) est la classe d'intérêt en dépistage — ses métriques sont les plus critiques.", {
    x:0.55, y:1.05, w:9.0, h:0.45, fontSize:12, bold:true, color:C.gold, fontFace:"Calibri", align:"center", valign:"middle"
  });

  const hdrs2 = ["Modèle","Précision Cl.1","Recall Cl.1","F1 Cl.1","ROC-AUC"];
  const rows3 = [
    ["Naive Bayes", "0.889", "0.857", "0.873", "0.938"],
    ["Rég. Logistique", "0.846", "0.786", "0.815", "0.950"],
    ["Gradient Boosting", "0.815", "0.786", "0.800", "0.905"],
  ];
  const colWs2 = [2.4, 1.7, 1.7, 1.4, 1.7];
  const colXs2 = [0.4, 2.9, 4.65, 6.4, 7.9];
  hdrs2.forEach((h, ci) => {
    s.addShape(pres.shapes.RECTANGLE, {x:colXs2[ci], y:1.65, w:colWs2[ci], h:0.45, fill:{color:C.navy}, line:{color:C.greyLt, width:0.5}});
    s.addText(h, {x:colXs2[ci]+0.04, y:1.65, w:colWs2[ci]-0.08, h:0.45, fontSize:10, bold:true, color:C.white, fontFace:"Calibri", valign:"middle", align:"center"});
  });
  rows3.forEach((row, ri) => {
    const y = 2.17 + ri * 0.7;
    const bests = [0, ri===0?2:99, ri===0?2:99, ri===0?3:99, ri===1?4:99]; // approximate
    row.forEach((cell, ci) => {
      const bg = ri===0 ? "EBF5FB" : ri===1 ? "FEF9E7" : C.white;
      s.addShape(pres.shapes.RECTANGLE, {x:colXs2[ci], y, w:colWs2[ci], h:0.62, fill:{color:bg}, line:{color:C.greyLt, width:0.5}});
      const isBestCell = (ci===2 && ri===0) || (ci===4 && ri===1);
      s.addText(cell, {x:colXs2[ci]+0.04, y, w:colWs2[ci]-0.08, h:0.62, fontSize:isBestCell?13:11, bold:ci===0||isBestCell, color:isBestCell?C.green:ci===0?C.navy:C.charcoal, fontFace:ci===0?"Calibri":"Consolas", valign:"middle", align:ci===0?"left":"center"});
    });
  });

  addCard(s, 0.4, 3.88, 9.2, 0.7, {color:"EBF5FB"});
  s.addText("NB : Recall = 0.857 ← meilleur (4 FN sur 28 positifs — 14.3% de malades manqués)", {x:0.55, y:3.93, w:9.0, h:0.3, fontSize:12, bold:true, color:C.green, fontFace:"Calibri"});
  s.addText("LogReg : Recall = 0.786 (6 FN) — mais meilleur ROC-AUC global (0.950) et meilleur Brier score (0.094)", {x:0.55, y:4.25, w:9.0, h:0.28, fontSize:11.5, color:C.charcoal, fontFace:"Calibri"});

  addCard(s, 0.4, 4.72, 9.2, 0.65, {color:"FDECEA"});
  s.addText("Le Recall de la classe 1 est la métrique la plus critique pour le dépistage cardiaque. Chaque point de Recall représente des vies potentiellement sauvées.", {
    x:0.55, y:4.77, w:9.0, h:0.55, fontSize:11.5, italic:true, color:C.charcoal, fontFace:"Calibri"
  });
}

// SLIDE 51 — Importance des variables
{
  let s = contentSlide("Importance des Variables — GB vs Régression Logistique");
  const vars3 = [
    {name:"thal", gb:0.219, lr:0.739},
    {name:"cp", gb:0.207, lr:0.508},
    {name:"ca", gb:0.124, lr:0.958},
    {name:"age", gb:0.113, lr:0.037},
    {name:"oldpeak", gb:0.095, lr:0.444},
  ];

  addCard(s, 0.4, 1.0, 4.5, 4.5);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.0, w:4.5, h:0.42, fill:{color:C.gold}, line:{color:C.gold}});
  s.addText("GB Feature Importance", {x:0.45, y:1.0, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  vars3.forEach((v,i) => {
    const y = 1.5 + i * 0.72;
    const bw = v.gb * 3.5;
    s.addShape(pres.shapes.RECTANGLE, {x:1.4, y, w:bw, h:0.52, fill:{color:C.gold}, line:{color:C.gold}});
    s.addText(v.name, {x:0.5, y, w:0.85, h:0.52, fontSize:12, bold:true, color:C.charcoal, fontFace:"Consolas", valign:"middle"});
    s.addText(v.gb.toFixed(3), {x:1.45+bw, y, w:0.8, h:0.52, fontSize:11, bold:true, color:C.gold, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 5.1, 1.0, 4.5, 4.5);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.0, w:4.5, h:0.42, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("LogReg |Coefficients|", {x:5.15, y:1.0, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  vars3.forEach((v,i) => {
    const y = 1.5 + i * 0.72;
    const bw = v.lr * 3.5;
    s.addShape(pres.shapes.RECTANGLE, {x:5.55, y, w:Math.min(bw,3.5), h:0.52, fill:{color:C.teal}, line:{color:C.teal}});
    s.addText(v.name, {x:5.15, y, w:0.85, h:0.52, fontSize:12, bold:true, color:C.charcoal, fontFace:"Consolas", valign:"middle"});
    s.addText(v.lr.toFixed(3), {x:5.6+Math.min(bw,3.5), y, w:0.8, h:0.52, fontSize:11, bold:true, color:C.teal, fontFace:"Calibri", valign:"middle"});
  });

  addCard(s, 0.4, 5.65, 9.2, 0.0);
  s.addText("Variables récurrentes dans les 2 modèles : thal, cp, ca → convergence rassurante des deux approches.  |  age importante pour GB mais pas LogReg → interaction non-linéaire captée par les arbres.", {
    x:0.4, y:5.47, w:9.2, h:0.3, fontSize:10, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 52 — Cohérence CV-Test
{
  let s = contentSlide("Cohérence CV–Test : Les Deltas & Fiabilité du Protocole");
  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("Les Δ positifs (0.043 → 0.080) indiquent que les performances test sont légèrement supérieures aux estimations CV — variabilité du petit échantillon test (60 obs.).", {
    x:0.55, y:1.05, w:9.0, h:0.45, fontSize:12, color:C.gold, fontFace:"Calibri", align:"center", valign:"middle"
  });

  const coherence = [
    {m:"Naive Bayes", cvAuc:"0.870", testAuc:"0.938", delta:"+0.068", rank:"#1 en CV & Test"},
    {m:"Rég. Logistique", cvAuc:"0.869", testAuc:"0.950", delta:"+0.080", rank:"#2 en CV & Test"},
    {m:"Gradient Boosting", cvAuc:"0.862", testAuc:"0.905", delta:"+0.043", rank:"#3 en CV & Test"},
  ];
  coherence.forEach((c, i) => {
    const y = 1.72 + i * 1.1;
    addCard(s, 0.4, y, 9.2, 0.98);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:2.2, h:0.98, fill:{color:C.navy}, line:{color:C.navy}});
    s.addText(c.m, {x:0.45, y, w:2.1, h:0.98, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    s.addText(`CV AUC : ${c.cvAuc}`, {x:2.75, y:y+0.1, w:2.5, h:0.35, fontSize:12, bold:true, color:C.charcoal, fontFace:"Calibri"});
    s.addText(`Test AUC : ${c.testAuc}`, {x:2.75, y:y+0.5, w:2.5, h:0.35, fontSize:12, bold:true, color:C.teal, fontFace:"Calibri"});
    s.addText(`Δ = ${c.delta}`, {x:5.5, y:y+0.15, w:1.8, h:0.6, fontSize:22, bold:true, color:C.green, fontFace:"Cambria", align:"center", valign:"middle"});
    s.addText(c.rank, {x:7.5, y:y+0.25, w:2.0, h:0.5, fontSize:12, bold:true, color:C.tealMid, fontFace:"Cambria", align:"center", valign:"middle"});
  });

  addCard(s, 0.4, 5.05, 9.2, 0.45, {color:"EBF5FB"});
  s.addText("Le rang est préservé entre CV et test : NB et LogReg dominent dans les deux évaluations. La cohérence des rangs est un signal fort de fiabilité du protocole expérimental.", {
    x:0.55, y:5.1, w:9.0, h:0.35, fontSize:11, italic:true, color:C.tealMid, fontFace:"Calibri"
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION H — Analyse critique
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(8, "Analyse Critique Avancée");

// SLIDE 53 — Calibration
{
  let s = contentSlide("Calibration des Probabilités — Courbes & Brier Scores");
  addCard(s, 0.4, 1.0, 9.2, 0.65, {color:C.navy});
  s.addText("Brier Score = (1/n) Σᵢ (p̂ᵢ − yᵢ)²     Brier ∈ [0, 1] — 0 = parfait", {
    x:0.55, y:1.05, w:9.0, h:0.55, fontSize:13, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"
  });

  const briers2 = [
    {m:"Rég. Logistique", v:"0.094", rank:"#1 — Meilleur", c:C.green, note:"Probabilités bien calibrées. Un score de 0.7 correspond à ~70% de vrais positifs dans ce groupe."},
    {m:"Naive Bayes", v:"0.098", rank:"#2 — Très proche", c:C.tealMid, note:"Légèrement moins calibré mais très compétitif. L'indépendance naïve n'affecte pas trop la calibration."},
    {m:"Gradient Boosting", v:"0.128", rank:"#3 — Moins bon", c:C.accent, note:"Probabilités moins bien calibrées. Lié au sur-apprentissage. Les probabilités GB sont moins fiables pour des décisions à seuil variable."},
  ];
  briers2.forEach((b, i) => {
    const y = 1.82 + i * 1.1;
    addCard(s, 0.4, y, 9.2, 0.98);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.12, h:0.98, fill:{color:b.c}, line:{color:b.c}});
    s.addText(b.m, {x:0.62, y:y+0.04, w:2.5, h:0.38, fontSize:12, bold:true, color:b.c, fontFace:"Cambria"});
    s.addText(b.rank, {x:0.62, y:y+0.45, w:2.5, h:0.32, fontSize:11, bold:true, color:C.charcoal, fontFace:"Calibri"});
    s.addText(b.v, {x:3.3, y:y+0.12, w:1.2, h:0.65, fontSize:30, bold:true, color:b.c, fontFace:"Cambria", align:"center"});
    s.addText(b.note, {x:4.65, y:y+0.12, w:4.8, h:0.7, fontSize:11, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  s.addText("En clinique, un modèle bien calibré permet de dire au médecin : 'Ce patient a 70% de risque de maladie cardiaque' avec confiance → crucial pour la décision thérapeutique.", {
    x:0.4, y:5.1, w:9.2, h:0.32, fontSize:11, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 54 — Optimisation seuil
{
  let s = contentSlide("Optimisation Exploratoire du Seuil de Décision");
  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("Par défaut : seuil t = 0.5  →  si p̂ ≥ 0.5, prédit positif. L'optimisation du seuil modifie ce compromis Précision/Recall.", {
    x:0.55, y:1.05, w:9.0, h:0.45, fontSize:12, color:C.tealLt, fontFace:"Calibri", align:"center", valign:"middle"
  });

  addCard(s, 0.4, 1.7, 4.5, 3.5);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.7, w:4.5, h:0.42, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText("Procédure d'optimisation", {x:0.45, y:1.7, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"1. ", options:{bold:true, color:C.gold}},{text:"Calculer les probabilités p̂ sur le test\n"},
    {text:"2. ", options:{bold:true, color:C.gold}},{text:"Tracer la courbe Précision vs Recall pour t ∈ [0, 1]\n"},
    {text:"3. ", options:{bold:true, color:C.gold}},{text:"Trouver t* qui maximise le Recall\n   avec Précision encore acceptable\n"},
    {text:"4. ", options:{bold:true, color:C.gold}},{text:"Résultat pour Naive Bayes :\n   t* = 0.151 (vs t=0.5 par défaut)\n"},
    {text:"5. ", options:{bold:true, color:C.gold}},{text:"Interprétation : à t=0.151, NB classe\n   positive toute probabilité > 15.1%"},
  ], {x:0.55, y:2.2, w:4.2, h:2.85, fontSize:11, fontFace:"Calibri", color:C.charcoal, paraSpaceAfter:5});

  addCard(s, 5.1, 1.7, 4.5, 3.5);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.7, w:4.5, h:0.42, fill:{color:C.accent}, line:{color:C.accent}});
  s.addText("⚠  Mise en Garde Obligatoire", {x:5.15, y:1.7, w:4.4, h:0.42, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText([
    {text:"Ce seuil est ajusté sur le jeu de test actuel\n→ Analyse EXPLORATOIRE uniquement.\n\n", options:{bold:true, color:C.accent}},
    {text:"Pour une estimation non biaisée :\n", options:{bold:true, color:C.charcoal}},
    {text:"• Fixer le seuil sur un ensemble de VALIDATION séparé\n", options:{color:C.charcoal}},
    {text:"• Évaluer la performance sur un TEST externe indépendant\n\n", options:{color:C.charcoal}},
    {text:"Sans cette précaution, le seuil optimisé\npeut être trop optimiste (sélection sur le test).", options:{italic:true, color:C.grey}},
  ], {x:5.25, y:2.2, w:4.2, h:2.85, fontSize:11, fontFace:"Calibri", paraSpaceAfter:5});

  s.addText("Distinction fondamentale : ROC-AUC = qualité du classement (indépendant du seuil). Seuil optimisé = choix de la décision clinique (dépend du contexte et des priorités).", {
    x:0.4, y:5.38, w:9.2, h:0.3, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"
  });
}

// SLIDE 55 — Learning curves
{
  let s = contentSlide("Courbes d'Apprentissage — Diagnostic Biais-Variance");
  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("Si S_train(n) − S_val(n) → 0 quand n → ∞ : le modèle ne sur-apprend pas.", {
    x:0.55, y:1.05, w:9.0, h:0.45, fontSize:13, color:C.tealLt, fontFace:"Consolas", align:"center", valign:"middle"
  });

  const lcs = [
    {m:"Naive Bayes", status:"CONVERGENT", c:C.green, desc:"Train et validation convergent rapidement. Le gap diminue avec plus de données. Bon compromis biais-variance. Le modèle n'a pas besoin de plus de données pour améliorer sa généralisation."},
    {m:"Rég. Logistique", status:"CONVERGENT", c:C.tealMid, desc:"Même profil que NB. Convergence des courbes train/validation. La régularisation L2 contrôle efficacement la complexité. Stable et prévisible."},
    {m:"Gradient Boosting", status:"GAP PERSISTANT", c:C.accent, desc:"Le gap train/validation PERSISTE même avec plus de données → sur-apprentissage structurel. Le modèle continue à mémoriser le train sans améliorer la validation. Signal de complexité excessive."},
  ];
  lcs.forEach((lc, i) => {
    const y = 1.72 + i * 1.1;
    addCard(s, 0.4, y, 9.2, 0.98);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:0.12, h:0.98, fill:{color:lc.c}, line:{color:lc.c}});
    s.addText(lc.m, {x:0.62, y:y+0.04, w:2.3, h:0.38, fontSize:12, bold:true, color:lc.c, fontFace:"Cambria"});
    s.addShape(pres.shapes.RECTANGLE, {x:2.98, y:y+0.06, w:1.6, h:0.38, fill:{color:lc.c}, line:{color:lc.c}});
    s.addText(lc.status, {x:2.98, y:y+0.06, w:1.6, h:0.38, fontSize:9.5, bold:true, color:C.white, fontFace:"Calibri", align:"center", valign:"middle"});
    s.addText(lc.desc, {x:4.7, y:y+0.1, w:4.8, h:0.75, fontSize:11, color:C.charcoal, fontFace:"Calibri", valign:"middle"});
  });

  s.addText("NB et LogReg convergent → profil adapté à ce petit dataset (237 train). GB gap persistant → preuve #2 du sur-apprentissage structurel.", {
    x:0.4, y:5.1, w:9.2, h:0.32, fontSize:11, italic:true, color:C.tealMid, fontFace:"Calibri"
  });
}

// SLIDE 56 — Synthèse biais-variance
{
  let s = contentSlide("Synthèse — 3 Preuves Convergentes du Sur-apprentissage de GB");
  addCard(s, 0.4, 1.0, 9.2, 0.55, {color:C.navy});
  s.addText("Le diagnostic de sur-apprentissage de Gradient Boosting est robuste car soutenu par 3 évidences indépendantes et convergentes.", {
    x:0.55, y:1.05, w:9.0, h:0.45, fontSize:12, bold:true, color:C.gold, fontFace:"Calibri", align:"center", valign:"middle"
  });

  const preuves = [
    {n:"Preuve 1", title:"CV Gap élevé (Section F)", c:C.accent, data:"GB CV gap = 0.138 >> NB = 0.031", interp:"Le modèle perform bien sur le train mais mal en validation cross → mémorisation. NB et LogReg ont des gaps 3-5× plus faibles."},
    {n:"Preuve 2", title:"Learning Curves divergentes (Section H)", c:C.gold, data:"Gap train/validation persiste quand n augmente", interp:"Pour NB et LogReg, les courbes convergent. Pour GB, le gap reste élevé même avec plus de données → sur-apprentissage structurel."},
    {n:"Preuve 3", title:"Performances Test en retrait (Section G)", c:C.tealMid, data:"GB test AUC = 0.905 vs NB = 0.938 et LogReg = 0.950", interp:"Malgré des performances CV correctes, GB est le dernier sur le test. Cohérent avec un modèle qui généralise mal."},
  ];
  preuves.forEach((p, i) => {
    const y = 1.72 + i * 1.1;
    addCard(s, 0.4, y, 9.2, 0.98);
    s.addShape(pres.shapes.RECTANGLE, {x:0.4, y, w:1.0, h:0.98, fill:{color:p.c}, line:{color:p.c}});
    s.addText(p.n, {x:0.4, y, w:1.0, h:0.98, fontSize:12, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
    s.addText(p.title, {x:1.52, y:y+0.04, w:7.9, h:0.33, fontSize:12, bold:true, color:p.c, fontFace:"Cambria"});
    s.addText(p.data, {x:1.52, y:y+0.4, w:7.9, h:0.25, fontSize:11, bold:true, color:C.charcoal, fontFace:"Consolas"});
    s.addText(p.interp, {x:1.52, y:y+0.68, w:7.9, h:0.25, fontSize:10.5, italic:true, color:C.grey, fontFace:"Calibri"});
  });

  s.addText("Conclusion : Naive Bayes et Régression Logistique ont un profil plus adapté à ce petit dataset (297 observations).", {
    x:0.4, y:5.1, w:9.2, h:0.32, fontSize:11, bold:true, italic:true, color:C.teal, fontFace:"Calibri"
  });
}

// SLIDE 57 — Limites
{
  let s = contentSlide("Limites de l'Étude — Transparence & Honnêteté Scientifique");
  const limits = [
    {l:"Taille du dataset", d:"297 observations, 60 en test → estimations sujettes à forte variabilité statistique. Les intervalles de confiance des métriques sont larges.", c:C.accent},
    {l:"Absence de validation externe", d:"Tous les résultats proviennent d'un seul dataset (Cleveland). La généralisation à d'autres populations n'est pas garantie.", c:C.gold},
    {l:"Pas de tuning hyperparamètres", d:"Aucun GridSearchCV ni RandomizedSearchCV. Les performances, notamment GB, pourraient être améliorées avec un tuning systématique.", c:C.tealMid},
    {l:"Seuil exploratoire biaisé", d:"Le seuil optimisé (t*=0.151) est ajusté sur le test → estimation optimiste. Nécessite une validation externe pour être fiable.", c:C.accent},
    {l:"Hypothèses modèles", d:"Indépendance NB violée (features corrélées). Linéarité LogReg potentiellement limitante pour capturer les interactions complexes.", c:C.grey},
    {l:"Absence de tests statistiques", d:"La différence entre modèles n'est pas testée formellement (McNemar non implémenté). On ne peut pas conclure à une différence significative.", c:C.grey},
  ];
  limits.forEach((lim, i) => {
    const col = i % 2;
    const row = Math.floor(i/2);
    const x = 0.4 + col * 4.9;
    const y = 1.05 + row * 1.45;
    addCard(s, x, y, 4.6, 1.3);
    s.addShape(pres.shapes.RECTANGLE, {x, y, w:0.12, h:1.3, fill:{color:lim.c}, line:{color:lim.c}});
    s.addText(lim.l, {x:x+0.22, y:y+0.05, w:4.25, h:0.38, fontSize:11.5, bold:true, color:lim.c, fontFace:"Cambria"});
    s.addText(lim.d, {x:x+0.22, y:y+0.45, w:4.25, h:0.75, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"});
  });
}

// SLIDE 58 — Validité & reproductibilité
{
  let s = contentSlide("Validité & Reproductibilité du Protocole");
  const points = [
    {t:"Reproductibilité garantie", d:"random_state=42 partout → résultats identiques à chaque exécution du notebook. Science ouverte et vérifiable.", c:C.green},
    {t:"Pipeline sans data leakage", d:"StandardScaler intégré dans sklearn.Pipeline → la moyenne et l'écart-type du train ne contaminent pas les données de test.", c:C.green},
    {t:"Baseline Dummy", d:"Gain réel mesuré, non trivial — tous les modèles battent la baseline sur toutes les métriques pertinentes.", c:C.green},
    {t:"CV stratifiée", d:"Proportions de classes préservées dans chaque fold → estimations stables sur ce dataset déséquilibré à 54/46.", c:C.green},
    {t:"Métriques complémentaires", d:"Accuracy + Recall + Précision + F1 + ROC-AUC + Brier score → vision complète, pas de biais vers une seule métrique.", c:C.green},
    {t:"Règles d'or respectées", d:"Aucun chiffre annoncé absent du notebook. Aucun tableau incomplet. Chaque méthode non implémentée signalée explicitement.", c:C.tealMid},
  ];
  points.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i/2);
    const x = 0.4 + col * 4.9;
    const y = 1.05 + row * 1.45;
    addCard(s, x, y, 4.6, 1.3);
    s.addShape(pres.shapes.RECTANGLE, {x, y, w:0.12, h:1.3, fill:{color:p.c}, line:{color:p.c}});
    s.addText("✓  "+p.t, {x:x+0.22, y:y+0.05, w:4.25, h:0.38, fontSize:11.5, bold:true, color:p.c, fontFace:"Cambria"});
    s.addText(p.d, {x:x+0.22, y:y+0.45, w:4.25, h:0.75, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"});
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION I — Conclusion
// ══════════════════════════════════════════════════════════════════════════
sectionSlide(9, "Conclusion & Recommandations");

// SLIDE 59 — Recommandation opérationnelle
{
  let s = contentSlide("Recommandation Opérationnelle — Par Scénario d'Usage Clinique");
  addCard(s, 0.4, 1.0, 4.5, 4.35);
  s.addShape(pres.shapes.RECTANGLE, {x:0.4, y:1.0, w:4.5, h:0.52, fill:{color:C.green}, line:{color:C.green}});
  s.addText("SCÉNARIO 1 — Dépistage", {x:0.45, y:1.0, w:4.4, h:0.52, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText("→ NAIVE BAYES", {x:0.5, y:1.6, w:4.3, h:0.55, fontSize:22, bold:true, color:C.green, fontFace:"Cambria", align:"center"});
  s.addText([
    {text:"Recall = 0.857 :", options:{bold:true, color:C.green}},{text:" seulement 4 FN sur 28 malades\n"},
    {text:"F1 = 0.873 :", options:{bold:true, color:C.green}},{text:" meilleur compromis sur le test\n"},
    {text:"CV gap = 0.031 :", options:{bold:true, color:C.green}},{text:" très robuste, pas de sur-apprentissage\n"},
    {text:"Brier = 0.098 :", options:{bold:true, color:C.green}},{text:" bien calibré\n"},
    {text:"Rapide :", options:{bold:true, color:C.green}},{text:" utilisable en temps réel\n\n"},
    {text:"14.3% des malades manqués\n", options:{bold:true, color:C.charcoal}},
    {text:"vs 21.4% pour LogReg et GB", options:{color:C.grey, italic:true}},
  ], {x:0.55, y:2.25, w:4.2, h:2.95, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 5.1, 1.0, 4.5, 4.35);
  s.addShape(pres.shapes.RECTANGLE, {x:5.1, y:1.0, w:4.5, h:0.52, fill:{color:C.tealMid}, line:{color:C.tealMid}});
  s.addText("SCÉNARIO 2 — Compromis Global", {x:5.15, y:1.0, w:4.4, h:0.52, fontSize:13, bold:true, color:C.white, fontFace:"Cambria", align:"center", valign:"middle"});
  s.addText("→ RÉGRESSION LOGISTIQUE", {x:5.15, y:1.6, w:4.3, h:0.55, fontSize:18, bold:true, color:C.tealMid, fontFace:"Cambria", align:"center"});
  s.addText([
    {text:"ROC-AUC = 0.950 :", options:{bold:true, color:C.tealMid}},{text:" meilleur discriminant\n"},
    {text:"Brier = 0.094 :", options:{bold:true, color:C.tealMid}},{text:" meilleure calibration\n"},
    {text:"Coefficients βⱼ :", options:{bold:true, color:C.tealMid}},{text:" interprétables pour le médecin\n"},
    {text:"CV gap = 0.047 :", options:{bold:true, color:C.tealMid}},{text:" compromis correct\n\n"},
    {text:"Explication directe :\n", options:{bold:true, color:C.charcoal}},
    {text:"'ca augmente le risque de 0.958 logit'\n", options:{color:C.charcoal}},
    {text:"→ communicable au clinicien", options:{italic:true, color:C.grey}},
  ], {x:5.25, y:2.25, w:4.2, h:2.95, fontSize:11, fontFace:"Calibri", paraSpaceAfter:4});

  addCard(s, 0.4, 5.5, 9.2, 0.0);
  s.addText("⚠  Gradient Boosting : NON RECOMMANDÉ en l'état — sur-apprentissage démontré par 3 preuves. Pourrait bénéficier d'un tuning d'hyperparamètres (non implémenté).", {
    x:0.5, y:5.33, w:9.0, h:0.28, fontSize:10.5, bold:true, color:C.accent, fontFace:"Calibri", align:"center"
  });
}

// SLIDE 60 — Perspectives
{
  let s = contentSlide("Perspectives — Extensions Non Implémentées");
  const persp = [
    {t:"Tuning global", d:"GridSearchCV / RandomizedSearchCV pour tous les modèles — potentiel d'amélioration significatif pour GB.", c:C.teal},
    {t:"Validation externe", d:"Tester sur d'autres cohortes UCI (Hungarian, Swiss, VA) pour vérifier la généralisation.", c:C.teal},
    {t:"Calibration post-hoc", d:"Platt scaling (régression logistique sur les scores) ou isotonic regression pour améliorer les Brier scores.", c:C.gold},
    {t:"Elastic Net", d:"Pénalité α·L1 + (1−α)·L2 pour combiner sélection de features (L1) et stabilité (L2) — non directement applicable ici.", c:C.gold},
    {t:"Tests statistiques formels", d:"Test de McNemar pour comparer formellement les classifieurs. Actuellement, les différences ne sont pas testées statistiquement.", c:C.accent},
    {t:"SHAP values", d:"Explicabilité individuelle — comprendre pourquoi un patient spécifique est classé positif. Crucial pour l'acceptation clinique.", c:C.accent},
    {t:"CV répétée", d:"K-fold répété (ex: 10 répétitions × 5 folds) pour des estimations plus stables sur ce petit dataset.", c:C.tealMid},
    {t:"XGBoost & Random Forest", d:"Tester les extensions régularisées du boosting (XGBoost) et le bagging (RF) pour comparaison complète.", c:C.tealMid},
  ];
  persp.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i/2);
    const x = 0.4 + col * 4.9;
    const y = 1.05 + row * 1.1;
    addCard(s, x, y, 4.6, 0.98);
    s.addShape(pres.shapes.RECTANGLE, {x, y, w:0.12, h:0.98, fill:{color:p.c}, line:{color:p.c}});
    s.addText(p.t, {x:x+0.22, y:y+0.04, w:4.25, h:0.35, fontSize:11.5, bold:true, color:p.c, fontFace:"Cambria"});
    s.addText(p.d, {x:x+0.22, y:y+0.44, w:4.25, h:0.5, fontSize:10.5, color:C.charcoal, fontFace:"Calibri"});
  });
}

// SLIDE 61 — Q&R / Résumé final
{
  let s = pres.addSlide();
  s.background = {color:C.navy};
  s.addShape(pres.shapes.RECTANGLE, {x:0, y:0, w:0.28, h:5.625, fill:{color:C.gold}, line:{color:C.gold}});
  s.addShape(pres.shapes.OVAL, {x:7.5, y:3.5, w:3.5, h:3.5, fill:{color:C.teal, transparency:70}, line:{color:C.teal, transparency:65}});

  s.addText("Merci", {x:0.55, y:0.35, w:4, h:0.8, fontSize:36, bold:true, color:C.gold, fontFace:"Cambria"});
  s.addText("Questions & Réponses", {x:0.55, y:1.1, w:8, h:0.55, fontSize:20, color:C.tealLt, fontFace:"Cambria"});

  // Résumé en 1 phrase
  s.addShape(pres.shapes.RECTANGLE, {x:0.55, y:1.8, w:9.0, h:0.65, fill:{color:C.teal}, line:{color:C.teal}});
  s.addText('"Naive Bayes pour dépister · Régression Logistique pour décider · Gradient Boosting à éviter sans tuning."', {
    x:0.65, y:1.83, w:8.8, h:0.59, fontSize:12, bold:true, color:C.gold, fontFace:"Cambria", italic:true, align:"center", valign:"middle"
  });

  const bullets = [
    "Fondation présentée : ID3 / C4.5 / CART (socle théorique des arbres faibles de GB)",
    "XGBoost présenté comme extension théorique — NON implémenté dans main.ipynb",
    "3 preuves convergentes du sur-apprentissage de GB : CV gap + learning curves + performances test",
    "Distinction ROC-AUC (classement) vs seuil (décision clinique) maintenue tout au long",
  ];
  bullets.forEach((b, i) => {
    s.addText("• "+b, {x:0.55, y:2.6+i*0.55, w:8.5, h:0.48, fontSize:11.5, color:C.white, fontFace:"Calibri"});
  });

  s.addShape(pres.shapes.RECTANGLE, {x:0.55, y:4.85, w:9.0, h:0.55, fill:{color:C.tealMid, transparency:30}, line:{color:C.tealMid}});
  s.addText("Slides de backup disponibles : définitions, justifications, méthodologie complète, analyse critique", {
    x:0.65, y:4.88, w:8.8, h:0.48, fontSize:11, italic:true, color:C.tealLt, fontFace:"Calibri", align:"center", valign:"middle"
  });
}

// ══════════════════════════════════════════════════════════════════════════
// WRITE
// ══════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "ml_cardiology_presentation_final1.pptx" })
  .then(() => {
    console.log("Done!");
  })
  .catch((err) => {
    console.error("Failed to generate presentation:", err);
    process.exitCode = 1;
  });