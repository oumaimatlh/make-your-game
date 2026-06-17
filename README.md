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