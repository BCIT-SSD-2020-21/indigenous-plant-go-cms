import React, { useState, useEffect } from "react";
import EditWaypoint from "../../../components/Edit/Waypoint";
import { getWaypoint } from "../../../network";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  getAllPlants,
  updateWaypoint,
} from "../../../network";

export default function EditWaypointCtrl() {
  const history = useHistory();
  const [waypointData, setWaypointData] = useState({});
  const { waypointId } = useParams();
  // ===============================================================
  // FORM DATA
  // @desc form control data
  // ===============================================================
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [waypointName, setWaypointName] = useState("");
  const [description, setDescription] = useState("");
  const [plants, setPlants] = useState([]);
  // ===============================================================
  // SELECTION DATA
  // @desc data that appears as options in select boxes.
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eTags, setETags] = useState([]);
  const [eCategories, setECategories] = useState([]);
  const [ePlants, setEPlants] = useState([]);

  useEffect(async () => {
    await queryWaypoint();
    await queryLocations();
    await queryImages();
    await queryAudios();
    await queryVideos();
    await queryTags();
    await queryCategories();
    await queryPlants();
  }, []);

  // ===============================================================
  // NETWORK QUERIES FOR EXISTING DATA
  // @desc queries for existing data in the database, and delegates to selection data
  // ===============================================================
  const queryLocations = async () => {
    const result = await getLocations();
    if (result.error) return console.log("error getting locations");
    setELocations(result);
  };

  const queryImages = async () => {
    const result = await getImages();
    if (result.error) return console.log("error getting images");
    setEImages(result);
  };

  const queryAudios = async () => {
    const result = await getAudios();
    if (result.error) return console.log("error getting audios");
    setEAudios(result);
  };

  const queryVideos = async () => {
    const result = await getVideos();
    if (result.error) return console.log("error getting videos");
    setEVideos(result);
  };

  const queryTags = async () => {
    const result = await getTags();
    if (result.error) return console.log("error getting tags");
    setETags(result);
  };

  const queryCategories = async () => {
    const result = await getCategoryGroup("waypoint");
    if (result.error) return console.log("error getting categories");
    setECategories(result);
  };

  const queryPlants = async () => {
    const result = await getAllPlants();
    if (result.error) return console.log("error getting plants");
    setEPlants(result);
  };

  const queryWaypoint = async () => {
    if (!waypointId) return console.log("waypoint id is invalid");
    const result = await getWaypoint(waypointId);
    if (result.error) return console.log("unable to fetch waypoint");
    setWaypointData(result);
  };

  // ===============================================================
  // INPUT WATCHERS AND SETTERS
  // @desc functions that watch updates in children components, and sets them here.
  // ===============================================================

  const categoriesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setCategories(mappedData);
  };

  const tagsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setTags(mappedData);
  };

  const locationsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setLocations(mappedData);
  };

  const imagesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setImages(mappedData);
  };

  const audioFilesChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setAudioFiles(mappedData);
  };

  const videosChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setVideos(mappedData);
  };

  const customFieldsChanged = (data) => {
    setCustomFields(data);
  };

  const waypointNameChanged = (data) => {
    setWaypointName(data);
  };

  const descriptionChanged = (data) => {
    setDescription(data);
  };

  const plantsChanged = (data) => {
    const mappedData = data.map((d) => d._id);
    setPlants(mappedData);
  };

  // ===============================================================
  // POST
  // @desc updates the waypoint
  // ===============================================================
  const handleUpdate = async () => {
    const waypoint = {
      waypoint_name: waypointName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      locations: locations,
      custom_fields: customFields,
      plants: plants,
    };

    const result = await updateWaypoint(waypointId, waypoint);
    if (result.error) return console.log("error updating waypoint");
    history.push("/waypoints");
  };

  return (
    <EditWaypoint
      // WAYPOINT DATA
      waypointData={waypointData}
      // WATCHERS
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      customFieldsChanged={customFieldsChanged}
      videosChanged={videosChanged}
      waypointNameChanged={waypointNameChanged}
      descriptionChanged={descriptionChanged}
      plantsChanged={plantsChanged}
      handleUpdate={handleUpdate}
      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eTags={eTags}
      eCategories={eCategories}
      ePlants={ePlants}
      // QUERIES
      queryLocations={queryLocations}
      queryImages={queryImages}
      queryAudios={queryAudios}
      queryVideos={queryVideos}
      queryTags={queryTags}
      queryCategories={queryCategories}
    />
  );
}