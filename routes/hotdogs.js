const {Router} = require('express')
const HotDog = require('../models/HotDog')
const router = Router()

router.get('/', async (reg, res) => {
    const hotdogs = await HotDog.find({})

    res.render('index', {
        title: 'Hot Dogs List',
        isIndex: true,
        hotdogs
    })
})

router.get('/create', (reg, res) => {
    res.render('create', {
        title: 'Create a Hot Dog',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const hotdog = new HotDog({
        title: req.body.title,
        img: req.body.img
    })

    await hotdog.save()
    res.redirect('/')
})

router.get('/update', (req, res) => {
    res.render('update', {
        title: 'Update a Hot Dog',
        isCreate: true,
        hotDogTitle: req.query.title
    })
})

router.post('/update', async (req, res) => {
    HotDog.updateOne({ title: req.body.oldTitle }, { 
        title: req.body.title,
        img: req.body.img
     }, function(err, res) {
      });
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    HotDog.deleteOne({ title:req.body.title }).exec();

    res.redirect('/')
})

router.post('/complete', async (req,res) => {
    const hotdog = await HotDog.findById(req.body.id)

    hotdog.completed = !!req.body.completed
    await hotdog.save()

    res.redirect('/')
})

module.exports = router