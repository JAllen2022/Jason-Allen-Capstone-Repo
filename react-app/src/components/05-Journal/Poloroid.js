export default function Poloroid({ image }) {
  console.log("checking poloroid", image.image_url);
  return (
    <div className="polaroid-container">
      <img className="poloroid-image" src={image.image_url}></img>
    </div>
  );
}
