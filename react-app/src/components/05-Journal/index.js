import Notebook from "../ReusableComponents/Notebook";
import { useDate } from "../../context/Date";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import Arrow from "../../Assets/Arrow.js";
import "./Journal.css";
import Poloroid from "./Poloroid";
import { useDispatch, useSelector } from "react-redux";
import {
  editJournalThunk,
  addJournalThunk,
  getJournalThunk,
  addImageThunk,
} from "../../store/journal";
import PoloroidModal from "./PoloridModal";
import quotes from "../../additionalAssets/quotes.js";

function getRandomQuote() {
  const min = 0;
  const max = 1642;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return quotes[randomNumber];
}

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
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");

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
  const addImage = async (e) => {
    let journalId = journal.id;
    if (!journal.id) {
      const tempJorn = await dispatch(
        addJournalThunk({
          text_field1: textField1,
          text_field2: textField2,
          text_field3: textField3,
          text_field4: textField4,
          text_field5: textField5,
          text_field6: textField6,
          date: journalDateString,
          year,
          text: quote,
          author,
        })
      );
      journalId = tempJorn.journal.id;
    }
    const file = e.target.files[0];

    const data = new FormData();

    data.append("image", file);
    data.append("journal_id", journalId);

    dispatch(addImageThunk(data));
  };

  // Creating images

  const dispImages = Object.values(images).map((ele, index) => (
    <>
      <div
        className="notebook-picture"
        ket={index}
        onClick={() => setModalContent(<PoloroidModal image={ele} />)}
      >
        <Poloroid image={ele} />
      </div>
    </>
  ));
  if (dispImages.length < 6) {
    dispImages.push(
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
          onChange={addImage}
        />
      </div>
    );
  }

  // HandleSubmit
  const handleSubmit = (value, fetchVariableName) => {
    const newJournal = {
      ...journal,
      quote,
      author,
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
    dispatch(getJournalThunk({ year, date: journalDateString }));
    if (!journal.id) {
      const randomQuote = getRandomQuote();
      setQuote(randomQuote.text);
      setAuthor(randomQuote.author);
    }
  }, [year, journalDateString]);

  useEffect(() => {
    setQuote(journal.text);
    setAuthor(journal.author);
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
            <em>{quote}</em>
          </div>
          <div className="notebook-quote-author"> {author}</div>
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
              onChange={(e) => setTextField1(e.target.value)}
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
              onChange={(e) => setTextField2(e.target.value)}
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
              onChange={(e) => setTextField4(e.target.value)}
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
        <div className="notebook-inner-picture-container">{dispImages}</div>
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
