import Notebook from "../ReusableComponents/Notebook";
import { useDate } from "../../context/Date";
import { useState, useEffect } from "react";
import Arrow from "../../Assets/Arrow.js";
import { useDispatch, useSelector } from "react-redux";
import "./WeeklyReview.css";
import {
  addReflectionThunk,
  editReflectionThunk,
  getReflectionThunk,
} from "../../store/reflections";

export default function WeeklyReview() {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declaring Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // General Declarations
  const dispatch = useDispatch();
  const reflection = useSelector((state) => state.reflections.reflection);

  // UseStates
  const [textField1, setTextField1] = useState("");
  const [textField2, setTextField2] = useState("");
  const [textField3, setTextField3] = useState("");
  const [textField4, setTextField4] = useState("");
  const [textField5, setTextField5] = useState("");
  const [textField6, setTextField6] = useState("");
  const [textField7, setTextField7] = useState("");
  const [weekRating, setWeekRating] = useState("neutral");

  // Date context and date changing functionality
  const { weekString, nextWeekString, day, setDay, setDate, year, month } =
    useDate();
  const decreaseWeek = () => setDay(day - 7);
  const increaseWeek = () => setDay(day + 7);

  // HandleSubmit
  const handleSubmit = (value, fetchVariableName) => {
    const newReflection = {
      ...reflection,
      text_field1: textField1,
      text_field2: textField2,
      text_field3: textField3,
      text_field4: textField4,
      text_field5: textField5,
      text_field6: textField6,
      text_field7: textField7,
      week_rating: weekRating,
    };

    if (!newReflection.year) newReflection.year = year;
    if (!newReflection.month) newReflection.week = weekString;

    newReflection[fetchVariableName] = value;

    if (reflection.id) dispatch(editReflectionThunk(newReflection));
    else dispatch(addReflectionThunk(newReflection));
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UseEffect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    setDate(new Date(year, month, day));
  }, [month, day, year]);

  useEffect(() => {
    dispatch(getReflectionThunk({ year, week: weekString }));
  }, [year, weekString]);

  useEffect(() => {
    setTextField1(reflection.text_field1 || "");
    setTextField2(reflection.text_field2 || "");
    setTextField3(reflection.text_field3 || "");
    setTextField4(reflection.text_field4 || "");
    setTextField5(reflection.text_field5 || "");
    setTextField6(reflection.text_field6 || "");
    setTextField7(reflection.text_field7 || "");
    setWeekRating(reflection.week_rating || "neutral");
  }, [reflection]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declaring Left Page Contents ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const leftPageContent = (
    <div className="weekly-review-left-page-container">
      <div className="weekly-review-title-container">
        <div className="weekly-review-title">Weekly Reflection</div>
        <div className="weekly-review-sub-title">
          Week of {weekString.slice(14)}
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">Weekly wins</div>
        <div className="weekly-review-question-sub-title">
          What's going well? Any wins (big or little)?
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField1}
            onChange={(e) => setTextField1(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // if (e.target.value !== textField1) {
              setTextField1(e.target.value);
              handleSubmit(e.target.value, "text_field1");
              // }
            }}
          ></textarea>
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">
          What tasks were not completed?
        </div>
        <div className="weekly-review-question-sub-title">
          Recommit to complete these tasks next week.
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField2}
            onChange={(e) => setTextField2(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // if (e.target.value !== textField2) {
              setTextField2(e.target.value);
              handleSubmit(e.target.value, "text_field2");
              // }
            }}
          ></textarea>
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">
          What have you learned?
        </div>
        <div className="weekly-review-question-sub-title">
          How will you implement this in the future?
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField3}
            onChange={(e) => setTextField3(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // if (e.target.value !== textField3) {
              setTextField3(e.target.value);
              handleSubmit(e.target.value, "text_field3");
              // }
            }}
          ></textarea>
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">Rate the week</div>
        <div className="weekly-review-question-sub-title">
          How do you feel the week went overall?
        </div>
        <div className="weekly-review-question-input-area">
          <div className="rating-container">
            <div className="rating">
              <form className="rating-form">
                <label htmlFor="super-happy">
                  <input
                    type="radio"
                    name="rating"
                    className="super-happy week-review"
                    id="super-happy"
                    value="super-happy"
                    checked={weekRating === "super-happy"}
                    onChange={() => {
                      setWeekRating("super-happy");
                      handleSubmit("super-happy", "week_rating");
                    }}
                  />
                  <svg className="review-svg" viewBox="0 0 24 24">
                    <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>
                </label>

                <label htmlFor="happy">
                  <input
                    type="radio"
                    name="rating"
                    className="happy week-review"
                    id="happy"
                    value="happy"
                    checked={weekRating === "happy"}
                    onChange={() => {
                      setWeekRating("happy");
                      handleSubmit("happy", "week_rating");
                    }}
                  />
                  <svg
                    className="review-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
                  </svg>
                </label>

                <label htmlFor="neutral">
                  <input
                    type="radio"
                    name="rating"
                    className="neutral week-review"
                    id="neutral"
                    value="neutral"
                    checked={weekRating === "neutral"}
                    onChange={() => {
                      setWeekRating("neutral");
                      handleSubmit("neutral", "week_rating");
                    }}
                  />
                  <svg
                    className="review-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" />
                  </svg>
                </label>

                <label htmlFor="sad">
                  <input
                    type="radio"
                    name="rating"
                    className="sad week-review"
                    id="sad"
                    value="sad"
                    checked={weekRating === "sad"}
                    onChange={() => {
                      setWeekRating("sad");
                      handleSubmit("sad", "week_rating");
                    }}
                  />
                  <svg
                    className="review-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" />
                  </svg>
                </label>

                <label htmlFor="super-sad">
                  <input
                    type="radio"
                    name="rating"
                    className="super-sad week-review"
                    id="super-sad"
                    value="super-sad"
                    checked={weekRating === "super-sad"}
                    onChange={() => {
                      setWeekRating("super-sad");
                      handleSubmit("super-sad", "week_rating");
                    }}
                  />
                  <svg className="review-svg" viewBox="0 0 24 24">
                    <path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z" />
                  </svg>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declaring Right Page Contents ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const rightPageContent = (
    <div className="weekly-review-right-page-container">
      <div className="weekly-review-title-container">
        <div className="weekly-review-title">Weekly Planning</div>
        <div className="weekly-review-sub-title">
          Week of {nextWeekString.slice(14)}
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">
          Intention for the week
        </div>
        <div className="weekly-review-question-sub-title">
          Set the direction and tone for the week with this intention.
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField4}
            onChange={(e) => setTextField4(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();

              setTextField4(e.target.value);
              handleSubmit(e.target.value, "text_field4");
            }}
          ></textarea>
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">
          Five most important tasks of the week
        </div>
        <div className="weekly-review-question-sub-title">
          If these were the only tasks you completed during the week you'd be
          satisfied.
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField5}
            onChange={(e) => setTextField5(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // if (e.target.value !== textField5) {
              setTextField5(e.target.value);
              handleSubmit(e.target.value, "text_field5");
              // }
            }}
          ></textarea>
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">
          Secondary tasks of importance
        </div>
        <div className="weekly-review-question-sub-title">
          Do these only after you have completed the above tasks.
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField6}
            onChange={(e) => setTextField6(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // if (e.target.value !== textField6) {
              setTextField6(e.target.value);
              handleSubmit(e.target.value, "text_field6");
              // }
            }}
          ></textarea>
        </div>
      </div>
      <div className="weekly-review-left-page-question-container">
        <div className="weekly-review-question-title">This week</div>
        <div className="weekly-review-question-sub-title">
          What actions will you take to ensure your week is productive?
        </div>
        <div className="weekly-review-question-input-area">
          <textarea
            className="weekly-review-text-area"
            value={textField7}
            onChange={(e) => setTextField7(e.target.value)}
            onBlur={(e) => {
              e.preventDefault();
              // if (e.target.value !== textField7) {
              setTextField7(e.target.value);
              handleSubmit(e.target.value, "text_field7");
              // }
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Rendered Display ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <>
      <Notebook
        leftPageContent={leftPageContent}
        rightPageContent={rightPageContent}
      />
      <div className="planner-arrow-container">
        {" "}
        <div className="planner-arrow-left-right">
          <Arrow classString={"left-arrow"} onClick={decreaseWeek} />
          <Arrow classString={"right-arrow"} onClick={increaseWeek} />
        </div>
        <div className="planner-arrow-descriptions">
          <div className="planner-arrow-text" onClick={decreaseWeek}>
            Previous Week
          </div>
          <div className="planner-arrow-text" onClick={increaseWeek}>
            Next Week
          </div>
        </div>
      </div>
    </>
  );
}
