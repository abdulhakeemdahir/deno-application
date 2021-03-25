import React from "react";

export default function UploadImg() {
  

  

  return (
    <div>
      <h1>Upload</h1>
      <form action="">
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="btn" type="button">
          Submit
        </button>
      </form>
    </div>
  );
}
