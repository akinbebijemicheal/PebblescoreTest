import { DataTypes, Model } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

class Invite extends Model {
  public id!: string;
  public planId!: string;
  public senderId!: string;
  public recieverId!: string;
  public answer!: boolean;



  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

}

Invite.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    planId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recieverId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'acccepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "invites",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);



export default Invite;
