# Bloc C – Théorie des modèles : Speech Sidenotes pour chaque slide

Ce document fournit, pour chaque slide du Bloc C (Slides 14 à 25), des notes de discours prêtes à l'emploi pour l'orateur. Utilisez-les comme support oral lors de la présentation.

---

## Slide 14 – Baseline: Dummy Classifier
"Ici, je commence par la baseline : le Dummy Classifier. Il prédit toujours la classe majoritaire, donc dans notre cas, il dit toujours 'pas de maladie'. C'est une référence minimale : si nos modèles ne font pas mieux, ils n'ont aucun intérêt. Les scores attendus sont très faibles, par exemple un Recall de zéro. Cela montre bien que toute amélioration vient de l'apprentissage réel."

## Slide 15 – Régression Logistique: principe
"La régression logistique, c'est un modèle linéaire : chaque variable clinique a un poids, positif ou négatif. On combine tout ça, puis on applique la fonction sigmoïde pour obtenir une probabilité de maladie pour chaque patient. C'est simple, transparent, et chaque coefficient a un sens clinique. La décision finale dépend d'un seuil, souvent 0.5."

## Slide 16 – Régression Logistique: fonction de coût et régularisation
"Pour entraîner la régression logistique, on minimise la log-loss, qui mesure l'écart entre les probabilités prédites et la réalité. On ajoute une régularisation L2, qui évite que le modèle ne s'adapte trop au bruit du train. C'est crucial sur un petit dataset comme le nôtre. Ici, j'ai choisi $C=1.0$, un compromis validé dans la littérature."

## Slide 17 – Régression Logistique: hyperparamètres
"Tous les hyperparamètres sont justifiés : $C$, penalty, solver, max_iter. Les coefficients sont interprétables, ce qui est un vrai plus pour expliquer la décision à un médecin. Je précise que je n'ai pas fait de tuning automatique, donc le modèle reste simple et robuste."

## Slide 18 – Naive Bayes: théorème de Bayes
"Le Naive Bayes applique le théorème de Bayes à la classification. Il suppose que les variables sont indépendantes, ce qui est rarement vrai, mais ça marche étonnamment bien. Pour chaque patient, on calcule la probabilité d'être malade ou sain, et on choisit la classe la plus probable. C'est ultra-rapide et peu sensible au surapprentissage."

## Slide 19 – Naive Bayes: modèle gaussien
"Pour les variables continues, on suppose qu'elles suivent une loi normale dans chaque classe. On estime la moyenne et la variance sur le train. C'est adapté à nos données cliniques. Le paramètre var_smoothing évite les divisions par zéro, mais il a peu d'impact ici."

## Slide 20 – Naive Bayes: hyperparamètres et propriétés
"var_smoothing est fixé à 1e-9, la valeur par défaut. Les avantages du Naive Bayes : il est très rapide, robuste, et il surapprend peu. L'inconvénient, c'est l'hypothèse d'indépendance, mais sur ce dataset, les performances sont très bonnes."

## Slide 21 – Gradient Boosting: principe itératif
"Le Gradient Boosting, c'est un modèle d'ensemble : on ajoute des arbres de décision binaires les uns après les autres, chaque arbre corrigeant les erreurs du précédent. Le learning rate contrôle l'impact de chaque nouvel arbre. C'est très puissant pour modéliser des relations non linéaires et des interactions complexes."

## Slide 22 – Gradient Boosting: fonction de perte
"Ici, on utilise la log-loss, comme pour la régression logistique. À chaque étape, on calcule les pseudo-résidus, c'est-à-dire l'erreur à corriger, et l'arbre suivant s'entraîne dessus. Ça permet d'optimiser à la fois la classification et la calibration des probabilités."

## Slide 23 – Gradient Boosting: régularisation
"Pour éviter le surapprentissage, on combine plusieurs techniques : un learning rate faible, des arbres peu profonds, un minimum d'exemples par feuille, et un sous-échantillonnage. C'est indispensable sur un petit dataset, sinon le modèle mémorise tout."

## Slide 24 – Gradient Boosting: hyperparamètres et risques
"J'ai choisi n_estimators=200, learning_rate=0.05, max_depth=3, min_samples_leaf=5, subsample=0.9. Malgré ça, on observe du surapprentissage : l'AUC sur le train est de 1.0. C'est un vrai risque avec Gradient Boosting sur peu de données. Pas de tuning automatique ici non plus."

## Slide 25 – Comparaison théorique des 3 modèles
"Pour finir, je compare les trois modèles : linéaire, probabiliste, et ensemble non-linéaire. Chacun a ses forces et faiblesses : interprétabilité, risque de surapprentissage, hypothèses. Ce choix de modèles permet de couvrir différents profils de données et d'avoir une analyse complète."


Ces notes sont prêtes à être lues ou adaptées à l'oral pour clarifier les points clés, justifier les choix et anticiper les questions du jury.
- var_smoothing = 1e-9 (défaut scikit-learn).
