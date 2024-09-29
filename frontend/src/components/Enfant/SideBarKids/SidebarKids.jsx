import { useState } from "react";
import "./sidebarkids.css";
import Logo from "../../../assets/grainesLogo.svg";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../../assets/DashboardIcon";
import { GroupIcon } from "../../../assets/GroupIcon";
import { MessageIcon } from "../../../assets/MessageIcon";
import { SettingsIcon } from "../../../assets/SettingsIcon";
import { NavbarArrowIcon } from "../../../assets/NavbarArrowIcon";
import sidebardown from "../../../assets/sidebardown.png";
import { Book } from "lucide-react";
import { assets } from "../../../assets/assets";
import { FolderDot } from "lucide-react";
import { UserCog } from "lucide-react";

export const SidebarKids = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sidebar-kids">
        <img className="sidebar-kids-logo" src={Logo} alt="Logo" />
        <hr />
        <div className="sidebar-kids-buttons">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <DashboardIcon />
            </div>
            <label>Dashboard</label>
          </NavLink>
          <NavLink
            to="/enfant/:id"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <UserCog color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Profil</label>
          </NavLink>
          <div className={`sidebar-kids-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`sidebar-kids-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="sidebar-kids-btn-icon">
                <Book size={20} color="#ffffff" strokeWidth={1.5} />{" "}
              </div>
              <label>Courses</label>
              <div className="sidebar-kids-btn-arrow-icon">
                <NavbarArrowIcon />
              </div>
            </div>
            <div className="sidebar-kids-subBtn-group">
              <NavLink
                to="/user/list/parents"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-kids-subBtn active"
                    : "sidebar-kids-subBtn"
                }
              >
                <div>
                  <label>Englais</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-kids-subBtn active"
                    : "sidebar-kids-subBtn"
                }
              >
                <div>
                  <label>Francais</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-kids-subBtn active"
                    : "sidebar-kids-subBtn"
                }
              >
                <div>
                  <label>Robotique</label>
                </div>
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/project"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <FolderDot size={20} color="#ffffff" strokeWidth={1.5} />{" "}
            </div>
            <label>Project</label>
          </NavLink>
          <NavLink
            to="/amis"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <GroupIcon />
            </div>
            <label>Collegues</label>
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <MessageIcon />
            </div>
            <label>Messages</label>
          </NavLink>
          <NavLink
            to="/calendaruser"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <img
                src={assets.calendarIcon}
                alt="Calendar Icon"
                style={{ width: 23 }}
              />
            </div>
            <label>Calendreier</label>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <SettingsIcon />
            </div>
            <label>Paramétres</label>
          </NavLink>
        </div>

        {/* Add the image at the bottom of the sidebar */}
        <img
          className="sidebar-kids-bottom-image"
          src={sidebardown}
          alt="Bottom Image"
        />
      </div>
      <div className="overlay"></div>
    </>
  );
};
