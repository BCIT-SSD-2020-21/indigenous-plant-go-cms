import React, { useState, useEffect } from "react";
import ListWaypoints from "../../../components/List/Waypoints";
import {
  getAllWaypoints,
  getCategoryGroup,
  deleteWaypoint,
} from "../../../network";

export default function ListWaypointsCtrl() {
  const [waypointData, setWaypointData] = useState([]);
  // waypointData_ is the mutable version of waypointData that we'll be using to filter
  const [waypointData_, setWaypointData_] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [modalState, setModalState] = useState("single");
  const [modalActive, setModalActive] = useState(false);
  const [pendingDelete, setPendingDelete] = useState({});
  const [selectedWaypoints, setSelectedWaypoints] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [formattedCategories, setFormattedCategories] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [hasPages, setHasPages] = useState(false);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    queryWaypoints();
    queryCategories();
    formatPages();
  }, []);

  useEffect(() => {
    formatCategories();
  }, [eCategories]);

  useEffect(() => {
    setWaypointData_(waypointData);
  }, [waypointData]);

  useEffect(() => {
    if (!searchQuery) applyFilter();
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
    formatPages();
  }, [waypointData_]);

  const formatPages = () => {
    const dataLength = waypointData_.length;
    if (dataLength < 5) return setHasPages(false);

    setHasPages(true);
    let itemsChunk = 5,
      waypointData = waypointData_;

    // split the data into pages
    const pages = waypointData.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / itemsChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    setPages(pages);
  };

  const queryWaypoints = async () => {
    setLoading(true);
    const result = await getAllWaypoints();
    setLoading(false);
    if (result.error) return console.log("error getting waypoints");
    if (result.length < 1) setWaypointData([]);
    setWaypointData(result);
  };

  const queryCategories = async () => {
    const result = await getCategoryGroup("waypoint");
    if (result.error) return console.log("error getting categories");
    setECategories(result);
  };

  const formatCategories = () => {
    const formatted = eCategories.map((category) => {
      return {
        ...category,
        key: category._id,
        value: category.category_name,
        text: category.category_name,
      };
    });

    setFormattedCategories(formatted);
  };

  const handleBulkActionChange = (_, data) => {
    const value = data.value;
    setBulkAction(value);
  };

  const handleBulkDelete = async () => {
    if (selectedWaypoints.length < 1) return console.log("no plants selected");
    if (bulkAction === "default")
      return console.log("cannot bulk delete if bulk action is set to default");
    setModalState("bulk");
    setModalActive(true);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setWaypointData_(waypointData);
    setCategoryFilter("default");
  };

  const handleFilterChange = (e, data) => {
    setCategoryFilter(data.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const applyFilter = () => {
    // APPLY A CATEGORY FILTER
    const categoryF = categoryFilter.toLowerCase();
    let filteredData = [...waypointData].filter((waypoint) => {
      let waypointCategories = waypoint.categories.map((category) =>
        category.category_name.toLowerCase()
      );

      return waypointCategories.includes(categoryF);
    });

    if (categoryF === "default") filteredData = [...waypointData];

    // APPLY A SEARCH FILTER
    const searchQ = searchQuery.toLowerCase();
    if (!searchQ) return setWaypointData_(filteredData);

    filteredData = filteredData.filter((waypoint) =>
      waypoint.waypoint_name.toLowerCase().startsWith(searchQ)
    );

    setWaypointData_(filteredData);
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
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

  const batchSelect = () => {
    const resourceIds = waypointData.map((waypoint) => waypoint._id);
    const selectedIds = selectedWaypoints;

    const allSelected =
      resourceIds.length == selectedIds.length &&
      resourceIds.every(function (element, index) {
        return element === selectedIds[index];
      });

    if (!allSelected) {
      setSelectedWaypoints(resourceIds);
    } else {
      setSelectedWaypoints([]);
    }
  };

  const handleSelected = (e) => {
    const id = e.target.value;
    let newSelected = [...selectedWaypoints];

    if (selectedWaypoints.includes(id)) {
      newSelected = newSelected.filter((item) => item !== id);
    } else {
      newSelected = [...newSelected, id];
    }

    setSelectedWaypoints(newSelected);
  };

  const handleDelete = async (e) => {
    setModalState("single");
    const id = e.target.value;
    const foundWaypoint = waypointData.filter(
      (waypoint) => waypoint._id === id
    )[0];
    if (!foundWaypoint) return console.log("Unable to find plant");
    await setPendingDelete(foundWaypoint);
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const applyDelete = async () => {
    const id = pendingDelete._id;
    if (!id) return console.log("Unable to delete waypoint");
    const result = await deleteWaypoint(id);
    if (result.error) return console.log("Unable to delete plant");
    closeModal();
    setPendingDelete({});
    queryWaypoints();
  };

  return (
    <ListWaypoints
      categories={formattedCategories}
      handleBulkActionChange={handleBulkActionChange}
      waypointData={waypointData_}
      bulkAction={bulkAction}
      handleBulkDelete={handleBulkDelete}
      categoryFilter={categoryFilter}
      resetFilters={resetFilters}
      handleFilterChange={handleFilterChange}
      applyFilters={applyFilter}
      searchQuery={searchQuery}
      clearSearch={clearSearch}
      handleQueryChange={handleQueryChange}
      hasPages={hasPages}
      page={page}
      pages={pages}
      nextPage={nextPage}
      prevPage={prevPage}
      batchSelect={batchSelect}
      selectedWaypoints={selectedWaypoints}
      handleSelected={handleSelected}
      handleDelete={handleDelete}
      modalState={modalState}
      closeModal={closeModal}
      modalActive={modalActive}
      applyDelete={applyDelete}
      pendingDelete={pendingDelete}
      loading={loading}
    />
  );
}
