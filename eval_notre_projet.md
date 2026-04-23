
RAPPORT D'ÉVALUATION
Mini-projet Machine Learning
Thème : Classification de maladies cardiaques — Gradient Boosting, Naive Bayes & Regression Logistique

Cours : Machine Learning — ISIC 2026
NOTE GLOBALE
16.5 / 20
Avril 2026


Introduction — Verdict d'ensemble

Cette présentation aborde un sujet classique et stratégique du Machine Learning supervisé : la classification binaire appliquée au dépistage médical. Le notebook compare trois classifieurs (Gradient Boosting, Naive Bayes Gaussien, Régression Logistique) sur le dataset UCI Heart Disease (Cleveland), en suivant un workflow complet : chargement, nettoyage, exploration, pipeline de modélisation, validation croisée stratifiée, évaluation sur jeu de test hold-out, et analyse critique approfondie incluant calibration, optimisation du seuil, learning curves et diagnostic de surapprentissage.

Le travail témoigne d'une bonne maîtrise du pipeline de Machine Learning, d'une rigueur expérimentale appréciable (baseline Dummy, StandardScaler dans les pipelines, split stratifié, CV 5-fold) et d'un esprit critique réel — en particulier le diagnostic convergent du surapprentissage de Gradient Boosting via trois preuves indépendantes (CV gap, learning curves, performance test). La présentation de 53 slides inclut des expressions mathématiques pour chaque modèle et chaque métrique, ce qui est un point fort notable.

Cependant, plusieurs points méritent d'être relevés : l'absence de tuning des hyperparamètres, le manque de formules mathématiques directement dans le notebook (elles n'apparaissent que dans le guide de présentation), la taille modeste du dataset qui limite la portée des conclusions, et quelques interprétations qui pourraient être plus nuancées. Ce rapport suit l'ordre des cellules du notebook pour que les remarques puissent être directement associées au support.

Grille de notation par critère

Critère                          Note /20    Observation
Contenu & rigueur mathématique   15          Formules dans les slides, mais absentes du notebook
Pédagogie & progression          17          Excellente narration avant/après chaque section
Enchaînement & cohérence         18          Flux logique irréprochable, aucune incohérence numérique
Expérimentation & résultats      16          Protocole solide, mais tuning absent
Visualisations & graphiques      17          Matrices, ROC, calibration, learning curves — complet
Structure & transitions          18          15 cellules bien structurées, markdown de qualité

NOTE FINALE (moyenne pondérée)   16.5 / 20


Analyse cellule par cellule

Cellule 0 — Section 0 : Contexte, théorie et objectif (Markdown)

POINT FORT
Cadrage exhaustif et structuré


La cellule introductive est remarquablement complète. Elle présente :
- La problématique clinique (asymétrie des coûts FN/FP — bien formulée).
- La question de recherche explicite.
- Les objectifs mesurables.
- Un tableau des 13 variables cliniques avec types — excellent, cela montre que l'étudiant comprend les données avant de modéliser.
- Le cadre méthodologique complet.
- Le positionnement critique : ce qui est implémenté ET ce qui ne l'est pas.

C'est un modèle de section introductive pour un projet ML. La mention explicite des perspectives non implémentées (GridSearchCV, validation externe, Elastic Net, McNemar) préemptive les critiques et témoigne d'une maturité méthodologique.


ATTENTION
Variables cliniques : précision médicale perfectible


Le tableau des variables est bien structuré mais pourrait être enrichi avec les plages de valeurs normales/pathologiques (ex: trestbps > 140 mm Hg = hypertension, chol > 200 mg/dl = hypercholestérolémie). Ces seuils cliniques auraient renforcé le lien entre les données brutes et leur signification médicale.


REMARQUE
Formules mathématiques absentes du notebook


Les slides (53 slides) contiennent des formules LaTeX rigoureuses pour chaque modèle et chaque métrique, mais le notebook lui-même ne contient aucune expression mathématique dans ses cellules markdown. Pour un rapport de projet ML, inclure les formules clés directement dans le notebook (la sigmoide, le théorème de Bayes, l'itération GB, les métriques) aurait renforcé l'autonomie du document comme support complet.

Suggestion : Ajouter les formules clés dans les cellules markdown du notebook pour que celui-ci soit auto-suffisant sans référencer les slides.


Cellule 1 — Section 1 : Importation et chargement du dataset UCI (Code)

POINT FORT
Chargement reproductible et explicite


Le dataset est chargé directement depuis l'URL UCI avec des noms de colonnes explicites (column_names). Le choix de charger depuis la source originale (plutôt qu'un fichier local) est une bonne pratique de reproductibilité. L'affichage des dimensions et des premières lignes est correct.


REMARQUE
URL de chargement : robustesse en cas d'indisponibilité


Le fichier est chargé depuis une URL distante. En cas d'indisponibilité de l'archive UCI, le notebook échouerait à la première cellule. Une bonne pratique complémentaire serait de prévoir un fallback local (fichier CSV dans le dépôt) avec un try/except.


Cellule 2 — Objectif de l'exploration initiale (Markdown)

POINT FORT
Narration avant le code


L'ajout d'une cellule markdown AVANT le code d'exploration est une excellente pratique pédagogique. Elle prépare le lecteur en listant les trois vérifications à effectuer (valeurs manquantes, distribution cible, corrélations). C'est exactement ce qui manquait dans de nombreuses présentations évaluées — le code ne tombe pas du ciel, il est motivé.


Cellule 3 — Section 2 : Exploration initiale (Code)

POINT FORT
Exploration ciblée et pertinente


La vérification des valeurs manquantes, l'affichage de la distribution de la cible, et la heatmap de corrélation sont les trois analyses exploratoires fondamentales pour ce type de dataset. Le code est clair et concis.


ATTENTION
Heatmap : corrélations de Pearson uniquement


La heatmap utilise les corrélations de Pearson (corrélation linéaire). Pour un dataset contenant des variables catégorielles (cp, thal, restecg, slope), Pearson peut sous-estimer les associations réelles. Des méthodes comme le V de Cramér (variables catégorielles) ou le coefficient de corrélation biserial ponctuel (binaire × continue) auraient été plus appropriées.

Ce n'est pas une erreur — Pearson est le choix standard pour une exploration rapide — mais la limite est correctement mentionnée dans la cellule markdown d'interprétation qui suit.


Cellule 4 — Interprétation de l'exploration (Markdown)

POINT FORT
Interprétation des résultats après le code


La cellule interprète correctement les résultats de l'exploration :
- Valeurs manquantes : stratégie dropna justifiée (2% du dataset).
- Distribution de la cible : conséquence correcte sur le choix des métriques.
- Corrélations : note pertinente que Pearson est linéaire et que des relations non linéaires justifient Gradient Boosting.

Cette structure « code → interprétation » est exactement ce qui est attendu dans un rapport ML de qualité.


REMARQUE
Interprétation des valeurs manquantes : rigueur perfectible


L'affirmation « 6 lignes supprimées, 297 conservées » est correcte mais la stratégie mériterait une phrase de justification plus formelle : expliquer pourquoi dropna est préférable à l'imputation (ex : KNN imputer, médiane) pour un si petit nombre de valeurs manquantes. La réponse est simple (6 lignes = ~2%, imputer introduirait un biais potentiel pour un gain marginal) mais l'expliciter renforcerait le raisonnement.


Cellule 5 — Stratégie de préparation des données (Markdown)

POINT FORT
Pipeline de préparation explicitement documenté


La description en 4 étapes (conversion → dropna → binarisation → split) est claire et bien ordonnée. La mention explicite du data leakage et de l'intégration du StandardScaler dans les pipelines est un point fort important — c'est une erreur fréquente dans les projets ML et ici elle est correctement anticipée.


Cellule 6 — Section 3 : Préparation des données (Code)

Le code de préparation est correct :
- `pd.to_numeric` avec `errors='coerce'` pour gérer les '?'.
- `dropna` pour les 6 lignes incomplètes.
- Binarisation de la cible.
- `train_test_split` avec `stratify` et `random_state=42` pour reproductibilité.


POINT FORT
Stratification vérifiée


L'affichage des proportions de classes dans train et test confirme que la stratification fonctionne correctement. C'est un diagnostic rarement fait mais pourtant essentiel.


Cellule 7 — Vérification du split (Markdown)

Confirmation quantitative de la stratification. Bonne pratique.


Cellule 8 — Choix des modèles et protocole de validation (Markdown)

POINT FORT
Justification systématique des hyperparamètres — meilleure pratique


C'est la cellule la plus critique et elle est très bien réalisée. Chaque hyperparamètre de chaque modèle est :
1. Nommé avec sa valeur.
2. Justifié dans son rôle.
3. Contextualisé (pourquoi cette valeur plutôt qu'une autre).

La section explique également pourquoi le StandardScaler est absent pour Gradient Boosting (invariance d'échelle des arbres) — un point rarement mentionné mais fondamental.

La mention « Note : ces valeurs sont des choix raisonnables sans tuning global » est honnête et préemptive. C'est la bonne approche : reconnaître la limite plutôt que la cacher.


ATTENTION
Hyperparamètres : choix « raisonnables » mais non optimisés


Bien que chaque hyperparamètre soit justifié individuellement, le fait qu'aucun tuning (GridSearchCV, RandomizedSearchCV) n'ait été effectué reste une limitation significative. Les valeurs choisies sont des défauts raisonnables, mais il est impossible de savoir si Gradient Boosting performerait significativement mieux avec d'autres paramètres.

En particulier, le surapprentissage de GB (gap 0.138) pourrait potentiellement être réduit par un learning_rate plus faible combiné à plus d'arbres et un early stopping — ce qui n'est pas exploré ici.

Impact sur la note : pénalité modérée car la limitation est explicitement reconnue et listée comme perspective.


ERREUR MINEURE
Ensemble du budget Gradient Boosting : « budget total modéré » sans définition


La phrase « le budget total reste modéré » à propos de learning_rate × n_estimators est une idée pertinente mais le concept de « budget » n'est jamais formellement défini. En Gradient Boosting, le produit η × M (learning rate × nombre d'arbres) est parfois appelé « effective learning capacity » mais ce n'est pas un terme technique standard. Soit le définir, soit le supprimer.


Cellule 9 — Section 4 : Entraînement et validation croisée (Code)

POINT FORT
Pipeline sklearn bien conçu


L'utilisation de `sklearn.Pipeline` pour encapsuler StandardScaler + modèle est la bonne pratique. La baseline Dummy est incluse dans la comparaison — ce qui permet de quantifier le gain réel. La validation croisée stratifiée 5-fold avec `cross_validate` et des scoring multiples (accuracy, precision, recall, f1, roc_auc) est complète.


POINT FORT
CV gap calculé explicitement


Le calcul explicite du CV_gap_ROC_AUC (train_auc - test_auc) est un diagnostic rarement fait dans les projets étudiants. Il permet de détecter le surapprentissage avant même l'évaluation sur le test. Le gap de 0.138 pour Gradient Boosting (train AUC = 1.000) est un signal fort et correctement interprété.


ATTENTION
Nombre de folds : 5 vs 10


Le choix de 5 folds (plutôt que 10, qui est le standard le plus courant) n'est pas justifié. Avec 237 exemples d'entraînement, K=5 donne des folds de ~47 exemples et des ensembles d'entraînement de ~190. K=10 donnerait des folds de ~24 et des ensembles de ~213. Le choix de K=5 est raisonnable (variance moindre) mais K=10 donnerait une estimation avec moins de biais. Une phrase de justification aurait été bienvenue.


Cellule 10 — Lecture des résultats CV (Markdown)

POINT FORT
Interprétation structurée en 5 constats


Les 5 constats sont numérotés, chiffrés et contextualisés :
1. Tous les modèles surpassent la baseline.
2. NB et LogReg proches en AUC.
3. GB sous-performe avec gap élevé.
4. NB a le meilleur compromis biais-variance.
5. Annonce de la vérification sur le test.

C'est un modèle d'interprétation de résultats CV.


ATTENTION
Constat 3 — « Gradient Boosting a un ROC-AUC CV légèrement inférieur »


Le mot « légèrement » est discutable. La différence entre GB (0.862) et NB (0.870) est de 0.008 — effectivement faible en valeur absolue. Mais combinée au gap de 0.138, la situation de GB est significativement plus problématique que ce que « légèrement » laisse entendre. La formulation aurait pu être plus directe : « le ROC-AUC CV le plus faible des trois modèles, aggravé par un CV gap très élevé ».


Cellule 11 — Évaluation finale sur le jeu de test (Markdown)

Bonne transition expliquant pourquoi l'évaluation test est nécessaire après la CV. La description des visualisations incluses et la définition du Delta_Test_minus_CV_AUC sont claires.


Cellule 12 — Section 5 : Évaluation finale sur test (Code)

POINT FORT
Evaluation complète et multi-dimensionnelle


La cellule produit :
- Un tableau de métriques test complet (Accuracy, Precision, Recall, Specificity, F1, ROC-AUC, Delta).
- 4 matrices de confusion (une par modèle, incluant la baseline).
- Courbes ROC superposées sur un même graphique.
- Rapports de classification texte.

Ce package d'évaluation est complet et permet une comparaison approfondie.


POINT FORT
Cohérence numérique parfaite


Aucune incohérence numérique n'a été détectée entre les cellules markdown et les sorties de code. Tous les chiffres cités dans les interprétations correspondent exactement aux outputs. C'est une qualité fondamentale qui manquait dans d'autres présentations évaluées (cf. diapos 27/32/33 de la présentation Ridge & Lasso).


ATTENTION
Taille du jeu de test : 60 observations


Le jeu de test ne contient que 60 observations (28 positifs, 32 négatifs). Avec un si petit échantillon, un seul patient reclassé peut faire varier le Recall de ±3.6%. Les performances rapportées doivent être interprétées avec prudence — les intervalles de confiance sont larges. Cette limitation est mentionnée dans la cellule markdown d'interprétation mais pourrait être quantifiée (ex: intervalle de confiance binomial sur le Recall).


Cellule 13 — Interprétation des résultats test (Markdown)

POINT FORT
Interprétation structurée en 4 sous-sections


L'interprétation couvre :
1. Performances globales (avec chiffres).
2. Analyse des erreurs via matrices de confusion (FN vs FP).
3. Courbes ROC.
4. Cohérence CV-Test.

La mention des faux négatifs comme « patients malades non détectés avec conséquences potentiellement graves » est exactement le type de lien clinique attendu.


ERREUR MINEURE
Analyse des faux négatifs : chiffres à vérifier


La cellule mentionne « 4 faux négatifs seulement sur 28 cas positifs » pour Naive Bayes. Ce chiffre doit correspondre exactement à la matrice de confusion produite par le code. Si le seuil par défaut (0.5) est utilisé, le Recall de 0.857 sur 28 positifs donne 24 VP et 4 FN — le chiffre est correct. Pour Logistic Regression et Gradient Boosting, Recall = 0.786 donne 22 VP et 6 FN.

Note : Les chiffres sont cohérents. Le commentaire « 6 faux négatifs » est mathématiquement exact (28 × (1 - 0.786) ≈ 6).


Cellule 14 — Section 6 : Analyse critique approfondie (Code)

POINT FORT
Analyse critique la plus complète observée


Cette cellule est le point fort majeur du notebook. Elle contient :
1. Identification automatique du meilleur modèle (ROC-AUC et Recall).
2. Gain par rapport à la baseline (chiffré).
3. Diagnostic de surapprentissage via CV gap (avec interprétation).
4. Importance des variables (GB feature_importances_ vs LogReg coefficients absolus).
5. Learning curves train/validation pour chaque modèle.
6. Courbes de calibration + Brier score.
7. Optimisation exploratoire du seuil via Precision-Recall.
8. Limites et perspectives explicites.

Ce niveau d'analyse critique dépasse significativement ce qui est attendu dans la plupart des projets étudiants.


POINT FORT
Trois preuves convergentes de surapprentissage


Le diagnostic de surapprentissage de Gradient Boosting est soutenu par trois évidences convergentes :
1. CV gap de 0.138 (Section 4).
2. Learning curves avec gap train/validation persistant (Section 6).
3. Performance test en retrait (Section 5).

Cette approche multi-preuves est un signe de rigueur analytique. Elle évite le piège de conclure sur la base d'un seul indicateur.


POINT FORT
Mise en garde sur le seuil optimisé


La mention explicite que le seuil optimisé est ajusté sur le jeu de test actuel (et donc biaisé) est une preuve d'honnêteté scientifique. La recommandation de fixer le seuil sur un jeu de validation interne puis d'évaluer sur un test externe est correcte méthodologiquement.


ATTENTION
Calibration : interprétation à développer


Les courbes de calibration et les Brier scores sont calculés (Logistique 0.094, NB 0.098, GB 0.128) mais leur interprétation dans le notebook est succincte. Il manque une explication de ce que signifie « un modèle bien calibré » en termes cliniques : si le modèle annonce 70% de risque pour un patient, on s'attend à ce que ~70% des patients similaires soient effectivement malades. Le Brier score quantifie cet écart moyen. Cette interprétation est présente dans les slides mais absente du notebook.


ATTENTION
Importance des variables : deux méthodes non directement comparables


Les feature importances de GB (basées sur la réduction de l'impureté Gini/deviance) et les coefficients absolus de la Régression Logistique ne mesurent pas la même chose. Les premières mesurent la réduction de l'erreur apportée par chaque variable dans l'ensemble des arbres. Les seconds mesurent l'effet marginal linéaire standardisé. Comparer directement les magnitudes est discutable — ce qui est plus fiable, c'est la convergence des tops variables (thal, cp, ca apparaissent dans les deux classements), ce qui est correctement noté.


ERREUR
Learning curves : axe Y non toujours clairement identifié


Les learning curves tracent le ROC-AUC en fonction de la taille d'entraînement. Si le graphique n'a pas d'annotation claire « train » vs « validation » avec une légende explicite, la lecture peut être ambiguë. Vérifier que chaque courbe est clairement identifiée dans la légende du graphique.


Structure de la présentation (53 slides)

POINT FORT
53 slides avec expressions mathématiques


La structure de présentation est exceptionnellement complète :
- 8 blocs thématiques (A à H) couvrant tout le workflow.
- Formules LaTeX pour chaque modèle : sigmoide, log-loss, L2, Bayes, Gaussien, itération GB, deviance.
- Formules pour chaque métrique : Accuracy, Precision, Recall, F1, Spécificité, ROC-AUC (intégrale ET interprétation probabiliste), Brier score.
- Formules pour le protocole : CV gap, standardisation Z-score, Pearson.
- Distinction claire entre ROC-AUC (classement indépendant du seuil) et choix du seuil (décision clinique).

Ce niveau de détail mathématique est au-dessus de la moyenne des présentations évaluées.


POINT FORT
Slides de backup pour la défense orale


Les 4 slides de backup (définitions N1, justification N2, méthodologie N3, analyse critique N4) montrent une préparation sérieuse pour les questions du jury.


ATTENTION
Slides 33-36 : résultats CV par modèle — risque de redondance


Les résultats CV sont présentés d'abord dans un tableau global (Slide 33) puis modèle par modèle (Slides 34-36). Si le temps de présentation est limité, ces 3 slides individuelles pourraient être fusionnées en une seule slide de synthèse avec les points clés de chaque modèle. Cela dit, la granularité est appréciable pour une présentation longue.


Compléments théoriques et méthodologiques

1. Tuning des hyperparamètres — absence significative mais honnêtement reconnue

ATTENTION
GridSearchCV / RandomizedSearchCV non implémenté


C'est la limitation la plus significative du projet. Le notebook utilise des hyperparamètres « raisonnables » mais non optimisés. En particulier :
- Gradient Boosting pourrait bénéficier d'un learning_rate plus agressif (0.01) avec plus d'arbres (500) et un early stopping basé sur la validation.
- La Régression Logistique pourrait être testée avec différentes valeurs de C (ex: [0.01, 0.1, 1, 10, 100]).
- Naive Bayes pourrait être comparé avec ComplementNB ou BernoulliNB.

Impact sur la note : pénalité modérée (−1 point) car la limitation est explicitement reconnue dans la Section 0 et les perspectives.


2. Elastic Net et méthodes de régularisation

REMARQUE
Elastic Net correctement positionné comme perspective hors périmètre


Le notebook mentionne Elastic Net comme perspective non implémentée. C'est la bonne approche pour un projet de classification binaire : Elastic Net (αL1 + (1−α)L2) est principalement pertinent pour la régression et la régression logistique avec sélection de variables. Sur ce dataset à 13 features, la sélection de variables n'est pas un enjeu critique. La mention comme perspective est suffisante.


3. Tests statistiques de comparaison de classifieurs

REMARQUE
McNemar non implémenté — perspective correctement identifiée


Pour comparer formellement deux classifieurs, le test de McNemar examine la table de contingence des prédictions discordantes. Sur 60 observations test, le test aurait un faible pouvoir statistique de toute façon. La mention comme perspective est appropriée.


4. Validation externe

ATTENTION
Absence de validation externe — limitation majeure


Tous les résultats proviennent d'un seul dataset (Cleveland, 297 observations). Les autres cohortes UCI (Hungarian, Swiss, VA Long Beach) pourraient servir de validation externe. Cette limitation est correctement mentionnée mais sa gravité pourrait être davantage soulignée : sans validation externe, aucune conclusion clinique ne peut être tirée.


5. SHAP / Explicabilité

REMARQUE
SHAP non implémenté


L'utilisations de SHAP (SHapley Additive exPlanations) pour l'explicabilité individuelle des prédictions est une perspective intéressante. Les feature importances globales (GB) et les coefficients (LogReg) donnent une vue agrégée, mais SHAP permettrait d'expliquer pourquoi un patient spécifique est classé à risque. Pour un contexte médical, cette explicabilité individuelle est particulièrement pertinente.


Améliorations prioritaires (par ordre d'urgence)

1. Ajouter les formules mathématiques clés dans le notebook. Les slides contiennent des formules rigoureuses, mais le notebook devrait être auto-suffisant. Ajouter au minimum : la sigmoide, le théorème de Bayes, l'itération GB, et les formules des métriques.

2. Implémenter un tuning minimal des hyperparamètres. Même un RandomizedSearchCV simple sur Gradient Boosting permettrait de répondre à la question : « Le surapprentissage est-il dû aux hyperparamètres ou à la nature du modèle sur ce dataset ? »

3. Quantifier l'incertitude. Ajouter des intervalles de confiance bootstrap sur les métriques test (60 observations = forte variabilité).

4. Enrichir l'interprétation de la calibration dans le notebook. Les Brier scores sont calculés mais peu interprétés dans le notebook (l'interprétation est dans les slides).

5. Ajouter la corrélation de Pearson entre les features (pas seulement avec la cible). Pour identifier les multicolinéarités potentielles (ex: thalach/age, ca/thal) et enrichir l'analyse exploratoire.


Conclusion

Ce travail témoigne d'une maîtrise solide du pipeline complet de Machine Learning en classification supervisée. Les points forts sont nombreux et significatifs :

1. **Structure narrative** : chaque section de code est encadrée par des cellules markdown « pourquoi » (avant) et « interprétation » (après). Cette structure est un modèle de clarté pédagogique.

2. **Rigueur expérimentale** : baseline Dummy, split stratifié, StandardScaler dans les pipelines (pas de data leakage), CV stratifiée 5-fold, et évaluation multi-métrique. Le protocole est reproductible (random_state fixe) et bien justifié.

3. **Esprit critique** : le diagnostic de surapprentissage de Gradient Boosting par trois preuves convergentes (CV gap, learning curves, performance test) est un exemple de rigueur analytique. La transparence sur les limitations (pas de tuning, pas de validation externe, seuil exploratoire) renforce la crédibilité du travail.

4. **Présentation mathématique** : les 53 slides incluent des formules LaTeX pour chaque modèle (sigmoide, Bayes, GB itératif) et chaque métrique (ROC-AUC intégrale, Brier, F1). Le niveau de détail mathématique est au-dessus de la moyenne.

5. **Honneté scientifique** : les éléments non implémentés sont explicitement listés comme perspectives, pas cachés. Aucune méthode citée qui n'est pas dans le code.

Les points faibles sont réels mais modérés :

1. **Tuning absent** : des hyperparamètres justifiés mais non optimisés. C'est la principale faiblesse méthodologique.

2. **Formules absentes du notebook** : elles sont dans les slides mais pas dans le support principal (le notebook). L'auto-suffisance du notebook est réduite.

3. **Incertitude non quantifiée** : sur 60 observations test, les intervalles de confiance sont larges mais non calculés.

4. **Corrélations inter-features** : la heatmap montre toutes les corrélations mais l'analyse ne distingue pas explicitement la multicolinéarité (feature-feature) de la corrélation avec la cible (feature-target) — distinction pourtant fondamentale en ML supervisé.

La note de **16.5 / 20** reflète un travail dont la structure, la rigueur expérimentale et l'esprit critique sont solides, avec une présentation mathématique de qualité. L'absence de tuning et de formules dans le notebook empêche un score plus élevé. Avec l'ajout d'un tuning minimal, de formules dans le notebook et d'intervalles de confiance, ce travail pourrait facilement atteindre **18 / 20**.


Questionnaire d'évaluation — Classification cardiaque

Les questions suivantes sont destinées à évaluer les connaissances des étudiants à l'issue de leur présentation. Elles couvrent les concepts fondamentaux, les pièges classiques et les applications pratiques.

Question 1 — Fondements des modèles

Énoncé : Expliquez brièvement le principe de fonctionnement de chacun des trois modèles (Gradient Boosting, Naive Bayes, Régression Logistique). Pour chaque modèle, donnez la formule clé et identifiez l'hypothèse principale.


POINT FORT
Corrigé Q1


Gradient Boosting : Modèle d'ensemble séquentiel. Chaque arbre h_m corrige les pseudo-résidus du modèle précédent. Mise à jour : F_m(x) = F_{m-1}(x) + η·h_m(x). Hypothèse : la combinaison d'apprenants faibles forme un apprenant fort (boosting). Pas d'hypothèse forte sur la distribution des données.

Naive Bayes : Application du théorème de Bayes avec hypothèse d'indépendance conditionnelle. P(y=c|x) ∝ P(y=c)·∏P(x_j|y=c). Hypothèse principale : les features sont indépendantes conditionnellement à la classe (rarement vraie en pratique, mais le modèle est robuste à cette violation).

Régression Logistique : Modèle linéaire avec fonction sigmoide. P(y=1|x) = 1/(1+e^{-β^Tx}). Hypothèse : relation linéaire entre le log-odds et les features (log(p/(1-p)) = β^Tx).


Question 2 — Asymétrie des coûts d'erreur

Énoncé : Dans le contexte du dépistage cardiaque, expliquez pourquoi le Recall est plus important que la Precision. Donnez un exemple concret de faux négatif et de faux positif, et leurs conséquences cliniques respectives.


POINT FORT
Corrigé Q2


Faux négatif (FN) : un patient atteint de maladie cardiaque est classé comme sain. Conséquence : pas de traitement, pas de suivi, risque d'infarctus ou de décès. Coût très élevé (potentiellement irréversible).

Faux positif (FP) : un patient sain est classé comme malade. Conséquence : examens complémentaires (échocardiographie, coronarographie), anxiété, coûts financiers. Coût modéré (réversible, le patient sera finalement correctement diagnostiqué).

Le Recall (= VP/(VP+FN)) mesure la proportion de vrais malades correctement détectés. Maximiser le Recall minimise les FN. En dépistage, rater un malade est plus grave que fausser une alerte.


Question 3 — Surapprentissage de Gradient Boosting

Énoncé : Vous observez un CV gap de 0.138 pour Gradient Boosting (train AUC = 1.000, test AUC = 0.862). (a) Qu'est-ce que cela signifie ? (b) Quelles autres preuves confirment ce diagnostic ? (c) Proposez deux stratégies pour réduire ce surapprentissage.


POINT FORT
Corrigé Q3


(a) Le gap de 0.138 signifie que le modèle mémorise les données d'entraînement (AUC parfait de 1.000) mais généralise significativement moins bien sur les folds de validation (AUC moyen 0.862). C'est un surapprentissage : haute variance, bonne performance sur train, dégradée sur données non vues.

(b) Deux preuves convergentes :
- Learning curves (Section 6) : le gap train/validation persiste même en augmentant la taille d'entraînement → surapprentissage structurel.
- Performance test (Section 5) : GB obtient le ROC-AUC test le plus faible (0.905) vs NB (0.938) et LogReg (0.950).

(c) Deux stratégies :
- Réduire la complexité : diminuer max_depth (de 3 à 2), augmenter min_samples_leaf (de 5 à 10), réduire n_estimators.
- Early stopping : arrêter l'entraînement quand la performance de validation cesse de s'améliorer (paramètre n_iter_no_change dans sklearn).


Question 4 — StandardScaler et invariance d'échelle

Énoncé : (a) Pourquoi le StandardScaler est appliqué pour Naive Bayes et Régression Logistique mais pas pour Gradient Boosting ? (b) Où doit-on placer le StandardScaler dans le pipeline et pourquoi ? (c) Que se passe-t-il si on standardise sur l'ensemble du dataset avant le split ?


POINT FORT
Corrigé Q4


(a) Les arbres de décision (et donc Gradient Boosting) sont invariants à l'échelle : ils comparent chaque feature à des seuils, jamais entre features. Un arbre sur trestbps ∈ [80, 200] fonctionne identiquement sur z_trestbps ∈ [-2, 2]. La Régression Logistique et Naive Bayes comparent les magnitudes des coefficients/paramètres, donc la standardisation les rend comparables.

(b) Le StandardScaler est dans le sklearn.Pipeline : fit_transform est appelé uniquement sur X_train, transform est appelé sur X_test. Cela garantit que les statistiques (μ, σ) sont calculées exclusivement sur les données d'entraînement.

(c) Si on standardise sur tout le dataset : la moyenne et l'écart-type du StandardScaler sont contaminés par les données de test → data leakage. Les statistiques de test « fuient » dans l'entraînement, ce qui donne des estimations de performance artificiellement élevées et non reproductibles en production.


Question 5 — Calibration des probabilités

Énoncé : (a) Qu'est-ce qu'un modèle « bien calibré » ? (b) Donnez la formule du Brier score et interprétez les valeurs obtenues dans votre projet. (c) Pourquoi la calibration est-elle importante en contexte médical ?


POINT FORT
Corrigé Q5


(a) Un modèle bien calibré produit des probabilités fiables : si le modèle annonce P(maladie) = 0.7 pour un groupe de patients, environ 70% d'entre eux devraient effectivement être malades. Géométriquement, la courbe de calibration (fraction de positifs vs probabilité prédite) suit la diagonale.

(b) Brier = (1/n)·Σ(p̂_i − y_i)². Plus le Brier est bas, meilleure est la calibration. Résultats : LogReg 0.094 (meilleur), NB 0.098, GB 0.128 (pire). La Régression Logistique produit les probabilités les plus fiables.

(c) En médecine, les probabilités servent directement à la décision clinique. Un médecin utilise la probabilité de maladie pour décider entre surveillance, examens complémentaires ou traitement immédiat. Si le modèle annonce 80% mais que la vraie proportion est 50%, les décisions seront biaisées. La calibration garantit que les probabilités sont actionnables.


Question 6 — Choix du modèle selon le scénario clinique

Énoncé : Votre notebook montre que la Régression Logistique a le meilleur ROC-AUC (0.950) et Naive Bayes le meilleur Recall (0.857). (a) Pour un programme de dépistage de masse, quel modèle recommandez-vous et pourquoi ? (b) Pour un outil d'aide à la décision dans un cabinet médical, quel modèle recommandez-vous et pourquoi ?


POINT FORT
Corrigé Q6


(a) Dépistage de masse → Naive Bayes. Priorité : minimiser les faux négatifs (patients malades non détectés). Recall = 0.857 (le meilleur). 4 FN sur 28 positifs. Le surcoût des FP (examens supplémentaires) est acceptable dans un programme de masse. Le faible CV gap (0.031) garantit la robustesse.

(b) Outil en cabinet → Régression Logistique. Priorité : meilleure discrimination globale (ROC-AUC 0.950) ET interprétabilité. Les coefficients permettent au médecin de comprendre quelles variables contribuent au diagnostic. Le Brier score (0.094) garantit que les probabilités annoncées au patient sont fiables. En cabinet, le médecin peut ajuster le seuil selon le profil du patient.


Evaluateur — Avril 2026
