import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './Slider.module.scss';
import * as actions from '../../store/actions/slider';

const Slider = (props) => {
  const [index, setIndex] = useState(0);

  const {
    factCount,
    slide,
    responseData,
    onFetchData,
    onDisplayData,
  } = props;

  useEffect(() => {
    if (!responseData) {
      onFetchData();
    }
  }, [onFetchData]);

  useEffect(() => {
    if (responseData) {
      onDisplayData(responseData[index]);
    }
  }, [responseData, onDisplayData, index]);

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

const mapStateToProps = (state) => ({
  factCount: state.slider.factCount,
  slide: state.slider.slide,
  responseData: state.slider.responseData,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchData: () => dispatch(actions.fetchData()),
  onDisplayData: (slide) => dispatch(actions.displayData(slide)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
