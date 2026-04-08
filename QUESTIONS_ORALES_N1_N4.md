# Preparation Questions Orales (N1 a N4)

Objectif: repondre vite, juste et clairement aux questions de soutenance, en lien direct avec le notebook.

## N1 - Bases (definitions, principes, hyperparametres)

Question type:
- "Explique rapidement Gradient Boosting, Naive Bayes et Regression Logistique."

Reponse courte conseillee:
- Gradient Boosting combine des arbres faibles sequentiellement pour corriger les erreurs precedentes.
- Naive Bayes applique le theoreme de Bayes avec hypothese d'independance conditionnelle des variables.
- Regression Logistique est un modele lineaire probabiliste qui estime P(y=1|x) via une sigmoide.

Hyperparametres a citer:
- Gradient Boosting: n_estimators, learning_rate, max_depth, subsample.
- Naive Bayes: var_smoothing.
- Regression Logistique: C, penalty, solver, max_iter.

## N2 - Differences, comparaison, cas d'usage

Question type:
- "Pourquoi ces trois modeles et dans quels cas choisir chacun?"

Reponse courte conseillee:
- Naive Bayes: tres rapide, bon baseline probabiliste, mais hypothese d'independance parfois trop forte.
- Regression Logistique: interpretable, stable, bonne reference lineaire.
- Gradient Boosting: capte les non-linearites et interactions, mais plus sensible au surapprentissage si mal regle.

Phrase decisionnelle:
- Si priorite a l'interpretabilite: Regression Logistique.
- Si priorite au rappel dans ce notebook: Naive Bayes.
- Si donnees plus riches et tuning possible: Gradient Boosting devient tres competitif.

## N3 - Pratique (standardisation, CV, metriques)

Question type:
- "Pourquoi standardiser? Pourquoi faire de la CV? Pourquoi ces metriques?"

Reponse courte conseillee:
- Standardisation: utile pour Naive Bayes et Regression Logistique, car l'echelle influence l'apprentissage.
- CV stratifiee 5-fold: reduit le risque de conclusion dependante d'un split chanceux.
- Metriques choisies:
  - Recall: critique pour ne pas rater de patients malades.
  - Precision: controle les fausses alertes.
  - F1: compromis precision/recall.
  - ROC-AUC: qualite globale de discrimination independante du seuil.

## N4 - Critique (diagnostic, limites, ameliorations)

Question type:
- "Comment prouves-tu ton esprit critique sur les resultats?"

Reponse courte conseillee:
- J'ai ajoute une baseline Dummy pour mesurer le gain reel des modeles.
- J'ai diagnostiqe le surapprentissage via l'ecart CV train/test en ROC-AUC.
- Dans mes resultats, Gradient Boosting montre un gap plus eleve, donc risque de surapprentissage.
- J'ai explicite les limites: taille de dataset, absence de validation externe, tuning partiel.
- J'ai propose des ameliorations: tuning systematique, calibration des probabilites, analyse de seuils, comparaison avec SVM/RF/XGBoost.

## Chiffres cles a memoriser

- Baseline Dummy: ROC-AUC = 0.500
- Regression Logistique: ROC-AUC = 0.950
- Naive Bayes: ROC-AUC = 0.938, Recall = 0.857
- Gradient Boosting: ROC-AUC = 0.905

## Mini script de 30 secondes (si jury presse)

"J'ai compare trois familles de modeles sur UCI Heart Disease avec un protocole robuste: split stratifie, CV 5-fold, baseline Dummy et evaluation multi-metriques. Les meilleurs resultats globaux en ROC-AUC viennent de la Regression Logistique, tandis que Naive Bayes obtient le meilleur recall, pertinent pour le depistage. Gradient Boosting est competitif mais montre plus de surapprentissage dans ce contexte. J'ai identifie les limites et propose des pistes concretes: tuning, calibration et validation externe."