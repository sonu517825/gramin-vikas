var express = require("express");
var router = express.Router();
var Controller = require("../controller/indexController");

router.post("/user/valid_sponcer_id", Controller.validSponcerId);
router.post("/user/get_varifaction_code", Controller.getVarifactionCode);
router.post("/user/verify_varifaction_code", Controller.verifyVarifactionCode);
router.post("/user/register", Controller.userRegister);
router.post("/user/login", Controller.userLogin);
router.put("/user/update", Controller.userUpdate);
router.put("/user/password/update", Controller.userPasswordUpdate);
router.get("/user/my-team/:sponcer_id", Controller.userMyTeam);
router.get("/user/my-team/table/:sponcer_id", Controller.userMyTeamTable);

module.exports = router;

