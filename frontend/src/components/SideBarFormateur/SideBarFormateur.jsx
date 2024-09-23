import { useState } from "react";
import "./sidebarformateur.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../assets/DashboardIcon";
import { HomeIcon } from "../../assets/HomeIcon";
import { UserIcon } from "../../assets/UserIcon";
import { GroupIcon } from "../../assets/GroupIcon";
import { MessageIcon } from "../../assets/MessageIcon";
import { SettingsIcon } from "../../assets/SettingsIcon";
import { NavbarArrowIcon } from "../../assets/NavbarArrowIcon";

export const SideBarFormateur = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="formateurSideBar">
      <img className="formateurSideBar-logo" src={assets.logograins} alt="Logo" />
      <hr />
        <div className="formateurSideBar-buttons">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <DashboardIcon />
            </div>
            <label>Dashboard</label>
          </NavLink>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <HomeIcon />
            </div>
            <label>Home</label>
          </NavLink>
          <div className={`formateurSideBar-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`formateurSideBar-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="formateurSideBar-btn-icon">
                <UserIcon />
              </div>
              <label>Liste des formateurs</label>
              <div className="formateurSideBar-btn-arrow-icon">
                <NavbarArrowIcon />
              </div>
            </div>
            <div className="formateurSideBar-subBtn-group">
              <NavLink
                to="/user/list/parents"
                className={({ isActive }) =>
                  isActive ? "formateurSideBar-subBtn active" : "formateurSideBar-subBtn"
                }
              >
                <div>
                  <label>Parents</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive ? "formateurSideBar-subBtn active" : "formateurSideBar-subBtn"
                }
              >
                <div>
                  <label>Graines</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive ? "formateurSideBar-subBtn active" : "formateurSideBar-subBtn"
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
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <GroupIcon />
            </div>
            <label>Créer formateurs</label>
          </NavLink>
          <NavLink
            to="/group-list"
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <GroupIcon />
            </div>
            <label>Groupes</label>
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <MessageIcon />
            </div>
            <label>Messages</label>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <MessageIcon />
            </div>
            <label>Home contact</label>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <SettingsIcon />
            </div>
            <label>Paramètres</label>
          </NavLink>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};
