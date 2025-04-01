import './App.css'
import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import Home from "./Components/Home.jsx";
import ProductForm from './Components/ProductForm.jsx';
import UserList from './Components/UserList.jsx';
import ApiCrud from './Components/ApiCrud.jsx';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const menuItems = [
    { name: "inicio", url: "/" },
    { name: "añadir productos", url: "/ProductForm"},
    {name: "lista de usuarios", url: "/UserList"},
    { name: "api-crud-rest", url: "/ApiCrud" },
  ];

  return (
    <HeroUIProvider>
    <Navbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll className="bg-blue-400 fixed top-0 left-0 w-full p-1 z-50 shadow-lg">
    <NavbarContent>
    <NavbarMenuToggle
    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
    className="sm:hidden"
    />
    <NavbarBrand>
    <p className="font-bold text-inherit">SUPER LISTA DE PRODUCTOS</p>
    </NavbarBrand>
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
    {menuItems.map((item) => (
      <NavbarItem key={item.url}>
      <Link
      color="foreground"
      href={item.url}
      className={location.pathname === item.url ? "border-b-2 border-black" : ""}
      >
      {item.name}
      </Link>
      </NavbarItem>
    ))}
    </NavbarContent>

    <NavbarContent justify="end">
    <NavbarItem className="hidden lg:flex">
    <p className="font-bold text-inherit py-3 px-1.5">HECHA POR MARCOS GELLER</p>
    </NavbarItem>
    </NavbarContent>

    <NavbarMenu>
    {menuItems.map((item, index) => (
      <NavbarMenuItem key={`${item.name}-${index}`}>
      <Link
      className={`w-full ${
        location.pathname === item.url ? "border-b-2 border-black" : ""
      }`}
      color={index === 2 ? "primary" : "foreground"}
      href={item.url}
      size="lg"
      >
      {item.name}
      </Link>
      </NavbarMenuItem>
    ))}
    </NavbarMenu>
    </Navbar>
    </HeroUIProvider>
  );
};

export default function App() {
  return (
    <Fragment>
    <div className="h-full">
    <Router>
    <NavbarComponent />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/ProductForm" element={<ProductForm /> }/>
    <Route path='/UserList' element={<UserList /> }/>
    <Route path="/ApiCrud" element={<ApiCrud />} />
    </Routes>
    </Router>
    </div>
    </Fragment>
  );
}
