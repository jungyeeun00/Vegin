/*!

=========================================================
* Paper Kit React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import 'assets/scss/paper-kit/_indexnavbar.scss'
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <div className="col d-none d-lg-block"></div>
          <div className="col text-center">
            <NavbarBrand
              className="pb-0"
              data-placement="bottom"
              href="/index"
              target="_top"
              title="Vegin"
            >
              <img
                alt="Logo"
                src={require("assets/img/home_logo.png")}
                width="150px"
                max-width="100%"
                height="auto"
              />
            </NavbarBrand>
          </div>
          <div className="col d-none d-lg-block">
            <Nav navbar className="justify-content-end">
              <NavItem>
                <NavLink
                  className="pt-0 mt-0"
                  data-placement="bottom"
                  href="/login-page"
                  title="Login"
                >
                  <p>Login</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="pt-0 mt-0"
                  data-placement="bottom"
                  href="/join-page"
                  title="Join"
                >
                  <p>Join</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="pt-0 mt-0"
                  data-placement="bottom"
                  href="/mypage-page"
                  title="My Page"
                >
                  <p>My page</p>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <Navbar expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand>
            </NavbarBrand>
            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse,
              })}
              onClick={toggleNavbarCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className="justify-content-center"
            navbar
            isOpen={navbarCollapse}
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  className="px-5"
                  data-placement="bottom"
                  href="/index"
                  title="HOME"
                >
                  <p>HOME</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar className='in-dropdown-wrapper'>
                <DropdownToggle className='in-dropdown'
                  style={{ height: '49px', padding: '10px 48px', margin: '15px 3px' }}>
                  ABOUT
                  </DropdownToggle>
                <DropdownMenu
                  aria-labelledby="dropdownMenuButton"
                  className='dropdown-info'
                >
                  <DropdownItem
                    href="/about-vegan-page"
                    className="in-dropdown-item"
                  >
                    VEGAN
                      </DropdownItem>
                  <DropdownItem
                    href="/about-vegin-page"
                    className="in-dropdown-item"
                  >
                    VEGIN
                      </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  className="px-5"
                  data-placement="bottom"
                  href="/recipe-page"
                  title="RECIPE"
                >
                  <p>RECIPE</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="px-5"
                  data-placement="bottom"
                  href="/shop-page"
                  title="SHOP"
                >
                  <p>SHOP</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="px-5"
                  data-placement="bottom"
                  href="/place-page"
                  title="PLACE"
                >
                  <p>PLACE</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar className='in-dropdown-wrapper'>
                <DropdownToggle className='in-dropdown'
                  style={{ height: '49px', padding: '10px 48px', margin: '15px 3px' }}>
                  COMMUNITY
                  </DropdownToggle>
                <DropdownMenu
                  aria-labelledby="dropdownMenuButton"
                  className='dropdown-info'
                  style={{ minWidth: '211px' }}
                >
                  <DropdownItem
                    href="/board"
                    className="in-dropdown-item"
                  >
                    자유게시판
                      </DropdownItem>
                  <DropdownItem
                    href="/diary"
                    className="in-dropdown-item"
                  >
                    다이어리
                      </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default IndexNavbar;