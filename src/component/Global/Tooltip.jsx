import React from "react";
import PropTypes from "prop-types";
import { Icon  } from "antd";

function getLenModifier( len ) {
  switch( true ) {
    case len > 60:
      return "xlarge";
    case len > 40:
      return "large";
    case len > 20:
      return "medium";
    default:
      return "small";
  }
}

export default function Tooltip( props ) {
  return ( <span className="char-pad--left"
    data-balloon={ props.title }
    data-balloon-length={ getLenModifier( props.title.length ) }
    data-balloon-pos={ props.pos || "right" }>
    { props.icon ? ( <Icon type={props.icon}  /> ) : props.children }
  </span> );
}

Tooltip.propTypes = {
  pos: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.any
};