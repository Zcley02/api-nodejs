const { Router } = require('express');
const router = Router();

const { getMangas, createMangas, getMangaByID, deleteManga, updateManga, getCategories, addCategory, getPlace, getCars } = require('../controllers/controller.js');

router.get('/mangas', getMangas);
router.get('/mangas/:id', getMangaByID);
router.post('/mangas', createMangas);
router.delete('/mangas/:id', deleteManga);
router.put('/mangas/:id', updateManga);

router.get('/categories', getCategories);
router.post('/categories', addCategory);

router.get('/places', getPlace);

router.get('/autos', getCars);

router.get('/animal', getAnimal);

module.exports = router;