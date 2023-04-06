import Notebook from "../ReusableComponents/Notebook";
import { useDate } from "../../context/Date";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import Arrow from "../../Assets/Arrow.js";
import "./Journal.css";
import Poloroid from "./Poloroid";
import { useDispatch, useSelector } from "react-redux";
import { editJournalThunk, addJournalThunk } from "../../store/journal";

export default function Journal() {
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declaring Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const journal = useSelector((state) => state.journals.journal);
  const images = useSelector((state) => state.journals.images);

  // UseStates
  const [textField1, setTextField1] = useState("1.\n2.\n3.");
  const [textField2, setTextField2] = useState("1.\n2.\n3.");
  const [textField3, setTextField3] = useState("");
  const [textField4, setTextField4] = useState("1.\n2.\n3.");
  const [textField5, setTextField5] = useState("");
  const [textField6, setTextField6] = useState("");

  // Date context and date changing functionality
  const {
    weekString,
    nextWeekString,
    day,
    setDay,
    setDate,
    year,
    month,
    journalDateString,
  } = useDate();

  const decreaseDay = () => setDay(day - 1);
  const increaseDay = () => setDay(day + 1);

  // Helper functions:
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

  function handleChange(event, changeFunction) {
    const lines = event.target.value.split("\n");
    if (lines.length > 3) {
      changeFunction(lines.slice(0, 3).join("\n"));
      return;
    }
    const numberedLines = lines.map((line, index) => {
      if (!line.match(/^\d+\.\s/)) {
        line = `${index + 1}. ${line}`;
      }
      return line;
    });
    changeFunction(numberedLines.join("\n"));
  }

  // HandleSubmit
  const handleSubmit = (value, fetchVariableName) => {
    const newJournal = {
      ...journal,
      text_field1: textField1,
      text_field2: textField2,
      text_field3: textField3,
      text_field4: textField4,
      text_field5: textField5,
      text_field6: textField6,
    };

    if (!newJournal.year) newJournal.year = year;
    if (!newJournal.date) newJournal.date = journalDateString;

    newJournal[fetchVariableName] = value;

    if (journal.id) dispatch(editJournalThunk(newJournal));
    else dispatch(addJournalThunk(newJournal));
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UseEffect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  useEffect(() => {
    setDate(new Date(year, month, day));
  }, [month, day, year]);

  useEffect(() => {
    setTextField1(journal.text_field1 || "1.\n2.\n3.");
    setTextField2(journal.text_field2 || "1.\n2.\n3.");
    setTextField3(journal.text_field3 || "");
    setTextField4(journal.text_field4 || "1.\n2.\n3.");
    setTextField5(journal.text_field5 || "");
    setTextField6(journal.text_field6 || "");
  }, [journal]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declaring Left Page Contents ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const leftPageContent = (
    <div className="notebook-left-page-content-container">
      <div className="notebook-date-container">
        <div className="notebook-sun-icon">
          <i className="fa-regular fa-sun"></i>
        </div>
        <div className="notebook-date">{journalDateString}</div>
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
              onChange={(e) => handleChange(e, setTextField1)}
              onBlur={(e) => {
                e.preventDefault();
                // if (e.target.value !== textField1) {
                setTextField1(e.target.value);
                handleSubmit(e.target.value, "text_field1");
                // }
              }}
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
              onChange={(e) => handleChange(e, setTextField2)}
              onBlur={(e) => {
                e.preventDefault();
                // if (e.target.value !== textField1) {
                setTextField2(e.target.value);
                handleSubmit(e.target.value, "text_field2");
                // }
              }}
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
              onBlur={(e) => {
                e.preventDefault();
                // if (e.target.value !== textField1) {
                setTextField3(e.target.value);
                handleSubmit(e.target.value, "text_field3");
                // }
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="notebook-night-input-container">
        <div className="notebook-night-three-line-container">
          <div className="notebook-section-title">
            <div className="notebook-night-icon">
              <i className="fa-regular fa-moon"></i>{" "}
            </div>
            <em>Highlights of the day</em>
          </div>
          <div className="notebook-night-three-line-container">
            <textarea
              className="weekly-review-text-area"
              rows="3"
              value={textField4}
              onChange={(e) => handleChange(e, setTextField4)}
              onBlur={(e) => {
                e.preventDefault();
                // if (e.target.value !== textField1) {
                setTextField4(e.target.value);
                handleSubmit(e.target.value, "text_field4");
                // }
              }}
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
              onBlur={(e) => {
                e.preventDefault();
                // if (e.target.value !== textField1) {
                setTextField5(e.target.value);
                handleSubmit(e.target.value, "text_field5");
                // }
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Declaring Right Page Contents ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
                <i className="fa-solid fa-plus"></i>
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
          onBlur={(e) => {
            e.preventDefault();
            // if (e.target.value !== textField1) {
            setTextField6(e.target.value);
            handleSubmit(e.target.value, "text_field6");
            // }
          }}
        ></textarea>
      </div>
    </div>
  );

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
