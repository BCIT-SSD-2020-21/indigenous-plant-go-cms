import React from "react";
import {
  DashboardIcon,
  PlantIcon,
  CompassIcon,
  InfoIcon,
  UsersIcon,
  LocationIcon,
  MediaIcon,
  TagIcon,
} from "../../icons";

export default function Sidebar({
  sidebarModel,
  userData,
  pathParts,
  navigateToHome,
  navigateToAllPlants,
  navigateToAddPlant,
  navigateToPlantCategories,
  navigateToAllWaypoints,
  navigateToAddWaypoint,
  navigateToWaypointCategories,
  navigateToAllLearnmore,
  navigateToAddLearnmore,
  navigateToAllUsers,
  navigateToAddUser,
  navigateToLocations,
  navigateToImages,
  navigateToAudioFiles,
  navigateToVideos,
  navigateToTags,
  navigateToProfile,
}) {
  return (
    <aside className="sidebar">
      <ul>
        {/* DASHBOARD */}
        <li>
          <button onClick={() => navigateToHome()}>
            <span
              className={
                sidebarModel["dashboard"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <DashboardIcon />
              <span className="menu__item item__label">Dashboard</span>
            </span>
          </button>
        </li>

        {/* PLANTS */}
        <li>
          <button onClick={() => navigateToAllPlants()}>
            <span
              className={
                sidebarModel["plants"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <PlantIcon />
              <span className="menu__item item__label">Plants</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["plants"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToAllPlants()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("plants")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">All Plants</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddPlant()}>
                <span
                  className={
                    pathParts.includes("plants") && pathParts.includes("add")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToPlantCategories()}>
                <span
                  className={
                    pathParts.includes("plants") &&
                    pathParts.includes("categories")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Categories</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* WAYPOINTS */}
        <li>
          <button onClick={() => navigateToAllWaypoints()}>
            <span
              className={
                sidebarModel["waypoints"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <CompassIcon />
              <span className="menu__item item__label">Waypoints</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["waypoints"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToAllWaypoints()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("waypoints")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">All Waypoints</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddWaypoint()}>
                <span
                  className={
                    pathParts.includes("waypoints") && pathParts.includes("add")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToWaypointCategories()}>
                <span
                  className={
                    pathParts.includes("waypoints") &&
                    pathParts.includes("categories")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Categories</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* LEARN MORE */}
        <li>
          <button onClick={() => navigateToAllLearnmore()}>
            <span
              className={
                sidebarModel["learnmore"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <InfoIcon />
              <span className="menu__item item__label">Learn More</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["learnmore"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToAllLearnmore()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("learnmore")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">All Learn More</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddLearnmore()}>
                <span
                  className={
                    pathParts.includes("learnmore") && pathParts.includes("add")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* USERS */}
        <li>
          <button onClick={() => navigateToAllUsers()}>
            <span
              className={
                sidebarModel["users"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <UsersIcon />
              <span className="menu__item item__label">Users</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["users"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToAllUsers()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("users")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">All Users</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAddUser()}>
                <span
                  className={
                    pathParts.includes("users") && pathParts.includes("add")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Add New</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* LOCATIONS */}
        <li>
          <button onClick={() => navigateToLocations()}>
            <span
              className={
                sidebarModel["locations"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <LocationIcon />
              <span className="menu__item item__label">Locations</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["locations"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToLocations()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("locations")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">All Locations</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* MEDIA */}
        <li>
          <button onClick={() => navigateToImages()}>
            <span
              className={
                sidebarModel["media"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <MediaIcon />
              <span className="menu__item item__label">Media</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["media"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToImages()}>
                <span
                  className={
                    pathParts.includes("media") && pathParts.includes("images")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Images</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToVideos()}>
                <span
                  className={
                    pathParts.includes("media") && pathParts.includes("videos")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Video</span>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateToAudioFiles()}>
                <span
                  className={
                    pathParts.includes("media") &&
                    pathParts.includes("audiofiles")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">Audio</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* TAGS */}
        <li>
          <button onClick={() => navigateToTags()}>
            <span
              className={
                sidebarModel["tags"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <TagIcon />
              <span className="menu__item item__label">Tags</span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["tags"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToTags()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("tags")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">All Tags</span>
                </span>
              </button>
            </li>
          </ul>
        </li>

        {/* PROFILE */}
        <li>
          <button onClick={() => navigateToProfile()}>
            <span
              className={
                sidebarModel["profile"]
                  ? "menu__item item__wrap parent active"
                  : "menu__item item__wrap parent"
              }
            >
              <span style={style.initial}>
                {" "}
                {userData?.user?.username[0].toUpperCase()}
              </span>
              <span className="menu__item item__label">
                {" "}
                {userData?.user?.username}
              </span>
            </span>
          </button>
          <ul
            className={
              sidebarModel["profile"]
                ? "menu__item sub__menu active"
                : "menu__item sub__menu"
            }
          >
            <li>
              <button onClick={() => navigateToProfile()}>
                <span
                  className={
                    pathParts.length === 1 && pathParts.includes("profile")
                      ? "menu__item item__wrap active"
                      : "menu__item item__wrap"
                  }
                >
                  <span className="menu__item item__label">My Profile</span>
                </span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

const style = {
  initial: {
    height: "26px",
    width: "26px",
    backgroundColor: "var(--highlight)",
    border: "1px solid var(--highlightsecondary)",
    color: "var(--lightprimary)",
    borderRadius: "50%",
    lineHeight: "24px",
    textAlign: "center",
    fontFamily: "serif, Times",
    display: "block",
    cursor: "pointer",
    fontSize: 14,
  },
};
