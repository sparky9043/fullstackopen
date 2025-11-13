interface TitleProps {
  text: string;
};

const Title = ({ text }: TitleProps) =>
  <h1>{ text }</h1>;

export default Title;