import React from "react";
import { VscFilePdf } from "react-icons/vsc";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function DownloadPageAsPdf({ rootElementId, dowloadFileName }) {
  //download page as pdf function
  function downloadFileDocument() {
    const source = document.getElementById(rootElementId);
    html2canvas(source).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save(`${dowloadFileName}`);
    });
  }

  return (
    <>
      <button onClick={downloadFileDocument} className="m-5 btn  fs-5 bg-blue">
        <VscFilePdf></VscFilePdf>Télécharger en Pdf
      </button>
    </>
  );
}
