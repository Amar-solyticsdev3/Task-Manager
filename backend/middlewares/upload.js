const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const imagesType = ['image/jpeg', 'image/png', 'image/jpg'];
  if (imagesType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('only .jpeg,.png,.jpg format are allowed', false));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
