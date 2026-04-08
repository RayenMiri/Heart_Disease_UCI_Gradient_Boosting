# Structure de Presentation Optimisee (Max Points)

Objectif: couvrir explicitement les criteres C1 a C6 du bareme, en 10 a 15 minutes.

## Strategie Globale

1. Montrer la theorie avant les resultats (C1).
2. Prouver la qualite de code et la reproductibilite (C2).
3. Interpreter les metriques avec baseline + diagnostic (C3).
4. Anticiper les questions orales N1-N4 (C4).
5. Garder des slides aeres, visuels et chronometres (C5).
6. Finir avec limites, perspectives et liens methodologiques (C6).

## Plan Recommande (12 Slides)

## Slide 1 - Titre et promesse (40s)

Contenu:
- Sujet, nom, contexte.
- Phrase de promesse: "Comparer 3 modeles pour un depistage cardiaque interpretable et robuste".

Criteres couverts:
- C5

## Slide 2 - Contexte medical et enjeu (60s)

Contenu:
- Pourquoi detecter tot.
- Cout des faux negatifs en contexte clinique.

Criteres couverts:
- C5, C6

## Slide 3 - Theorie des 3 modeles (90s)

Contenu:
- Gradient Boosting: principe + hyperparametres (n_estimators, learning_rate, max_depth, subsample).
- Naive Bayes: principe + hypothese d'independance + var_smoothing.
- Regression Logistique: sigmoide + C, penalty, solver.

Criteres couverts:
- C1

## Slide 4 - Donnees et protocole experimental (60s)

Contenu:
- UCI Cleveland, cible binaire.
- Split stratifie train/test.
- Validation croisee 5-fold.
- Metriques: Accuracy, Precision, Recall, Specificite, F1, ROC-AUC.

Criteres couverts:
- C1, C2

## Slide 5 - Pipeline implementation (70s)

Contenu:
- Pipeline complet: import -> nettoyage -> split -> scale -> fit -> predict.
- Baseline Dummy ajoutee pour comparaison juste.
- Reproductibilite: RANDOM_STATE et code propre.

Criteres couverts:
- C2

## Slide 6 - Resultats CV (70s)

Contenu:
- Tableau CV avec moyenne des metriques.
- Colonne CV_gap_ROC_AUC (train - test) pour diagnostiquer le surapprentissage.

Criteres couverts:
- C3

## Slide 7 - Resultats Test (70s)

Contenu:
- Tableau final test.
- Chiffres clefs a annoncer:
	- Regression Logistique: ROC-AUC = 0.950
	- Naive Bayes: ROC-AUC = 0.938, Recall = 0.857
	- Gradient Boosting: ROC-AUC = 0.905
	- Baseline: ROC-AUC = 0.500

Criteres couverts:
- C3

## Slide 8 - Matrices de confusion (60s)

Contenu:
- Montrer les 4 matrices (3 modeles + baseline).
- Insister sur faux negatifs vs faux positifs.

Criteres couverts:
- C3, C5

## Slide 9 - Courbes ROC et interpretation (60s)

Contenu:
- Courbe ROC commune.
- Message: tous les modeles battent clairement la baseline.

Criteres couverts:
- C3

## Slide 10 - Analyse critique et explicabilite (90s)

Contenu:
- Overfitting detecte sur Gradient Boosting (gap CV plus eleve).
- Variable importance (GB) + coefficients absolus (LogReg).
- Compromis performance vs interpretabilite.

Criteres couverts:
- C3, C6

## Slide 11 - Limites et perspectives (80s)

Contenu:
- Limites: taille dataset, absence de validation externe, tuning partiel.
- Perspectives: tuning systematique, calibration, seuils cliniques, comparaison SVM/RF/XGBoost.

Criteres couverts:
- C6

## Slide 12 - Conclusion + recommandation (50s)

Contenu:
- Conclusion en une phrase.
- Recommandation pratique:
	- Naive Bayes pour maximiser le Recall.
	- Regression Logistique pour meilleur ROC-AUC et bonne interpretabilite.

Criteres couverts:
- C5, C6

## Slides Backup Indispensables (pour C4)

1. Backup N1 (bases): definitions + hyperparametres de chaque modele.
2. Backup N2 (comparaison): avantages/inconvenients et cas d'usage.
3. Backup N3 (pratique): pourquoi standardisation, CV, choix des metriques.
4. Backup N4 (critique): surapprentissage, limites, ameliorations mathematiques.

## Script de Reponses Express (C4)

1. N1: "J'ai choisi ces 3 modeles pour couvrir probabiliste simple, lineaire interpretable et ensemble non lineaire."
2. N2: "Naive Bayes est rapide, LogReg est interpretable, GB capte mieux les interactions mais risque plus de surapprentissage."
3. N3: "La standardisation stabilise les modeles sensibles a l'echelle; la CV reduit le risque de conclusion basee sur un split chanceux."
4. N4: "Je diagnose le surapprentissage via l'ecart train/test en ROC-AUC et je propose tuning + calibration + validation externe."

## Checklist Finale Avant Soutenance

1. Les tableaux CV et test sont lisibles et coherents.
2. Les figures (matrices + ROC + importances) sont visibles sans zoom.
3. Tu annonces une recommandation dependante du besoin clinique.
4. Tu as repete les reponses N1-N4 en moins de 2 minutes.
