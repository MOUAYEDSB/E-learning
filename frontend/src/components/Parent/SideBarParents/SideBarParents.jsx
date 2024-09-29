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
import { ChartNetwork } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { SquareCode } from "lucide-react";
import { UserCog } from "lucide-react";


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
            <UserCog color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Profile</label>
          </NavLink>
          <div className={`sidebar-parents-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`sidebar-parents-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="sidebar-parents-btn-icon">
                <SquareCode color="#ffffff" strokeWidth={1.5} />{" "}
              </div>
              <label>Ressources </label>
              <div className="sidebar-parents-btn-arrow-icon">
                <NavbarArrowIcon />
              </div>
            </div>
            <div className="sidebar-parents-subBtn-group">
              <NavLink
                to="/user/list/parents"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-parents-subBtn active"
                    : "sidebar-parents-subBtn"
                }
              >
                <div>
                  <label>Soutien Scolaire</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-parents-subBtn active"
                    : "sidebar-parents-subBtn"
                }
              >
                <div>
                  <label>Ateliers et Webinaires</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-parents-subBtn active"
                    : "sidebar-parents-subBtn"
                }
              >
                <div>
                  <label>Psychologiques</label>
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
              <ChartNetwork size={20} color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Notes </label>
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
            <label>Enfant Groupe</label>
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
              <CalendarDays size={20} color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Calendrier Scolaire </label>
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
