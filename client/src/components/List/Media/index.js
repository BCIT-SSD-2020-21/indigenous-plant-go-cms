import React from "react";
import Table from "./Table";
import DashHeader from "../../DashHeader";
import { Dropdown, Input, Icon } from "semantic-ui-react";
import Modal from "../../Modal";

export default function ListMedia({
  label,
  dataLabel,
  setFile,
  file,
  caption,
  setCaption,
  medias,
  handleQueryChange,
  searchQuery,
  clearSearch,
  applySearch,
  batchSelect,
  selectedMedias,
  handleSelected,
  handleUpload,
  hasPages,
  page,
  pages,
  nextPage,
  prevPage,
  handleDelete,
  pendingDelete,
  closeModal,
  modalState,
  modalActive,
  applyDelete,
  handleEdit,
  pendingEdit,
  editMedia,
  handleChangeFile,
  handleCaptionChange,
  applyEdit,
}) {
  const deleteModal = () => (
    <>
      {dataLabel === "image" && (
        <>
          <p style={style.label}>Thumbnail</p>
          <div className="thumbnail__container">
            <div className="thumbnail__image">
              <img src={pendingDelete[`${dataLabel}_url`]} alt="thumbnail" />
            </div>
            <div className="thumbnail__meta">
              <a href={pendingDelete[`${dataLabel}_url`]} target="blank_">
                View full {label.toLowerCase()} &nbsp;
                <Icon name="sign-out" />
              </a>
            </div>
          </div>
        </>
      )}
      <p>
        Deleting this tag will remove all instances of &nbsp;
        <strong style={{ color: "var(--danger)" }}>
          {pendingDelete.caption}
        </strong>
        . Do you wish to proceed?
      </p>
      <button onClick={() => applyDelete("delete")} className="field__button">
        Yes, I know what I am doing.
      </button>
      <button onClick={() => closeModal()} className="field__button secondary">
        No, cancel my request.
      </button>
    </>
  );

  const editModal = () => (
    <>
      {dataLabel === "image" && (
        <>
          <p style={style.label}>Thumbnail</p>
          <div className="thumbnail__container">
            <div className="thumbnail__image">
              <img src={editMedia.url} alt="thumbnail" />
            </div>
            <div className="thumbnail__meta">
              <a href={editMedia.url} target="blank_">
                View full {label.toLowerCase()} &nbsp;
                <Icon name="sign-out" />
              </a>
            </div>
          </div>
        </>
      )}
      {dataLabel === "audio_file" && (
        <>
          <p style={style.label}>Audio Preview</p>
          <div className="thumbnail__container audio">
            <div className="thumbnail__audio">
              <audio controls src={editMedia.url}>
                Your browser does not support the <code>audio</code> element.
              </audio>
            </div>
          </div>
        </>
      )}
      <fieldset style={style.fieldset}>
        <p style={style.label}>
          Caption <span style={style.req}>*</span>
        </p>
        <Input
          value={editMedia.caption}
          onChange={(e) => handleCaptionChange(e)}
          style={style.input}
          placeholder="Enter caption"
        />
      </fieldset>
      <p style={style.label}>
        Upload file: <span style={style.req}>*</span>
      </p>
      <fieldset style={style.fieldset}>
        <div className="field__file">
          <div
            style={{ padding: "10px 10px", minWidth: 275 }}
            className="file__meta"
          >
            <p>
              {editMedia.file !== null ? editMedia.file?.name : editMedia.url}
            </p>
          </div>
          <input
            filename={editMedia?.file !== null ? editMedia.file : null}
            onChange={(e) => {
              handleChangeFile(e);
            }}
            style={{ display: "none" }}
            id="file--update"
            type="file"
            accept={
              dataLabel === "image"
                ? "image/*"
                : dataLabel === "audio_file"
                ? "audio/*"
                : "video/*"
            }
          />
          <button className="field__button">
            <label htmlFor="file--update">Choose File</label>
          </button>
        </div>
        <button className="field__button" onClick={() => applyEdit()}>
          Update {label[0].toUpperCase()}
          {label.substring(1)}
        </button>
      </fieldset>
      <button
        onClick={() => closeModal()}
        style={{ color: "var(--highlight)" }}
      >
        Cancel
      </button>
    </>
  );

  return (
    <div>
      <DashHeader title={`${label}s`} />
      <div className="resource__container">
        <div className="resource__col left">
          <h3>Add New {label}</h3>
          <fieldset style={style.fieldset}>
            <p style={style.label}>
              Caption <span style={style.req}>*</span>
            </p>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={style.input}
              placeholder="Enter caption"
            />
          </fieldset>
          <p style={style.label}>
            Upload file: <span style={style.req}>*</span>
          </p>
          <fieldset style={style.fieldset}>
            <form>
              <div className="field__file">
                <div
                  style={{ padding: "10px 10px", minWidth: 275 }}
                  className="file__meta"
                >
                  <p>{file?.name}</p>
                </div>
                <input
                  filename={file}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  key={file?.name || ""}
                  style={{ display: "none" }}
                  id="file--upload"
                  type="file"
                  accept={
                    dataLabel === "image"
                      ? "image/*"
                      : dataLabel === "audio_file"
                      ? "audio/*"
                      : "video/*"
                  }
                />
                <button type="button" className="field__button">
                  <label htmlFor="file--upload">Choose File</label>
                </button>
              </div>
              <button
                type="button"
                className="field__button"
                onClick={() => handleUpload()}
              >
                Upload {label[0].toUpperCase()}
                {label.substring(1)}
              </button>
            </form>
          </fieldset>
        </div>
        <div className="resource__col right">
          <p>
            <strong>Results</strong> ({medias.length})
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
              <h3>caption</h3>
            </div>
            <div className="table__col head url">
              <h3>url</h3>
            </div>
            {dataLabel === "image" && (
              <div className="table__col head thumbnail">
                <h3>thumbnail</h3>
              </div>
            )}
            {dataLabel === "audio_file" && (
              <div className="table__col head audio__preview">
                <h3>Preview</h3>
              </div>
            )}
          </div>

          <Table
            medias={hasPages ? pages[page - 1] : medias}
            selectedMedias={selectedMedias}
            dataLabel={dataLabel}
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
                ? `Delete ${pendingDelete.caption}?`
                : `Edit ${pendingEdit.caption}`
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