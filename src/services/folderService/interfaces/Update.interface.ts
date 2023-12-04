import {EntityIdInterface} from "interfaces/EntityId.interface";
import ICreate from "./Create.interface";

export default interface IUpdate extends Partial<ICreate>, EntityIdInterface {}
