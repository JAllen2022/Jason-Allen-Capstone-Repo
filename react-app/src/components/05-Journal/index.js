import Notebook from "../ReusableComponents/Notebook";
import { useDate } from "../../context/Date";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import Arrow from "../../Assets/Arrow.js";
import "./Journal.css";
import Poloroid from "./Poloroid";
import { useDispatch } from "react-redux";

export default function Journal() {
  const { weekString, nextWeekString, day, setDay, setDate, year, month } =
    useDate();
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const [textField1, setTextField1] = useState("1.\n2.\n3.");
  const [textField2, setTextField2] = useState("1.\n2.\n3.");
  const [textField3, setTextField3] = useState("");
  const [textField4, setTextField4] = useState("1.\n2.\n3.");
  const [textField5, setTextField5] = useState("");
  const [textField6, setTextField6] = useState("");

  const updateHeaderImage = async (e) => {
    const file = e.target.files[0];

    const data = new FormData();

    data.append("image", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: data,
    });
    const responseData = await res.json();
    const url = responseData.image_url;
  };

  function handleChange1(event) {
    const lines = event.target.value.split("\n");
    if (lines.length > 3) {
      setTextField1(lines.slice(0, 3).join("\n"));
      return;
    }
    const numberedLines = lines.map((line, index) => {
      if (!line.match(/^\d+\.\s/)) {
        line = `${index + 1}. ${line}`;
      }
      return line;
    });
    setTextField1(numberedLines.join("\n"));
  }

  function handleChange2(event) {
    const lines = event.target.value.split("\n");
    if (lines.length > 3) {
      setTextField2(lines.slice(0, 3).join("\n"));
      return;
    }
    const numberedLines = lines.map((line, index) => {
      if (!line.match(/^\d+\.\s/)) {
        line = `${index + 1}. ${line}`;
      }
      return line;
    });
    setTextField2(numberedLines.join("\n"));
  }
  function handleChange4(event) {
    const lines = event.target.value.split("\n");
    if (lines.length > 3) {
      setTextField4(lines.slice(0, 3).join("\n"));
      return;
    }
    const numberedLines = lines.map((line, index) => {
      if (!line.match(/^\d+\.\s/)) {
        line = `${index + 1}. ${line}`;
      }
      return line;
    });
    setTextField4(numberedLines.join("\n"));
  }
  const leftPageContent = (
    <div className="notebook-left-page-content-container">
      <div className="notebook-date-container">
        <div className="notebook-sun-icon">
          <i class="fa-regular fa-sun"></i>
        </div>
        <div className="notebook-date">{`${month + 1}/${day}/${year}`}</div>
      </div>
      <div className="notebook-day-input-container">
        <div className="notebook-daily-quote-container">
          <div className="notebook-daily-quote">
            {" "}
            <em>If you see something beautiful in someone, speak it.</em>
          </div>
          <div className="notebook-quote-author"> Ruthie Lindsay</div>
        </div>

        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">
            <em>I am grateful for...</em>
          </div>
          <div className="notebook-night-three-line-container">
            <textarea
              className="weekly-review-text-area"
              rows="3"
              value={textField1}
              onChange={handleChange1}
            />
          </div>
        </div>
        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">
            <em>What would make today great?</em>
          </div>
          <div className="notebook-night-three-line-container">
            <textarea
              className="weekly-review-text-area"
              rows="3"
              value={textField2}
              onChange={handleChange2}
            />
          </div>
        </div>
        <div className="notebook-night-two-line-container">
          <div className="notebook-section-title">
            <em>Daily affirmation</em>
          </div>
          <div className="notebook-night-two-line-container">
            {" "}
            <textarea
              className="weekly-review-text-area"
              value={textField3}
              onChange={(e) => setTextField3(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="notebook-night-input-container">
        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">
            <div className="notebook-night-icon">
              <i class="fa-regular fa-moon"></i>{" "}
            </div>
            <em>Highlights of the day</em>
          </div>
          <div className="notebook-night-three-line-container">
            <textarea
              className="weekly-review-text-area"
              rows="3"
              value={textField4}
              onChange={handleChange4}
            />
          </div>
        </div>
        <div className="notebook-night-two-line-container">
          <div className="notebook-section-title">
            <em>What did I learn today?</em>
          </div>
          <div className="notebook-night-two-line-container">
            {" "}
            <textarea
              className="weekly-review-text-area"
              value={textField5}
              onChange={(e) => setTextField5(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
  const rightPageContent = (
    <div className="notebook-right-page-content-container">
      <div className="notebook-pictures-container">
        <div className="notebook-section-title">
          <em>Picture Gallery</em>
        </div>{" "}
        <div className="notebook-inner-picture-container">
          <div className="notebook-picture">
            <Poloroid />
          </div>
          <div className="notebook-picture">
            <Poloroid />
          </div>
          <div className="notebook-picture">
            <Poloroid />
          </div>
          <div
            className="notebook-picture"
            onClick={() =>
              setModalContent(
                <div className="poloroid-modal">
                  <Poloroid />
                </div>
              )
            }
          >
            <Poloroid />
          </div>
          <div className="add-notebook-picture">
            <label className="notebook-add-picture" htmlFor="header-pic-file">
              <div className="">
                <i class="fa-solid fa-plus"></i>
              </div>
            </label>
            <input
              style={{ display: "none" }}
              id="header-pic-file"
              name="header-pic-file"
              type="file"
              accept="image/*"
              onChange={updateHeaderImage}
            />
          </div>
        </div>
      </div>
      <div className="notebook-extra-thoughts-container">
        <div className="notebook-section-title">
          <em>Additional thoughts...</em>
        </div>{" "}
        <textarea
          className="weekly-review-text-area"
          value={textField6}
          onChange={(e) => setTextField6(e.target.value)}
        ></textarea>
      </div>
    </div>
  );

  useEffect(() => {
    setDate(new Date(year, month, day));
  }, [month, day, year]);

  const decreaseDay = () => setDay(day - 1);
  const increaseDay = () => setDay(day + 1);

  return (
    <>
      <Notebook
        leftPageContent={leftPageContent}
        rightPageContent={rightPageContent}
      />
      <div className="planner-arrow-container">
        {" "}
        <div className="planner-arrow-left-right">
          <Arrow classString={"left-arrow"} onClick={decreaseDay} />
          <Arrow classString={"right-arrow"} onClick={increaseDay} />
        </div>
        <div className="planner-arrow-descriptions">
          <div className="planner-arrow-text" onClick={decreaseDay}>
            Previous Day
          </div>
          <div className="planner-arrow-text" onClick={increaseDay}>
            Next Day
          </div>
        </div>
      </div>
    </>
  );
}
