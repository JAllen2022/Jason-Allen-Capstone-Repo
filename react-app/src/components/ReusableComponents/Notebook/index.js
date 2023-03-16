import "./Notebook.css";

export default function Notebook({ leftPageContent, rightPageContent }) {
  return (
    <div className="notebook-cover">
      <div className="notebook-left">
        <div className="left-container-1">
          <div className="left-page"></div>
        </div>
        <div className="left-container-2">
          <div className="left-page"></div>
        </div>

        <div className="left-container-3">
          <div className="left-page"></div>
        </div>
        <div className="left-container-4">
          <div className="left-page"></div>
        </div>
        <div className="left-main-content-container">
          <div className="left-main-content">{leftPageContent}</div>
        </div>
      </div>
      <div className="notebook-center"></div>
      <div className="notebook-right">
        <div className="right-container-1">
          <div className="right-page"></div>
        </div>
        <div className="right-container-2">
          <div className="right-page"></div>
        </div>
        <div className="right-container-3">
          <div className="right-page"></div>
        </div>
        <div className="right-container-4">
          <div className="right-page"></div>
        </div>
        <div className="right-main-content-container">
          <div className="right-main-content">{rightPageContent}</div>
        </div>
      </div>
    </div>
  );
}
