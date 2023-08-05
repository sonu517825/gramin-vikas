const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const database_username = "yuvapragatipvt"
const database_password = "3Pp1CRyz61ipcKt4"
const database_name = "yuvapragati"





const Connection = async function () {
  try {
    await mongoose
      .connect(
        // `mongodb+srv://sonu:mdshahbazwarish1996@sonuproject.hdiyklc.mongodb.net/network_marketing?retryWrites=true&w=majority`,
        // `mongodb+srv://yuvapragatipvt:3Pp1CRyz61ipcKt4@cluster0.1ofzyho.mongodb.net/yuvapragati`,
        `mongodb+srv://${database_username}:${database_password}@cluster0.1ofzyho.mongodb.net/${database_name}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then((pass) =>
        console.log(
          `Database mongoDB is connected. Database Name : "${pass.connections[0].name}"`
        )
      )
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports.Connection = Connection;

// dbURI = `mongodb+srv://<username>:<password>@sonuproject.hdiyklc.mongodb.net/?retryWrites=true&w=majority`
// username = 'sonu'
// password = 'mdshahbazwarish1996'


// git branch -m main master
// git fetch origin
// git branch -u origin/master master
// git remote set-head origin -a