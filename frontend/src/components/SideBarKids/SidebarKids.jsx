import { useState } from "react";
import "./sidebarkids.css";
import Logo from "../../assets/grainesLogo.svg";
import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../assets/DashboardIcon";
import { HomeIcon } from "../../assets/HomeIcon";
import { UserIcon } from "../../assets/UserIcon";
import { GroupIcon } from "../../assets/GroupIcon";
import { MessageIcon } from "../../assets/MessageIcon";
import { SettingsIcon } from "../../assets/SettingsIcon";
import { NavbarArrowIcon } from "../../assets/NavbarArrowIcon";
import sidebardown from "../../assets/sidebardown.png"; // Import the image

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
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <HomeIcon />
            </div>
            <label>Home</label>
          </NavLink>
          <div className={`sidebar-kids-btn-group ${isOpen ? "open" : ""}`}>
            <div
              className={`sidebar-kids-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="sidebar-kids-btn-icon">
                <UserIcon />
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
                  isActive ? "sidebar-kids-subBtn active" : "sidebar-kids-subBtn"
                }
              >
                <div>
                  <label>Engalis</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/seeds"
                className={({ isActive }) =>
                  isActive ? "sidebar-kids-subBtn active" : "sidebar-kids-subBtn"
                }
              >
                <div>
                  <label>Francais</label>
                </div>
              </NavLink>
              <NavLink
                to="/user/list/mentors"
                className={({ isActive }) =>
                  isActive ? "sidebar-kids-subBtn active" : "sidebar-kids-subBtn"
                }
              >
                <div>
                  <label>Robotique</label>
                </div>
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/group-list"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <GroupIcon />
            </div>
            <label>Project</label>
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
            to="/contact"
            className={({ isActive }) =>
              isActive ? "sidebar-kids-btn active" : "sidebar-kids-btn"
            }
          >
            <div className="sidebar-kids-btn-icon">
              <MessageIcon />
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
        <img className="sidebar-kids-bottom-image" src={sidebardown} alt="Bottom Image" />
      </div>
      <div className="overlay"></div>
    </>
  );
};
