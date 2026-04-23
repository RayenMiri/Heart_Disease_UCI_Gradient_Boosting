# Preparation Questions Orales (N1 a N4) - Version Renforcee

Objectif: repondre vite, juste et sans incoherence, en restant strictement aligne avec [main.ipynb](main.ipynb).

## N1 - Bases (definitions, principes, hyperparametres)

Question type:
- "Explique rapidement Gradient Boosting, Naive Bayes et Regression Logistique."

Reponse courte conseillee:
- Gradient Boosting combine des arbres faibles sequentiellement pour corriger les erreurs precedentes. Chaque arbre apprend sur les residus du precedent.
- Naive Bayes applique le theoreme de Bayes avec hypothese d'independance conditionnelle des features sachant la classe.
- Regression Logistique estime la probabilite d'appartenance a une classe via la fonction sigmoide appliquee a une combinaison lineaire des features.

Hyperparametres a citer (ceux du notebook) avec justification:
- Gradient Boosting:
  - n_estimators=200 (compromis capacite/surapprentissage)
  - learning_rate=0.05 (regulation douce, budget total modere)
  - max_depth=3 (apprenants faibles, regularisation)
  - min_samples_leaf=5 (regularisation supplementaire)
  - subsample=0.9 (stochasticite pour reduire la variance)
- Naive Bayes: var_smoothing=1e-9 (defaut scikit-learn, evite les probabilites nulles).
- Regression Logistique: C=1.0 (defaut L2), penalty='l2' (Ridge), solver='lbfgs', max_iter=3000.

Question piege: "Pourquoi pas de StandardScaler pour Gradient Boosting?"
- Reponse: les arbres de decision sont invariants a l'echelle des variables. Seuls NB et LogReg sont sensibles aux echelles.

## N2 - Comparaison et cas d'usage

Question type:
- "Pourquoi ces trois modeles et dans quels cas choisir chacun?"

Reponse courte conseillee:
- Choix de 3 modeles par diversite des approches: ensemble non lineaire (GB), probabiliste (NB), lineaire interpretable (LogReg).
- Naive Bayes: rapide, simple, meilleur Recall ici (0.857), meilleur compromis biais-variance (gap 0.031).
- Regression Logistique: meilleur ROC-AUC (0.950), meilleur Brier score (0.094), forte interpretabilite (coefficients).
- Gradient Boosting: capte des non-linearites mais surapprentissage demonstre sur ce petit dataset (gap 0.138, train AUC=1.000).

Decision pratique:
- Priorite depistage (minimiser faux negatifs): Naive Bayes.
- Priorite compromis global + interpretabilite: Regression Logistique.
- Gradient Boosting: non recommande en l'etat sur ce dataset.

## N3 - Pratique (pipeline, metriques, seuil)

Question type:
- "Pourquoi ce protocole experimental?"

Reponse courte conseillee:
- Split stratifie 80/20 + CV 5-fold pour robustesse et preservation des proportions.
- Baseline Dummy (most_frequent) pour verifier le gain reel : tout modele utile doit battre AUC=0.500.
- StandardScaler dans les pipelines (pas a l'exterieur) pour eviter le data leakage.
- Metriques complementaires (Recall, Precision, F1, Specificite, ROC-AUC) pour eviter une conclusion basee uniquement sur Accuracy.
- Calibration (courbe + Brier score) pour evaluer la fiabilite des probabilites predites.
- Optimisation du seuil : analyse exploratoire sur le test, non definitive — doit etre revalidee.

Question piege: "Difference entre ROC-AUC et choix de seuil?"
- ROC-AUC mesure la qualite de classement (discrimination) independamment du seuil.
- Le seuil est une decision operationnelle qui depend des couts relatifs (faux negatifs vs faux positifs).
- Un bon AUC ne garantit pas qu'un seuil specifique donne de bons resultats.

## N4 - Critique (preuves, limites, perspectives)

Question type:
- "Comment montres-tu ton esprit critique?"

Reponse courte conseillee:
- Surapprentissage analyse avec **trois preuves convergentes**:
  1. CV_gap_ROC_AUC (Section 4): GB=0.138 vs NB=0.031.
  2. Learning curves (Section 6): gap train/validation persiste pour GB, converge pour NB/LogReg.
  3. Performance test (Section 5): GB en retrait sur toutes les metriques.
- Fiabilite probabiliste verifiee avec calibration curve + Brier score.
- Seuil clinique optimise via courbe Precision-Recall (analyse exploratoire).
- Limites explicites: taille modeste (297 obs., 60 test), absence de validation externe, pas de tuning global.
- Perspectives clairement marquees "non implemente": GridSearchCV, validation externe, calibration post-hoc, Elastic Net, McNemar.

## Chiffres cles a memoriser

- Dataset: 303 brut, 297 apres nettoyage, 237 train, 60 test.
- Baseline Dummy: ROC-AUC = 0.500, Recall = 0.000.
- Regression Logistique: ROC-AUC test = 0.950, Recall = 0.786, Brier = 0.094.
- Naive Bayes: ROC-AUC test = 0.938, Recall = 0.857, Brier = 0.098.
- Gradient Boosting: ROC-AUC test = 0.905, Recall = 0.786, Brier = 0.128.
- CV gap (ROC-AUC): GB = 0.138, LogReg = 0.047, NB = 0.031.
- Top features (convergence GB/LogReg): thal, cp, ca.

## Pieges a eviter (inspire eval.txt)

1. Citer une methode non implantee dans le notebook (interdit — dire "non implemente, perspective").
2. Annoncer un resultat sans chiffre ou verification dans une sortie notebook.
3. Confondre qualite de classement (ROC-AUC) et choix de seuil (decision clinique).
4. Oublier de justifier pourquoi on privilegie Recall ou Precision.
5. Presenter des hyperparametres sans justification ("pourquoi 200 arbres et pas 100?").
6. Confondre correlation lineaire (Pearson) et importance des variables.
7. Dire "les resultats sont bons" sans preciser par rapport a quoi (baseline).

## Mini script de 30 secondes (si jury presse)

"J'ai compare Gradient Boosting, Naive Bayes et Regression Logistique avec un protocole robuste: split stratifie, baseline Dummy, CV 5-fold et test hold-out. Les meilleurs scores montrent un compromis clair: Regression Logistique a le meilleur ROC-AUC (0.950), Naive Bayes le meilleur Recall (0.857) pour depistage. J'ai complete l'analyse avec calibration des probabilites, optimisation exploratoire du seuil et learning curves pour diagnostiquer le surapprentissage — Gradient Boosting surapprenait (gap 0.138). Les limites sont explicites: petit dataset, pas de validation externe, pas de tuning global. Recommandation: Naive Bayes pour depistage, Regression Logistique pour compromis global."