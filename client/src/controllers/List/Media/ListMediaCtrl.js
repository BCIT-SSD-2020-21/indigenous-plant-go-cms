import React, { useState, useEffect } from "react";
import ListMedia from "../../../components/List/Media";
import {
  getImages,
  createImage,
  deleteImage,
  updateImage,
  getAudios,
  createAudio,
  deleteAudio,
  updateAudio,
  getVideos,
  deleteVideo,
  updateVideo,
  createVideo,
  bulkDeleteImages,
  bulkDeleteAudios,
  bulkDeleteVideos,
  bulkDeleteLocations,
} from "../../../network";

export default function ListMediaCtrl({ dataLabel, label }) {
  const mediaFields = {
    file: null,
    caption: "",
    url: "",
  };
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [eMedias, setEMedias] = useState([]);
  // medias_ is the mutable version of eMedias that we'll be using to filter
  const [medias_, setMedias_] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedias, setSelectedMedias] = useState([]);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalState, setModalState] = useState("delete");
  const [pendingEdit, setPendingEdit] = useState({});
  const [editMedia, setEditMedia] = useState(mediaFields);
  const [bulkAction, setBulkAction] = useState("");
  const [loading, setLoading] = useState(false);
  // Error Messaging
  const [directive, setDirective] = useState(null);

  useEffect(() => {
    queryMedia();
  }, []);

  useEffect(() => {
    setMedias_(eMedias);
  }, [eMedias]);

  useEffect(() => {
    setPage(1);
    formatPages();
  }, [medias_]);

  useEffect(() => {
    resetDirective();
  }, [directive]);

  const resetDirective = async () => {
    await setTimeout(() => {
      setDirective(null);
    }, 4000);
  };

  const formatPages = () => {
    const dataLength = medias_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      locationsData = medias_;

    // split the data into pages
    const pages = locationsData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const nextPage = () => {
    let currentPage = page;
    if (currentPage >= pages.length) return;

    currentPage = currentPage + 1;
    setPage(currentPage);
  };

  const prevPage = () => {
    let currentPage = page;
    if (currentPage === 1) return;

    currentPage = currentPage - 1;
    setPage(currentPage);
  };

  const queryMedia = async () => {
    setLoading(true);
    let result;
    switch (dataLabel) {
      case "image":
        result = await getImages();
        break;
      case "audio_file":
        result = await getAudios();
        break;
      case "video":
        result = await getVideos();
        break;
    }
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error fetching media",
        message: "A network error has occurred",
        success: false,
      });
    setEMedias(result);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setMedias_(eMedias);
  };

  const applySearch = () => {
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setMedias_(eMedias);

    let filteredData = eMedias.filter((media) =>
      media[`caption`].toLowerCase().startsWith(searchQ)
    );
    setMedias_(filteredData);
  };

  const batchSelect = () => {
    const resourceIds = eMedias.map((media) => media._id);
    const selectedIds = selectedMedias;

    const allSelected =
      resourceIds.length == selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedMedias(resourceIds);
    } else {
      setSelectedMedias([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedMedias];

    if (selectedMedias.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedMedias(newSelected);
  };

  const handleUpload = async () => {
    let result;
    if (!file || !caption)
      return setDirective({
        header: "Error uploading media",
        message: "Required fields are missing",
        success: false,
      });

    const formData = new FormData();
    setLoading(true);
    switch (dataLabel) {
      case "image":
        formData.append("image", file);
        formData.append("caption", caption);
        result = await createImage(formData);
        break;
      case "audio_file":
        formData.append("audio", file);
        formData.append("caption", caption);
        result = await createAudio(formData);
        break;
      case "video":
        formData.append("video", file);
        formData.append("caption", caption);
        result = await createVideo(formData);
        break;
    }
    setLoading(false);
    if (result.error)
      return setDirective({
        header: "Error uploading media",
        message: result.error.data.error,
        success: false,
      });
    setFile(undefined);
    setCaption("");
    queryMedia();
  };

  const handleDelete = async (e) => {
    setModalState("delete");
    const id = e.target.value;
    const foundMedia = eMedias.filter((tag) => tag._id === id)[0];
    if (!foundMedia)
      return setDirective({
        header: "Error deleting media",
        message: "Unable to locate media",
        success: false,
      });
    await setPendingDelete(foundMedia);
    setModalActive(true);
  };

  const applyDelete = async () => {
    let result;
    const id = pendingDelete._id;
    if (!id)
      return setDirective({
        header: "Error deleting media",
        message: "Unable to locate media",
        success: false,
      });
    switch (dataLabel) {
      case "image":
        result = await deleteImage(id);
        break;
      case "audio_file":
        result = await deleteAudio(id);
        break;
      case "video":
        result = await deleteVideo(id);
        break;
    }

    if (result.error)
      return setDirective({
        header: "Error deleting media",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setPendingDelete({});
    queryMedia();
  };

  const handleEdit = async (e) => {
    setModalState("edit");
    const id = e.target.value;
    const foundMedia = eMedias.filter((media) => media._id === id)[0];
    if (!foundMedia)
      return setDirective({
        header: "Error updating media",
        message: "Unable to locate media",
        success: false,
      });
    await setPendingEdit(foundMedia);

    const m = {
      file: null,
      caption: foundMedia.caption,
      url: foundMedia[`${dataLabel}_url`],
    };

    setEditMedia(m);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    let currentMedia = { ...editMedia };
    currentMedia.file = file;
    setEditMedia(currentMedia);
  };

  const handleCaptionChange = (e) => {
    let currentMedia = { ...editMedia };
    currentMedia.caption = e.target.value;
    setEditMedia(currentMedia);
  };

  const applyEdit = async () => {
    const id = pendingEdit._id;
    if (!id)
      return setDirective({
        header: "Error updating media",
        message: "Unable to locate media",
        success: false,
      });

    let result;
    if (!editMedia.file || !editMedia.caption)
      return setDirective({
        header: "Error updating media",
        message: "Required fields are missing",
        success: false,
      });

    const formData = new FormData();

    switch (dataLabel) {
      case "image":
        formData.append("image", editMedia.file);
        formData.append("caption", editMedia.caption);
        result = await updateImage(formData, id);
        break;
      case "audio_file":
        formData.append("audio", editMedia.file);
        formData.append("caption", editMedia.caption);
        result = await updateAudio(formData, id);
        break;
      case "video":
        formData.append("video", editMedia.file);
        formData.append("caption", editMedia.caption);
        result = await updateVideo(formData, id);
        break;
    }

    if (result.error)
      return setDirective({
        header: "Error deleting media",
        message: result.error.data.error,
        success: false,
      });
    setPendingEdit({});
    setEditMedia(mediaFields);
    closeModal();
    queryMedia();
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    if (selectedMedias.length < 1)
      return setDirective({
        header: "Error applying bulk actions",
        message: "No items selected",
        success: false,
      });
    if (bulkAction === "default")
      return setDirective({
        header: "Error applying bulk actions",
        message: "Invalid action",
        success: false,
      });
    setModalState("bulk");
    setModalActive(true);
  };

  const applyBulkDelete = async () => {
    let result;

    switch (dataLabel) {
      case "image":
        result = await bulkDeleteImages(selectedMedias);
        break;
      case "audio_file":
        result = await bulkDeleteAudios(selectedMedias);
        break;
      case "video":
        result = await bulkDeleteVideos(selectedMedias);
        break;
    }
    if (result.error)
      return setDirective({
        header: "Error applying bulk action",
        message: result.error.data.error,
        success: false,
      });
    closeModal();
    setSelectedMedias([]);
    queryMedia();
  };

  return (
    <ListMedia
      label={label}
      dataLabel={dataLabel}
      caption={caption}
      setCaption={setCaption}
      file={file}
      setFile={setFile}
      medias={medias_}
      searchQuery={searchQuery}
      handleQueryChange={handleQueryChange}
      clearSearch={clearSearch}
      applySearch={applySearch}
      batchSelect={batchSelect}
      selectedMedias={selectedMedias}
      handleSelected={handleSelected}
      handleUpload={handleUpload}
      hasPages={hasPages}
      page={page}
      pages={pages}
      nextPage={nextPage}
      prevPage={prevPage}
      closeModal={closeModal}
      handleDelete={handleDelete}
      pendingDelete={pendingDelete}
      modalState={modalState}
      modalActive={modalActive}
      applyDelete={applyDelete}
      handleEdit={handleEdit}
      pendingEdit={pendingEdit}
      editMedia={editMedia}
      handleChangeFile={handleChangeFile}
      handleCaptionChange={handleCaptionChange}
      applyEdit={applyEdit}
      handleBulkActionChange={handleBulkActionChange}
      handleBulkDelete={handleBulkDelete}
      applyBulkDelete={applyBulkDelete}
      loading={loading}
      directive={directive}
    />
  );
}
