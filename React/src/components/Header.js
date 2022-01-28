import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router";

// const Header = (props) => {
const Header = ({ title, onClick, showAdd }) => {
  const location = useLocation();
  return (

    <header className="header">
      <h1>{title}</h1>

      {/* check location to add button */}
      {
        location.pathname === '/'
        &&
        <Button
          color={showAdd ? "crimson" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onClick}
        />
      }

    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// css in js
// const headingStyle = { color: "red", backgroundColor: "black" };

export default Header;
