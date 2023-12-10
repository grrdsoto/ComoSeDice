export async function GET() {
    return new Response (
        JSON.stringify([
            { 
                spanish: "gato",
                english: "cat",
                type: "noun"
            },
            { 
                spanish: "perro", 
                english: "dog",
                type: "noun"
            },
            { 
                spanish: "casa",
                english: "house",
                type: "noun"
            },
            { 
                spanish: "sol", 
                english: "sun",
                type: "noun"
            },
            { 
                spanish: "agua", 
                english: "water",
                type: "noun"
            },
            { 
                spanish: "amarillo", 
                english: "yellow",
                type: "noun" 
            },
            { 
                spanish: "manzana", 
                english: "apple",
                type: "noun"
            },
            { 
                spanish: "rojo", 
                english: "red",
                type: "noun"
            },
            { 
                spanish: "arbol", 
                english: "tree",
                type: "noun" 
            },
            { 
                spanish: "flor", 
                english: "flower",
                type: "noun" 
            }
        ])
    )
}