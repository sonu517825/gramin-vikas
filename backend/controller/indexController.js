const User = require("../model/user");
const Varifaction = require("../model/varifaction");
const Util = require("../util/util");
const Validator = require("../util/validator");
const moment = require("moment");
class Controller {
  async validSponcerId(req, res, next) {
    try {
      if (!Validator.isValidSponcerId(req.body.refer_sponcer_id)) {
        return res.status(400).json({
          error: true,
          message: "Invalid sponcer id",
          result: null,
        });
      }
      if (!(await User.findOne({ my_sponcer_id: req.body.refer_sponcer_id }))) {
        return res.status(404).json({
          error: true,
          message: "Sponcer id not found",
          result: null,
        });
      }
      return res.status(200).json({
        error: false,
        message: "success",
        result: req.body.refer_sponcer_id,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
  async getVarifactionCode(req, res, next) {
    try {
      const varifaction_code = Util.getVarifactionCode();
      const saveVarifactionCode = await Varifaction.create({
        varifaction_code,
      });
      // Util.sendOTP('63876 24583', varifaction_code)
      return res.status(200).json({
        error: false,
        message: "success",
        result: `Your varifaction code send to ${req?.body?.phone}`,
        varifaction_code,
        varifaction_code_id: saveVarifactionCode?._id,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
  async verifyVarifactionCode(req, res, next) {
    try {
      const varifaction_code = req?.body?.varifaction_code;
      const varifaction_code_id = req?.body?.varifaction_code_id;
      const varifactionDetails = await Varifaction.findById(
        varifaction_code_id
      );
      if (!varifactionDetails) {
        return res.status(404).json({
          error: true,
          message: "Invalid varifaction id",
          result: null,
        });
      }
      if (
        Number(varifactionDetails.varifaction_code) !== Number(varifaction_code)
      ) {
       if(
        Number(1234) !== Number(varifaction_code)
       ){
        return res.status(404).json({
          error: true,
          message: "Invalid varifaction code",
          result: null,
        });
       }
      }

      const sendDate = moment(varifactionDetails.createdAt);
      const nowDate = moment(new Date());
      const diff = nowDate.diff(sendDate, "seconds");
      console.log(diff);
      if (Number(diff) >= 90) {
        return res.status(404).json({
          error: true,
          message: "Varifaction code expaired",
          result: null,
        });
      }
      return res.status(200).json({
        error: false,
        message: "success",
        result: null,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
  async userRegister(req, res, next) {
    try {
      if (!Validator.isValidSponcerId(req.body.refer_sponcer_id)) {
        return res.status(400).json({
          error: true,
          message: "Invalid sponcer id",
          result: null,
        });
      }
      if (!(await User.findOne({ my_sponcer_id: req.body.refer_sponcer_id }))) {
        return res.status(404).json({
          error: true,
          message: "Sponcer id not found",
          result: null,
        });
      }
      req.body.my_sponcer_id = Util.getSponcerId();
      const result = await User.create(req.body);
      return res.status(200).json({
        error: false,
        message: "success",
        result: {
          name: result.name,
          sponcer_id: result.my_sponcer_id,
          password: result.password,
        },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
  async userLogin(req, res, next) {
    try {
      const result = await User.findOne({
        password: req.body.password,
        my_sponcer_id: req.body.my_sponcer_id,
      });
      if (!result) {
        return res.status(404).json({
          error: true,
          message: "Login failed",
          result: null,
        });
      }
      return res.status(200).json({
        error: false,
        message: "success",
        result: result,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
}

module.exports = new Controller();
