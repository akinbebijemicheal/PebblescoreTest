import { DataTypes, Model } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

class FriendRequestRequest extends Model {
  public id!: string;
  public senderId!: string;
  public recipientId!: string;
  public status!: string;



  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

}

FriendRequestRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipientId: {
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
    tableName: "friendrequests",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);



export default FriendRequestRequest;
