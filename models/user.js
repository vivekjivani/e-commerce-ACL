const bcrypt = require("bcrypt")
const { Model } = require("sequelize")
const jwt = require("jsonwebtoken")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: { msg: "User Must Have a ID" },
          notEmpty: { msg: "User ID Can not Be Empty" },
          isUUID: {
            args: 4,
            msg: "The value of id must be a valid UUID",
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User Must Have a Name" },
          notEmpty: { msg: "User Name Can not Be Empty" },
          min: { args: 3, msg: "UserName Should have more then 3 characters" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User Password Have a Password" },
          notEmpty: { msg: "User Password Can not Be Empty" },
          min: { args: 6, msg: "Password Should have more then 6 characters" },
          isLength: {
            args: [6, 255],
            msg: "Password Must be more then 6 characters and less then 255 characters",
          },
          isAlphanumeric: { msg: "User Password Must be Alphanumeric" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "customer",
        validate: {
          notNull: { msg: "User Must Have a Role" },
          notEmpty: { msg: "User Role Can not Be Empty" },
          isIn: {
            args: [["admin", "seller", "supporter", "customer"]],
            msg: "User Role Must Be Customer, Admin, Seller, or Supporter",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  )

  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, 10)
  })

  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET)
  }
  return User
}
