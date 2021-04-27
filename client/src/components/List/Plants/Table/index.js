import React from "react";
import { parseDate } from "../../../../utility";

export default function Table({ plantData, handleSelected, selectedPlants }) {
  return (
    <ul className="table__list">
      {plantData &&
        plantData.length > 0 &&
        plantData.map((plant, index) => {
          const lastRevision = {
            date: parseDate(
              plant.revision_history[plant.revision_history.length - 1].date
            ),
            user:
              plant.revision_history[plant.revision_history.length - 1].user[0]
                .user_name,
          };

          return (
            <li
              className={
                selectedPlants.includes(plant._id)
                  ? "table__row selected"
                  : "table__row"
              }
              key={index}
            >
              <div className="table__col select">
                <input
                  type="checkbox"
                  value={plant._id}
                  checked={selectedPlants.includes(plant._id) ? true : false}
                  onChange={(e) => handleSelected(e)}
                />
              </div>
              <div className="table__col title">
                <p>{plant.plant_name}</p>
                <span className="action">
                  <button type="button" value={plant._id}>
                    Edit&nbsp;
                  </button>
                  <button type="button" value={plant._id}>
                    &nbsp;Delete
                  </button>
                </span>
              </div>
              <div className="table__col author">
                <p>{plant.revision_history[0].user[0].user_name}</p>
              </div>
              <div className="table__col categories">
                <p>
                  {plant.categories
                    .map((category) => category.category_name)
                    .join(", ")}
                </p>
              </div>
              <div className="table__col tags">
                {plant.tags.map((tag) => tag.tag_name).join(", ")}
              </div>
              <div className="table__col updated">
                <p>
                  {lastRevision.date} by {lastRevision.user}
                </p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}