import { DataTypes, Model } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

class Plan extends Model {
  public id!: string;
  public ownerId!: string;
  public title!: string;
  public memberCount!: BigInt;
  public target!: boolean;
  public savingsType!: string;
  public frequency!: string;
  public startDate!: string;
  public endDate!: string;
  public annualSaved!: string;
  public duration!: string;
  public memberRelationship!: string;



  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

}

Plan.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memberCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    target: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    savingsType: {
      type: DataTypes.ENUM("automatic", "manual"),
      allowNull: false,
      defaultValue: "manual"
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    annualSaved: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memberRelationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "plans",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);



export default Plan;
