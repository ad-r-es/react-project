import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './Slider.module.scss';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [factCount, setFactCount] = useState(0);
  const [slide, setSlide] = useState('');
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://react-o.firebaseio.com/slides.json')
        .then((response) => {
          setFactCount(response.data.length);
          setSlide(response.data[0]);
          setResponseData(response.data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (responseData) {
      setSlide(responseData[index]);
    }
  }, [responseData, index]);

  const prevClickHandler = () => {
    const prevIndex = index;
    if (prevIndex >= 1) {
      setIndex(prevIndex - 1);
    }
  };

  const nextClickHandler = () => {
    const prevIndex = index;
    if (prevIndex < factCount - 1) {
      setIndex(prevIndex + 1);
    }
  };

  const buttons = [...Array(factCount)].map((e, i) => (
    <span
      label="text"
      role="button"
      tabIndex="-1"
      key={Math.random()}
      className={(i !== index) ? styles.Button : styles.Active}
      onClick={() => setIndex(i)}
      onKeyDown={() => setIndex(i)}
    />
  ));

  return (
    <div className={styles.Slider}>
      <div className={styles.Slides}>
        <p>{slide}</p>
      </div>
      <button type="button" className={styles.Prev} onClick={prevClickHandler}>&#10094;</button>
      <button type="button" className={styles.Next} onClick={nextClickHandler}>&#10095;</button>
      <div className={styles.Buttons}>
        {buttons}
      </div>
    </div>
  );
};

export default Slider;
