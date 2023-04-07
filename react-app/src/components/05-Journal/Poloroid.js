export default function Poloroid({ image, deleteConfirmation }) {
  console.log("checking poloroid", image.image_url);

  let style = "poloroid-image";
  if (deleteConfirmation) style += " poloroid-opacity";

  return (
    <div className="polaroid-container">
      <img className={style} src={image.image_url}></img>
    </div>
  );
}
