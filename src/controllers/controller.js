const { Pool } = require('pg');
const { parse } = require('pg-connection-string')

const connectionString = 'postgres://nzfdcjbsbnjpjz:5498fedae7dab09a14b8e3ff8078b631348982723726dea2c5175e33e2024db0@ec2-54-164-241-193.compute-1.amazonaws.com:5432/dejh0qekrijjla';

const config = parse(connectionString);

config.ssl = {
    rejectUnauthorized: false
}

const pool = new Pool(config);

const getMangas = async (req, res) => {
    const response = await pool.query('SELECT * FROM mangas;');
    res.status(200).json(response.rows);
};

const getMangaByID = async (req, res) => {
    const response = await pool.query('SELECT * FROM mangas WHERE id = $1;', [req.params.id]);
    res.status(200).json(response.rows);
};

const createMangas = async (req, res) => {
    const { name, category, image } = req.body;
    const response = await pool.query('INSERT INTO mangas (name, category, image) VALUES($1, $2, $3);', [name, category, image]);
    console.log(response);
    res.json({
        message: 'Manga creado con exito',
        body:{
            mangas: {name, category, image},
        }
    });
};

const updateManga = async (req, res) => {
    const id = req.params.id;
    const { name, category, image } = req.body;
    const response = await pool.query('UPDATE mangas SET name = $1, category = $2, image = $3 WHERE id = $4', [
        name,
        category, 
        image, 
        id]);
    
    console.log(response);
    res.json({
        message: 'Usuario actualizado con exito',
        body: {
            mangas: {id, name, category, image},
        }
    });

}

const deleteManga = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM mangas WHERE id = $1;', [id]);
    console.log(response);
    res.json('Manga '+id+' eliminado con exito');
} ;

const getCategories = async (req, res) => {
    const response = await pool.query('SELECT * FROM category;');
    res.status(200).json(response.rows);
}

const addCategory = async (req, res) => {
    const { name, description, image } = req.body;
    const response = await pool.query('INSERT INTO category (name, description, image) VALUES($1, $2, $3);', [name, description, image]);
    console.log(response);
    res.json({
        message: 'Categoria Creada con éxito',
        body:{
            category: {name, description, image},
        }
    });

}

const getPlace = async (req, res) => {
    const response = await pool.query('SELECT * FROM places;');
    res.status(200).json(response.rows);
}

const getCars = async (req, res) => {
    const response = await pool.query('SELECT * FROM autos;');
    res.status(200).json(response.rows);
}

const getAnimal = async (req, res) => {
    const response = await pool.query('SELECT * FROM animal;');
    res.status(200).json(response.rows);
}


module.exports = {
    getMangas,
    getMangaByID,
    createMangas,
    updateManga,
    deleteManga,
    getCategories,
    addCategory,
    getPlace,
    getCars,
    getAnimal,
}