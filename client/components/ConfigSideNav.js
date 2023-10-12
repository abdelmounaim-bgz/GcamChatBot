"use client";
import React, { useState } from "react";
import { Button, Stack, Form, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export default function ConfigSideNav() {
  const [isIngestLoading, setIsIngestLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [downloadInProgress, setdownloadInProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(null);

  const ingestData = async () => {
    try {
      setIsIngestLoading(true);
      const res = await fetch("http://localhost:5000/ingest");
      const jsonData = await res.json();
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log("Error Ingesting data");
        setIsIngestLoading(false);
      } else {
        setIsIngestLoading(false);
        console.log(jsonData);
      }
    } catch (error) {
      setIsIngestLoading(false);
      response.text().then(text => { toast.error("Error Ingesting data." + text); })
    }
  };
  const handleUpdate = async () => {
    try {
      setIsDataLoading(true);
      const res = await fetch("http://localhost:5000/update");
      const jsonData = await res.json();
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log("Error Ingesting data");
        setIsDataLoading(false);
      } else {
        setIsDataLoading(false);
        console.log(jsonData);
      }
    } catch (error) {
      setIsDataLoading(false);
      response.text().then(text => { toast.error("Error Updating data." + text); })
    }
  }
  const handleDownloadModel = async () => {
    try {
      setdownloadInProgress(true);
      const res = await fetch("http://localhost:5000/download_model");
      const jsonData = await res.json();
      if (!res.ok) {
        response.text().then(text => { toast.error("Error downloading model." + text); })
        setdownloadInProgress(false);
      } else {
        setdownloadInProgress(false);
        toast.success("Model Download complete");
        console.log(jsonData);
      }
    } catch (error) {
      setdownloadInProgress(false);
      console.log(error);
      toast.error("Error downloading model");
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files[0] != null) {
      setSelectedFile(event.target.files[0]);
    }

  };

  const handleUpload = async () => {
    setIsUploading(true)
    try {
      const formData = new FormData();
      formData.append("document", selectedFile);

      const res = await fetch("http://localhost:5000/upload_doc", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.log("Error Uploading document");
        response.text().then(text => { toast.error("Error Uploading document." + text); })
        setSelectedFile(null); // Clear the selected file after successful upload
        document.getElementById("file-input").value = "";
        setIsUploading(false)
      } else {
        const data = await res.json();
        console.log(data);
        toast.success("Document Upload Successful");
        setSelectedFile(null); // Clear the selected file after successful upload
        document.getElementById("file-input").value = "";
        setIsUploading(false)
      }
    } catch (error) {
      console.log("error");
      toast.error("Error Uploading document");
      setSelectedFile(null); // Clear the selected file after successful upload
      document.getElementById("file-input").value = "";
      setIsUploading(false)
    }
  };

  return (
    <>
      <div style={{ pointerEvents: "none" }} className="mx-4 mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Ajouter un documents</Form.Label>
          <Form.Control
            type="file"
            size="sm"
            onChange={handleFileChange}
            id="file-input"
          />
        </Form.Group>
        {isUploading ? <div className="d-flex justify-content-center"><Spinner animation="border" /><span className="ms-3">uploading ...</span></div> : <Button style={{ border: "0px", backgroundColor: "#007439" }} onClick={(e) => handleUpload()}>Upload</Button>}
      </div>
      <Stack direction="horizontal" style={{ pointerEvents: "none" }} className="mx-4 mt-5" gap={3}>
        {isDataLoading ? (
          <div className="d-flex justify-content-center"><Spinner animation="border" /><span className="ms-3">en cours ...</span></div>
        ) : (
          <Button
            style={{ border: "0px", backgroundColor: "#007439" }}
            onClick={(e) => {
              handleUpdate();
            }}
          >
            Générer les données
          </Button>
        )}
        {isIngestLoading ? (
          <div className="d-flex justify-content-center"><Spinner animation="border" /><span className="ms-3">en cours ...</span></div>
        ) : (
          <Button style={{ border: "0px", backgroundColor: "#007439" }} onClick={() => ingestData()}>Traiter les données</Button>
        )}
      </Stack>
    </>
  );
}
