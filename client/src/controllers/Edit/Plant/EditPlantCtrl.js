import React, { useState, useEffect } from "react";
import EditPlant from "../../../components/Edit/Plant";
import { getPlant } from "../../../network";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  getLocations,
  getImages,
  getAudios,
  getVideos,
  getTags,
  getCategoryGroup,
  updatePlant,
} from "../../../network";

export default function EditPlantCtrl({ match }) {
  const history = useHistory();
  const [plantData, setPlantData] = useState({});
  const { plantId } = useParams();
  // ===============================================================
  // FORM DATA
  // ===============================================================
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  // ===============================================================
  // SELECTION DATA
  // ===============================================================
  const [eLocations, setELocations] = useState([]);
  const [eImages, setEImages] = useState([]);
  const [eAudios, setEAudios] = useState([]);
  const [eVideos, setEVideos] = useState([]);
  const [eTags, setETags] = useState([]);
  const [eCategories, setECategories] = useState([]);

  useEffect(async () => {
    await queryPlant();
    await queryLocations();
    await queryImages();
    await queryAudios();
    await queryVideos();
    await queryTags();
    await queryCategories();
  }, []);

  // ===============================================================
  // NETWORK QUERIES FOR EXISTING DATA
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
    const result = await getCategoryGroup("plant");
    if (result.error) return console.log("error getting categories");
    setECategories(result);
  };

  const queryPlant = async () => {
    if (!plantId) return console.log("plant id is invalid");
    const result = await getPlant(plantId);
    if (result.error) return console.log("unable to get plant");
    setPlantData(result);
  };

  // ===============================================================
  // INPUT WATCHERS AND SETTERS
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

  const plantNameChanged = (data) => {
    setPlantName(data);
  };

  const scientificNameChanged = (data) => {
    setScientificName(data);
  };

  const descriptionChanged = (data) => {
    setDescription(data);
  };

  // ===============================================================
  // POST
  // ===============================================================

  const handleUpdate = async () => {
    const plant = {
      plant_name: plantName,
      scientific_name: scientificName,
      description: description,
      images: images,
      audio_files: audioFiles,
      videos: videos,
      tags: tags,
      categories: categories,
      locations: locations,
      custom_fields: customFields,
    };

    const result = await updatePlant(plantId, plant);
    if (result.error) return console.log("error creating plant");
    history.push("/plants");
  };

  return (
    <EditPlant
      handleUpdate={handleUpdate}
      categoriesChanged={categoriesChanged}
      tagsChanged={tagsChanged}
      locationsChanged={locationsChanged}
      imagesChanged={imagesChanged}
      audioFilesChanged={audioFilesChanged}
      customFieldsChanged={customFieldsChanged}
      videosChanged={videosChanged}
      plantNameChanged={plantNameChanged}
      scientificNameChanged={scientificNameChanged}
      descriptionChanged={descriptionChanged}
      // SELECTION DATA
      eLocations={eLocations}
      eImages={eImages}
      eAudios={eAudios}
      eVideos={eVideos}
      eTags={eTags}
      eCategories={eCategories}
      plantData={plantData}
    />
  );
}