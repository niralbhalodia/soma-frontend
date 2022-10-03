import { savePDF } from '@progress/kendo-react-pdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class DocService {
	// createPdf = html => {
	// 	savePDF(html, {
	// 		paperSize: 'A4',
	// 		fileName: 'invoice.pdf',
	// 		imageresolution: '72'
	// 	});
	// };
	createPdf = (html) => {
		const input = document.getElementById('divToPrint');
    html2canvas(html)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
		console.log(imgData);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
	}
}

const Doc = new DocService();
export default Doc;
