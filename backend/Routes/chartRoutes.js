const router = require('express').Router();
const ChartController = require("../Controllers/ChartController");

router.get("/barchart", ChartController.barchart);
router.get("/piechart", ChartController.piechart);
router.get("/combineresponse", ChartController.combineResponse)


module.exports = router;
