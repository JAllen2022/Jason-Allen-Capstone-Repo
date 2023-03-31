import Notebook from "../ReusableComponents/Notebook";
import { useDate } from "../../context/Date";
import { useState, useEffect } from "react";
import Arrow from "../../assets/Arrow.js";
import Notes from "../ReusableComponents/Notes";
import "./Journal.css";

export default function Journal() {
  const { weekString, nextWeekString, day, setDay, setDate, year, month } =
    useDate();
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
            If you see something beautiful in someone, speak it.
          </div>
          <div className="notebook-quote-author"> Ruthie Lindsay</div>
        </div>

        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">I am grateful for...</div>
          <div className="notebook-night-three-line-container"></div>
        </div>
        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">
            What would make today great?
          </div>
          <div className="notebook-night-three-line-container"></div>
        </div>
        <div className="notebook-night-two-line-container">
          <div className="notebook-section-title">Daily affirmation</div>
          <div className="notebook-night-two-line-container">
            {" "}
            <textarea className="weekly-review-text-area"></textarea>
          </div>
        </div>
      </div>
      <div className="notebook-night-input-container">
        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">
            <i class="fa-regular fa-moon"></i> Highlights of the day
          </div>
          <div className="notebook-night-three-line-container"></div>
        </div>
        <div className="notebook-night-two-line-container">
          <div className="notebook-section-title">What did I learn today?</div>
          <div className="notebook-night-two-line-container">
            {" "}
            <textarea className="weekly-review-text-area"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
  const rightPageContent = (
    <div className="notebook-right-page-content-container">
      <Notes />
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
            Previous Week
          </div>
          <div className="planner-arrow-text" onClick={increaseDay}>
            Next Week
          </div>
        </div>
      </div>
    </>
  );
}
