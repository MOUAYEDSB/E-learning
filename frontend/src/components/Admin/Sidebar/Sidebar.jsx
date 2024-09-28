import { useState } from "react";
import "./sideBar.css";
import Logo from "../../../assets/grainesLogo.svg";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../../assets/DashboardIcon";
import { HomeIcon } from "../../../assets/HomeIcon";
import { UserIcon } from "../../../assets/UserIcon";
import { GroupIcon } from "../../../assets/GroupIcon";
import { MessageIcon } from "../../../assets/MessageIcon";
import { SettingsIcon } from "../../../assets/SettingsIcon";
import { NavbarArrowIcon } from "../../../assets/NavbarArrowIcon";
import { CirclePlus } from "lucide-react";
import { ReceiptText } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sideBar">
        <img className="sideBar-logo" src={Logo} alt="Logo" />
        <hr />
        <div className="sideBar-buttons">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <DashboardIcon />
            </div>
            <label>Dashboard</label>
          </NavLink>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <HomeIcon />
            </div>
            <label>Home</label>
          </NavLink>
          <div className={`sideBar-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`sideBar-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="sideBar-btn-icon">
                <UserIcon />
              </div>
              <label>Liste des utilisateurs</label>
              <div className="sideBar-btn-arrow-icon">
                <NavbarArrowIcon />
              </div>
            </div>
            <div className="sideBar-subBtn-group">
              <NavLink
                to="/user/list/parents"
                className={({ isActive }) =>
                  isActive ? "sideBar-subBtn active" : "sideBar-subBtn"
                }
              >
                <div>
                  <label>Parents</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive ? "sideBar-subBtn active" : "sideBar-subBtn"
                }
              >
                <div>
                  <label>Graines</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive ? "sideBar-subBtn active" : "sideBar-subBtn"
                }
              >
                <div>
                  <label>Formateurs</label>
                </div>
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/create-user"
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <CirclePlus color="#ffffff" />
            </div>
            <label>Cree utilisateurs</label>
          </NavLink>
          <NavLink
            to="/group-list"
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <GroupIcon />
            </div>
            <label>Groupes</label>
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <MessageIcon />
            </div>
            <label>Messages</label>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <ReceiptText color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Home contact</label>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "sideBar-btn active" : "sideBar-btn"
            }
          >
            <div className="sideBar-btn-icon">
              <SettingsIcon />
            </div>
            <label>Paramétres</label>
          </NavLink>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};
