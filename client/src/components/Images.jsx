const Images = ({ src, ...rest }) => {
  const path =
    src && src.includes("https://")
      ? src
      : "http://localhost:4000/uploads/" + src;
  return <img {...rest} src={path} alt="hotel photos" />;
};
export default Images;
