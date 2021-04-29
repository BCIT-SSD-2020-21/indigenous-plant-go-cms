import React from "react";
import Table from "./Table";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon, TextArea } from "semantic-ui-react";
import Modal from "../../Modal";

export default function ListLocations({
  newLocation,
  handleNewLocation,
  locations,
  searchQuery,
  handleQueryChange,
  clearSearch,
  applySearch,
  batchSelect,
  handleSelected,
  selectedLocations,
  submitNewLocation,
  closeModal,
  modalActive,
  modalState,
  handleDelete,
  pendingDelete,
  applyDelete,
  editLocation,
  handleChangeLocation,
  handleEdit,
  pendingEdit,
  applyEdit,
  page,
  pages,
  hasPages,
  nextPage,
  prevPage,
}) {
  const editModal = () => (
    <>
      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Location Name <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => handleChangeLocation(e)}
          style={style.input}
          value={editLocation.name}
          name="name"
          placeholder="Enter location name"
        />
      </fieldset>

      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Latitude <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => handleChangeLocation(e)}
          value={editLocation.latitude}
          name="latitude"
          type="number"
          style={style.input}
          placeholder="Enter latitude (number)"
        />
      </fieldset>

      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Longitude <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => handleChangeLocation(e)}
          value={editLocation.longitude}
          name="longitude"
          type="number"
          style={style.input}
          placeholder="Enter longitude (number)"
        />
      </fieldset>

      <fieldset style={style.fieldset}>
        <p style={style.label}>Description</p>
        <TextArea
          onChange={(e) => handleChangeLocation(e)}
          value={editLocation.description}
          name="description"
          style={{
            ...style.input,
            ...style.textarea,
          }}
        />
      </fieldset>

      <button onClick={() => applyEdit()} className="field__button">
        Update location
      </button>
      <button
        onClick={() => closeModal()}
        style={{ color: "var(--highlight)" }}
      >
        Cancel
      </button>
    </>
  );
  const deleteModal = () => (
    <>
      <p>
        Deleting this tag will remove all instances of the location&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.location_name}
        </strong>
        . Do you wish to proceed?
      </p>
      <button onClick={() => applyDelete()} className="field__button">
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );
  return (
    <div>
      <DashHeader title="Locations" />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New location</h3>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Location Name <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => handleNewLocation(e)}
              style={style.input}
              value={newLocation.name}
              name="name"
              placeholder="Enter location name"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Latitude <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => handleNewLocation(e)}
              value={newLocation.latitude}
              name="latitude"
              type="number"
              style={style.input}
              placeholder="Enter latitude (number)"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Longitude <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => handleNewLocation(e)}
              value={newLocation.longitude}
              name="longitude"
              type="number"
              style={style.input}
              placeholder="Enter longitude (number)"
            />
          </fieldset>

          <fieldset style={style.fieldset}>
            <p style={style.label}>Description</p>
            <TextArea
              onChange={(e) => handleNewLocation(e)}
              value={newLocation.description}
              name="description"
              style={{
                ...style.input,
                ...style.textarea,
              }}
            />
          </fieldset>

          <button onClick={() => submitNewLocation()} className="field__button">
            Create new location
          </button>
        </div>
        <div className="resource__col right">
          <p>
            <strong>Results</strong> ({locations.length})
          </p>
          <div className="table__controls">
            <div style={{ display: "flex" }}>
              <div className="table__action">
                <Dropdown
                  placeholder={"Bulk Actions"}
                  selection
                  options={[
                    { key: "default", value: "default", text: "Bulk Actions" },
                    { key: "delete", value: "delete", text: "Delete" },
                  ]}
                />
                <button>Apply</button>
              </div>
            </div>

            <div>
              <div className="table__action" style={{ marginRight: 0 }}>
                {searchQuery && (
                  <button onClick={() => clearSearch()} className="sub__action">
                    Clear search
                  </button>
                )}
                <Input
                  onChange={(e) => handleQueryChange(e)}
                  value={searchQuery}
                  style={{ ...style.input, minWidth: 250 }}
                  placeholder={`Enter search query`}
                />
                <button onClick={() => applySearch()}>Search</button>
              </div>
            </div>
          </div>

          <div className="table__heading table__row">
            <div className="table__col head select">
              <input
                type="checkbox"
                value={"select all"}
                onChange={(e) => batchSelect(e)}
              />
            </div>
            <div className="table__col head title">
              <h3>name</h3>
            </div>
            <div className="table__col head author">
              <h3>latitude</h3>
            </div>
            <div className="table__col head categories">
              <h3>longitude</h3>
            </div>
          </div>

          <Table
            locations={hasPages ? pages[page - 1] : locations}
            selectedLocations={selectedLocations}
            handleSelected={handleSelected}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          {hasPages && (
            <div className="pagination__control">
              <div>
                <p style={{ marginBottom: "7px" }}>
                  Page {page} of {pages.length}
                </p>
                <div className="control">
                  <button onClick={() => prevPage()}>
                    <Icon name="caret left" />
                  </button>
                  <span>{page}</span>
                  <button onClick={() => nextPage()}>
                    <Icon name="caret right" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <Modal
            isActive={modalActive}
            title={
              modalState === "delete"
                ? `Delete ${pendingDelete.location_name}`
                : `Edit ${pendingEdit.location_name}`
            }
            closeModal={closeModal}
          >
            {modalState === "delete" ? deleteModal() : editModal()}
          </Modal>
        </div>
      </div>
    </div>
  );
}

const style = {
  input: {
    width: "100%",
    color: "var(--darksecondary)",
  },
  textarea: {
    height: 200,
    border: "1px solid lightgrey",
    color: "var(--darkprimary)",
    padding: "7px 14px",
    background: "var(--lighttertiary)",
  },
  label: {
    color: "var(--darksecondary)",
    margin: 0,
    fontSize: 11,
    marginBottom: "3px",
  },
  fieldset: {
    marginBottom: "10px",
    padding: 0,
  },
  req: {
    color: "red",
    fontSize: 14,
  },
};