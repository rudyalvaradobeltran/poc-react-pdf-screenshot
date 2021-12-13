import React, { useCallback, useRef } from 'react';
import { toBlob } from 'html-to-image';
import jsPDF from "jspdf";
import FileSaver from 'file-saver';

const Screenshot = ({ componente, nombreArchivo }) => {
  const ref = useRef(null);

  const obtieneDimensionesPantalla = () => {
    const { innerWidth: ancho, innerHeight: alto } = window;
    return { ancho, alto };
  }

  const obtieneScreenshot = useCallback(() => () => {
    if (ref.current === null) {
      return
    }
    const generaPDFDesdeImagen = (imagen) => {
      let dimensiones = obtieneDimensionesPantalla();
      let orientacion = dimensiones.ancho > dimensiones.alto ? 'l' : 'p'; //landscape - portrait
      const doc = new jsPDF(orientacion, 'px', [dimensiones.ancho, dimensiones.alto]);
      doc.deletePage(1);
      imagen.src = URL.createObjectURL(imagen);
      doc.addPage();
      doc.addImage(imagen.src, 'application/octet-stream', 0, 0, dimensiones.ancho, dimensiones.alto)
      const pdfURL = doc.output('bloburl');
      FileSaver.saveAs(pdfURL, `${nombreArchivo}.pdf`);
    };
    toBlob(ref.current, { cacheBust: true })
      .then((imagen) => {
        return generaPDFDesdeImagen(imagen);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, nombreArchivo]);

  return (
    <>
      <div ref={ref}>
        {componente()}
      </div>
      <button className="btn" onClick={obtieneScreenshot()}>Screenshot</button>
    </>
  );
}

export default Screenshot;