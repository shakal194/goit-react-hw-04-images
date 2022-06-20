import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
