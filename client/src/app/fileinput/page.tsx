"use client"
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Navbar from "@/app/components/Navbar";

const UPLOAD_FILE_MUTATION = gql`
    mutation UploadFile($filename: String!, $size: Int!, $type: String!, $content: String!) {
        uploadFile(filename: $filename, size: $size, type: $type, content: $content) {
            id
            filename
            size
            type
            content
        }
    }
`;

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadFile] = useMutation(UPLOAD_FILE_MUTATION);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            if (file.type === 'text/plain') {
                setSelectedFile(file);
            } else {
                console.error('Please select a text file.');
            }
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const { data } = await uploadFile({
                    variables: {
                        filename: selectedFile.name,
                        size: selectedFile.size,
                        type: selectedFile.type,
                        content: selectedFile,
                    }
                });
                console.log('File uploaded:', data.uploadFile);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <Navbar />
            <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-4xl font-bold text-center text-pink-600 mb-4">Upload Your File</h1>
                <p className="text-gray-600 text-center mb-6">Please select a text file to upload and click the button below.</p>
                <div className="flex flex-col items-center">
                    <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-pink-600 rounded-lg shadow-lg tracking-wide uppercase border border-pink-600 cursor-pointer hover:bg-pink-600 hover:text-white">
                        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 9.456A8.473 8.473 0 018.473 1h3.054a8.473 8.473 0 017.015 8.456 6.86 6.86 0 01-.227 1.566l-1.847-1.848a1.5 1.5 0 00-2.12 2.122l1.847 1.847a6.828 6.828 0 01-1.566.227 8.473 8.473 0 01-8.456-7.015L3.878 6.694A1.5 1.5 0 006 8.816l1.847-1.847a6.86 6.86 0 01-1.566-.227A8.473 8.473 0 01.458 9.456z" clipRule="evenodd"/></svg>
                        <span className="mt-2 text-base leading-normal">Select a file</span>
                        <input type='file' accept=".txt" className="hidden" onChange={handleFileChange} />
                    </label>
                    <div className="text-gray-600 text-sm mt-2">{selectedFile && selectedFile.name}</div>
                    <button className="mt-8 w-64 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg" onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
