import { Card as AntCard } from "antd";
import { CardProps, CardMetaProps, CardGridProps } from "./CardProps";

const Card: React.FC<CardProps> & {
  Meta: React.FC<CardMetaProps>;
  Grid: React.FC<CardGridProps>;
} = (props) => {
  return <AntCard {...props} />;
};

const Meta: React.FC<CardMetaProps> = (props) => {
  return <AntCard.Meta {...props} />;
};
const Grid: React.FC<CardGridProps> = (props) => {
  return <AntCard.Meta {...props} />;
};

Card.Meta = Meta;
Card.Grid = Grid;
export default Card;
