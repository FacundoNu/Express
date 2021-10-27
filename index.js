const express = require('express');
const fs = require('fs')
const app = express();
const port = process.env.PORT || 8082;

let productosTotal = null;

// Lectura de archivo.

const readFileAsync = async (path) =>{
    try{
        let file = await fs.promises.readFile(path, 'utf-8');
        return file;
    }
    catch(err){
        throw new Error('Error al leer el archivo.')
    }
}


class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    async getAll(){
        let productos = await readFileAsync(this.archivo);
        productosTotal = JSON.parse(productos);
    }
}

app.get('/productos', (req, res) => {
    res.json(productosTotal)
})

// Me devuelve un producto al azar
app.get('/productoRandom', (req, res) => {
    let randomProduct = productosTotal[Math.floor(Math.random() * productosTotal.length)]
    res.json(randomProduct)
})

let contenedor = new Contenedor("./productos.txt");
contenedor.getAll()



app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`)
})