const express = require("express");
const router = express.Router();

const {
  listCompanyInfo,
  getCompanyInfoById,
  createCompanyInfo,
  updateCompanyInfo,
  deleteCompanyInfo,
} = require("../controllers/companyInfoController");

router
  .route("/companyinfo")
  .get(listCompanyInfo)
  .post(createCompanyInfo);

router
  .route("/companyinfo/:comId")
  .get(getCompanyInfoById)
  .put(updateCompanyInfo)
  .patch(updateCompanyInfo);

router
  .route("/add_companyinfo")
  .get(listCompanyInfo)
  .post(createCompanyInfo);

router
  .route("/update_companyinfo/:comId")
  .get(getCompanyInfoById)
  .put(updateCompanyInfo)
  .patch(updateCompanyInfo);

router.delete("/delete_companyinfo/:comId", deleteCompanyInfo);

module.exports = router;
