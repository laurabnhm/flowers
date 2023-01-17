// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()

// Nombre = initialisation lors de l'ouverture de la fenêtre
const params = {
    nombre_ellipse : 3, 
    nombre_rayon : 50,
    size_ellipse : 350,
    noise : 0.1,
    random_seed : 0,
    Download_Image : () => save()
}

// gui.add (params, "Nom du paramètre", minimum, maximum, pas)
gui.add(params, "nombre_ellipse", 1, 50, 1)
gui.add(params, "nombre_rayon", 10, 200, 1)
gui.add(params, "size_ellipse", 100, 500, 1)
gui.add(params, "noise", 0.1, 1, 0.1)
gui.add(params, "random_seed", 0, 50, 1)
gui.add(params, "Download_Image")


// -------------------
//       Drawing
// -------------------

function draw() {

    randomSeed(params.random_seed)
    background('black')

    // Boucle qui modifie le nombre de fireworks
    for (let i = 0; i < params.nombre_ellipse; i++) {

        noFill()
        noStroke()

        // Ellipse extérieures (invisibles)
        let pos_x = random(width)
        let pos_y = random(height)
        ellipse(pos_x, pos_y, params.size_ellipse)

        // Ellipses qui représentent P_point (= centres des ellipses) (invisibles)
        let pos_bebe_x = random(pos_x - params.size_ellipse/3, pos_x + params.size_ellipse/3)
        let pos_bebe_y = random(pos_y - params.size_ellipse/3, pos_y + params.size_ellipse/3)
        ellipse(pos_bebe_x, pos_bebe_y, 10)

        // Paramètres des rayons
        stroke(random(255), random(255), random(255))
        strokeWeight(1)
        
        // Boucle qui modifie le nombre de rayons dans chaque fireworks
        for (let i = 0; i < params.nombre_rayon; i++) {
            let angle = TWO_PI / params.nombre_rayon * i;
            const variation = map(noise(i*params.noise), 0, 1, -20, 20)
            line(
                pos_bebe_x,
                pos_bebe_y,
                pos_x + (params.size_ellipse + variation) * cos(angle)/2,
                pos_y + (params.size_ellipse + variation) * sin(angle)/2
            )
        }
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}