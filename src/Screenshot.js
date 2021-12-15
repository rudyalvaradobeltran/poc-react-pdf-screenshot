import React, { useCallback, useRef, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toBlob } from 'html-to-image';
import { jsPDF as JSPDF } from "jspdf";
import FileSaver from 'file-saver';

const Screenshot = ({ componente, nombreArchivo }) => {
  const ref = useRef(null);
  const [dimensiones, setDimensiones] = useState({ ancho: 0, alto: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      setDimensiones({
        ancho: ref.current.offsetWidth,
        alto: ref.current.offsetHeight
      });
    }
  }, []);

  const obtieneScreenshot = useCallback(() => async () => {
    if (ref.current === null) {
      return
    }
    const generaPDFDesdeImagen = (imagen) => {
      const orientacion = dimensiones.ancho > dimensiones.alto ? 'l' : 'p'; // landscape - portrait
      const doc = new JSPDF(orientacion, 'px', [dimensiones.ancho, dimensiones.alto]);
      doc.deletePage(1);
      imagen.src = URL.createObjectURL(imagen);
      doc.addPage();
      doc.addImage(imagen.src, 'application/octet-stream', 0, 0, dimensiones.ancho, dimensiones.alto)
      const pdfURL = doc.output('bloburl');
      FileSaver.saveAs(pdfURL, `${nombreArchivo}.pdf`);
    };
    await toBlob(ref.current, { cacheBust: true })
      .then((imagen) => {
        return generaPDFDesdeImagen(imagen);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, nombreArchivo, dimensiones]);

  return (
    <>
      <div ref={ref}>
        {componente}
      </div>
      <button type="button" className="btn" onClick={obtieneScreenshot()}>{`Screenshot: ${dimensiones.ancho.toString()}x${dimensiones.alto.toString()}`}</button>
    </>
  );
}

Screenshot.propTypes = {
  componente: PropTypes.element,
  nombreArchivo: PropTypes.string,
};
Screenshot.defaultProps = {
  componente: null,
  nombreArchivo: '',
};

export default Screenshot;