# Structure de Presentation (Version 53 Slides avec Formules Mathematiques)

Objectif: soutenance longue (53 slides), rigoureuse, avec expressions mathematiques pour chaque modele et chaque metrique, en restant strictement coherent avec [main.ipynb](main.ipynb).

> Les formules sont en notation LaTeX. Utiliser un editeur compatible (Beamer, PowerPoint Equation Editor, Google Slides + MathType, reveal.js, etc.)

## Regles D'Or (anti-incoherences)

1. Ne jamais annoncer une methode absente du notebook.
2. Ne jamais laisser de placeholders dans les tableaux de resultats.
3. Utiliser la meme terminologie du debut a la fin.
4. Justifier chaque choix methodologique (metriques, seuil, protocole).
5. Associer chaque conclusion a une preuve numerique ou graphique.
6. Signaler explicitement ce qui est non implemente ici.
7. Chaque hyperparametre cite doit etre justifie.
8. Distinguer clairement qualite de classement (ROC-AUC) et choix de seuil (decision clinique).
9. Chaque formule mathematique doit etre expliquee et reliee au contexte.

---

## Bloc A - Introduction et cadre (Slides 1 a 5)

### Slide 1 - Titre du projet
Contenu:
- Titre: "Classification de maladies cardiaques par Gradient Boosting, Naive Bayes et Regression Logistique"
- Auteur, contexte du cours.
- Promesse: comparaison rigoureuse de 3 modeles pour le depistage cardiaque.
Critere: C5

### Slide 2 - Plan de la presentation
Contenu:
- A. Introduction et cadre
- B. Donnees et preparation
- C. Theorie des modeles (avec formules)
- D. Protocole experimental et metriques
- E. Resultats validation croisee
- F. Resultats sur le jeu de test
- G. Analyse critique avancee
- H. Conclusion et perspectives
Critere: C5

### Slide 3 - Contexte medical
Contenu:
- Maladies cardiovasculaires = premiere cause de mortalite mondiale (17,9 millions de deces/an, OMS).
- Depistage precoce reduit la mortalite.
- Asymetrie des couts d'erreur:
  - Faux negatif (FN) : patient malade non detecte → risque vital.
  - Faux positif (FP) : patient sain classe malade → examens supplementaires.
- Consequence: en depistage, minimiser les FN est prioritaire → **Recall** comme metrique cle.
Critere: C5, C6

### Slide 4 - Question de recherche
Contenu:
- "Quel modele offre le meilleur compromis entre discrimination globale (ROC-AUC) et capacite de detection (Recall) pour un usage clinique de depistage cardiaque?"
- Deux scenarios d'usage:
  - Depistage (priorite Recall) vs Compromis global (priorite ROC-AUC + interpretabilite).
Critere: C1, C6

### Slide 5 - Objectifs mesurables
Contenu:
- O1: Battre une baseline naive (Dummy most_frequent) sur toutes les metriques pertinentes.
- O2: Comparer les modeles sur CV 5-fold ET jeu de test hold-out.
- O3: Diagnostiquer le surapprentissage via CV gap et learning curves.
- O4: Evaluer la calibration des probabilites et l'optimisation du seuil.
- O5: Produire une recommandation justifiee et nuancee.
Critere: C1, C2

---

## Bloc B - Donnees et preparation (Slides 6 a 13)

### Slide 6 - Dataset: vue d'ensemble
Contenu:
- Source: UCI Machine Learning Repository — Cleveland Heart Disease.
- 303 observations, 14 variables (13 features + 1 cible).
- Cible originale: `target ∈ {0, 1, 2, 3, 4}` (severite).
- Cible binarisee: `target_bin = 1 si target > 0, sinon 0`.
Critere: C1

### Slide 7 - Variables cliniques (partie 1)
Contenu:
- Variables continues:
  - `age` : age du patient (annees)
  - `trestbps` : pression arterielle au repos (mm Hg)
  - `chol` : cholesterol serique (mg/dl)
  - `thalach` : frequence cardiaque maximale atteinte
  - `oldpeak` : depression ST induite par l'exercice
- Variables binaires:
  - `sex` : 1=homme, 0=femme
  - `fbs` : glycemie a jeun > 120 mg/dl (1=oui, 0=non)
  - `exang` : angine induite par l'exercice (1=oui, 0=non)
Critere: C1, C2

### Slide 8 - Variables cliniques (partie 2)
Contenu:
- Variables categorielles/discretes:
  - `cp` : type de douleur thoracique (1-4)
  - `restecg` : resultats ECG au repos (0-2)
  - `slope` : pente du segment ST a l'effort (1-3)
  - `ca` : nombre de vaisseaux colores par fluoroscopie (0-3)
  - `thal` : thalassemie (3=normal, 6=defaut fixe, 7=defaut reversible)
- Comprendre les variables **avant** de modéliser evite les erreurs d'interpretation.
Critere: C1, C2

### Slide 9 - Qualite des donnees
Contenu:
- Valeurs manquantes: `ca` (4 NaN) et `thal` (2 NaN) — ~2% du dataset.
- Strategie: conversion numerique (`pd.to_numeric`) + `dropna`.
- Resultat: 297 lignes conservees sur 303.
- Justification: 6 lignes supprimees = impact negligeable. Strategie simple, transparente, reproductible.
Critere: C2

### Slide 10 - Distribution de la cible
Contenu:
- Distribution brute (5 classes: 0, 1, 2, 3, 4) + distribution binaire.
- Apres binarisation: 54% absence (0) vs 46% presence (1).
- Dataset relativement equilibre → Accuracy interpretable mais insuffisante seule.
- Consequence: utiliser Recall, Precision, F1 en complement.
Critere: C2

### Slide 11 - Correlations exploratoires
Contenu:
- Heatmap des correlations de Pearson.
- Variables les plus associees a la cible: `thal`, `cp`, `ca`, `exang`, `oldpeak`, `thalach`.
- **Attention**: Pearson mesure uniquement les correlations **lineaires**.
  - Formule: $r_{xy} = \frac{\sum_{i=1}^n (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^n (x_i - \bar{x})^2 \sum_{i=1}^n (y_i - \bar{y})^2}}$
- Des relations non lineaires existent potentiellement → justifie l'emploi du Gradient Boosting.
Critere: C2

### Slide 12 - Split experimental
Contenu:
- Split train/test: 80%/20% stratifie (`random_state=42`).
- Verification: ~54%/46% dans les deux ensembles → stratification correcte.
- Train: 237 exemples, Test: 60 exemples.
- Limitation: 60 observations test = estimations sujettes a variabilite.
Critere: C2

### Slide 13 - Standardisation dans les pipelines
Contenu:
- Formule de standardisation (Z-score):
  $$z_i = \frac{x_i - \mu}{\sigma}$$
  ou $\mu$ est la moyenne et $\sigma$ l'ecart-type, estimes **uniquement sur le train**.
- Appliquee dans les pipelines pour Naive Bayes et Regression Logistique.
- **Non appliquee** pour Gradient Boosting: les arbres de decision sont **invariants a l'echelle** (coupures sur seuils, pas de comparaison inter-features).
- Integration dans `sklearn.Pipeline` → evite le **data leakage** (la moyenne test ne contamine pas le train).
Critere: C2, C3

---

## Bloc C - Theorie des modeles (Slides 14 a 25)

### Slide 14 - Baseline: Dummy Classifier
Contenu:
- Strategie: `most_frequent` → predit toujours la classe majoritaire (0 = absence).
- Predictions: $\hat{y}_i = \text{mode}(y_{train})$ pour tout $i$.
- Performances attendues: Accuracy = 54% (proportion classe 0), Recall = 0%, ROC-AUC = 0.500.
- Role: tout modele utile doit **surpasser cette baseline**.
Critere: C2, C3

### Slide 15 - Regression Logistique: principe
Contenu:
- Modele lineaire qui estime la probabilite d'appartenance a la classe 1.
- Combinaison lineaire:
  $$z = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_p x_p = \boldsymbol{\beta}^T \mathbf{x}$$
- Fonction sigmoide (logistique):
  $$P(y=1|\mathbf{x}) = \sigma(z) = \frac{1}{1 + e^{-z}}$$
- La sigmoide transforme le score lineaire en probabilite $\in [0, 1]$.
- Decision: si $P(y=1|\mathbf{x}) \geq \text{seuil}$ alors $\hat{y} = 1$, sinon $\hat{y} = 0$.
Critere: C1

### Slide 16 - Regression Logistique: fonction de cout et regularisation
Contenu:
- Fonction de cout (log-loss / entropie croisee binaire):
  $$J(\boldsymbol{\beta}) = -\frac{1}{n} \sum_{i=1}^n \left[ y_i \log(\hat{p}_i) + (1 - y_i) \log(1 - \hat{p}_i) \right]$$
- Regularisation L2 (Ridge), utilisee dans notre notebook (`penalty='l2'`):
  $$J_{reg}(\boldsymbol{\beta}) = J(\boldsymbol{\beta}) + \frac{1}{2C} \sum_{j=1}^p \beta_j^2$$
  ou $C$ est l'inverse de la force de regularisation.
- Role de la regularisation: penaliser les coefficients trop grands → reduire le surapprentissage.
- $C = 1.0$ (defaut): compromis entre flexibilite et regularisation.
Critere: C1, C3

### Slide 17 - Regression Logistique: hyperparametres
Contenu:
- `C=1.0`: inverse de la force de penalite L2. Valeur par defaut — compromis raisonnable.
- `penalty='l2'`: penalite Ridge. Stabilise les coefficients.
- `solver='lbfgs'`: solveur quasi-Newton, adapte aux petits datasets avec penalite L2.
- `max_iter=3000`: nombre d'iterations pour convergence.
- **Avantage**: les coefficients $\beta_j$ sont **interpretables** — signe positif = favorise la classe 1.
- **Non implemente**: tuning de C par GridSearchCV.
Critere: C1, C3

### Slide 18 - Naive Bayes: theoreme de Bayes
Contenu:
- Theoreme de Bayes applique a la classification:
  $$P(y=c|\mathbf{x}) = \frac{P(\mathbf{x}|y=c) \cdot P(y=c)}{P(\mathbf{x})}$$
- Hypothese naive: **independance conditionnelle** des features sachant la classe:
  $$P(\mathbf{x}|y=c) = \prod_{j=1}^p P(x_j|y=c)$$
- Decision: $\hat{y} = \arg\max_c P(y=c) \prod_{j=1}^p P(x_j|y=c)$
- L'hypothese d'independance est rarement vraie en pratique, mais le modele peut neanmoins bien performer.
Critere: C1

### Slide 19 - Naive Bayes: modele gaussien
Contenu:
- Pour des features continues, on utilise le Naive Bayes Gaussien.
- Chaque $P(x_j|y=c)$ est modelisee par une distribution normale:
  $$P(x_j|y=c) = \frac{1}{\sqrt{2\pi\sigma_{jc}^2}} \exp\left(-\frac{(x_j - \mu_{jc})^2}{2\sigma_{jc}^2}\right)$$
  ou $\mu_{jc}$ et $\sigma_{jc}^2$ sont estimes sur les exemples de la classe $c$.
- `var_smoothing` ($= 10^{-9}$): ajoute $\epsilon \cdot \max(\sigma^2)$ aux variances pour eviter les divisions par zero.
Critere: C1

### Slide 20 - Naive Bayes: hyperparametres et proprietes
Contenu:
- `var_smoothing=1e-9`: valeur par defaut scikit-learn. Regularisation minimale.
- **Avantages**: tres rapide, fonctionne bien avec peu de donnees, robuste au surapprentissage.
- **Inconvenient theorique**: l'hypothese d'independance est violee (les variables cliniques sont correlees).
- **Performance empirique**: malgre l'hypothese violee, Naive Bayes est souvent competitif en classification binaire — confirme sur ce dataset.
- **Non implemente**: tuning de var_smoothing.
Critere: C1, C3

### Slide 21 - Gradient Boosting: principe iteratif
Contenu:
- Modele d'ensemble **sequentiel**: chaque arbre corrige les erreurs du precedent.
- Initialisation: $F_0(\mathbf{x}) = \arg\min_\gamma \sum_{i=1}^n L(y_i, \gamma)$
- Iteration $m = 1, \dots, M$:
  1. Calculer les **pseudo-residus**: $r_{im} = -\frac{\partial L(y_i, F_{m-1}(\mathbf{x}_i))}{\partial F_{m-1}(\mathbf{x}_i)}$
  2. Ajuster un arbre $h_m(\mathbf{x})$ sur les pseudo-residus.
  3. Mettre a jour: $F_m(\mathbf{x}) = F_{m-1}(\mathbf{x}) + \eta \cdot h_m(\mathbf{x})$
- $\eta$ est le **learning rate** (taux d'apprentissage), $M$ est le nombre d'arbres (`n_estimators`).
Critere: C1

### Slide 22 - Gradient Boosting: fonction de perte
Contenu:
- Pour la classification binaire, la fonction de perte est la **deviance** (log-loss):
  $$L(y, F(\mathbf{x})) = -\left[ y \log(p) + (1-y) \log(1-p) \right]$$
  ou $p = \sigma(F(\mathbf{x})) = \frac{1}{1 + e^{-F(\mathbf{x})}}$.
- Les pseudo-residus deviennent: $r_i = y_i - p_i$
  (difference entre la vraie etiquette et la probabilite predite).
- Chaque arbre apprend a **reduire cette erreur residuelle**.
Critere: C1

### Slide 23 - Gradient Boosting: regularisation
Contenu:
- **Learning rate** ($\eta = 0.05$): reduit la contribution de chaque arbre. $\eta$ faible + $M$ eleve = apprentissage progressif.
- **Max depth** ($= 3$): profondeur limitee = apprenants **faibles** (stumps profonds). Reduit la complexite.
- **Min samples leaf** ($= 5$): chaque feuille doit contenir au moins 5 exemples → regularisation.
- **Subsample** ($= 0.9$): chaque arbre est entraine sur 90% du train → **stochasticite** qui reduit la variance (similaire au bagging).
- Compromis: $\eta \cdot M = 0.05 \times 200 = 10$, budget total modere.
Critere: C1, C3

### Slide 24 - Gradient Boosting: hyperparametres et risques
Contenu:
- `n_estimators=200`: nombre d'arbres. Compromis capacite/surapprentissage.
- `learning_rate=0.05`: regularisation douce, force un apprentissage incremental.
- `max_depth=3`, `min_samples_leaf=5`, `subsample=0.9`: trois mecanismes de regularisation cumulatifs.
- **Risque sur petit dataset**: meme avec regularisation, Gradient Boosting peut memoriser les donnees d'entrainement → train AUC = 1.000 observe dans notre experiment.
- **Non implemente**: tuning global (GridSearchCV/RandomizedSearchCV).
Critere: C1, C3

### Slide 25 - Comparaison theorique des 3 modeles
Contenu:
- Tableau comparatif:

| Propriete                | Reg. Logistique | Naive Bayes | Gradient Boosting |
|--------------------------|-----------------|-------------|-------------------|
| Type                     | Lineaire        | Probabiliste| Ensemble non-lin. |
| Interpretabilite         | Forte (coeff.)  | Moyenne     | Faible            |
| Risque surapprentissage  | Faible          | Faible      | Eleve             |
| Sensibilite a l'echelle  | Oui             | Oui         | Non               |
| Hypothese cle            | Linearite       | Independance| Aucune forte      |
| Complexite temporelle    | Faible          | Faible      | Elevee            |

- Le choix de 3 modeles vise la **diversite des approches**.
Critere: C1

---

## Bloc D - Protocole experimental et metriques (Slides 26 a 32)

### Slide 26 - Metriques: matrice de confusion
Contenu:
- Base de toutes les metriques de classification:

|                   | Predit Positif   | Predit Negatif   |
|-------------------|------------------|------------------|
| Reel Positif      | VP (Vrai Positif)| FN (Faux Negatif)|
| Reel Negatif      | FP (Faux Positif)| VN (Vrai Negatif)|

- $VP + FN + FP + VN = n$ (nombre total d'exemples test).
- Chaque metrique est une combinaison de ces 4 valeurs.
Critere: C1

### Slide 27 - Metriques: Accuracy, Precision, Recall
Contenu:
- **Accuracy** (exactitude):
  $$\text{Accuracy} = \frac{VP + VN}{VP + VN + FP + FN}$$
  Proportion de predictions correctes. Limitee si classes desequilibrees.

- **Precision** (valeur predictive positive):
  $$\text{Precision} = \frac{VP}{VP + FP}$$
  Parmi les predictions positives, combien sont correctes. Controle les fausses alertes.

- **Recall** (sensibilite, taux de vrais positifs):
  $$\text{Recall} = \frac{VP}{VP + FN}$$
  Parmi les vrais positifs, combien sont detectes. **Metrique prioritaire en depistage.**
Critere: C1, C6

### Slide 28 - Metriques: F1-score et Specificite
Contenu:
- **F1-score** (moyenne harmonique de Precision et Recall):
  $$F_1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}$$
  Compromis entre Precision et Recall. Penalise les desequilibres.

- **Specificite** (taux de vrais negatifs):
  $$\text{Specificite} = \frac{VN}{VN + FP}$$
  Parmi les vrais negatifs, combien sont correctement identifies.

- **Lien clinique**:
  - FN = patient malade non detecte → risque vital.
  - FP = patient sain oriente vers examens → cout modere.
Critere: C1, C6

### Slide 29 - ROC-AUC: definition mathematique
Contenu:
- La courbe ROC trace le **TPR** (Recall) vs le **FPR** ($1 - \text{Specificite}$) pour chaque seuil $t \in [0, 1]$:
  $$TPR(t) = P(\hat{p} \geq t | y = 1), \quad FPR(t) = P(\hat{p} \geq t | y = 0)$$
- L'aire sous la courbe (AUC):
  $$\text{AUC} = \int_0^1 TPR(FPR^{-1}(x)) \, dx$$
- **Interpretation probabiliste**: AUC = probabilite qu'un exemple positif ait un score plus eleve qu'un exemple negatif:
  $$\text{AUC} = P(\hat{p}_{positif} > \hat{p}_{negatif})$$
- AUC = 0.5 → classifieur aleatoire. AUC = 1.0 → classifieur parfait.
- **Avantage**: independant du seuil de decision.
Critere: C1

### Slide 30 - Validation croisee stratifiee
Contenu:
- **StratifiedKFold** ($K=5$, `shuffle=True`):
  - Le train est divise en $K$ folds de taille egale, en preservant les proportions de classes.
  - Pour chaque fold $k$: entrainer sur $K-1$ folds, evaluer sur le fold $k$.
- Score CV moyen:
  $$\bar{S} = \frac{1}{K} \sum_{k=1}^K S_k$$
  ou $S_k$ est le score (ex: ROC-AUC) sur le fold $k$.
- **Pourquoi stratifie?** Sur un petit dataset (237 train), un fold non stratifie pourrait avoir une proportion de classes tres differente → estimations instables.
Critere: C2, C3

### Slide 31 - CV gap: diagnostic de surapprentissage
Contenu:
- Definition du CV gap:
  $$\text{CV\_gap} = \bar{S}_{train} - \bar{S}_{test}$$
  ou $\bar{S}_{train}$ et $\bar{S}_{test}$ sont les moyennes des scores sur les folds d'entrainement et de test.
- Interpretation:
  - $\text{CV\_gap} \approx 0$: bon compromis biais-variance.
  - $\text{CV\_gap} \gg 0$: **surapprentissage** (le modele memorise le train).
  - $\text{CV\_gap} < 0$: rare, possible avec forte regularisation ou bruit.
- Nos resultats: NB=0.031, LogReg=0.047, **GB=0.138**.
Critere: C3

### Slide 32 - Brier score: calibration des probabilites
Contenu:
- Mesure la qualite des probabilites predites:
  $$\text{Brier} = \frac{1}{n} \sum_{i=1}^n (\hat{p}_i - y_i)^2$$
- Brier $\in [0, 1]$: 0 = calibration parfaite, 1 = pire calibration.
- **Interpretation**: si le modele predit $\hat{p} = 0.7$ pour un groupe de patients, environ 70% devraient etre reellement positifs. Le Brier score mesure cet ecart.
- En clinique, les probabilites servent directement a la decision → la calibration est cruciale.
Critere: C1, C6

---

## Bloc E - Resultats validation croisee (Slides 33 a 37)

### Slide 33 - Tableau CV complet
Contenu:
- Tableau CV trie par ROC-AUC (valeurs du notebook):

| Modele              | CV Accuracy | CV Recall | CV F1 | CV ROC-AUC | CV gap  |
|---------------------|-------------|-----------|-------|------------|---------|
| Naive Bayes         | 0.827       | 0.808     | 0.803 | 0.870      | 0.031   |
| Reg. Logistique     | 0.823       | 0.790     | 0.793 | 0.869      | 0.047   |
| Gradient Boosting   | 0.869       | 0.826     | 0.846 | 0.862      | 0.138   |
| Baseline Dummy      | 0.541       | 0.000     | 0.000 | 0.500      | 0.000   |

- Tous les modeles surpassent la baseline.
Critere: C3

### Slide 34 - CV: Naive Bayes
Contenu:
- CV ROC-AUC: 0.870 (meilleur).
- CV gap: 0.031 (le plus faible) → **meilleur compromis biais-variance**.
- Train AUC moyen: ~0.901 → le modele ne memorise pas.
- L'hypothese d'independance, bien que violee, ne degrade pas les performances en pratique.
Critere: C3

### Slide 35 - CV: Regression Logistique
Contenu:
- CV ROC-AUC: 0.869 (tres proche de NB).
- CV gap: 0.047 → compromis correct, surveillance recommandee.
- Train AUC moyen: ~0.916 → legere sur-estimation mais raisonnable.
- La regularisation L2 ($C=1.0$) contient le surapprentissage.
Critere: C3

### Slide 36 - CV: Gradient Boosting et surapprentissage
Contenu:
- CV ROC-AUC: 0.862 (le plus bas des 3 modeles non-dummy).
- **CV gap: 0.138** ← signal fort de surapprentissage.
- Train AUC moyen: 1.000 → **memorisation complete** des donnees d'entrainement.
- Malgre 3 mecanismes de regularisation (`max_depth=3`, `min_samples_leaf=5`, `subsample=0.9`), le modele surapprenait.
- **Cause probable**: combinaison petit dataset (237 exemples) + modele puissant.
Critere: C3, C6

### Slide 37 - Synthese CV
Contenu:
- Classement par robustesse (CV gap): NB > LogReg >> GB.
- Classement par discrimination (ROC-AUC): NB ≈ LogReg > GB.
- **Paradoxe**: GB a la meilleure Accuracy CV (0.869) mais le pire AUC et le plus fort surapprentissage → l'Accuracy seule est trompeuse.
- Hypothese a verifier sur le test: NB et LogReg devraient mieux generaliser que GB.
Critere: C3

---

## Bloc F - Resultats sur le jeu de test (Slides 38 a 44)

### Slide 38 - Tableau test complet
Contenu:
- Resultats test (valeurs du notebook):

| Modele              | Accuracy | Precision | Recall | Specificite | F1    | ROC-AUC | Delta CV |
|---------------------|----------|-----------|--------|-------------|-------|---------|----------|
| Reg. Logistique     | 0.833    | 0.846     | 0.786  | 0.875       | 0.815 | 0.950   | +0.080   |
| Naive Bayes         | 0.883    | 0.889     | 0.857  | 0.906       | 0.873 | 0.938   | +0.068   |
| Gradient Boosting   | 0.817    | 0.815     | 0.786  | 0.844       | 0.800 | 0.905   | +0.043   |
| Baseline Dummy      | 0.533    | 0.000     | 0.000  | 1.000       | 0.000 | 0.500   | 0.000    |

Critere: C3

### Slide 39 - Matrices de confusion
Contenu:
- Figure: 4 matrices de confusion (du notebook).
- Comparaison visuelle des profils d'erreurs.
- Baseline: 32 VN, 0 VP, 28 FN, 0 FP → cliniquement inutile.
Critere: C3

### Slide 40 - Analyse des erreurs FN vs FP
Contenu:
- Comparaison des faux negatifs (les plus critiques en depistage):
  - **Naive Bayes**: 4 FN sur 28 positifs = 14.3% de patients malades manques.
  - **Reg. Logistique**: 6 FN sur 28 = 21.4%.
  - **Gradient Boosting**: 6 FN sur 28 = 21.4%.
  - **Baseline**: 28 FN sur 28 = 100%.
- En depistage, chaque FN est un patient malade **non detecte** → Naive Bayes minimise ce risque.
Critere: C3, C6

### Slide 41 - Courbes ROC
Contenu:
- Figure: courbes ROC superposees (du notebook).
- LogReg (0.950) > NB (0.938) > GB (0.905) >> Baseline (0.500).
- La difference LogReg/NB est faible → choix final depend des priorites cliniques.
- Plus la courbe est proche du coin superieur gauche, meilleure est la discrimination.
Critere: C3

### Slide 42 - Rapports de classification
Contenu:
- Extrait des rapports (du notebook):
  - NB classe 1: Precision 0.889, Recall **0.857**, F1 0.873.
  - LogReg classe 1: Precision 0.846, Recall 0.786, F1 0.815.
  - GB classe 1: Precision 0.815, Recall 0.786, F1 0.800.
- Le Recall de la classe 1 (positifs) est la metrique la plus critique pour le depistage.
Critere: C3

### Slide 43 - Importance des variables
Contenu:
- Tableau (du notebook):

| Variable | GB importance | LogReg |coeff| |
|----------|---------------|---------------------|
| thal     | 0.219         | 0.739               |
| cp       | 0.207         | 0.508               |
| ca       | 0.124         | 0.958               |
| age      | 0.113         | 0.037               |
| oldpeak  | 0.095         | 0.444               |

- Variables recurrentes dans les deux modeles: **thal, cp, ca** → convergence rassurante.
- `age` importante pour GB mais pas pour LogReg → interaction non lineaire captee par les arbres.
Critere: C3, C6

### Slide 44 - Coherence CV-Test
Contenu:
- Les Deltas positifs (0.043 a 0.080) indiquent des performances test legerement superieures aux estimations CV.
- Cause probable: variabilite du petit echantillon test (60 obs.).
- **Rang preserve**: NB et LogReg dominent en CV et en test, GB reste en retrait.
- La coherence des rangs entre CV et test est un signal de fiabilite du protocole.
Critere: C3

---

## Bloc G - Analyse critique avancee (Slides 45 a 50)

### Slide 45 - Calibration: courbes et Brier score
Contenu:
- Figure: courbes de calibration (du notebook).
- **Brier scores** (du notebook):
  - Reg. Logistique: 0.094 (meilleur).
  - Naive Bayes: 0.098.
  - Gradient Boosting: 0.128 (pire).
- Rappel de la formule: $\text{Brier} = \frac{1}{n}\sum_{i=1}^n (\hat{p}_i - y_i)^2$
- En clinique, un modele bien calibre permet de dire: "Ce patient a 70% de risque" avec confiance.
Critere: C3, C6

### Slide 46 - Optimisation exploratoire du seuil
Contenu:
- Par defaut, le seuil de decision est $t = 0.5$: si $\hat{p} \geq 0.5$ → prediction positive.
- L'optimisation du seuil via la courbe Precision-Recall permet de trouver un $t$ qui maximise le Recall tout en controlant la Precision.
- Resultats (du notebook): seuil optimise = 0.151 pour Naive Bayes.
- **Mise en garde obligatoire**: ce seuil est ajuste sur le jeu de test actuel → **analyse exploratoire uniquement**.
- Pour une estimation non biaisee: fixer le seuil sur un jeu de validation separe puis evaluer sur un test externe.
Critere: C3, C6

### Slide 47 - Learning curves
Contenu:
- Figures: learning curves Train/Validation ROC-AUC vs taille d'entrainement (du notebook).
- **Gradient Boosting**: gap train/validation **persiste** meme avec plus de donnees → surapprentissage structurel.
- **Naive Bayes et Reg. Logistique**: les courbes **convergent** → bon compromis biais-variance.
- Formellement: si $S_{train}(n) - S_{val}(n) \to 0$ quand $n \to \infty$, le modele n'est pas en surapprentissage.
Critere: C3, C6

### Slide 48 - Synthese biais-variance: 3 preuves convergentes
Contenu:
- **Preuve 1 (CV gap, Section 4)**: GB=0.138 >> NB=0.031.
- **Preuve 2 (Learning curves, Section 6)**: GB gap persiste, NB/LogReg convergent.
- **Preuve 3 (Performance test, Section 5)**: GB en retrait (0.905) vs NB (0.938) et LogReg (0.950).
- **Conclusion**: le diagnostic de surapprentissage pour Gradient Boosting est **robuste** car soutenu par 3 evidences independantes et convergentes.
- Naive Bayes et Regression Logistique ont un profil plus adapte a ce petit dataset.
Critere: C3, C6

### Slide 49 - Limites de l'etude
Contenu:
- **Taille du dataset**: 297 observations, 60 en test → estimations sujettes a variabilite.
- **Pas de validation externe**: tous les resultats proviennent d'un seul dataset (Cleveland). Generalisation non garantie.
- **Pas de tuning des hyperparametres**: les performances pourraient etre ameliorees avec GridSearchCV/RandomizedSearchCV (non implemente).
- **Seuil exploratoire**: le seuil optimise est ajuste sur le test → risque d'optimisme.
- **Hypotheses des modeles**: independance de NB violee, linearite de LogReg potentiellement limitante.
- **Absence de tests statistiques formels**: la difference entre modeles n'est pas testee (McNemar non implemente).
Critere: C6

### Slide 50 - Validite et reproductibilite
Contenu:
- **Reproductibilite**: `random_state=42` partout → resultats identiques a chaque execution.
- **Pipeline integre**: StandardScaler dans sklearn.Pipeline → pas de data leakage.
- **Baseline Dummy**: gain reel mesure, non trivial.
- **CV stratifiee**: proportions de classes preservees dans chaque fold.
- Points forts du protocole: transparence, reproductibilite, metriques complementaires.
Critere: C2, C3

---

## Bloc H - Conclusion et perspectives (Slides 51 a 53)

### Slide 51 - Recommandation operationnelle
Contenu:
- **Scenario depistage** (priorite: minimiser les faux negatifs):
  - → **Naive Bayes**: Recall=0.857 (meilleur), F1=0.873, gap=0.031, Brier=0.098.
  - 4 FN sur 28 positifs → le moins de patients malades manques.

- **Scenario compromis global** (priorite: discrimination + interpretabilite):
  - → **Regression Logistique**: ROC-AUC=0.950 (meilleur), Brier=0.094, coefficients interpretables.
  - Les coefficients permettent d'expliquer la decision au medecin.

- **Gradient Boosting**: **non recommande** en l'etat sur ce dataset.
  - Surapprentissage demonstre par 3 preuves convergentes.
  - Pourrait beneficier d'un tuning d'hyperparametres (non implemente).
Critere: C5, C6

### Slide 52 - Perspectives non implementees
Contenu:
- **Tuning global** (GridSearchCV/RandomizedSearchCV): pourrait ameliorer GB.
- **Validation externe** sur d'autres cohortes UCI (Hungarian, Swiss, VA).
- **Calibration post-hoc** (Platt scaling / isotonic regression).
- **Methodes de regularisation**: Elastic Net ($\alpha L_1 + (1-\alpha) L_2$) pour regression; non directement applicable a la classification binaire actuelle.
- **Tests statistiques**: McNemar pour comparer formellement les classifieurs.
- **Explicabilite**: SHAP values pour comprendre les predictions individuelles.
- **Validation croisee repetee**: K-fold repete pour des estimations plus stables.
- Tous ces elements sont **non implementes dans ce notebook**.
Critere: C4, C6

### Slide 53 - Questions & Reponses
Contenu:
- Resume en une phrase: "Naive Bayes pour depister, Regression Logistique pour decider, Gradient Boosting a eviter sans tuning."
- Ouverture aux questions du jury.
- Slides de backup disponibles (definitions, justifications, methodologie, analyse critique).
Critere: C5

---

## Slides de Backup (hors 53)

### Backup 1 - Definitions N1
- Rappels rapides des 3 modeles: principes, forces, faiblesses.
- Formules cles: sigmoide, Bayes, mise a jour GB.

### Backup 2 - Justification N2
- Avantages/inconvenients par modele.
- Cas d'usage concrets.

### Backup 3 - Methodologie N3
- Pipeline complet: baseline → CV → test → calibration → seuil.
- Data leakage: explication et prevention.

### Backup 4 - Analyse critique N4
- Surapprentissage: CV gap + learning curves + performance test.
- 3 preuves convergentes detaillees.

---

## Checklist finale avant soutenance

1. Chaque chiffre annonce est present dans une sortie du notebook.
2. Aucun tableau incomplet.
3. Chaque conclusion a une figure associee.
4. Aucune methode citee sans implementation.
5. Les elements non implementes sont annonces explicitement comme perspectives.
6. Chaque hyperparametre cite est justifie.
7. La distinction ROC-AUC (classement) vs seuil (decision) est claire.
8. Les limites sont explicites et honnetes.
9. Chaque formule mathematique est expliquee en mots et reliee au contexte clinique.
10. Les 3 preuves de surapprentissage de GB sont presentees de maniere convergente.
