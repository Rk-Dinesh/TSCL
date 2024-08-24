import JSZip from "jszip";
import { saveAs } from 'file-saver';
import axios from "axios";


export const API = "http://localhost:4000"

export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    return `${day} ${month} ${year} - ${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  }



  export async function fetchAndDecodeZip(grievance_id) {
    try {
      const response = await axios.get({
        url: `${API}/new-grievance-attachment/getbyid?grievance_id=${grievance_id}`,
        responseType: 'blob', 
      });


      console.log('Response Headers:', response.headers);
      console.log('Response Data Type:', response.data.constructor.name); // Should log 'Blob'
      console.log('Response Data Size:', response.data);
      
  
      const zip = await JSZip.loadAsync(response.data); 
  
      Object.keys(zip.files).forEach(async (filename) => {
        const fileData = await zip.files[filename].async('blob');
        saveAs(fileData, filename); 
      });
  
      console.log('Files successfully decoded and saved.');
    } catch (error) {
      console.error('Error fetching or decoding ZIP:', error);
    }
  }

  export async function downloadZip(grievanceId) {
    try {
        const response = await fetch(`${API}/new-grievance-attachment/getbyid?grievance_id=${grievanceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to download file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;

        // Attempt to get the filename from the content-disposition header
        let filename = 'download.zip'; // default filename
        const contentDisposition = response.headers.get('content-disposition');
        
        if (contentDisposition && contentDisposition.includes('filename=')) {
            filename = contentDisposition
                           .split('filename=')[1]
                           .replace(/"/g, '');
        }

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        // Clean up
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading ZIP file:', error);
    }
}



export const downloadFiles = async (grievanceId) => {
  try {
    const response = await axios.get(`${API}/new-grievance-attachment/getbyid?grievance_id=${grievanceId}`, {
      responseType: 'arraybuffer',
    });

    const zip = new JSZip();
    const blob = new Blob([response.data], { type: 'application/zip' });

    zip.loadAsync(blob).then((zipFile) => {
      const images = [];
      zipFile.forEach((file) => {
        if (file && (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png'))) {
          images.push({
            name: file.name,
            data: file.async('base64'),
          });
        }
      });

      // Do something with the images array
      console.log(images);
    }).catch((error) => {
      console.error('Error loading ZIP archive:', error);
    });
  } catch (error) {
    console.error(error);
  }
};









