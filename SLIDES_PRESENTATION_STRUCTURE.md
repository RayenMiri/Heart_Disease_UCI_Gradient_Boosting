# Structure de Presentation Optimisee (Version 28 Slides)

Objectif: faire une soutenance longue (28 slides environ), claire et bien notee, en restant strictement coherent avec [main.ipynb](main.ipynb) et les alertes de [eval.txt](eval.txt).

## Regles D'Or (anti-incoherences)

1. Ne jamais annoncer une methode absente du notebook.
2. Ne jamais laisser de placeholders dans les tableaux de resultats.
3. Utiliser la meme terminologie du debut a la fin.
4. Justifier chaque choix methodologique (metriques, seuil, protocole).
5. Associer chaque conclusion a une preuve numerique ou graphique.
6. Signaler explicitement ce qui est non implemente ici.

## Plan Recommande (28 slides)

## Bloc A - Introduction et cadre (Slides 1 a 5)

## Slide 1 - Titre du projet
Contenu:
- Sujet, auteur, contexte du cours.
- Promesse: comparaison de 3 modeles pour le depistage cardiaque.
Critere cible:
- C5

## Slide 2 - Plan de la presentation
Contenu:
- Donnees.
- Methode.
- Resultats.
- Analyse critique.
- Recommandation.
Critere cible:
- C5

## Slide 3 - Contexte medical
Contenu:
- Pourquoi le depistage est important.
- Cout clinique d'un faux negatif.
Critere cible:
- C5, C6

## Slide 4 - Question de recherche
Contenu:
- Quel modele offre le meilleur compromis selon l'usage clinique.
- Priorite possible: discrimination globale vs rappel eleve.
Critere cible:
- C1, C6

## Slide 5 - Objectifs mesurables
Contenu:
- Battre une baseline naive.
- Comparer sur CV et test.
- Produire une recommandation justifiee.
Critere cible:
- C1, C2

## Bloc B - Donnees et preparation (Slides 6 a 10)

## Slide 6 - Dataset
Contenu:
- Source: UCI Cleveland.
- Variables cliniques utilisees.
- Cible binaire 0/1.
Critere cible:
- C1

## Slide 7 - Qualite des donnees
Contenu:
- Valeurs manquantes et strategie adoptee.
- Conversion numerique + dropna.
Critere cible:
- C2

## Slide 8 - Distribution de la cible
Contenu:
- Distribution brute target et distribution binaire.
- Taux de positifs.
Critere cible:
- C2

## Slide 9 - Correlations exploratoires
Contenu:
- Heatmap des correlations.
- Variables qui semblent influentes.
Critere cible:
- C2

## Slide 10 - Split experimental
Contenu:
- Train/test stratifie.
- Verification des proportions de classes.
Critere cible:
- C2

## Bloc C - Methodes et protocole (Slides 11 a 15)

## Slide 11 - Baseline et role
Contenu:
- Dummy most_frequent comme niveau minimal.
- Pourquoi la baseline est indispensable pour evaluer le gain reel.
Critere cible:
- C2, C3

## Slide 12 - Modeles compares
Contenu:
- Gradient Boosting.
- Naive Bayes.
- Regression Logistique.
Critere cible:
- C1

## Slide 13 - Hyperparametres utilises
Contenu:
- Valeurs concretes prises dans le code.
- Mention explicite: pas de tuning global implemente.
Critere cible:
- C1, C3

## Slide 14 - Metriques d'evaluation
Contenu:
- Accuracy, Precision, Recall, Specificite, F1, ROC-AUC.
- Lien metrique-usage clinique.
Critere cible:
- C1, C6

## Slide 15 - Validation croisee
Contenu:
- StratifiedKFold (5 folds).
- Lecture du CV_gap_ROC_AUC pour le surapprentissage.
Critere cible:
- C2, C3

## Bloc D - Resultats quantitatifs (Slides 16 a 21)

## Slide 16 - Resultats CV (tableau)
Contenu:
- Naive Bayes: CV ROC-AUC 0.870, gap 0.031.
- Regression Logistique: CV ROC-AUC 0.869, gap 0.047.
- Gradient Boosting: CV ROC-AUC 0.862, gap 0.138.
Critere cible:
- C3

## Slide 17 - Resultats test (tableau complet)
Contenu:
- Regression Logistique: ROC-AUC 0.950, Recall 0.786, F1 0.815.
- Naive Bayes: ROC-AUC 0.938, Recall 0.857, F1 0.873.
- Gradient Boosting: ROC-AUC 0.905, Recall 0.786, F1 0.800.
- Baseline Dummy: ROC-AUC 0.500.
Critere cible:
- C3

## Slide 18 - Matrices de confusion
Contenu:
- Comparaison des types d'erreurs entre modeles.
- Message: tous > baseline, mais profils differents.
Critere cible:
- C3

## Slide 19 - Courbes ROC
Contenu:
- ROC superposees.
- Message principal: meilleure discrimination globale de la regression logistique.
Critere cible:
- C3

## Slide 20 - Importance des variables
Contenu:
- Importances GB vs coefficients absolus logistiques.
- Variables recurrentes a commenter.
Critere cible:
- C3, C6

## Slide 21 - Rapport de classification
Contenu:
- Precision/Recall/F1 par classe pour les modeles principaux.
- Lien avec le choix clinique.
Critere cible:
- C3

## Bloc E - Analyse critique avancee (Slides 22 a 26)

## Slide 22 - Calibration des probabilites
Contenu:
- Courbes de calibration.
- Brier score: Logistique 0.094, Naive Bayes 0.098, Gradient Boosting 0.128.
Critere cible:
- C3, C6

## Slide 23 - Optimisation exploratoire du seuil
Contenu:
- Precision-Recall sur Naive Bayes.
- Seuil 0.50 vs seuil 0.151.
- Mention obligatoire: seuil ajuste sur test actuel, lecture exploratoire.
Critere cible:
- C3, C6

## Slide 24 - Learning curves
Contenu:
- Train/Validation ROC-AUC par modele.
- Signal de surapprentissage plus fort sur Gradient Boosting.
Critere cible:
- C3, C6

## Slide 25 - Synthese bias-variance et robustesse
Contenu:
- Croiser CV gap, learning curves et performance test.
- Identifier le profil le plus robuste.
Critere cible:
- C3

## Slide 26 - Limites et validite externe
Contenu:
- Taille modeste.
- Pas de validation externe.
- Sensibilite au choix de seuil.
Critere cible:
- C6

## Bloc F - Decision, perspectives, defence (Slides 27 a 28)

## Slide 27 - Recommandation operationnelle
Contenu:
- Naive Bayes si priorite au Recall depistage.
- Regression Logistique si priorite ROC-AUC + interpretabilite.
- Scenarios d'usage concrets.
Critere cible:
- C5, C6

## Slide 28 - Perspectives non implementees + Q&A
Contenu:
- Tuning global (GridSearchCV/RandomizedSearchCV): non implemente ici.
- Validation externe: non implementee ici.
- Calibration post-hoc isotonic/platt: non implementee ici.
- Ouverture questions jury.
Critere cible:
- C4, C6

## Backups conseilles (hors 28 slides)

1. Definitions N1 (rappels rapides des 3 modeles).
2. Justification N2 (avantages/inconvenients par modele).
3. Methodologie N3 (pipeline, baseline, CV, calibration, seuil).
4. Analyse critique N4 (surapprentissage: CV gap + learning curves).

## Checklist finale avant soutenance

1. Chaque chiffre annonce est present dans une sortie du notebook.
2. Aucun tableau incomplet.
3. Chaque conclusion a une figure associee.
4. Aucune methode citee sans implementation.
5. Les elements non implementes sont annonces explicitement comme perspectives.
