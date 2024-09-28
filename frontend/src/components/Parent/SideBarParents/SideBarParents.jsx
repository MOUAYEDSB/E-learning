import { useState } from "react";
import "./sidebarparents.css";
import Logo from "../../../assets/grainesLogo.svg";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../../assets/DashboardIcon";
import { HomeIcon } from "../../../assets/HomeIcon";
import { UserIcon } from "../../../assets/UserIcon";
import { GroupIcon } from "../../../assets/GroupIcon";
import { MessageIcon } from "../../../assets/MessageIcon";
import { SettingsIcon } from "../../../assets/SettingsIcon";
import { NavbarArrowIcon } from "../../../assets/NavbarArrowIcon";

export const SidebarParents = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sidebar-parents">
        <img className="sidebar-parents-logo" src={Logo} alt="Logo" />
        <hr />
        <div className="sidebar-parents-buttons">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
              <DashboardIcon />
            </div>
            <label>Dashboard</label>
          </NavLink>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
              <HomeIcon />
            </div>
            <label>Home</label>
          </NavLink>
          <div className={`sidebar-parents-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`sidebar-parents-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="sidebar-parents-btn-icon">
                <UserIcon />
              </div>
              <label>Liste des utilisateurs</label>
              <div className="sidebar-parents-btn-arrow-icon">
                <NavbarArrowIcon />
              </div>
            </div>
            <div className="sidebar-parents-subBtn-group">
              <NavLink
                to="/user/list/parents"
                className={({ isActive }) =>
                  isActive ? "sidebar-parents-subBtn active" : "sidebar-parents-subBtn"
                }
              >
                <div>
                  <label>Parents</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive ? "sidebar-parents-subBtn active" : "sidebar-parents-subBtn"
                }
              >
                <div>
                  <label>Graines</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive ? "sidebar-parents-subBtn active" : "sidebar-parents-subBtn"
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
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
              <GroupIcon />
            </div>
            <label>Cree utilisateurs</label>
          </NavLink>
          <NavLink
            to="/group-list"
            className={({ isActive }) =>
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
              <GroupIcon />
            </div>
            <label>Groupes</label>
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
              <MessageIcon />
            </div>
            <label>Messages</label>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
              <MessageIcon />
            </div>
            <label>Home contact</label>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "sidebar-parents-btn active" : "sidebar-parents-btn"
            }
          >
            <div className="sidebar-parents-btn-icon">
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
