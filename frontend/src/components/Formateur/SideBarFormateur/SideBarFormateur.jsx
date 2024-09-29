import { useState } from "react";
import "./sidebarformateur.css";
import { assets } from "../../../assets/assets";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../../assets/DashboardIcon";
import { GroupIcon } from "../../../assets/GroupIcon";
import { MessageIcon } from "../../../assets/MessageIcon";
import { SettingsIcon } from "../../../assets/SettingsIcon";
import { NavbarArrowIcon } from "../../../assets/NavbarArrowIcon";
import { UserCog } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { Plus } from "lucide-react";
import { ListTree } from "lucide-react";

export const SideBarFormateur = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="formateurSideBar">
        <img
          className="formateurSideBar-logo"
          src={assets.logograins}
          alt="Logo"
        />
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
            to="/user/:id"
            end
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <UserCog color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>profile</label>
          </NavLink>
          <div className={`formateurSideBar-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`formateurSideBar-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="formateurSideBar-btn-icon">
                <ListTree color="#ffffff" strokeWidth={1.5} />
              </div>
              <label>Liste des Étudiants</label>
              <div className="formateurSideBar-btn-arrow-icon">
                <NavbarArrowIcon />
              </div>
            </div>
            <div className="formateurSideBar-subBtn-group">
              <NavLink
                to="/user/list/parents"
                className={({ isActive }) =>
                  isActive
                    ? "formateurSideBar-subBtn active"
                    : "formateurSideBar-subBtn"
                }
              >
                <div>
                  <label>Parents</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive
                    ? "formateurSideBar-subBtn active"
                    : "formateurSideBar-subBtn"
                }
              >
                <div>
                  <label>Graines</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive
                    ? "formateurSideBar-subBtn active"
                    : "formateurSideBar-subBtn"
                }
              >
                <div>
                  <label>Formateurs</label>
                </div>
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/add-group"
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <Plus color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Créer Group</label>
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
            to="/project"
            className={({ isActive }) =>
              isActive ? "formateurSideBar-btn active" : "formateurSideBar-btn"
            }
          >
            <div className="formateurSideBar-btn-icon">
              <BookOpenCheck color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Projets et Devoirs</label>
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
