const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require('fs');
const dbpath = './db/images.json';
const storage = multer.diskStorage({
      destination: function(req,file,cb) {           
            cb(null, './public/uploads/');
      },
      filename:function(req,file,cb){
            cb (null, file.originalname);
      }
})

const fileFilter = (req,file,cb) => {
      if (file.mimetype === ('image/jpeg'|| 'image/png')){
            return cb(null,true);
      }
      return cb(new Error('Something went wrong'), false);
}

const upload = multer({storage:storage, fileFilter: fileFilter});


router.get('/', (req, res, next) => {

      if (fs.existsSync(dbpath)) {
            images = JSON.parse(fs.readFileSync(dbpath,  'utf-8'));
            res.render('gallery', {layout : 'index',images:images});
            return
      }
      res.render('gallery', {layout : 'index'});
})

router.post('/form', upload.single('image'), (req, res, next) => {
      let image = {
            "filename" : req.file.filename,
            "path" : req.file.path
      }
      images = [];
      if (fs.existsSync(dbpath)) {
            images = JSON.parse(fs.readFileSync(dbpath,  'utf-8'));
      }
      images.push(image);
      fs.writeFileSync(dbpath, JSON.stringify(images), 'utf-8');
      res.redirect('/')
})

router.delete('/:filepath', (req, res, next) => {
})

module.exports = router;  