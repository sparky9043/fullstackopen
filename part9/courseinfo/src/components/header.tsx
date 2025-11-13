interface HeaderProps {
  text: string;
};

const Header = ({ text }: HeaderProps) =>
  <h1>{ text }</h1>;

export default Header;