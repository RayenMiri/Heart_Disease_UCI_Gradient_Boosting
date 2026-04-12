# Preparation Questions Orales (N1 a N4) - Version Renforcee

Objectif: repondre vite, juste et sans incoherence, en restant strictement aligne avec [main.ipynb](main.ipynb).

## N1 - Bases (definitions, principes, hyperparametres)

Question type:
- "Explique rapidement Gradient Boosting, Naive Bayes et Regression Logistique."

Reponse courte conseillee:
- Gradient Boosting combine des arbres faibles sequentiellement pour corriger les erreurs precedentes.
- Naive Bayes applique le theoreme de Bayes avec hypothese d'independance conditionnelle.
- Regression Logistique estime une probabilite via la sigmoide.

Hyperparametres a citer (ceux du notebook):
- Gradient Boosting: n_estimators, learning_rate, max_depth, min_samples_leaf, subsample.
- Naive Bayes: var_smoothing.
- Regression Logistique: C, penalty, solver, max_iter.

## N2 - Comparaison et cas d'usage

Question type:
- "Pourquoi ces trois modeles et dans quels cas choisir chacun ?"

Reponse courte conseillee:
- Naive Bayes: rapide, simple, bon Recall ici.
- Regression Logistique: meilleur ROC-AUC et forte interpretabilite.
- Gradient Boosting: capte des non-linearites mais plus sensible au surapprentissage sur petit dataset.

Decision pratique:
- Priorite depistage (minimiser faux negatifs): Naive Bayes.
- Priorite compromis global + interpretabilite: Regression Logistique.

## N3 - Pratique (pipeline, metriques, seuil)

Question type:
- "Pourquoi ce protocole experimental ?"

Reponse courte conseillee:
- Split stratifie + CV 5-fold pour robustesse.
- Baseline Dummy pour verifier le gain reel.
- Metriques complementaires (Recall, Precision, F1, Specificite, ROC-AUC) pour eviter une conclusion basee uniquement sur Accuracy.
- Calibration et optimisation du seuil pour rendre les probabilites actionnables cliniquement.

## N4 - Critique (preuves, limites, perspectives)

Question type:
- "Comment montres-tu ton esprit critique ?"

Reponse courte conseillee:
- Surapprentissage analyse avec deux preuves:
  - CV_gap_ROC_AUC
  - learning curves train vs validation.
- Fiabilite probabiliste verifiee avec calibration curve + Brier score.
- Seuil clinique optimise via courbe Precision-Recall.
- Limites explicites: taille modeste, absence de validation externe.

## Chiffres cles a memoriser

- Baseline Dummy: ROC-AUC = 0.500
- Regression Logistique: ROC-AUC = 0.950
- Naive Bayes: ROC-AUC = 0.938, Recall = 0.857
- Gradient Boosting: ROC-AUC = 0.905
- CV gap (ROC-AUC): GB = 0.138, LogReg = 0.047, NB = 0.031

## Pieges a eviter (inspire eval.txt)

1. Citer une methode non implantee (interdit).
2. Annoncer un resultat sans chiffre/verif dans une sortie notebook.
3. Confondre qualite de classement (ROC-AUC) et choix de seuil (decision clinique).
4. Oublier de justifier pourquoi on privilegie Recall ou Precision.

## Mini script de 30 secondes (si jury presse)

"J'ai compare Gradient Boosting, Naive Bayes et Regression Logistique avec un protocole robuste: split stratifie, baseline Dummy, CV 5-fold et test hold-out. Les meilleurs scores montrent un compromis clair: Regression Logistique a le meilleur ROC-AUC, Naive Bayes le meilleur Recall pour depistage. J'ai complete l'analyse avec calibration des probabilites, optimisation du seuil et learning curves pour diagnostiquer le surapprentissage. Les limites et perspectives sont explicites, notamment validation externe et calibration post-hoc." 