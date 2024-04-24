import { DataTypes, Model } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

class PlanMember extends Model {
  public id!: string;
  public planId!: string;
  public ownerId!: string;
  public memberId!: string;



  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

}

PlanMember.init(
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
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "planmembers",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);



export default PlanMember;
