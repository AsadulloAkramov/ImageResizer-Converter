import express from "express";

const router = express.Router();
router.get('/', (req, res) => {
  res.sendFile(`/home/asadullo/ImageResizer-Converter/src/index.html`);
})


export default router;