import { Navbar, Nav, NavbarBrand } from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NavbarCustom = styled(Navbar)`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
`;

const Brand = styled(NavbarBrand)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary} !important;
  &:hover {
    filter: brightness(90%);
  }
`;

const NavButton = styled.button`
  outline: none;
  border: none;
  font-size: 16px;
  padding: 10px;
  margin: 0 10px;
  background-color: transparent;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    filter: brightness(90%);
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
