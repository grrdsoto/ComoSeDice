export async function GET({ params }: any) {
    return {
        body: JSON.stringify([
            { 
                spanish: "gato",
                english: "cat" 
            },
            { 
                spanish: "perro", 
                english: "dog" 
            },
            { 
                spanish: "casa",
                english: "house" 
            },
            { 
                spanish: "sol", 
                english: "sun" 
            },
            { 
                spanish: "agua", 
                english: "water" 
            },
            { 
                spanish: "amarillo", 
                english: "yellow" 
            },
            { 
                spanish: "manzana", 
                english: "apple" 
            },
            { 
                spanish: "rojo", 
                english: "red"
            },
            { 
                spanish: "arbol", 
                english: "tree" 
            },
            { 
                spanish: "flor", 
                english: "flower" 
            }
        ])
    }
}