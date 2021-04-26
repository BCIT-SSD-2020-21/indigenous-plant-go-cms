import React from "react";
import DashHeader from "../../DashHeader";
import TextPickerCtrl from "../../../controllers/Forms/TextPicker/TextPickerCtrl";
import {
  locations,
  categories,
} from "../../../controllers/Forms/TextPicker/Fake";

export default function AddPlants({ handlePublish }) {
  return (
    <div>
      <DashHeader
        title="Add New Plant"
        action="Publish"
        method={handlePublish}
      />
      <TextPickerCtrl
        label={"location"}
        dataLabel={"location"}
        data={locations}
      />
      <TextPickerCtrl
        label={"category"}
        dataLabel={"category"}
        data={categories}
      />
    </div>
  );
}
