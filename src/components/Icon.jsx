import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/**
 * Use any of the (free) icons from Font Awesome.
 *
 * @see Here is a [complete list](https://fontawesome.com/v4.7.0/icons/).
 */
const Icon = (props) => {
  const { altText, className, icon } = props;
  const classes = cx('fa', `fa-${icon}`, className);

  return (
    <span>
      <i key="q" className={classes} title={altText} />
      <span className="visually-hidden">{altText}</span>
    </span>
  );
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  /** Any alt text you want to display. */
  altText: PropTypes.string,
  /** A custom css class to append to the list of classes on the icon. */
  className: PropTypes.string,
  /**
   * A Font Awesome icon name.
   */
  icon: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  altText: '',
  className: '',
};

export default Icon;
