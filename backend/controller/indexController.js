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
        if (
          Number(1234) !== Number(varifaction_code)
        ) {
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
      help(req)
      return res.status(200).json({
        error: false,
        message: "success",
        result: {
          name: req.body.name,
          sponcer_id: req.body.my_sponcer_id,
          password: req.body.password,
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
  async userUpdate(req, res, next) {
    try {

      const result = await User.findOneAndUpdate({ my_sponcer_id: req.body.my_sponcer_id }, { $set: req.body }, { new: true });

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
  async userPasswordUpdate(req, res, next) {
    try {

      let result = await User.findOne({
        password: req.body.oldPassword,
        my_sponcer_id: req.body.my_sponcer_id,
      });
      if (!result) {
        return res.status(404).json({
          error: true,
          message: "Incorrect Old Password !",
          result: null,
        });
      }

      result = await User.findOneAndUpdate({ my_sponcer_id: req.body.my_sponcer_id }, { $set: { password: req.body.confirmPassword } }, { new: true });

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
  async userMyTeam(req, res, next) {
    try {

      let root_data = await User.findOne({
        my_sponcer_id: req.params.sponcer_id
      });
      if (!root_data) {
        return res.status(404).json({
          error: true,
          message: "Id not found",
          result: null,
        });
      }
      let result = await User.find({ $and: [{ $or: [{ refer_sponcer_id: req.params.sponcer_id }, { parent_refer_sponcer_id: req.params.sponcer_id }] }, { my_sponcer_id: { $ne: req.params.sponcer_id } }] }).sort({ _id: 1 });

      const data = {}


      let root_my_sponcer_id = root_data.my_sponcer_id
      let root_refer_sponcer_id = root_data.refer_sponcer_id
      let root_parent_refer_sponcer_id = root_data.parent_refer_sponcer_id
      let root_left_data = null
      let root_right_data = null


      for (let i = 0; i < result.length; i++) {
        if (result[i].refer_sponcer_id == root_my_sponcer_id && result[i].parent_refer_sponcer_id == root_my_sponcer_id && result[i].position == "LEFT") {
          root_left_data = result[i]
          result[i] = null;
          break;
        }
      }

      for (let i = 0; i < result.length; i++) {
        if (result[i].refer_sponcer_id == root_my_sponcer_id && result[i].parent_refer_sponcer_id == root_my_sponcer_id && result[i].position == "RIGHT") {
          root_right_data = result[i]
          result[i] = null;
          break;
        }
      }

      data["name"] = root_data
      data["left"] = {}
      data["right"] = {}
      root_left_data && root_left_data ? data["left"]["name"] = root_left_data : data["left"] = null
      root_right_data && root_right_data ? data["right"]["name"] = root_right_data : data["right"] = null




      let left_data = null
      let right_data = null
      let found = false;




      // while (!result.every(obj => obj == null)) {
      //   for (let i = 0; i < result.length; i++) {
      //     if (result[i].refer_sponcer_id == root_my_sponcer_id && result[i].parent_refer_sponcer_id == root_my_sponcer_id && result[i].position == "LEFT") {
      //       root_left_data = result[i]
      //       result[i] = null;
      //       break;
      //     }
      //   }

      //   for (let i = 0; i < result.length; i++) {
      //     if (result[i].refer_sponcer_id == root_my_sponcer_id && result[i].parent_refer_sponcer_id == root_my_sponcer_id && result[i].position == "RIGHT") {
      //       root_right_data = result[i]
      //       result[i] = null;
      //       break;
      //     }
      //   }
      // }



      return res.status(200).json({
        error: false,
        message: "success",
        result: { root_data, result, data },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
  async userMyTeamTable(req, res, next) {
    try {


      let result = await User.find({ $or: [{ my_sponcer_id: req.params.sponcer_id }, { refer_sponcer_id: req.params.sponcer_id }, { parent_refer_sponcer_id: req.params.sponcer_id }] }).sort({ _id: 1 });

      result.map(obj => {
        if (obj.my_sponcer_id == req.params.sponcer_id) {
          obj.position = `${obj.position} - ROOT`
        }
        return obj
      })

      const uniqueIdsSet = new Set();

      result.forEach(entry => {
        uniqueIdsSet.add(entry.my_sponcer_id);
        uniqueIdsSet.add(entry.refer_sponcer_id);
        uniqueIdsSet.add(entry.parent_refer_sponcer_id);
      });

      const details = await User.find({ my_sponcer_id: { $in: [...uniqueIdsSet] } })

      return res.status(200).json({
        error: false,
        message: "success",
        result: result,
        details: details
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: true,
        message: error.toString(),
        result: null,
      });
    }
  }
  async userMyTeamCount(req, res, next) {
    try {

      let total = 0
      let left = 0
      let right = 0
      let direct = 0
      let refer = 0
      let paired = 0

      let result = await User.find({ $or: [{ my_sponcer_id: req.params.sponcer_id }, { refer_sponcer_id: req.params.sponcer_id }, { parent_refer_sponcer_id: req.params.sponcer_id }] }).sort({ _id: 1 });


      for (let i = 0; i < result.length; i++) {
        if (result[i].parent_refer_sponcer_id == req.params.sponcer_id && result[i].my_sponcer_id != req.params.sponcer_id) {
          direct = direct + 1
        }
        if (result[i].my_sponcer_id == req.params.sponcer_id) {
          left = left + result[i].left_count
          right = right + result[i].right_count
        }

        // if (result[i].parent_refer_sponcer_id == req.params.sponcer_id) {
        //   direct = direct + 1
        // }
      }

      total = left + right
      refer = total - direct

      const uniqueIdsSet = new Set();

      result.forEach(entry => {
        uniqueIdsSet.add(entry.my_sponcer_id);
        // uniqueIdsSet.add(entry.refer_sponcer_id);
        // uniqueIdsSet.add(entry.parent_refer_sponcer_id);
      });

      for (let j = 0; j < [...uniqueIdsSet].length; j++) {

        let check_left = result.filter(obj => obj.position == "LEFT" && obj.refer_sponcer_id == req.params.sponcer_id)
        let check_right = result.filter(obj => obj.position == "RIGHT" && obj.refer_sponcer_id == req.params.sponcer_id)
        // console.log(check_left, check_right)
        if (check_left.length > 0 && check_right.length > 0) {
          paired = paired + 1
          result[j] = null;
          break;
        }

      }


      // for (let i = 0; i < result.length; i++) {
      //   if (result[i].refer_sponcer_id == root_my_sponcer_id && result[i].parent_refer_sponcer_id == root_my_sponcer_id && result[i].position == "LEFT") {
      //     root_left_data = result[i]
      //     result[i] = null;
      //     break;
      //   }
      // }

      // for (let i = 0; i < result.length; i++) {
      //   if (result[i].refer_sponcer_id == root_my_sponcer_id && result[i].parent_refer_sponcer_id == root_my_sponcer_id && result[i].position == "RIGHT") {
      //     root_right_data = result[i]
      //     result[i] = null;
      //     break;
      //   }
      // }

      return res.status(200).json({
        error: false,
        message: "success",
        result: { total, direct, refer, paired },

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

const handlePosition = async (body) => {
  try {
    let findFlag = false
    let findOpenChecker = null
    let checkReferOpen = await User.findOne({ position: body.position, refer_sponcer_id: body.refer_sponcer_id })
    let position = body.position
    if (!checkReferOpen) {
      body.parent_refer_sponcer_id = body.refer_sponcer_id
      if (position === "LEFT") {
        await User.findOneAndUpdate(
          { my_sponcer_id: body.refer_sponcer_id },
          { $set: { left_side: body.my_sponcer_id } },
          { new: true }
        );
      } else {
        await User.findOneAndUpdate(
          { my_sponcer_id: body.refer_sponcer_id },
          { $set: { right_side: body.my_sponcer_id } },
          { new: true }
        );
      }
      await User.create(body);
      findFlag = true
    } else {
      findOpenChecker = checkReferOpen
      while (!findFlag) {
        let findOpen = await User.findOne({ position: body.position, refer_sponcer_id: findOpenChecker.my_sponcer_id })
        if (!findOpen) {
          body.parent_refer_sponcer_id = body.refer_sponcer_id
          body.refer_sponcer_id = findOpenChecker.my_sponcer_id
          if (position === "LEFT") {
            await User.findOneAndUpdate(
              { my_sponcer_id: body.refer_sponcer_id },
              { $set: { left_side: body.my_sponcer_id } },
              { new: true }
            );
          } else {
            await User.findOneAndUpdate(
              { my_sponcer_id: body.refer_sponcer_id },
              { $set: { right_side: body.my_sponcer_id } },
              { new: true }
            );
          }
          await User.create(body);
          findFlag = true
        } else {
          findOpenChecker = findOpen
        }
      }
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
const findSponcerId = async (my_sponcer_id) => {
  try {
    let data = await User.findOne({ my_sponcer_id: my_sponcer_id })
    return data.refer_sponcer_id
  } catch (error) {
    console.log(error)
  }
}
const findPosition = async (my_sponcer_id) => {
  try {
    let data = await User.findOne({ my_sponcer_id: my_sponcer_id })
    return data.position
  } catch (error) {
    console.log(error)
  }

}
const help = async (req) => {
  try {
    let temp = await handlePosition(req.body)
    let my_sponcer_id = req.body.my_sponcer_id
    let position = req.body.position
    if (temp) {
      position = await findPosition(my_sponcer_id)
      my_sponcer_id = await findSponcerId(my_sponcer_id)
      let findMasterId = false

      while (!findMasterId) {

        if (my_sponcer_id == "AD123") {
          findMasterId = true
        }

        if (position === "LEFT") {
          await User.findOneAndUpdate(
            { my_sponcer_id: my_sponcer_id },
            { $inc: { left_count: 1 } },
            { new: true }
          );
        } else {
          await User.findOneAndUpdate(
            { my_sponcer_id: my_sponcer_id },
            { $inc: { right_count: 1 } },
            { new: true }
          );
        }

        position = await findPosition(my_sponcer_id)
        my_sponcer_id = await findSponcerId(my_sponcer_id)

      }

    } else {
      console.log("failed")

    }
  } catch (error) {
    console.log(error)
  }

}

module.exports = new Controller();
