# Make u game : 
    Structure HTML && CSS 
   * Labyrinthe :
        1- Walls : 
    SVG : 

```HTML
    
    <svg width = "100%" viewBox = "0 0 680 400" xmlns="http://www.w3.org/2000/svg"></svg>
    <!--
    tag SVG :  le conteneur 
        xmlns => “Ce code appartient au langage SVG” 
        View BOX : le Systeme d Coordonées interne 
        width => la largeur du rendu 
        View Box => x = 0 && y = 0 && width && height  ( x et y se sont départ )
            "Montre-moi la zone allant de x=0 à x=600 et de y=0 à y=600."
                pr exemple ; 

                <svg viewBox="0 0 600 600">
                    <rect x="0" y="0" width="600" height="600" />
                </svg>
                Maintenant rectangle remplit tout le monde SVG 

    RQ ; 
            1 unité SVG = 0.5 pixel

    Les Briques Elementaires du SVG ; 
        <rect>
            x="40" y="30"   : depart x et y 
            width="180"
            height="120"
            rx="4" (coins)  :   plus la valeurs  les coins sont arrondis  et x && y 
    
        <circle>
        cx="380" cy="90"  Center X = coordonnée X du centre du cercle. et y 
        r="60" ; rayon 

        <line>
            x1="40" y1="200"
            x2="220" y2="260"

        <path>
        M=départ, C=courbe
            attribut d  => data / dessin du chemin : c'est une suite d commandes 
                M x y : Move to (placer le styylo au x et y point de départ )
                L xy   : Line to (tracer une ligne  )
                H x : Horizontal line (ligne horizontal  y reste le meme )
                M = aller sans tracer
                L = tracer une ligne
                H = aller horizontalement
                V = aller verticalement
                Z = fermer la forme

    -->
   
```

## Game Loop 
    Comment faire vivre ce monde ? 
        un jeu est un programme qui n" s'arrete jamais Meme si Pac Man ne bouge pas , meme si aucun fantome ne bouge eeect doit etre actif tjr => Game Loop 


        Game loop est exactement meme idee d loop while pr exemple 
        a chaque repition 
            Le monde a-t-il changé ? Si oui ? il faut recalculer puis le redessiner a chaque tour tj e

            Pourquoi on a pas utiliser la boucle while (true) ? 
                car js fonctionne avec un seul thread ? Si on ecris while(true) doit etre bloque donc on est besoin d 'une boucle spéciale qui laisse respireer le navigateur  c est pour cette raison que le navigateurs ont inventé requestAnimationFrame() pourquoi - t-il existe ? 
                    on imagine le navigateur fonctionne comme un projecteur de cinéma il affiche image image ... environ 60 image par seconde entre 2 images  si on veut modifier ton jeu 
                    Mais cette fonction ne dessine pas notre jeu il dit le prochain moment pour mettre a jour le jeu est arrive 

* requestAnimationFrame()
    Navigateur travaille comme ca pr exemple il affiche 60 images par secondes  :
        Afficher une image

        Attendre un peu

        Afficher la suivante

        Attendre un peu

        Afficher la suivante

        ...

    BY default le navigateur a deja enormement de travail :  events , execute js , render ..
    alors qui decide du moment ou le jeu travaille => c est le navigateur et non notre jeu 
    Je vais bientôt afficher une nouvelle image.
                    |
        Si tu veux modifier ton jeu,
                    |
        fais-le maintenant.
    

donc requestAnimationFrame(..) > "Je demande à être appelé juste avant la prochaine image."
Le navigateur prépare une nouvelle image
            ↓
Il appelle ta fonction (Game Loop)
            ↓
Ta fonction met à jour le jeu
            ↓
Le navigateur dessine la nouvelle image à l'écran

C'est pour cette raison que requestAnimationFrame est lié au cycle de rendu du navigateur : il permet à ton jeu de mettre à jour son état juste avant que le navigateur n'affiche une nouvelle image lorsqu'un nouveau rendu est effectué.

c/c
Le navigateur décide du moment où il va afficher une nouvelle image. Juste avant cette image, il appelle le moteur du jeu grâce à requestAnimationFrame.
    Le navigateur gère de nombreuses tâches (dessin, clavier, souris, sons, réseau, etc.). Si ton moteur s'exécutait n'importe quand, il pourrait perturber le dessin des images ou bloquer le navigateur. C'est donc le navigateur qui organise le moment où ton code est exécuté.


* Delta Time
    On imagine 2 pc 
        pc1 => 60hz    && pc2 =>144hz
        nrmlmt a chaque frame il deplace le pac Man donc ds pc1 va etre deplacer 60fois par secon cepandant l autre va deplacer 144 fois 

    Au lieu de dire :

    "avance de 2 pixels à chaque frame"

    on veut dire :

    "avance de 120 pixels par seconde."