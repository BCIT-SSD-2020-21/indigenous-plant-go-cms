import React from "react";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import Modal from "../../Modal";
import Table from "./Table";

export default function ListCategories({
  categories,
  label,
  labelPlural,
  searchQuery,
  handleQueryChange,
  applySearch,
  clearSearch,
  hasPages,
  pages,
  page,
  prevPage,
  nextPage,
  handleSelected,
  selectedCategories,
  batchSelect,
  newCategory,
  newCategoryValue,
  submitNewCategory,
  handleDelete,
  pendingDelete,
  pendingEdit,
  closeModal,
  modalActive,
  applyDelete,
  modalState,
  handleEdit,
  editCategory,
  editCategoryValue,
  applyEdit,
}) {
  const editModal = () => (
    <>
      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Category name <span style={style.req}>*</span>
        </p>
        <Input
          onChange={(e) => editCategory(e.target.value)}
          value={editCategoryValue}
          style={style.input}
          placeholder="Enter category name"
        />
      </fieldset>
      <button onClick={() => applyEdit()} className="field__button">
        Update category
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
        Deleting this category will remove all instances of the category&nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.category_name}
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
      <DashHeader title={labelPlural} subtitle={`${label} Categories`} />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New {label} Category</h3>

          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Category name <span style={style.req}>*</span>
            </p>
            <Input
              onChange={(e) => newCategory(e.target.value)}
              value={newCategoryValue}
              style={style.input}
              placeholder="Enter category name"
            />
          </fieldset>

          <button onClick={() => submitNewCategory()} className="field__button">
            Create new category
          </button>
        </div>
        <div className="resource__col right">
          <p>
            <strong>Results</strong> ({categories.length})
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
                  value={searchQuery}
                  onChange={(e) => handleQueryChange(e)}
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
          </div>
          <Table
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            categories={hasPages ? pages[page - 1] : categories}
            handleSelected={handleSelected}
            selectedCategories={selectedCategories}
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
                ? `Delete ${pendingDelete.category_name}?`
                : `Edit ${pendingEdit.category_name}`
            }
            subtitle={`id: ${
              modalState === "delete" ? pendingDelete._id : pendingEdit._id
            }`}
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