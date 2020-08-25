import { Navbar, Nav, NavbarBrand } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NavbarCustom = styled(Navbar)`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const Brand = styled(NavbarBrand)`
  cursor: pointer;
  color: black;
  padding: 10px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NavButton = styled.button`
  outline: none;
  border: none;
  font-size: 18px;
  padding: 10px;
  margin: 0 10px;
  background-color: transparent;
  color: black;
  border-radius: 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

function Header({ offset }) {
  const handleScroll = (top) => {
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <NavbarCustom fixed="top" expand="lg">
      <Link href="/">
        <Brand>
          <FaHome />
        </Brand>
      </Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavButton onClick={() => handleScroll(0)}>PERSONAL</NavButton>
          <NavButton onClick={() => handleScroll(offset.projects)}>
            PROJECTS
          </NavButton>
          <NavButton onClick={() => handleScroll(offset.about)}>
            ABOUT
          </NavButton>
          <NavButton onClick={() => handleScroll(offset.resume)}>
            RESUME
          </NavButton>
        </Nav>
      </Navbar.Collapse>
    </NavbarCustom>
  );
}

export default Header;
